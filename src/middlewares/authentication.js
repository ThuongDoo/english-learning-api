const { isTokenValid } = require("../utils/jwt");

const authentication = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new Error("authentication invalid");
  }
  const { userId, username, email, role } = isTokenValid(token);
  req.user = { userId, username, email, role };
  next();
};

module.exports = { authentication };
