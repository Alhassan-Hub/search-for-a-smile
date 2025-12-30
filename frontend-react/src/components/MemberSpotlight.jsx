import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { client, urlFor } from '../lib/sanity'; 
import { teamMembers as localMembers } from '../data/organizationData'; 

const MemberSpotlight = () => {
  const [members, setMembers] = useState(localMembers);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true); // Added to prevent the "jump"

  useEffect(() => {
    client.fetch('*[_type == "spotlight"]').then((sanityData) => {
      if (sanityData && sanityData.length > 0) {
        
        // 1. Create the lookup map and a way to track who we've used
        const sanityMap = {};
        const usedSanityIds = new Set();
        
        sanityData.forEach(item => {
          const nameKey = (item.memberName || item.name || "").toLowerCase().trim();
          sanityMap[nameKey] = item;
        });

        // 2. Map through localMembers and SWAP if a match exists
        const swappedMembers = localMembers.map((local) => {
          const localNameKey = (local.name || "").toLowerCase().trim();
          
          if (sanityMap[localNameKey]) {
            const matchedItem = sanityMap[localNameKey];
            usedSanityIds.add(matchedItem._id); 
            return matchedItem;
          }
          return local;
        });

        // 3. Find Sanity members that were NOT used in the swap (The New People)
        const newMembers = sanityData.filter(item => !usedSanityIds.has(item._id));

        // 4. Combine: [Existing (some swapped)] + [Brand New Members]
        setMembers([...swappedMembers, ...newMembers]);
      }
      setLoading(false); // Data is ready
    }).catch(err => {
      console.error("Sanity fetch failed:", err);
      setLoading(false); // Show local data even if Sanity fails
    });
  }, []);

  useEffect(() => {
    if (members.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % members.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [members]);

  // Optionally show a simple placeholder while fetching
  if (loading) {
    return (
      <div className="py-20 bg-dark-bg flex justify-center items-center">
        <div className="animate-pulse text-neon-blue">Syncing Team Data...</div>
      </div>
    );
  }

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
            <div className="w-full md:w-1/3">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-neon-blue/30 shadow-neon-blue">
                <img 
                  src={currentMember.memberImage ? urlFor(currentMember.memberImage).width(600).url() : currentMember.image} 
                  alt={currentMember.memberName || currentMember.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {e.target.src = "https://via.placeholder.com/400x600?text=Member+Photo"}}
                />
              </div>
            </div>

            <div className="w-full md:w-2/3">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {currentMember.memberName || currentMember.name}
              </h3>
              <p className="text-neon-blue text-xl font-medium mb-8">
                {currentMember.memberRole || currentMember.role}
              </p>
              <div className="relative bg-gray-900/40 p-8 rounded-2xl border border-gray-800">
                <p className="text-2xl text-gray-300 italic leading-relaxed font-light">
                  {currentMember.memberQuote || currentMember.quote}
                </p>
              </div>

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