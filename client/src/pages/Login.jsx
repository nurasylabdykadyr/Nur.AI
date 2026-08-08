import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://nur-ai-m1zm.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.user.username);
        navigate("/");
      } else {
        setError(data.error || "Неверный логин или пароль!");
      }
    } catch (err) {
      setError("Ошибка подключения к серверу");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-form">
        <h2 className="auth-title">Вход в систему</h2>

        {error && (
          <div
            className="auth-error"
            style={{ color: "red", marginBottom: "10px" }}
          >
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Логин"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="auth-input"
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
          required
        />

        <button type="submit" className="auth-button">
          Войти
        </button>

        <p style={{ marginTop: "15px", textAlign: "center", color: "#888" }}>
          Нет аккаунта?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{ color: "#007bff", cursor: "pointer" }}
          >
            Зарегистрироваться
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
