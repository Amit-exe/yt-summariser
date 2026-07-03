const jwt = require("jsonwebtoken");
const AppError = require("./AppError");

async function verifyToken(req, res, next) {
  try {
    if (!req.headers.authorization) {
      throw new AppError("No token provided", 401);
    }
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
    } else {
      next(new AppError("Invalid or expired token", 401));
    }
  }
}

module.exports = verifyToken;
