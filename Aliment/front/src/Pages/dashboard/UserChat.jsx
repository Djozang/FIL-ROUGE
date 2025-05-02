import { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function UserChat() {

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const { user } = useAuth();

  // Charger les messages au démarrage
  useEffect(() => {
    const storedMessages = localStorage.getItem('chat_messages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    } else {
      const defaultMessages = [
        {
          id: '1',
          sender: 'admin',
          content: 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?',
          timestamp: new Date(Date.now() - 3600000).toISOString()
        }
      ];
      setMessages(defaultMessages);
      localStorage.setItem('chat_messages', JSON.stringify(defaultMessages));
    }
  }, []);

  // Sauvegarder les messages lorsqu'ils changent
  useEffect(() => {
    localStorage.setItem('chat_messages', JSON.stringify(messages));
  }, [messages]);

  // Faire défiler vers le bas lorsque de nouveaux messages sont ajoutés
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Envoyer un message
  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now().toString(),
      sender: 'user',
      content: newMessage,
      timestamp: new Date().toISOString()
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Simuler une réponse de l'administrateur
    setTimeout(() => {
      const adminResponses = [
        "Merci pour votre message. Un nutritionniste va vous répondre dans les plus brefs délais.",
        "Avez-vous consulté les recommandations dans votre tableau de bord ?",
        "Consultez notre section de conseils sur le diabète.",
        "Pour le diabète, il est important de surveiller votre consommation de glucides.",
        "Je vais transmettre votre question à notre équipe médicale."
      ];
      const randomResponse = adminResponses[Math.floor(Math.random() * adminResponses.length)];
      const adminMessage = {
        id: Date.now().toString(),
        sender: 'admin',
        content: randomResponse,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, adminMessage]);
    }, 1000);
  };

  // Formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="container mx-auto py-8 px-4 flex flex-col h-[70vh]">
      <h1 className="text-2xl font-bold mb-6 text-green-700">Chat avec l'Administrateur</h1>
      <div className="flex-1 overflow-y-auto bg-white rounded shadow p-4 mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs ${
                msg.sender === "user"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {msg.content}
              <div className="text-xs text-gray-400 mt-1 text-right">
                {formatDate(msg.timestamp)}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form
        onSubmit={e => {
          e.preventDefault();
          sendMessage();
        }}
        className="flex gap-2"
      >
        <input
          className="flex-1 border rounded px-3 py-2"
          placeholder="Votre message…"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
