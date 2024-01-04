const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { attachCookieToResponse } = require("../utils/jwt");

const register = async (req, res) => {
  const { username, email, password, role } = req.body;
  if (role === "admin") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Can't create admin user" });
  }
  let user = await User.findOne({ email });
  if (user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Email already exist" });
  }
  user = await User.create({ email, username, password, role });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  await user.save();

  res.status(StatusCodes.OK).json({ msg: "success", user });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Invalid Credentials" });
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return res
      .status(StatusCodes.NON_AUTHORITATIVE_INFORMATION)
      .json({ msg: "Invalid Credentials" });
  }
  attachCookieToResponse(res, user);
  res.status(StatusCodes.OK).json({ msg: "success", user });
};

const logout = async (req, res) => {
  // res.cookie("token", "logout", {
  //   httpOnly: true,
  //   expires: new Date(Date.now() + 1000),
  // });
  res.status(StatusCodes.OK).json({ msg: "user logged out" });
};

module.exports = { register, login, logout };
