const ApiError = require('./apiError');

const notFoundHandler = (req, res, next) => {
  next(new ApiError(404, 'Route not found', 'NOT_FOUND'));
};

const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      errorCode: error.errorCode,
    });
  }

  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({
      success: false,
      message: 'Invalid JSON request body',
      errorCode: 'INVALID_JSON',
    });
  }

  if (error.type === 'entity.too.large') {
    return res.status(413).json({
      success: false,
      message: 'Request body is too large',
      errorCode: 'PAYLOAD_TOO_LARGE',
    });
  }

  if (error.message === 'Not allowed by CORS') {
    return res.status(403).json({
      success: false,
      message: 'Origin is not allowed',
      errorCode: 'CORS_FORBIDDEN',
    });
  }

  if (error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: 'A record with these details already exists',
      errorCode: 'DUPLICATE_RESOURCE',
    });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'The submitted data is invalid',
      errorCode: 'VALIDATION_ERROR',
    });
  }

  if (error.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid resource identifier',
      errorCode: 'INVALID_ID',
    });
  }

  if (
    error.name === 'MongoServerSelectionError' ||
    error.name === 'MongoNetworkError' ||
    error.name === 'MongooseServerSelectionError' ||
    error.name?.startsWith('Mongoose') ||
    error.name?.startsWith('Mongo')
  ) {
    return res.status(503).json({
      success: false,
      message: 'Database is temporarily unavailable',
      errorCode: 'DATABASE_UNAVAILABLE',
    });
  }

  console.error('Unhandled API error', {
    name: error.name,
    code: error.code,
    path: req.path,
  });

  return res.status(500).json({
    success: false,
    message: 'Internal server error',
    errorCode: 'INTERNAL_ERROR',
  });
};

module.exports = { errorHandler, notFoundHandler };
