import React from 'react';
import { motion } from 'framer-motion';

const FoundersSection = () => {
  const founders = [
    {
      name: 'Alhassan',
      role: 'Co-Founder',
      image: '/images/team/Alhassan-founder.jpg', // You'll add your photo here
      quote: 'We created Search for a Smile to give youth a real home - a place where they belong and feel valued.',
    },
    {
      name: 'Mahawa Gberie',
      role: 'Co-Founder',
      image: '/images/team/mahawa-founder.jpg', // You'll add Mahawa's photo here
      quote: 'Every young person deserves genuine friendship and support. That\'s why we built this family.',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-5xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
        Meet the Founders
      </h2>
      <p className="text-center text-gray-400 text-lg mb-12">The hearts behind Search for a Smile</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {founders.map((founder, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="bg-gradient-to-br from-card-bg to-transparent border border-neon-blue/20 rounded-3xl p-8 hover:border-neon-blue/50 transition-all hover:-translate-y-2 hover:shadow-neon-blue"
          >
            {/* Photo */}
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple p-1">
              <div className="w-full h-full rounded-full bg-dark-bg flex items-center justify-center overflow-hidden">
                {/* Real founder photo */}
                <img 
                  src={founder.image} 
                  alt={founder.name} 
                  className="w-full h-full object-cover rounded-full" 
                />
              </div>
            </div>

            {/* Info */}
            <h3 className="text-2xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
              {founder.name}
            </h3>
            <p className="text-center text-neon-blue text-sm font-semibold mb-4">{founder.role}</p>
            
            {/* Quote */}
            <div className="relative">
              <div className="absolute -top-2 -left-2 text-4xl text-neon-blue/20">"</div>
              <p className="text-gray-300 italic text-center px-6">
                {founder.quote}
              </p>
              <div className="absolute -bottom-2 -right-2 text-4xl text-neon-blue/20 rotate-180">"</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Story Text */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-12 max-w-3xl mx-auto text-center"
      >
        <p className="text-gray-400 text-lg leading-relaxed">
          In 2023, Alhassan and Mahawa saw too many young people feeling lost and alone in Sierra Leone. 
          They decided to create something different - not just another organization, but a real home. 
          Today, Search for a Smile is a family of 25 members and growing, proving that genuine connection 
          and purpose can change lives.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default FoundersSection;