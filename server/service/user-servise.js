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

  async login(email, password) {
    let user = {};
    await queries.findUser(email).then((res) => {
      if (!res) {
        throw ApiError.BadRequests(`Пользователь не существует`);
      }
      user = { ...res.recordset[0] };
    });
    const isPassCorrect = await bcrypt.compare(password, user.password);
    if (!isPassCorrect) {
      throw ApiError.BadRequests("Неверный пароль");
    }
    const userDto = new UserDto(user);
    const tokens = tokenServise.generate({ ...userDto });
    await tokenServise.setToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await tokenServise.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = await tokenServise.validateRefreshToken(refreshToken);
    const isTokenInDb = await tokenServise.findToken(refreshToken);
    if (!userData || !isTokenInDb) {
      throw ApiError.UnauthorizedError();
    }
    let user = {};
    await queries.findUser(userData.email).then((res) => {
      if (!res) {
        throw ApiError.BadRequests(`Пользователь не существует`);
      }
      user = { ...res.recordset[0] };
    });
    const userDto = new UserDto(user);
    const tokens = tokenServise.generate({ ...userDto });
    await tokenServise.setToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async getAllUsers() {
    const users = await queries.findAll("Users");
    return users;
  }

  async getCategories(id) {
    const categories = await queries.getCategories(id);
    return categories;
  }
  async deleteCategories(id) {
    const categories = await queries.deleteCategory(id);
    return categories;
  }

  async getPictures() {
    const pictures = await queries.findAll("Pictures");
    return pictures;
  }

  async createCategories(user, name, pic) {
    const result = await queries.createCategories(user.id, name, pic);
    return result;
  }

  async getSpendings(id, date) {
    const spendings = await queries.getSpendings(id, date);
    return spendings.recordset;
  }

  async createSpendings(
    userId,
    categoryId,
    value,
    currency,
    date,
    isPeriod,
    delta,
    notiDelta
  ) {
    let result;
    if (isPeriod) {
      result = await queries.createSpendings(
        userId,
        categoryId,
        value,
        currency,
        date,
        isPeriod,
        delta,
        notiDelta
      );
    } else {
      result = await queries.createSpendings(
        userId,
        categoryId,
        value,
        currency,
        date,
        isPeriod
      );
    }
    return result;
  }
}

module.exports = new UserServise();
