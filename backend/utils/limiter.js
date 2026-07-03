const rateLimit = require("express-rate-limit");
module.exports = createLimiter = (overrides = {}) =>
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message: {
      code: 429,
      message: "Too many requests, please try again later",
    },
    statusCode: 429,
    ...overrides,
  });
