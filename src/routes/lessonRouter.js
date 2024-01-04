const express = require("express");
const { authentication } = require("../middlewares/authentication");
const { authorizeUser } = require("../middlewares/authorization");
const {
  createLesson,
  getLessonById,
  updateLesson,
  deleteLesson,
} = require("../controllers/lessonController");
const router = express.Router();

router
  .route("/")
  .patch(authentication, authorizeUser("teacher", "admin"), createLesson);

router
  .route("/:id")
  .get(authentication, getLessonById)
  .patch(authentication, authorizeUser("admin", "teacher"), updateLesson)
  .delete(authentication, authorizeUser("admin", "teacher"), deleteLesson);

module.exports = router;
