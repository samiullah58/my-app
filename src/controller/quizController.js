const Quiz = require("../model/quiz");

const createQuiz = async (req, res, next) => {
  try {
    const { question } = req.body;
    const { options } = req.body;
    const newQuiz = await Quiz.create({
      question,
      options,
    });
    await newQuiz.save();
    res.status(201).send(newQuiz);
  } catch (error) {
    next(error.message);
  }
};

const getQuizes = async (req, res) => {
  const { error } = req.body;
  if (error) res.status(400).send(error.details[0].message);

  const newQuiz = await Quiz.find({});
  res.send(newQuiz);
};

const getQuiz = async (req, res) => {
  const { error } = req.body;
  if (error) res.status(400).send(error.details[0].message);

  const newQuiz = await Quiz.findByIdAndUpdate(req.params.id);
  res.send(newQuiz);
};

module.exports.quizController = { createQuiz, getQuizes, getQuiz };
