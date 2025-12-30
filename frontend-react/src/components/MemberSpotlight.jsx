import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { client, urlFor } from '../lib/sanity'; 
import { teamMembers as localMembers } from '../data/organizationData'; 

const MemberSpotlight = () => {
  // Start with local members as the default state
  const [members, setMembers] = useState(localMembers);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    client.fetch('*[_type == "spotlight"]').then((sanityData) => {
      if (sanityData && sanityData.length > 0) {
        
        // 1. Create a "Map" of Sanity data for quick lookups by name
        const sanityMap = {};
        sanityData.forEach(item => {
          const nameKey = (item.memberName || item.name || "").toLowerCase().trim();
          sanityMap[nameKey] = item;
        });

        // 2. Map through localMembers and SWAP only if a match exists in Sanity
        const orderedMembers = localMembers.map((local) => {
          const localNameKey = (local.name || "").toLowerCase().trim();
          
          if (sanityMap[localNameKey]) {
            // Found a match! Use the Sanity version to replace the local one
            return sanityMap[localNameKey];
          }
          
          // No match in Sanity? Keep the local member in this position
          return local;
        });

        // 3. Update the state with the perfectly ordered list
        setMembers(orderedMembers);
      }
    });
  }, []);

  useEffect(() => {
    if (members.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % members.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [members]);

  if (!members || members.length === 0) return null;

  const currentMember = members[currentIndex];

  return (
    <section className="py-20 relative overflow-hidden border-b border-gray-800 bg-dark-bg">
      <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple/10 rounded-full blur-[100px] -z-10"></div>
      
      <div className="container mx-auto px-6 max-w-6xl">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentMember._id || currentMember.id || currentIndex} 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-col md:flex-row items-center gap-12"
          >
            {/* PHOTO SIDE */}
            <div className="w-full md:w-1/3">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-neon-blue/30 shadow-neon-blue group">
                <img 
                  // Checks for Sanity image first, falls back to local image
                  src={currentMember.memberImage ? urlFor(currentMember.memberImage).width(600).url() : currentMember.image} 
                  alt={currentMember.memberName || currentMember.name} 
                  className="w-full h-full object-cover transition-transform duration-700 scale-105"
                  onError={(e) => {e.target.src = "https://via.placeholder.com/400x600?text=Member+Photo"}}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              </div>
            </div>

            {/* TEXT SIDE */}
            <div className="w-full md:w-2/3">
              <motion.h3 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {currentMember.memberName || currentMember.name}
              </motion.h3>
              
              <motion.p className="text-neon-blue text-xl font-medium mb-8">
                {currentMember.memberRole || currentMember.role}
              </motion.p>
              
              <motion.div className="relative bg-gray-900/40 p-8 rounded-2xl border border-gray-800 backdrop-blur-sm">
                <span className="absolute -top-4 -left-2 text-6xl text-neon-purple/20 font-serif">"</span>
                <p className="text-2xl text-gray-300 italic leading-relaxed relative z-10 font-light">
                  {currentMember.memberQuote || currentMember.quote}
                </p>
              </motion.div>

              {/* Progress Dots */}
              <div className="flex gap-2 mt-8 flex-wrap">
                {members.map((_, index) => (
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