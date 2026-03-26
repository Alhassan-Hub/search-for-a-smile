import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { client, urlFor } from '../lib/sanity'; 
import { teamMembers as localMembers } from '../data/organizationData'; 

const MemberSpotlight = () => {
  const [members, setMembers] = useState(localMembers);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.fetch('*[_type == "spotlight"]').then((sanityData) => {
      if (sanityData && sanityData.length > 0) {
        const sanityMap = {};
        const usedSanityIds = new Set();
        
        sanityData.forEach(item => {
          const nameKey = (item.memberName || item.name || "").toLowerCase().trim();
          sanityMap[nameKey] = item;
        });

        const swappedMembers = localMembers.map((local) => {
          const localNameKey = (local.name || "").toLowerCase().trim();
          if (sanityMap[localNameKey]) {
            const matchedItem = sanityMap[localNameKey];
            usedSanityIds.add(matchedItem._id); 
            return matchedItem;
          }
          return local;
        });

        const newMembers = sanityData.filter(item => !usedSanityIds.has(item._id));
        setMembers([...swappedMembers, ...newMembers]);
      }
      setLoading(false);
    }).catch(err => {
      console.error("Sanity fetch failed:", err);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (members.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % members.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [members]);

  if (loading) {
    return (
      <div className="py-24 bg-[#FFFFFF] flex justify-center items-center">
        <div className="animate-pulse text-[#0A192F] font-serif text-xl">Loading Team...</div>
      </div>
    );
  }

  const currentMember = members[currentIndex];

  return (
    <section className="py-24 bg-[#FFFFFF] overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#64748B] font-sans text-xs md:text-sm tracking-[0.2em] uppercase font-semibold">
            Our People
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0A192F] mt-4">
            Member Spotlight
          </h2>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={currentMember._id || currentMember.id || currentIndex} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col md:flex-row items-center gap-12 lg:gap-20"
          >
            {/* Image Side */}
            <div className="w-full md:w-2/5 flex justify-center">
              <div className="w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(10,25,47,0.15)] bg-[#F0F4F7]">
                <img 
                  src={currentMember.memberImage ? urlFor(currentMember.memberImage).width(600).url() : currentMember.image} 
                  alt={currentMember.memberName || currentMember.name} 
                  className="w-full h-full object-cover grayscale-[20%]"
                  onError={(e) => {e.target.src = "https://placehold.co/400x500/F0F4F7/0A192F?text=Photo+Here"}}
                />
              </div>
            </div>

            {/* Text Side */}
            <div className="w-full md:w-3/5 text-center md:text-left">
              <h3 className="text-3xl md:text-5xl font-serif font-bold text-[#0A192F] mb-3">
                {currentMember.memberName || currentMember.name}
              </h3>
              
              {/* Here is our new Ocean Blue Accent! */}
              <p className="text-[#2563EB] font-sans text-sm md:text-base font-bold tracking-widest uppercase mb-8">
                {currentMember.memberRole || currentMember.role}
              </p>
              
              <div className="relative">
                <span className="absolute -top-10 -left-6 text-6xl text-[#F0F4F7] font-serif select-none pointer-events-none">"</span>
                <p className="text-xl md:text-2xl text-[#64748B] font-serif italic leading-relaxed relative z-10">
                  {currentMember.memberQuote || currentMember.quote}
                </p>
              </div>

              {/* Progress Dots */}
              <div className="flex gap-3 mt-10 justify-center md:justify-start">
                {members.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      index === currentIndex ? "w-10 bg-[#0A192F]" : "w-2 bg-[#E2E8F0] hover:bg-[#64748B]"
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