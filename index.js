import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const GEMINI_MODEL = "gemini-3.6-flash";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const SYSTEM_INSTRUCTION = `
Kamu adalah asisten AI yang ramah, sopan, dan membantu.
Jawablah dengan bahasa yang jelas dan mudah dimengerti.
Jika kamu tidak tahu jawabannya, katakan dengan jujur bahwa kamu tidak tahu.
`;

app.post("/api/chat", async (req, res) => {
  try {
    const { conversation } = req.body;

    if (!Array.isArray(conversation)) {
      return res.status(400).json({ error: "conversation harus berupa array" });
    }

    const contents = conversation.map((msg) => ({
      role: msg.role === "model" ? "model" : "user",
      parts: [{ text: msg.text }],
    }));

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents,
      config: {
        temperature: 0.7, 
        topP: 0.9, 
        topK: 40,
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    return res.json({ result: response.text });
  } catch (error) {
    console.error("Gemini API error:", error);
    return res.status(500).json({
      error: "Gagal menghasilkan respons dari Gemini AI",
      detail: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
