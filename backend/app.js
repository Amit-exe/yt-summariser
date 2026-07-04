const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const createLimiter = require("./utils/limiter");
const authRouter = require("./routes/authRoute");
const summaryRouter = require("./routes/summaryRoute");
const logger = require("./middleware/logger");
const app = express();
var morgan = require("morgan");

require("./config/db");
// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://yt-summariser-eta.vercel.app/"],
    credentials: true,
  }),
);
app.use(express.json());
// app.use(logger);

app.use(morgan("dev"));

// Health check

// let rateLimitOptions = {
//   windowMs: 15 * 60 * 1000,
//   limit: 100,
//   message: { code: 429, message: "Too many requests, please try again later" },
//   statusCode: 429,
// };

// const limiter = rateLimit(rateLimitOptions);
// const limiter2 = rateLimit({
//   ...rateLimitOptions,
//   windowMs: 60 * 60 * 1000,
//   limit: 10,
// });

app.set("trust proxy", 1);
const limiter = createLimiter();
const summariseLimiter = createLimiter({
  windowMs: 60 * 60 * 1000,
  limit: 1000,
});

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "YT Summariser API running" });
});

app.use("/api", limiter);
app.use("/api/summarise", summariseLimiter);
app.use("/api/summarise", summaryRouter);
app.use("/api/auth", authRouter);
// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler — we'll expand this tomorrow
app.use(errorHandler);

module.exports = app;
