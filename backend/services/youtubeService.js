const { fetchTranscript } = require("youtube-transcript");

const AppError = require("../middleware/AppError");
async function getTranscript(videoId) {
  try {
    const res = await fetchTranscript(videoId);

    const transcript = res.reduce((a, b) => a + " " + b.text, "");

    return transcript;
  } catch (error) {
    throw new AppError("Could not fetch transcript for this video", 400);
  }
}

module.exports = getTranscript;
