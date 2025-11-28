import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import logowhite from '../assets/logowhite.png';

const CoachChat: React.FC = () => {
const navigate = useNavigate();
const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("AuthContext must be used inside AuthProvider");

  const { user } = authContext;

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; text: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || !user) return;

    const userMessage = input.trim();

    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://statmax-backend.onrender.com/api/coach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.reply || "Coach had no reply." },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Sorry, I couldn't connect to Coach Max." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="coachChatPage">
      <div className="newSessionHeader">
        <img src={logowhite} alt="StatMax Logo White" className="dashboardLogoWhite" />
        <h1 id="newSessionTop">Chat With Coach Max</h1>
        <button 
          className="goBackButton" 
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    <div className="chatWindow">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`${m.role === "user" ? "userMessage" : "coachMessage"}`}
          >
            {m.text}
          </div>
        ))}

        {loading && (
          <div className="coachLoading">
            Coach Max is thinking… 🏀
          </div>
        )}
      </div>

      <div className="chatInputContainer">
        <input
          className="userChatInput"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Coach Max something..."
          onKeyDown={(e) => (e.key === "Enter" ? handleSend() : null)}
        />

        <button className="chatSendButton" onClick={handleSend} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
};

export default CoachChat;
