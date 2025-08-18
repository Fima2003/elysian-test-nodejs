const AppError = require('../errors/AppError');

function errorHandler(err, req, res, next) {
  const status = err.statusCode || err.status || (err instanceof AppError ? err.statusCode : 500);
  const body = {
    message: err.message || 'Internal Server Error',
  };
  if (process.env.NODE_ENV !== 'production') {
    body.details = err.details || undefined;
    body.stack = err.stack;
  }
  res.status(status).json(body);
}

function notFound(req, res, next) {
  next(new AppError('Not Found', 404));
}

module.exports = { errorHandler, notFound };
