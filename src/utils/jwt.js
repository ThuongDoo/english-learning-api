const jwt = require("jsonwebtoken");

const createUserToken = (user) => {
  return {
    userId: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
};

const createJWT = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookieToResponse = (res, user) => {
  const payload = createUserToken(user);
  const token = createJWT(payload);
  const jwtExpiration = new Date(jwt.decode(token).exp * 1000);
  res.cookie("token", token, {
    expires: jwtExpiration,
    httpOnly: true,
    secure: false,
    signed: true,
  });
};

module.exports = { attachCookieToResponse, isTokenValid };
