const userServise = require("../service/user-servise");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequests("Ошибка валидации", errors.array()));
      }
      const { email, password, name } = req.body;
      const userData = await userServise.registration(email, password, name);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userServise.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      next(error);
    }
  }
  async refresh(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req, res, next) {
    try {
      res.json(["123", "1233"]);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
