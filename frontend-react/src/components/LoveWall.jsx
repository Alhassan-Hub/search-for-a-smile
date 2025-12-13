import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoveWall = () => {
  // Initial messages
  const [messages, setMessages] = useState([
    { id: 1, text: "Sending love from Freetown! 💙", x: 20, y: 30 },
    { id: 2, text: "Keep up the great work in Bo!", x: 70, y: 20 },
    { id: 3, text: "Proud of you all.", x: 40, y: 60 },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // In the future: axios.post('/api/love-wall', { text: newMessage })
    
    // Visual logic:
    const x = Math.floor(Math.random() * 80) + 10;
    const y = Math.floor(Math.random() * 80) + 10;
    
    setMessages(prev => [...prev, { id: Date.now(), text: newMessage, x, y }]);
    setNewMessage("");
  };

  return (
    <section className="py-24 relative overflow-hidden min-h-[600px]">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg to-[#1a0b2e] z-0"></div>
      
      <div className="text-center relative z-20 mb-8">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
          Anonymous Love Wall
        </h2>
        <p className="text-gray-400 mt-2">Leave a positive note for the team</p>
      </div>

      {/* Floating Messages */}
      <div className="absolute inset-0 top-20 z-10 overflow-hidden pointer-events-none">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 rounded-full text-white shadow-lg whitespace-nowrap"
              style={{ left: `${msg.x}%`, top: `${msg.y}%` }}
            >
              {msg.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="absolute bottom-12 left-0 w-full z-30 px-6">
        <form onSubmit={handleSend} className="max-w-md mx-auto relative">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            maxLength={50}
            placeholder="Type a short message..."
            className="w-full bg-black/60 backdrop-blur-xl border border-purple-500/50 rounded-full py-4 pl-6 pr-14 text-white focus:outline-none focus:border-neon-pink transition-colors"
          />
          <button type="submit" className="absolute right-2 top-2 bg-purple-600 p-2.5 rounded-full hover:bg-purple-500">
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default LoveWall;