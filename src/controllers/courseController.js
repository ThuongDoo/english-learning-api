const { StatusCodes } = require("http-status-codes");
const Course = require("../models/Course");

const createCourse = async (req, res) => {
  const { name, description, teacher, level } = req.body;
  const course = await Course.create({ name, description, teacher, level });
  res.status(StatusCodes.OK).json({ msg: "created", course });
};

const getCourse = async (req, res) => {
  const { teacher, level, sort } = req.query;
  const queryObject = {};
  if (teacher) {
    queryObject.teacher = teacher;
  }
  if (level) {
    queryObject.level = level;
  }
  let course = Course.find(queryObject);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    course = course.sort(sortList);
  }

  const result = await course;
  res.status(StatusCodes.OK).json({ courses: result });
};

const getCourseById = async (req, res) => {
  const { id: courseId } = req.params;
  const course = await Course.findById(courseId).populate({ path: "lessons" });
  if (!course) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "course id is not exist" });
  }
  res.status(StatusCodes.OK).json({ course });
};

const updateCourse = async (req, res) => {
  const { id: courseId } = req.params;
  const { name, description, teacher, level } = req.body;

  const course = await Course.findOneAndUpdate(
    { _id: courseId },
    { name, description, teacher, level },
    { new: true, runValidators: true }
  );
  if (!course) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "course id is not exist" });
  }
  res.status(StatusCodes.OK).json({ msg: "success", course });
};

const deleteCourse = async (req, res) => {
  const { id: courseId } = req.params;
  const course = await Course.findOneAndDelete({ _id: courseId });
  if (!course) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "course id is not exist" });
  }
  res.status(StatusCodes.OK).json({ msg: "success" });
};

module.exports = {
  createCourse,
  getCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
};
