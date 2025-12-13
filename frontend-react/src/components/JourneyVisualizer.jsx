import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mapEvents } from '../data/organizationData';
import { MapPin, Radio, Target, ChevronRight } from 'lucide-react';

const JourneyVisualizer = () => {
  const [activeEvent, setActiveEvent] = useState(mapEvents[0]);

  // Coordinates for Bo (Fixed "Hub" location)
  // We use this single point for the visual target
  const boLocation = { top: "60%", left: "55%" };

  return (
    <section className="py-24 bg-[#050510] relative overflow-hidden">
      
      {/* Background Tech Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-blue/10 border border-neon-blue/30 text-neon-blue text-sm font-bold mb-4"
          >
            <Radio className="animate-pulse w-4 h-4" /> LIVE OPERATIONS MAP
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Impact <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Command Center</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Visualizing our operations in the Bo District. Select a mission to view details.
          </p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT: THE HOLOGRAPHIC MAP */}
          <div className="lg:col-span-7 relative h-[300px] md:h-[600px] bg-gray-900/40 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center group">
            
            {/* 1. The Map SVG */}
            <div className="relative w-full h-full p-8 md:p-12 opacity-80 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105">
              <svg viewBox="0 0 800 800" className="w-full h-full drop-shadow-[0_0_15px_rgba(0,243,255,0.3)]">
                <defs>
                  <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e293b" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Detailed Sierra Leone Path */}
                <path 
                  d="M 220,280 L 250,220 L 320,180 L 450,160 L 520,180 L 600,190 L 680,240 L 710,320 L 720,400 L 680,500 L 620,600 L 500,680 L 350,650 L 250,580 L 180,480 L 150,350 Z" 
                  fill="url(#mapGradient)" 
                  stroke="#00f3ff" 
                  strokeWidth="1.5"
                  filter="url(#glow)"
                  className="transition-all duration-500"
                />
                
                {/* Grid Overlay on Map */}
                <path 
                   d="M 220,280 L 720,400 M 320,180 L 500,680" 
                   stroke="rgba(0, 243, 255, 0.1)" 
                   strokeWidth="1" 
                />
              </svg>

              {/* 2. The Scanner Effect (Moving Line) */}
              <motion.div 
                className="absolute top-0 bottom-0 w-[2px] bg-neon-blue/50 shadow-[0_0_15px_#00f3ff]"
                animate={{ left: ['0%', '100%', '0%'] }}
                transition={{ duration: 10, ease: "linear", repeat: Infinity }}
                style={{ filter: 'blur(1px)' }}
              />

              {/* 3. The BO CITY Target Lock (The WOW Part) */}
              <div className="absolute" style={{ top: boLocation.top, left: boLocation.left }}>
                 {/* Rotating Rings */}
                 <div className="relative -translate-x-1/2 -translate-y-1/2">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="w-24 h-24 border border-dashed border-neon-blue/30 rounded-full absolute -top-12 -left-12"
                    />
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 border-2 border-neon-purple/50 rounded-full absolute -top-8 -left-8"
                    />
                    
                    {/* Center Core */}
                    <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_20px_white] animate-pulse"></div>
                    
                    {/* Label */}
                    <div className="absolute left-8 top-0 flex flex-col">
                      <span className="text-neon-blue text-[10px] font-mono tracking-widest bg-black/80 px-1 border-l-2 border-neon-blue">
                        TARGET: BO CITY
                      </span>
                      <span className="text-white text-xs font-bold mt-1 bg-black/50 px-1 w-fit backdrop-blur-md">
                        {activeEvent ? "EVENT LOCATED" : "SCANNING..."}
                      </span>
                    </div>
                 </div>
              </div>
            </div>

            {/* Decorative Corner UI */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-neon-blue/50"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-neon-blue/50"></div>
            <div className="absolute bottom-4 left-4 text-[10px] text-neon-blue/50 font-mono">
              COORDS: 08°00′N 11°30′W<br/>
              STATUS: ONLINE
            </div>
          </div>

          {/* RIGHT: THE MISSION LOG (List of Events) */}
          <div className="lg:col-span-5 space-y-4 h-[500px] overflow-y-auto pr-2 custom-scrollbar">
             {mapEvents.map((event) => (
               <motion.div
                 key={event.id}
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 onClick={() => setActiveEvent(event)}
                 className={`cursor-pointer group relative p-6 rounded-xl border transition-all duration-300 ${
                   activeEvent.id === event.id 
                    ? 'bg-gradient-to-r from-neon-blue/10 to-transparent border-neon-blue/50 shadow-[0_0_20px_rgba(0,243,255,0.1)]' 
                    : 'bg-gray-900/30 border-gray-800 hover:border-gray-600'
                 }`}
               >
                 {/* Active Indicator Line */}
                 {activeEvent.id === event.id && (
                   <motion.div 
                     layoutId="activeGlow"
                     className="absolute left-0 top-0 bottom-0 w-1 bg-neon-blue shadow-[0_0_10px_#00f3ff]"
                   />
                 )}

                 <div className="flex justify-between items-start mb-2">
                   <h3 className={`text-xl font-bold ${activeEvent.id === event.id ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                     {event.title}
                   </h3>
                   <div className={`p-2 rounded-full ${activeEvent.id === event.id ? 'bg-neon-blue text-black' : 'bg-gray-800 text-gray-500'}`}>
                     {activeEvent.id === event.id ? <Target size={16} /> : <MapPin size={16} />}
                   </div>
                 </div>

                 <p className="text-neon-purple text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                   {event.date} • {event.location}
                 </p>
                 
                 <p className="text-gray-400 text-sm leading-relaxed">
                   {event.description}
                 </p>

                 {/* "View" Button appearing on Hover */}
                 <div className={`mt-4 flex items-center text-neon-blue text-sm font-bold transition-all duration-300 ${activeEvent.id === event.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                   VIEWING LOCATION <ChevronRight size={14} />
                 </div>
               </motion.div>
             ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default JourneyVisualizer;