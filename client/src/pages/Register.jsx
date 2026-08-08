import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await fetch('https://nur-ai-m1zm.onrender.com/api/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess('Регистрация успешна! Перенаправление на логин...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(data.error || 'Что-то пошло не так');
      }
    } catch (err) {
      setError('Ошибка подключения к серверу');
    }
  };
  return (
    <div className="auth-container">
      <form onSubmit={handleRegister} className="auth-form">
        <h2 className="auth-title">Регистрация</h2>

        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success" style={{ color: '#4caf50', marginBottom: '15px' }}>{success}</div>}

        <input
          type="text"
          placeholder="Придумайте логин"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="auth-input"
          required
        />

        <input
          type="password"
          placeholder="Придумайте пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
          required
        />

        <button type="submit" className="auth-button">Зарегистрироваться</button>
       
        <p style={{ marginTop: '15px', textAlign: 'center', color: '#888' }}>
          Уже есть аккаунт? <span onClick={() => navigate('/login')} style={{ color: '#007bff', cursor: 'pointer' }}>Войти</span>
        </p>
      </form>
    </div>
  );
}