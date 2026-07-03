const express = require("express");
const { summarise, getHistory } = require("../controllers/summaryController");
const verifyToken = require("../middleware/authMiddleware");
const summaryRouter = express.Router();

summaryRouter.post("/", verifyToken, summarise);
summaryRouter.get("/history", verifyToken, getHistory);

module.exports = summaryRouter;
