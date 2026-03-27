const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.getInsights = async (req, res) => {
  try {
    const { message, tasks } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", // ✅ FINAL
    });

    const prompt = `
You are a smart AI assistant for a Task Manager App.

User tasks:
${tasks.map(t => `- ${t.title} (${t.status})`).join("\n")}

User question:
${message}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    res.json(response.text());

  } catch (err) {
    console.error("Gemini Error:", err.message);
    res.status(500).json("Gemini AI Error ❌");
  }
};