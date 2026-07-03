const AppError = require("./AppError");

function errorHandler(err, req, res, next) {
  const code = err.status || 500;
  const message = err.message || "something went wrong!";

  if (!(err instanceof AppError)) console.error(err);

  return res.status(code).json({ code, message });
}

module.exports = errorHandler;
