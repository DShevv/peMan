const queries = require("../db/queries");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailServise = require("./mail-servise");
const tokenServise = require("./token-servise");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");

class UserServise {
  async registration(email, password, name) {
    await queries.findUser(email).then((res) => {
      if (res) {
        throw ApiError.BadRequests(
          `Пользователь с почтовым адресом ${email} уже существует`
        );
      }
    });
    const hashPass = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    await queries.createUser(email, hashPass, name, activationLink);
    let user = {};
    await queries.findUser(email).then((res) => {
      user = { ...res.recordset[0] };
    });
    await mailServise.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );

    const userDto = new UserDto(user);
    const tokens = tokenServise.generate({ ...userDto });
    await tokenServise.setToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink) {
    let user = {};
    await queries
      .findBy("Users", "activationLink", activationLink)
      .then((res) => {
        if (!res) {
          throw ApiError.BadRequests("Некорректная ссылка активации");
        }
        user = { ...res.recordset[0] };
        user.isActivated = true;
      });

    await queries.updateUser(user);
  }
}

module.exports = new UserServise();
