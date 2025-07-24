import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("https://chatapp-7fth.onrender.com");
const myUser = "me"; // Replace with dynamic user identity

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => socket.off("message");
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socket.send({ text: input, sender: myUser });
      setInput("");
    }
  };

  return (
    <div>
      <div style={{ height: 300, overflowY: "scroll", border: "1px solid #ccc" }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: msg.sender === myUser ? "flex-end" : "flex-start",
              margin: "5px 0"
            }}
          >
            <div
              style={{
                background: msg.sender === myUser ? "#dcf8c6" : "#fff",
                color: "#000",
                padding: "10px 15px",
                borderRadius: "18px",
                maxWidth: "70%",
                boxShadow: "0 1px 1px rgba(0,0,0,0.1)"
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type a message…"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
