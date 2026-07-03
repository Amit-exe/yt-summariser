const extractVideoId = require("../utils/extractVideoId");
const pool = require("../config/db");
const getTranscript = require("../services/youtubeService");
const generateSummary = require("../services/geminiService");
const AppError = require("../middleware/AppError");
const summarise = async (req, res, next) => {
  try {
    const { videoUrl, summaryType } = req.body;
    const user_id = req.user.id;
    if (!videoUrl) {
      throw new AppError("Invalid YouTube URL", 400);
    }
    const video_id = extractVideoId(videoUrl);
    if (!video_id) {
      throw new AppError("Invalid YouTube URL", 400);
    }
    const inDb = await pool.query(
      "select summary ,summary_title from summaries where summary_type=$1 and  video_id=$2 ",
      [summaryType, video_id],
    );
    if (inDb.rows.length > 0) {
      const { summary, summary_title } = inDb.rows[0];
      return res.json({ summary, title: summary_title, cached: true });
    } else {
      const transcript = await getTranscript(video_id);
      const { title, summary: summaryText } = await generateSummary(
        transcript,
        summaryType,
      );
      await pool.query(
        "insert into summaries(user_id,video_id,video_url,summary_type,summary,summary_title) values($1,$2,$3,$4,$5,$6)",
        [user_id, video_id, videoUrl, summaryType, summaryText, title],
      );
      return res.json({ summary: summaryText, title, cached: false });
    }
  } catch (error) {
    next(error);
  }
};

const getHistory = async (req, res, next) => {
  try {
    const { id } = req.user;
    const history = await pool.query(
      "select id ,video_id, video_url, summary_type, summary,summary_title, cached, created_at from summaries where user_id=$1 order by created_at desc",
      [id],
    );

    return res.json({ history: history.rows });
  } catch (error) {
    next(error);
  }
};

module.exports = { summarise, getHistory };
