const AppError = require("../middleware/AppError");
const { Supadata } = require("@supadata/js");
const pool = require("../config/db");

const supadata = new Supadata({ apiKey: process.env.SUPADATA_API_KEY });

async function getTranscript(videoId, videoUrl) {
  try {
    // Check cache first
    const cached = await pool.query(
      "SELECT transcript FROM transcripts WHERE video_id=$1",
      [videoId],
    );

    if (cached.rows.length > 0) {
      return cached.rows[0].transcript;
    }

    // Cache miss — fetch from Supadata
    const transcriptResult = await supadata.transcript({
      url: videoUrl,
      lang: "en",
      text: true,
      mode: "auto",
    });

    const transcript = transcriptResult.content;

    // Save to cache
    await pool.query(
      "INSERT INTO transcripts (video_id, video_url, transcript) VALUES ($1, $2, $3)",
      [videoId, videoUrl, transcript],
    );

    return transcript;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Could not fetch transcript for this video", 400);
  }
}

module.exports = getTranscript;
