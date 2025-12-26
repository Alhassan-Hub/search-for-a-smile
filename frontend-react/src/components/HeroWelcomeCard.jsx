import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

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
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative mx-auto w-full max-w-4xl rounded-3xl overflow-hidden bg-gradient-to-br from-card-bg to-transparent border border-neon-blue/20 shadow-[0_0_40px_rgba(0,243,255,0.15)]"
      >
        {/* Background Logo Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] overflow-hidden pointer-events-none">
          <img src="/images/logo.png" alt="Logo" className="w-[400px] h-[400px] object-contain filter blur-sm" />
        </div>

        {/* Subtle Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-neon-blue/20 via-transparent to-transparent rounded-full blur-3xl"></div>
        </div>

        {/* Content Container with better spacing */}
        <div className="relative z-10 px-8 md:px-12 py-12 md:py-16 flex flex-col items-center gap-12">
          
          {/* TOP SECTION: Message Zone - Text + Dots grouped tightly */}
          <div className="text-center w-full space-y-5">
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

            {/* Progress Dots - Much closer to text */}
            <div className="flex justify-center gap-1.5">
              {motivationalTexts.map((_, index) => (
                <div 
                  key={index} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentTextIndex 
                      ? 'w-6 bg-neon-blue shadow-[0_0_8px_rgba(0,243,255,0.6)]' 
                      : 'w-1.5 bg-slate-600'
                  }`} 
                />
              ))}
            </div>
          </div>

          {/* BOTTOM SECTION: Action Zone - Button + Label grouped tightly */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.8 }} 
            className="flex flex-col items-center gap-2"
          >
            <a 
              href="/sfas-quran.apk" 
              download
              className="inline-flex items-center gap-2.5 px-7 py-3 border-2 border-green-500/60 text-green-400 rounded-full font-semibold text-sm hover:bg-green-500 hover:text-black transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]"
            >
              <Download size={16} />
              DOWNLOAD QURAN APP
            </a>
            
            {/* Version label tight to button */}
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">
              Android Release v1.0.1
            </p>
          </motion.div>
        </div>

        {/* Decorative Glow Effects - repositioned */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-neon-purple/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-neon-blue/5 rounded-full blur-3xl"></div>
      </motion.div>

      {/* ACCORDION GUIDE BELOW CARD */}
      <div className="w-full max-w-xl flex flex-col items-center mb-10">
        <button 
          onClick={() => setShowGuide(!showGuide)}
          className="flex items-center gap-2 text-slate-500 hover:text-neon-blue transition-colors text-xs font-medium py-2"
        >
          <AlertCircle size={14} />
          First time installing? Click for guide
          {showGuide ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        <AnimatePresence>
          {showGuide && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden w-full"
            >
              <div className="mt-2 p-5 bg-white/5 border border-white/10 rounded-2xl text-center md:text-left flex flex-col md:flex-row items-center gap-4">
                <div className="hidden md:block text-neon-blue bg-neon-blue/10 p-3 rounded-full">
                  <AlertCircle size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">How to install the APK</h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed mt-1">
                    1. Click <b>"Download anyway"</b> if browser warns you. <br />
                    2. Open file & click <b>"Install Anyway"</b> on the Play Protect popup.
                  </p>
                </div>
                <div className="md:ml-auto">
                  <span className="px-2 py-0.5 bg-gray-800 text-gray-500 text-[9px] rounded font-mono">46MB</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HeroWelcomeCard;