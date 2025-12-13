import React from 'react';
import { motion } from 'framer-motion';

const OurJourney = () => {
  const milestones = [
    {
      date: 'March 24, 2024',
      title: 'First Charity Event',
      description: 'Ramadan provisions distribution at village',
      icon: '🎁',
      color: 'neon-blue'
    },
    {
      date: 'June 17, 2024',
      title: 'First Get-Together',
      description: 'Building our family through connection',
      icon: '🤝',
      color: 'neon-pink'
    },
    {
      date: 'July 28, 2024',
      title: 'Orphanage Donation',
      description: 'Supporting children in need',
      icon: '❤',
      color: 'neon-purple'
    },
    {
      date: 'February 2025',
      title: 'Masjid Support',
      description: 'Donated kettles and buckets to 3 masjids',
      icon: '🕌',
      color: 'neon-blue'
    },
    {
      date: 'March 31, 2025',
      title: 'First Hiking Adventure',
      description: 'Team bonding through nature',
      icon: '🥾',
      color: 'neon-pink'
    },
    {
      date: 'December 28, 2025',
      title: 'Year-End Celebration',
      description: 'Get-together to celebrate our growth',
      icon: '🎉',
      color: 'neon-purple'
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-5xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-pink">
        Our Journey
      </h2>
      <p className="text-center text-gray-400 text-lg mb-12">Every step of our story</p>

      <div className="max-w-4xl mx-auto">
        {milestones.map((milestone, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-16 pb-12 last:pb-0"
          >
            {/* Timeline Line */}
            {index !== milestones.length - 1 && (
              <div className={`absolute left-6 top-14 w-0.5 h-full bg-gradient-to-b from-${milestone.color}/50 to-transparent`}></div>
            )}

            {/* Icon Circle */}
            <div className={`absolute left-0 top-0 w-12 h-12 rounded-full bg-${milestone.color}/20 border-2 border-${milestone.color} flex items-center justify-center text-2xl shadow-${milestone.color}`}>
              {milestone.icon}
            </div>

            {/* Content */}
            <div className="bg-gradient-to-br from-card-bg to-transparent border border-gray-700 rounded-xl p-6 hover:border-neon-purple/30 transition-all hover:-translate-y-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">{milestone.title}</h3>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{milestone.date}</span>
              </div>
              <p className="text-gray-400">{milestone.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default OurJourney;