const express = require("express");
const router = express.Router();
const { authController } = require("../controller/authController");
const validationUser = require("../validation/user.validate");
const { userController } = require("../controller/userController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get(
  "/users",
  userController.allowIfLoggedin,
  userController.grantAccess("readAny", "User"),
  userController.getUsers
);
router.get(
  "/users/:id",
  userController.allowIfLoggedin,
  userController.getUser
);
router.put(
  "/users/:id",
  userController.allowIfLoggedin,
  userController.grantAccess("updateAny", "users"),
  userController.updateUser
);
router.delete(
  "/users/:id",
  userController.allowIfLoggedin,
  userController.grantAccess("deleteAny", "users"),
  userController.deleteUser
);

module.exports = router;
