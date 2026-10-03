const ApiError = require('./apiError');

const validateRequest = (schema, property) => (req, res, next) => {
  const result = schema.safeParse(req[property]);

  if (!result.success) {
    return next(new ApiError(400, 'Invalid request data', 'VALIDATION_ERROR'));
  }

  req[property] = result.data;
  next();
};

module.exports = validateRequest;
