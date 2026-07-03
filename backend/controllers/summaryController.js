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
      "select summary,summary_title,id from summaries where summary_type=$1 and  video_id=$2 ",
      [summaryType, video_id],
    );
    if (inDb.rows.length > 0) {
      const { summary, summary_title, id } = inDb.rows[0];

      await pool.query(
        "INSERT INTO user_summaries (user_id, summary_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
        [req.user.id, id],
      );
      return res.json({ summary, title: summary_title, cached: true });
    } else {
      const transcript = await getTranscript(video_id);
      const { title, summary: summaryText } = await generateSummary(
        transcript,
        summaryType,
      );
      const newSummary = await pool.query(
        "insert into summaries(video_id,video_url,summary_type,summary,summary_title) values($1,$2,$3,$4,$5) RETURNING id",
        [video_id, videoUrl, summaryType, summaryText, title],
      );

      await pool.query(
        "INSERT INTO user_summaries (user_id, summary_id) VALUES ($1, $2)",
        [req.user.id, newSummary.rows[0].id],
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
      `
      SELECT s.id, s.video_id, s.video_url, s.summary_type, 
            s.summary, s.summary_title, s.cached, us.created_at
      FROM user_summaries us
      JOIN summaries s ON s.id = us.summary_id
      WHERE us.user_id = $1
      ORDER BY us.created_at DESC
      `,
      [id],
    );

    return res.json({ history: history.rows });
  } catch (error) {
    next(error);
  }
};

module.exports = { summarise, getHistory };
