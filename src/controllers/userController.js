const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const changeUserCredentials = async (req, res) => {
  const { username, email, oldPassword, newPassword } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: "user is not exist" });
  }
  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "password incorrect" });
  }
  if (username) {
    user.username = username;
  }
  if (email) {
    user.email = email;
  }
  if (newPassword) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
  }
  await user.save();

  res.status(StatusCodes.OK).json({ msg: "success" });
};

const getAllUsers = async (req, res) => {
  let users = await User.find({}).select("-password");
  res.status(StatusCodes.OK).json({ users });
};

const getUserById = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findById(userId).select("-password");
  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "user id is not exist" });
  }
  res.status(StatusCodes.OK).json(user);
};

module.exports = { changeUserCredentials, getAllUsers, getUserById };
