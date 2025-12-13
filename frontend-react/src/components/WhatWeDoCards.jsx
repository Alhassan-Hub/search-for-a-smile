import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BecomeMemberModal from './BecomeMemberModal';

const WhatWeDoCards = () => {
  const [showMemberModal, setShowMemberModal] = useState(false);

  const pillars = [
    {
      icon: '🤝',
      title: 'Building Community',
      description: 'Monthly get-togethers, hiking adventures, and genuine friendships. A place where you truly belong.',
      color: 'neon-blue',
      features: ['Monthly Get-Togethers', 'Hiking & Adventures', 'Real Friendships', 'Safe Space']
    },
    {
      icon: '❤',
      title: 'Helping Those in Need',
      description: 'Ramadan distributions, orphanage support, masjid funding, and supporting vulnerable families.',
      color: 'neon-pink',
      features: ['Food Distributions', 'Orphanage Support', 'Masjid Funding', 'Community Aid']
    },
    {
      icon: '💪',
      title: 'Empowering the Girl Child',
      description: 'Education on protection, self-defense, and empowerment. Creating safe spaces for young girls.',
      color: 'neon-purple',
      features: ['Safety Education', 'Empowerment Workshops', 'Safe Spaces', 'Building Confidence']
    },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-5xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-pink">
          What We Do
        </h2>
        <p className="text-center text-gray-400 text-lg mb-12">Our three pillars of impact</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-gradient-to-br from-card-bg to-transparent border border-${pillar.color}/30 rounded-2xl p-8 hover:shadow-${pillar.color} transition-all duration-300 hover:-translate-y-2`}
            >
              <div className={`text-${pillar.color} text-6xl mb-6`}>{pillar.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{pillar.title}</h3>
              <p className="text-gray-400 mb-6">{pillar.description}</p>
              
              <ul className="space-y-2">
                {pillar.features.map((feature, i) => (
                  <li key={i} className="text-gray-300 text-sm flex items-center gap-2">
                    <span className={`text-${pillar.color}`}>✓</span> {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Join Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => setShowMemberModal(true)}
            className="px-10 py-4 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-neon-blue"
          >
            Join Our Family
          </button>
        </motion.div>
      </motion.div>

      {/* Member Registration Modal */}
      <AnimatePresence>
        {showMemberModal && <BecomeMemberModal onClose={() => setShowMemberModal(false)} />}
      </AnimatePresence>
    </>
  );
};

export default WhatWeDoCards;