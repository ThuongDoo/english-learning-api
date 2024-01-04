const mongoose = require("mongoose");

const AnswerSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
});

const QuizSchema = mongoose.Schema(
  {
    question: {
      type: String,
    },
    answers: [AnswerSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", QuizSchema);
