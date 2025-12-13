import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';

const DonationModal = ({ onClose }) => {
  // ⚠ REPLACE WITH YOUR REAL NUMBERS
  const orangeNumber = "076 183486"; 
  const afriNumber = "08X XXX XXX"; 
  const whatsappNumber = "23276439273"; // No + sign

  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent("Hello Search for a Smile! 💙 I have just sent a donation. Here is my proof:");
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60] flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-900 border border-neon-purple/30 rounded-3xl p-8 max-w-md w-full relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X /></button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-neon-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🎁</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Support Our Cause</h2>
          <p className="text-gray-400 text-sm mt-2">Support us via Orange Money or AfriMoney.</p>
        </div>

        <div className="space-y-4">
          <div className="bg-orange-500/10 border border-orange-500/50 p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center font-bold text-white">OM</div>
              <div className="text-left"><p className="text-orange-400 font-bold text-sm">Orange Money</p><p className="text-white font-mono text-lg">{orangeNumber}</p></div>
            </div>
          </div>
          <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center font-bold text-white">AM</div>
              <div className="text-left"><p className="text-red-400 font-bold text-sm">AfriMoney</p><p className="text-white font-mono text-lg">{afriNumber}</p></div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800">
          <p className="text-gray-300 text-sm mb-4">1. Send money. <br/>2. Take a screenshot.<br/>3. Send us proof on WhatsApp.</p>
          <button onClick={handleWhatsAppRedirect} className="w-full py-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2">
            <Check size={20} /> I Have Sent the Money
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DonationModal;