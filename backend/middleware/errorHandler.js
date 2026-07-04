const AppError = require("./AppError");
const logger = require("../utils/logger");

function errorHandler(err, req, res, next) {
  const code = err.status || 500;
  const message = err.message || "something went wrong!";

  if (!(err instanceof AppError))
    logger.error({
      message: err.message,
      stack: err.stack,
      status: err.status,
    });

  return res.status(code).json({ code, message });
}

module.exports = errorHandler;
