import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userRepo from '../repositories/userRepository.js';

export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: 'Заполните все поля' });

  try {
    const exists = await userRepo.findByUsername(username);
    if (exists.rows.length > 0)
      return res.status(400).json({ error: 'Пользователь уже существует' });

    const hashed = await bcrypt.hash(password, 10);
    const result = await userRepo.createUser(username, hashed);

    res.status(201).json({ message: 'Юзер добавлен!', user: result.rows[0] });
  } catch (err) {
    console.error('Ошибка регистрации:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: 'Заполните все поля' });

  try {
    const result = await userRepo.findByUsername(username);
    if (result.rows.length === 0)
      return res.status(400).json({ error: 'Неверный логин или пароль' });

    const user = result.rows[0];
    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect)
      return res.status(400).json({ error: 'Неверный логин или пароль' });

    const secret = process.env.JWT_SECRET || 'fallback_secret_key';
    const token = jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: '24h' });

    res.json({ message: 'Есть в базе!', token, user: { id: user.id, username: user.username } });
  } catch (err) {
    console.error('Ошибка логина:', err);
    res.status(500).json({ error: 'Ошибка БД' });
  }
};
