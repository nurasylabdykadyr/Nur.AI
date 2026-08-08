import Groq from 'groq-sdk';
import 'dotenv/config';

const groq = new Groq();

export const askAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Сообщение пустое' });
    }

    const completion = await groq.chat.completions.create({
      model: 'llama3-8b-8192',
      messages: [
        { role: 'system', content: 'Ты краткий и умный ассистент на сайте 3elegant.' },
        { role: 'user', content: message }
      ],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error('Ошибка Groq:', error);
    res.status(500).json({ error: 'Ошибка сервера при запросе к ИИ' });
  }
};
