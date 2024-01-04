const express = require("express");
const { authentication } = require("../middlewares/authentication");
const { authorizeUser } = require("../middlewares/authorization");
const {
  createQuiz,
  updateQuiz,
  deleteQuiz,
} = require("../controllers/quizController");
const router = express.Router();

router
  .route("/")
  .post(authentication, authorizeUser("admin", "teacher"), createQuiz);
router
  .route("/:id")
  .patch(authentication, authorizeUser("teacher", "admin"), updateQuiz)
  .delete(authentication, authorizeUser("teacher", "admin"), deleteQuiz);

module.exports = router;
