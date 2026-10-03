const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ApiError = require("./apiError");

const protect = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new ApiError(401, "Authentication required", "UNAUTHENTICATED"));
  }

  let decoded;
  try {
    decoded = jwt.verify(authorization.slice(7), process.env.JWT_SECRET);
  } catch (error) {
    return next(new ApiError(401, "Invalid or expired token", "INVALID_TOKEN"));
  }

  try {
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      return next(new ApiError(401, "Invalid or expired token", "INVALID_TOKEN"));
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { protect };
