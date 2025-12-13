import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { teamMembers } from '../data/organizationData'; // Imports your specific data

const MemberSpotlight = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cycle through members every 5 seconds
  useEffect(() => {
    // Safety check: ensure we have members
    if (teamMembers.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
    }, 5000);

    // Cleanup the timer when the component unmounts
    return () => clearInterval(timer);
  }, []);

  // If no data exists yet, return nothing
  if (!teamMembers || teamMembers.length === 0) return null;

  const currentMember = teamMembers[currentIndex];

  return (
    <section className="py-20 relative overflow-hidden border-b border-gray-800 bg-dark-bg">
      
      {/* Background Glow Effect */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple/10 rounded-full blur-[100px] -z-10"></div>
      
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* AnimatePresence allows the 'exit' animation to play before the new one comes in */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentMember.id} // Important: Key changes trigger the animation
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-col md:flex-row items-center gap-12"
          >
            
            {/* 1. Photo Side */}
            <div className="w-full md:w-1/3">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-neon-blue/30 shadow-neon-blue group">
                <img 
                  src={currentMember.image} 
                  alt={currentMember.name} 
                  className="w-full h-full object-cover transition-transform duration-700 scale-105"
                  // Fallback in case image path is wrong
                  onError={(e) => {e.target.src = "https://via.placeholder.com/400x600?text=Member+Photo"}}
                />
                
                {/* Badge */}
                <div className="absolute bottom-6 left-6 z-30">
                  <span className="px-3 py-1 bg-neon-blue text-black text-xs font-bold rounded-full mb-2 inline-block shadow-lg">
                    MEMBER SPOTLIGHT
                  </span>
                </div>

                {/* Dark Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              </div>
            </div>

            {/* 2. Text Side */}
            <div className="w-full md:w-2/3">
              <motion.h3 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold text-white mb-2"
              >
                {currentMember.name}
              </motion.h3>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-neon-blue text-xl font-medium mb-8"
              >
                {currentMember.role}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="relative bg-gray-900/40 p-8 rounded-2xl border border-gray-800 backdrop-blur-sm"
              >
                <span className="absolute -top-4 -left-2 text-6xl text-neon-purple/20 font-serif">"</span>
                <p className="text-2xl text-gray-300 italic leading-relaxed relative z-10 font-light">
                  {currentMember.quote}
                </p>
              </motion.div>

              {/* Progress Indicators (Dots) */}
              <div className="flex gap-2 mt-8">
                {teamMembers.map((_, index) => (
                  <div 
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentIndex ? "w-8 bg-neon-blue" : "w-2 bg-gray-700"
                    }`}
                  />
                ))}
              </div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MemberSpotlight;