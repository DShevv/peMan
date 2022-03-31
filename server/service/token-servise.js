const jwt = require("jsonwebtoken");
const queries = require("../db/queries");

class TokenServise {
  generate(payload) {
    const accsessToken = jwt.sign(payload, process.env.JWT_ACCES_SECRET, {
      expiresIn: "60m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return {
      accsessToken,
      refreshToken,
    };
  }
  async setToken(id, token) {
    queries.findBy("RefToken", "Usert", id).then((res) => {
      if (res) {
        queries.updateToken(id, token);
      } else {
        queries.createToken(id, token);
      }
    });
  }
  async removeToken(token) {
    const res = await queries.deleteFrom("RefToken", "refreshToken", token);
    return res;
  }

  async validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCES_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }

  async validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }

  async findToken(token) {
    let result;
    await queries.findBy("RefToken", "refreshToken", token).then((res) => {
      if (res) {
        result = true;
      } else {
        result = false;
      }
    });
    return result;
  }
}

module.exports = new TokenServise();
