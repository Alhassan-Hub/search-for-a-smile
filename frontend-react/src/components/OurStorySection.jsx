import React from 'react';
import { motion } from 'framer-motion';

const OurStorySection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto"
    >
      <h2 className="text-5xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
        Our Story
      </h2>
      
      <div className="bg-gradient-to-br from-card-bg to-transparent border border-neon-blue/20 rounded-3xl p-12">
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-gray-300 leading-relaxed text-lg mb-6">
            Search for a Smile is a youth community organization in Sierra Leone dedicated to creating genuine connections and positive impact.
          </p>
          
          <p className="text-gray-300 leading-relaxed text-lg mb-6">
            We exist because too many young people feel isolated and vulnerable - searching for belonging in places that may not serve them well. We provide that home: a community where friendships are real, support is unconditional, and everyone has a place.
          </p>
          
          <p className="text-gray-300 leading-relaxed text-lg">
            Since 2023, founders Alhassan Bah and Mahawa Gberie have built a family of 23 committed members. Together, we organize charitable activities, educational initiatives, and community-building events that blend purpose with joy.
          </p>
          
          <div className="mt-8 p-6 bg-neon-blue/10 border border-neon-blue/30 rounded-2xl">
            <p className="text-neon-blue font-semibold text-xl mb-2">Our Mission:</p>
            <p className="text-gray-300 text-lg">
              Help those in need, empower the girl child, and give every young person a safe, supportive space to call home.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OurStorySection;