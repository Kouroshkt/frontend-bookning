import React, { useState } from "react";
import axios from "axios";

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setResponse("");
    try {
      const res = await axios.post("http://localhost:8080/ai/chat", {
        message: message,
      });
      setResponse(res.data);
    } catch (err) {
      console.error(err);
      setResponse("❌ Fel vid kommunikation med servern.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={styles.container}>
      {isOpen ? (
        <div style={styles.chatBox}>
          <div style={styles.header}>
            <span>🤖 AI-Chat</span>
            <button style={styles.closeBtn} onClick={() => setIsOpen(false)}>×</button>
          </div>
          <div style={styles.body}>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Skriv meddelande..."
              style={styles.textarea}
            />
            <button onClick={sendMessage} style={styles.sendBtn} disabled={loading}>
              Skicka
            </button>
            {loading && <p>⏳ Väntar på svar...</p>}
            {response && (
              <div style={styles.response}>
                <strong>Svar:</strong>
                <p style={{ whiteSpace: "pre-line" }}>{response}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <button style={styles.floatingBtn} onClick={() => setIsOpen(true)}>
          💬
        </button>
      )}
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    bottom: 20,
    right: 20,
    zIndex: 1000,
  },
  floatingBtn: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: 60,
    height: 60,
    fontSize: 24,
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  },
  chatBox: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 8,
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeBtn: {
    background: "transparent",
    border: "none",
    color: "#fff",
    fontSize: 20,
    cursor: "pointer",
  },
  body: {
    padding: 10,
  },
  textarea: {
    width: "100%",
    resize: "none",
    padding: 8,
    borderRadius: 4,
    fontSize: 14,
    marginBottom: 8,
  },
  sendBtn: {
    width: "100%",
    padding: 10,
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
  response: {
    marginTop: 10,
    backgroundColor: "#f3f3f3",
    padding: 8,
    borderRadius: 4,
  },
};
