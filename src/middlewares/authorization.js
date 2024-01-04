const authorizeUser = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new Error("Unauthorized to access this route");
    }
    next();
  };
};

module.exports = { authorizeUser };
