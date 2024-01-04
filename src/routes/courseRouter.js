const express = require("express");
const { authentication } = require("../middlewares/authentication");
const {
  createCourse,
  getCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");
const { authorizeUser } = require("../middlewares/authorization");
const router = express.Router();

router
  .route("/")
  .post(authentication, authorizeUser("teacher", "admin"), createCourse)
  .get(authentication, getCourse);

router
  .route("/:id")
  .get(authentication, getCourseById)
  .patch(authentication, authorizeUser("teacher", "admin"), updateCourse)
  .delete(authentication, authorizeUser("teacher", "admin"), deleteCourse);

module.exports = router;
