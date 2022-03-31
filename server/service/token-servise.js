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
}

module.exports = new TokenServise();
