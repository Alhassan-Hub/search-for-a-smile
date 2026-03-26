import React from 'react';
import { motion } from 'framer-motion';
import { impactVideos } from '../data/organizationData';

const ImpactReplay = () => {
  // Gracefully handle if there is no video data yet
  if (!impactVideos || impactVideos.length === 0) return null;
  
  const mainVideo = impactVideos[0];

  return (
    <section className="py-24 bg-[#0A192F] relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-[#2563EB] font-sans text-xs md:text-sm tracking-[0.2em] uppercase font-bold">
            Watch Our Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#FFFFFF] mt-4 mb-4">
            Impact Replay
          </h2>
          <div className="w-16 h-1 bg-[#F0F4F7]/20 mx-auto rounded-full"></div>
        </motion.div>

        {/* 
            CINEMATIC VIDEO PLAYER
            Wrapped in a sleek, borderless, rounded container with a soft glow
        */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-4xl aspect-video bg-[#050B14] rounded-3xl md:rounded-[2rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-[#FFFFFF]/10"
        >
          <video 
            className="w-full h-full object-cover"
            controls 
            playsInline
            poster={mainVideo.thumbnail}
          >
            <source src={mainVideo.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>

        {/* Video Title & Description */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-center max-w-2xl mx-auto"
        >
          <h3 className="text-2xl font-serif font-bold text-[#FFFFFF] mb-3">
            {mainVideo.title}
          </h3>
          <p className="text-[#64748B] font-sans text-base md:text-lg leading-relaxed">
            {mainVideo.description}
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default ImpactReplay;