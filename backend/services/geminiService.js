const AppError = require("../middleware/AppError");

const { GoogleGenAI } = require("@google/genai");

async function generateSummary(transcript, summaryType) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const prompt = `You are a helpful assistant. Analyze this video transcript and respond with ONLY a valid JSON object, no markdown, no backticks, just raw JSON:
{
  "title": "a short catchy title for this video (max 8 words)",
  "summary": "the actual summary here"
}

Summary type: ${summaryType}
${
  summaryType === "short"
    ? "Summarise in 3-4 sentences."
    : summaryType === "detailed"
      ? "Provide a detailed summary covering all key points."
      : "Generate 5 question-answer pairs."
}

Transcript: ${transcript}`;

    const interaction = await ai.interactions.create({
      model: "gemini-3.1-flash-lite",
      input: prompt,
    });

    const raw = interaction.output_text;
    const parsed = JSON.parse(raw);
    return { title: parsed.title, summary: parsed.summary };
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Failed to generate summary", 500);
  }
}

module.exports = generateSummary;
