const AppError = require("../middleware/AppError");
const { Supadata } = require("@supadata/js");
const supadata = new Supadata({
  apiKey: process.env.SUPADATA_API_KEY,
});

async function getTranscript(videoUrl) {
  try {
    const transcriptResult = await supadata.transcript({
      url: videoUrl,
      lang: "en",
      text: true,
      mode: "auto", // 'native', 'auto', or 'generate'
    });

    // console.log(transcriptResult);

    // const transcript = transcriptResult.content.reduce(
    //   (a, b) => a + " " + b.text,
    //   "",
    // );

    // console.log(transcript);

    return transcriptResult.content;
  } catch (error) {
    throw new AppError("Could not fetch transcript for this video", 400);
  }
}

module.exports = getTranscript;
