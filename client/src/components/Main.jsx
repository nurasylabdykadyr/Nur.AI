import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export function Main() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", content: input };
    const newMessages = [...messages, userMsg];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setMessages([
        ...newMessages,
        { role: "assistant", content: data.response },
      ]);
    } catch (error) {
      console.error("Ошибка сервера:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="allMain">
      <div className="chat-header">
        <div className="user-info">
          Пользователь:{" "}
          <span>{localStorage.getItem("username") || "Гость"}</span>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button onClick={toggleTheme} className="theme-toggle-btn">
            {theme === "dark" ? "Светлая" : "Темная"}
          </button>

          <button onClick={handleLogout} className="logout-btn">
            Выйти
          </button>
        </div>
      </div>

      <div className="messages-container">
        {messages.length === 0 && (
          <div className="welcome-screen">
            <h2>Hi I'm Nur.Ai, what can I help you?</h2>
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-wrapper ${msg.role === "user" ? "user-msg" : "assistant-msg"}`}
          >
            {msg.content}
          </div>
        ))}

        {loading && <div className="loading-status">Nur.Ai печатает...</div>}
        <div ref={messagesEndRef} />
      </div>

      <div className="smsForVite">
        <div className="input-wrapper">
          <input
            className="massage-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Спросите ИИ..."
          />
          <button className="send-btn" onClick={sendMessage} disabled={loading}>
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}
