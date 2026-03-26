import React from 'react';
import { motion } from 'framer-motion';

const OurJourney = () => {
  const milestones = [
    { date: 'Mar 2024', title: 'First Charity Event', description: 'Ramadan provisions distribution for vulnerable families.' },
    { date: 'Jun 2024', title: 'Community Formed', description: 'Our first official gathering, building a foundation of genuine connection.' },
    { date: 'Jul 2024', title: 'Orphanage Support', description: 'Delivering essential supplies and love to children in need.' },
    { date: 'Feb 2025', title: 'Masjid Support', description: 'Providing vital resources (kettles and buckets) to 3 local masjids.' },
    { date: 'Mar 2025', title: 'Nature & Bonding', description: 'Our first hiking adventure to strengthen our team spirit.' },
    { date: 'Dec 2025', title: 'Year-End Celebration', description: 'Celebrating our growth and planning the future of our impact.' },
  ];

  return (
    <section className="py-24 bg-[#FFFFFF] border-b border-[#E0F2FE]">
      <div className="container mx-auto px-6 max-w-4xl">
        
        <div className="text-center mb-24">
          <span className="text-[#0284C7] font-sans text-sm tracking-[0.2em] uppercase font-bold">History</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0A192F] mt-4">Our Journey</h2>
        </div>

        <div className="flex flex-col gap-12 md:gap-16">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12"
            >
              {/* INNOVATION: The Date acts as the visual art instead of a childish icon */}
              <div className="w-full md:w-1/3 flex md:justify-end">
                <div className="text-[#0A192F] font-serif text-3xl md:text-4xl font-bold border-l-4 border-[#0284C7] pl-6 md:border-l-0 md:border-r-4 md:pl-0 md:pr-6 transition-all duration-300 group-hover:text-[#0284C7]">
                  {milestone.date}
                </div>
              </div>

              {/* Connecting Dot (Only visible on desktop for a clean look) */}
              <div className="hidden md:flex absolute left-[33.33%] transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#0284C7] ring-4 ring-[#E0F2FE] z-10"></div>

              {/* The Content Card */}
              <div className="w-full md:w-2/3">
                <div className="bg-[#F0F9FF] p-8 rounded-2xl border border-[#E0F2FE] shadow-sm hover:shadow-md transition-all duration-300">
                  <h3 className="text-2xl font-serif font-bold text-[#0A192F] mb-2">{milestone.title}</h3>
                  <p className="text-[#64748B] font-sans text-base leading-relaxed">{milestone.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default OurJourney;