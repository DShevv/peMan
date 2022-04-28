const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const UserController = require("../controllers/user-controller");
const { body } = require("express-validator");
const authMiddlewage = require("../middlewares/auth-middlewage");

const router = new Router();

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddlewage, userController.getUsers);
router.post("/categories", authMiddlewage, userController.getCategories);
router.post(
  "/categories/delete",
  authMiddlewage,
  userController.deleteCategories
);
router.get("/pictures", authMiddlewage, userController.getPictures);
router.post(
  "/categories/create",
  authMiddlewage,
  userController.createCategories
);

router.post("/spendings", authMiddlewage, userController.getSpendings);
router.post(
  "/spendings/create",
  authMiddlewage,
  userController.createSpendings
);

module.exports = router;
