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
      const { email, password } = req.body;
      const userData = await userServise.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userServise.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
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
      const { refreshToken } = req.cookies;
      const userData = await userServise.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userServise.getAllUsers();
      return res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async getCategories(req, res, next) {
    try {
      const { id } = req.body;
      const categories = await userServise.getCategories(id);
      return res.json(categories);
    } catch (error) {
      next(error);
    }
  }

  async deleteCategories(req, res, next) {
    try {
      const { id } = req.body;
      const categories = await userServise.deleteCategories(id);
      return res.json(categories);
    } catch (error) {
      next(error);
    }
  }

  async getPictures(req, res, next) {
    try {
      const pictures = await userServise.getPictures();
      return res.json(pictures);
    } catch (error) {
      next(error);
    }
  }

  async createCategories(req, res, next) {
    try {
      const { user, name, image } = req.body;
      const result = await userServise.createCategories(user, name, image);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getSpendings(req, res, next) {
    try {
      const { user, date } = req.body;
      const spendings = await userServise.getSpendings(user.id, date);
      return res.json(spendings);
    } catch (error) {
      next(error);
    }
  }

  async createSpendings(req, res, next) {
    try {
      const {
        userId,
        categoryId,
        value,
        currency,
        date,
        isPeriod,
        delta,
        notiDelta,
      } = req.body;
      const result = await userServise.createSpendings(
        userId,
        categoryId,
        value,
        currency,
        date,
        isPeriod,
        delta,
        notiDelta
      );
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
