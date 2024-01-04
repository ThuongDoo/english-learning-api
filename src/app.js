require("dotenv").config();
require("express-async-errors");

const cookieParser = require("cookie-parser");
const express = require("express");
const { connect } = require("mongoose");
const app = express();

const authRouter = require("./routes/authRouter");
const courseRouter = require("./routes/courseRouter");
const userRouter = require("./routes/userRoutes");
const lessonRouter = require("./routes/lessonRouter");
const quizRouter = require("./routes/quizRouter");

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/lesson", lessonRouter);
app.use("/api/v1/quiz", quizRouter);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connect(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log("SERVER IS LISTENING ON PORT", port);
    });
  } catch (error) {}
};

start();
