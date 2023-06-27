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

const updateQuiz = async (req, res) => {
  const { error } = req.body;
  if (error) res.status(400).send(error.details[0].message);

  const newQuiz = await Quiz.findByIdAndUpdate(
    req.params.id,
    { question: req.body.question, options: req.body.options },
    { new: true }
  );
  res.send(newQuiz);
};

const deleteQuiz = async (req, res) => {
  const { error } = req.body;
  if (error) res.status(400).send(error.details[0].message);

  const newQuiz = await Quiz.findByIdAndDelete(req.params.id);
  res.send("question has been deleted!");
};

module.exports.quizController = {
  createQuiz,
  getQuizes,
  getQuiz,
  updateQuiz,
  deleteQuiz,
};
