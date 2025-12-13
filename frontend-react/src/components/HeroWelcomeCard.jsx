import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HeroWelcomeCard = () => {
  const motivationalTexts = [
    "Search for a Smile isn't just a charity organization…",
    "…it's a home for youth who need genuine friends, support, and real love.",
    "…we exist to give young people a place to belong.",
    "…because when you feel you belong, you don't need to join the wrong crowd.",
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
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative mx-auto max-w-4xl mb-16 rounded-3xl overflow-hidden bg-gradient-to-br from-card-bg to-transparent border border-neon-blue/30 p-12 md:p-16 min-h-[350px] flex items-center justify-center"
      style={{
        boxShadow: '0 0 40px rgba(0, 243, 255, 0.15)',
      }}
    >
      {/* Background Logo Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] overflow-hidden">
        <img 
          src="/images/logo.png" 
          alt="Search for a Smile Logo" 
          className="w-[400px] h-[400px] object-contain filter blur-sm"
          style={{
            WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 100%)',
            maskImage: 'radial-gradient(circle, black 50%, transparent 100%)'
          }}
        />
      </div>

      {/* Animated Text */}
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

        {/* Progress Dots - More Subtle */}
        <div className="flex justify-center gap-1.5 mt-8">
          {motivationalTexts.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentTextIndex 
                  ? 'w-6 bg-neon-blue' 
                  : 'w-1.5 bg-slate-600'
              }`}
            />
          ))}
        </div>

        {/* Subtitle - Improved Typography */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-base text-slate-300 font-medium tracking-wide"
        >
          23 Members Strong • Sierra Leone • Building Community Since 2023
        </motion.p>
      </div>

      {/* Decorative Glow Effects - Reduced Intensity */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-blue/5 rounded-full blur-3xl"></div>
    </motion.div>
  );
};

export default HeroWelcomeCard;