const express = require("express");
const router = express.Router();
const { quizController } = require("../controller/quizController");
const { userController } = require("../controller/userController");
const auth = require("../middleware/auth");

router.post("/quiz", userController.allowIfLoggedin, quizController.createQuiz);
router.get(
  "/quiz",
  auth,
  userController.allowIfLoggedin,
  userController.grantAccess("readAny", "User"),
  quizController.getQuizes
);
router.get(
  "/quiz/:id",
  auth,
  userController.allowIfLoggedin,
  quizController.getQuiz
);
router.put(
  "/quiz/:id",
  auth,
  userController.allowIfLoggedin,
  userController.grantAccess("updateAny", "User"),
  quizController.updateQuiz
);
router.delete(
  "/quiz/:id",
  auth,
  userController.allowIfLoggedin,
  userController.grantAccess("deleteAny", "User"),
  quizController.deleteQuiz
);

module.exports.quizRouter = router;
