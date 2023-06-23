const express = require("express");
const router = express.Router();
const { authController } = require("../controller/authController");
const { userController } = require("../controller/userController");
const auth = require("../middleware/auth");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get(
  "/users",
  auth,
  userController.allowIfLoggedin,
  userController.grantAccess("readAny", "User"),
  userController.getUsers
);
router.get(
  "/users/:id",
  auth,
  userController.allowIfLoggedin,
  userController.getUser
);
router.put(
  "/users/:id",
  auth,
  userController.allowIfLoggedin,
  userController.grantAccess("updateAny", "User"),
  userController.updateUser
);
router.delete(
  "/users/:id",
  auth,
  userController.allowIfLoggedin,
  userController.grantAccess("deleteAny", "User"),
  userController.deleteUser
);

module.exports.userRouter = router;
