import express from "express";
import model from "../../models/huggingface.js";
import { searchDocuments } from "../../retriever/qdrant.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { query } = req.body;

  try {
    // Eng mos javoblarni topish
    const relevantDocs = await searchDocuments(query, 2);
    const context = relevantDocs.join("\n");

    // Modelga savol yuborish
    const messages = [
      { role: "system", content: "Siz foydalanuvchilarga ilmiy ma'lumotlar beruvchi chatbot hisoblanasiz." },
      { role: "user", content: `Savol: ${query}\nKontext: ${context}` }
    ];

    const response = await model.invoke(messages);
    res.json({ response: response.content });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
