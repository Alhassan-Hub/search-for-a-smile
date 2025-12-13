import React from 'react';
import { motion } from 'framer-motion';
import { impactVideos } from '../data/organizationData';

const ImpactReplay = () => {
  const mainVideo = impactVideos[0];

  if (!mainVideo) return null;

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-32 bg-neon-purple/20 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-white mb-2">
            Impact <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-pink">Replay</span>
          </h2>
          <p className="text-gray-400">Watch our journey unfold.</p>
        </div>

        {/* 
            NATIVE VIDEO PLAYER
            - No external libraries.
            - Uses the standard browser player.
        */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative w-full max-w-2xl aspect-video bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl mx-auto"
        >
          <video 
            className="w-full h-full object-cover"
            controls 
            playsInline
            poster={mainVideo.thumbnail} // This puts your photo back as the cover!
          >
            {/* This connects to your data file */}
            <source src={mainVideo.videoUrl} type="video/mp4" />
            
            {/* Fallback message */}
            Your browser does not support the video tag.
          </video>
        </motion.div>

        {/* Video Title */}
        <div className="mt-8 text-center max-w-xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-2">{mainVideo.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{mainVideo.description}</p>
        </div>

      </div>
    </section>
  );
};

export default ImpactReplay;