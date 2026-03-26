import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, AlertCircle, Smartphone, ChevronDown } from 'lucide-react';

const HeroWelcomeCard = () => {
  const [showGuide, setShowGuide] = useState(false);
  
  const motivationalTexts = [
    "Empowering struggling mothers in Sierra Leone.",
    "Providing vital education for every child.",
    "Protecting and uplifting the girl child.",
    "Building a foundation of hope, not just charity."
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % motivationalTexts.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center w-full mt-8 md:mt-16">
      
      {/* PART 1: THE SPLIT HERO */}
      <div className="w-full flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20 mb-16 px-4">
        
        {/* LEFT COLUMN: Typography */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
          
          <span className="text-[#64748B] font-sans text-xs md:text-sm tracking-[0.2em] uppercase font-semibold mb-6 block">
            Search for a Smile
          </span>

          <div className="min-h-[160px] md:min-h-[180px] flex items-center justify-center lg:justify-start">
            <AnimatePresence mode="wait">
              <motion.h2
                key={currentTextIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#0A192F] leading-[1.15]"
              >
                {motivationalTexts[currentTextIndex]}
              </motion.h2>
            </AnimatePresence>
          </div>

          <p className="text-[#64748B] font-sans text-base md:text-lg leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
            We are dedicated to supporting vulnerable families through education, empowerment, and genuine care. Join us in making a lasting impact.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <button onClick={() => document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3.5 rounded-full bg-[#0A192F] text-[#FFFFFF] font-sans text-sm font-semibold hover:bg-opacity-90 transition-all shadow-sm w-full sm:w-auto">
              Support Our Mission
            </button>
            <button onClick={() => document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3.5 rounded-full bg-[#FFFFFF] text-[#0A192F] border border-[#F0F4F7] font-sans text-sm font-semibold hover:border-[#0A192F] transition-all w-full sm:w-auto">
              Discover Our Work
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Your Logo */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <motion.img 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            src="/images/logo.png" 
            alt="Search for a Smile Logo" 
            className="w-full max-w-[350px] md:max-w-[450px] object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      {/* PART 2: THE APP GUIDE (Flat White Card) */}
      <div className="w-full max-w-3xl bg-[#FFFFFF] rounded-2xl p-6 md:p-8 flex flex-col items-center shadow-[0_4px_20px_-2px_rgba(0,0,0,0.03)] mx-4">
        
        <div className="flex items-center gap-2 mb-3">
          <Smartphone size={20} className="text-[#0A192F]" />
          <h3 className="font-serif font-bold text-lg text-[#0A192F]">SFAS Quran App</h3>
        </div>
        
        <p className="text-[#64748B] font-sans text-sm text-center mb-6 max-w-xl">
          A seamless digital Quran experience, developed by Allan. Access it anywhere, anytime.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a href="https://sfas-quran-pwa.vercel.app/" target="_blank" rel="noreferrer" className="text-sm font-semibold text-[#0A192F] bg-[#F0F4F7] hover:bg-[#E2E8F0] px-6 py-3 rounded-full transition-colors font-sans">
            Web Version (iOS) &rarr;
          </a>
          
          <button onClick={() => setShowGuide(!showGuide)} className="flex items-center gap-2 text-sm font-semibold text-[#0A192F] border border-[#F0F4F7] hover:border-[#0A192F] px-6 py-3 rounded-full transition-colors font-sans bg-[#FFFFFF]">
            <AlertCircle size={16} /> Android Install Guide
            <ChevronDown size={16} className={`transform transition-transform ${showGuide ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Dropdown Content */}
        <AnimatePresence>
          {showGuide && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }} 
              animate={{ height: 'auto', opacity: 1 }} 
              exit={{ height: 0, opacity: 0 }}
              className="w-full overflow-hidden mt-6"
            >
              <div className="p-6 bg-[#F0F4F7] rounded-xl flex flex-col md:flex-row items-center gap-6 w-full border border-[#E2E8F0]">
                  <div className="hidden md:flex items-center justify-center w-12 h-12 bg-[#FFFFFF] text-[#0A192F] rounded-full shadow-sm">
                      <Download size={20} />
                  </div>
                  <div className="flex-1 font-sans text-left">
                      <h4 className="text-[#0A192F] font-bold text-sm mb-2">Android Installation Steps</h4>
                      <ol className="text-[#64748B] text-sm space-y-1 list-decimal list-inside">
                          <li>Click the <span className="font-bold text-[#0A192F]">"Quran App"</span> button in the top menu.</li>
                          <li>If your browser warns you, click <b>"Download anyway"</b>.</li>
                          <li>Open the downloaded file and click <b>"Install Anyway"</b>.</li>
                      </ol>
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