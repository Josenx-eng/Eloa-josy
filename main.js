import express from "express";
import cors from "cors";
import "dotenv/config";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Render, Railway e outros usam process.env.PORT automaticamente.
// Se local, usa 3000.
const PORT = process.env.PORT || 3000;

app.post("/mensagem", async (req, res) => {
  try {
    const { mensagem } = req.body;

    const resposta = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: mensagem }
      ],
    });

    res.json({
      resposta: resposta.choices[0].message.content
    });

  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ erro: "Erro ao processar a mensagem." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
