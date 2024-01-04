const { StatusCodes } = require("http-status-codes");
const Lesson = require("../models/Lesson");
const Quiz = require("../models/Quiz");

const createQuiz = async (req, res) => {
  const { question, answers, lessonId } = req.body;
  const lesson = await Lesson.findById(lessonId);
  if (!lesson) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "lesson id is not exist" });
  }
  const quiz = await Quiz.create({ question, answers });
  lesson.quizzes.push(quiz);
  await lesson.save();
  res.status(StatusCodes.OK).json({ msg: "success", lesson });
};

const updateQuiz = async (req, res) => {
  const { id: quizId } = req.params;
  const { question, answers } = req.body;
  const quiz = await Quiz.findOneAndUpdate(
    { _id: quizId },
    { question, answers },
    { new: true, runValidators: true }
  );
  if (!quiz) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "quiz id is not exist" });
  }
  res.status(StatusCodes.OK).json({ msg: "success", quiz });
};

const deleteQuiz = async (req, res) => {
  const { id: quizId } = req.params;
  const { lessonId } = req.body;
  const lesson = await Lesson.findById(lessonId);
  if (!lesson) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "lesson id is not exist" });
  }
  const quiz = await Quiz.findOneAndDelete({ _id: quizId });
  if (!quiz) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "quiz id is not exist" });
  }

  const quizIndex = lesson.quizzes.indexOf(quizId);
  if (quizIndex !== -1) {
    lesson.quizzes.splice(quizIndex, 1);
    await lesson.save();
  }
  res.status(StatusCodes.OK).json({ msg: "success", lesson });
};

module.exports = { createQuiz, updateQuiz, deleteQuiz };
