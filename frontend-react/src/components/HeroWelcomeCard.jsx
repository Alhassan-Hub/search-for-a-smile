import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, AlertCircle } from 'lucide-react';

const HeroWelcomeCard = () => {
  const motivationalTexts = [
    "Search for a Smile isn't just a charity organization…",
    "…experience SFAS Quran: Developed by Allan.",
    "…it's a home for youth who need support and real love.",
    "…together, we're building a family that cares."
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % motivationalTexts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-6 items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative mx-auto max-w-4xl rounded-3xl overflow-hidden bg-gradient-to-br from-card-bg to-transparent border border-neon-blue/30 p-12 md:p-16 min-h-[350px] flex items-center justify-center"
        style={{ boxShadow: '0 0 40px rgba(0, 243, 255, 0.15)' }}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] overflow-hidden">
          <img src="/images/logo.png" alt="Logo" className="w-[400px] h-[400px] object-contain filter blur-sm" />
        </div>

        <div className="relative z-10 text-center max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentTextIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink leading-tight drop-shadow-2xl"
            >
              {motivationalTexts[currentTextIndex]}
            </motion.p>
          </AnimatePresence>

          {/* APP CTA BUTTON */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-10">
            <a 
              href="/sfas-quran.apk" 
              download
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-2xl font-black text-lg hover:bg-neon-blue hover:text-white transition-all shadow-2xl hover:scale-105 active:scale-95"
            >
              <Download size={24} />
              DOWNLOAD QURAN APP
            </a>
          </motion.div>

          <div className="flex justify-center gap-1.5 mt-8">
            {motivationalTexts.map((_, index) => (
              <div key={index} className={`h-1.5 rounded-full transition-all duration-300 ${index === currentTextIndex ? 'w-6 bg-neon-blue' : 'w-1.5 bg-slate-600'}`} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* INSTALLATION GUIDE (Simplified for users) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="max-w-4xl w-full p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col md:flex-row items-center gap-6"
      >
        <div className="text-neon-blue bg-neon-blue/10 p-4 rounded-full">
            <AlertCircle size={32} />
        </div>
        <div className="text-center md:text-left">
            <h4 className="text-white font-bold text-lg">Android Installation Guide</h4>
            <p className="text-slate-400 text-sm mt-1">
                1. Click Download & Select <b>"Download anyway"</b> <br />
                2. Open the file & Click <b>"Install Anyway"</b> on the Google Play Protect popup.
            </p>
        </div>
        <div className="ml-auto flex gap-2">
            <span className="px-3 py-1 bg-gray-800 text-gray-400 text-[10px] rounded-md font-mono">v1.0.1</span>
            <span className="px-3 py-1 bg-gray-800 text-gray-400 text-[10px] rounded-md font-mono">46MB</span>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroWelcomeCard;