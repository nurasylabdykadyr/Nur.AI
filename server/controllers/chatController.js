import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

const groq = new Groq({ apiKey: process.env.GEMINI_API_KEY || process.env.GROQ_API_KEY });

export const getChatReply = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Пустное сообщение' });
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: message }],
      model: 'llama-3.1-8b-instant',
    });

    const reply = chatCompletion.choices[0]?.message?.content || 'Нет ответа';
    res.json({ response: reply });
  } catch (error) {
    console.error('Ошибка Groq:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};
