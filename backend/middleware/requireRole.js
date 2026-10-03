const ApiError = require('./apiError');

const requireRole = (role) => (req, res, next) => {
  if (!req.user || req.user.role !== role) {
    return next(new ApiError(403, 'You are not allowed to perform this action', 'FORBIDDEN'));
  }

  next();
};

module.exports = requireRole;
