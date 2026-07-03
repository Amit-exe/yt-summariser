const AppError = require("../middleware/AppError");

const { GoogleGenAI } = require("@google/genai");

async function generateSummary(transcript, summaryType) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const summaryInstructions = {
      short: `"summary": "Summarise this video transcript in exactly 3-4 clear sentences covering the main topic"`,
      detailed: `"summary": "Provide a comprehensive detailed summary covering ALL key points, sections, algorithms, examples, and conclusions mentioned in the transcript. Use markdown with headers and bullet points for structure."`,
      qna: `"summary": "Generate exactly 5 question-answer pairs based on the transcript. Format as:\\n**Q1: [question]**\\nA: [answer]\\n\\n**Q2: [question]**\\nA: [answer]\\n(and so on for Q3, Q4, Q5)"`,
    };

    const prompt = `You are a helpful assistant. Analyze this video transcript and respond with ONLY a valid JSON object, no markdown, no backticks, just raw JSON:
              {
                "title": "a short catchy title for this video (max 8 words)",
                ${summaryInstructions[summaryType]}
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
