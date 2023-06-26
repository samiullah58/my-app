const express = require("express");
const router = express.Router();
const { quizController } = require("../controller/quizController");

router.post("/quiz", quizController.createQuiz);
router.get("/quiz", quizController.getQuizes);
router.get("/quiz/:id", quizController.getQuiz);

module.exports.quizRouter = router;
