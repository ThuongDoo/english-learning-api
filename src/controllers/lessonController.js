const { StatusCodes } = require("http-status-codes");
const Course = require("../models/Course");
const Lesson = require("../models/Lesson");

const createLesson = async (req, res) => {
  const { courseId, content, description, title } = req.body;
  const course = await Course.findById(courseId);
  if (!course) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "course id is not exist" });
  }
  const lesson = await Lesson.create({
    title,
    content,
    description,
  });
  course.lessons.push(lesson);
  await course.save();
  res.status(StatusCodes.OK).json({ msg: "success", course });
};

const updateLesson = async (req, res) => {
  const { id: lessonId } = req.params;
  const { content, description, title, quizzes } = req.body;
  const lesson = await Lesson.findOneAndUpdate(
    { _id: lessonId },
    { content, description, title, quizzes },
    { new: true, runValidators: true }
  );
  if (!lesson) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "lesson id is not exist" });
  }
  res.status(StatusCodes.OK).json({ lesson });
};

const deleteLesson = async (req, res) => {
  const { id: lessonId } = req.params;
  const { courseId } = req.body;
  const course = await Course.findById(courseId);
  if (!course) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "course id is not exist" });
  }

  const lesson = await Lesson.findOneAndDelete({ _id: lessonId });
  if (!lesson) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "lesson id is not exist" });
  }

  const lessonIndex = course.lessons.indexOf(lessonId);
  if (lessonIndex !== -1) {
    course.lessons.splice(lessonIndex, 1);
    await course.save();
  }
  res.status(StatusCodes.OK).json({ msg: "success", course });
};

const getLessonById = async (req, res) => {
  const { id: lessonId } = req.params;
  const lesson = await Lesson.findById(lessonId).populate({ path: "quizzes" });
  if (!lesson) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "lesson id is not exist" });
  }
  res.status(StatusCodes.OK).json({ lesson });
};

module.exports = { createLesson, getLessonById, updateLesson, deleteLesson };
