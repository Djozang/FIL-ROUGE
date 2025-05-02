import React, { useState } from "react";

export default function UserChat() {
  const [messages, setMessages] = useState([
    { sender: "admin", text: "Bonjour, comment puis-je vous aider aujourd'hui ?" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = e => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
    // Simuler une réponse admin
    setTimeout(() => {
      setMessages(msgs => [
        ...msgs,
        { sender: "admin", text: "Merci pour votre message, nous vous répondrons rapidement." }
      ]);
    }, 1000);
  };

  return (
    <div className="container mx-auto py-8 px-4 flex flex-col h-[70vh]">
      <h1 className="text-2xl font-bold mb-6 text-green-700">Chat avec l’Administrateur</h1>
      <div className="flex-1 overflow-y-auto bg-white rounded shadow p-4 mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs ${
                msg.sender === "user"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          placeholder="Votre message…"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}