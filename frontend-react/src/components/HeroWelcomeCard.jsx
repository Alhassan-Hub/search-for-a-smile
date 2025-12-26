import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, AlertCircle } from 'lucide-react';

const HeroWelcomeCard = () => {
  const [showGuide, setShowGuide] = useState(false);
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
    <div className="flex flex-col gap-4 items-center w-full px-4">
      {/* THE MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative mx-auto w-full max-w-4xl rounded-3xl overflow-hidden bg-gradient-to-br from-card-bg to-transparent border border-neon-blue/20 p-12 md:p-16 min-h-[350px] flex flex-col items-center justify-center shadow-[0_0_40px_rgba(0,243,255,0.15)]"
      >
        {/* Background Logo Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] overflow-hidden pointer-events-none">
          <img src="/images/logo.png" alt="Logo" className="w-[400px] h-[400px] object-contain filter blur-sm" />
        </div>

        {/* Big Bold Animated Text */}
        <div className="relative z-10 text-center w-full mt-4">
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

          {/* Progress Dots */}
          <div className="flex justify-center gap-1.5 mt-10">
            {motivationalTexts.map((_, index) => (
              <div key={index} className={`h-1.5 rounded-full transition-all duration-300 ${index === currentTextIndex ? 'w-6 bg-neon-blue' : 'w-1.5 bg-slate-600'}`} />
            ))}
          </div>
        </div>

        {/* Decorative Glow Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-blue/5 rounded-full blur-3xl"></div>
      </motion.div>

      {/* THE GUIDE SECTION + IPHONE LINK */}
      <div className="w-full max-w-xl flex flex-col items-center mb-10">
        
        {/* Help Button */}
        <button 
          onClick={() => setShowGuide(!showGuide)}
          className="flex items-center gap-2 text-slate-500 hover:text-green-400 transition-colors text-[11px] font-bold py-2 px-4 rounded-full border border-white/5 hover:bg-white/5 tracking-wider"
        >
          <AlertCircle size={14} />
          {showGuide ? 'CLOSE INSTALLATION GUIDE' : 'FIRST TIME INSTALLING THE APP? CLICK HERE'}
        </button>

        {/* IPHONE USERS LINK */}
        <div className="mt-4 text-center">
            <p className="text-[10px] text-slate-600 uppercase tracking-widest mb-1">Using an iPhone or iPad?</p>
            <a 
              href="https://sfas-quran-pwa.vercel.app/"
              target="_blank" 
              rel="noreferrer"
              className="text-xs text-neon-blue hover:text-neon-purple underline underline-offset-4 transition-colors font-bold"
            >
              Open the SFAS Quran Web Version →
            </a>
        </div>

        {/* The Guide Content */}
        {showGuide && (
          <div className="w-full mt-5 p-6 bg-[#1a1a2e] border border-green-500/20 rounded-2xl text-center md:text-left flex flex-col md:flex-row items-center gap-5 shadow-2xl">
              <div className="hidden md:block text-green-400 bg-green-400/10 p-3 rounded-full">
                  <Download size={24} />
              </div>
              <div>
                  <h4 className="text-white font-bold text-sm">Android Installation Steps</h4>
                  <p className="text-slate-400 text-[12px] leading-relaxed mt-2">
                      1. Click the <b className="text-green-400">Green Button</b> at the top of the page. <br />
                      2. If your browser warns you, click <b>"Download anyway"</b>. <br />
                      3. Open the file and click <b>"Install Anyway"</b> on the Google popup.
                  </p>
                  {/* Small iPhone tip inside the guide */}
                  <p className="text-slate-500 text-[10px] mt-4 italic border-t border-white/5 pt-2">
                      *iPhone users: Open the Web Version link above in Safari, tap the 'Share' icon, and select 'Add to Home Screen'.
                  </p>
              </div>
              <div className="md:ml-auto">
                  <span className="px-3 py-1 bg-black/40 text-gray-500 text-[10px] rounded font-mono border border-white/5">v1.0.1</span>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroWelcomeCard;