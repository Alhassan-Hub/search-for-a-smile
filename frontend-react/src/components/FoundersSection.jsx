import React from 'react';
import { motion } from 'framer-motion';

const FoundersSection = () => {
  const founders = [
    {
      name: 'Alhassan',
      role: 'Co-Founder',
      image: '/images/team/Alhassan-founder.jpg', 
      quote: 'We created Search for a Smile to ensure that every struggling mother has support and every child has the foundation to build their future.',
    },
    {
      name: 'Mahawa Gberie',
      role: 'Co-Founder',
      image: '/images/team/mahawa-founder.jpg', 
      quote: 'When you empower a young girl and educate a child, you don’t just change a life—you uplift an entire community.',
    },
  ];

  return (
    <section className="py-24 bg-[#FFFFFF]">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-[#64748B] font-sans text-xs md:text-sm tracking-[0.2em] uppercase font-semibold">
            Leadership
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0A192F] mt-4 mb-6">
            Meet the Founders
          </h2>
          <div className="w-16 h-1 bg-[#2563EB] mx-auto rounded-full"></div>
        </motion.div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 max-w-5xl mx-auto mb-20">
          {founders.map((founder, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="flex flex-col items-center text-center group"
            >
              {/* Elegant Circular Photo */}
              <div className="w-48 h-48 md:w-56 md:h-56 mx-auto mb-8 rounded-full overflow-hidden bg-[#F0F4F7] shadow-[0_10px_30px_-10px_rgba(10,25,47,0.15)] ring-4 ring-[#F0F4F7] ring-offset-4 ring-offset-white relative">
                <img 
                  src={founder.image} 
                  alt={founder.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  onError={(e) => {
                    e.target.src = "https://placehold.co/400x400/F0F4F7/0A192F?text=Photo";
                  }}
                />
              </div>

              {/* Info */}
              <h3 className="text-3xl font-serif font-bold text-[#0A192F] mb-2">
                {founder.name}
              </h3>
              <p className="text-[#2563EB] font-sans text-sm font-bold tracking-[0.2em] uppercase mb-6">
                {founder.role}
              </p>
              
              {/* Quote */}
              <div className="relative px-6">
                <span className="absolute -top-4 -left-2 text-5xl text-[#F0F4F7] font-serif select-none">"</span>
                <p className="text-[#64748B] font-serif italic text-lg md:text-xl leading-relaxed relative z-10">
                  {founder.quote}
                </p>
                <span className="absolute -bottom-8 -right-2 text-5xl text-[#F0F4F7] font-serif select-none rotate-180">"</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Story Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center bg-[#F0F4F7] p-8 md:p-12 rounded-[2rem] border border-[#E2E8F0]"
        >
          <p className="text-[#0A192F] font-sans text-base md:text-lg leading-relaxed">
            In 2023, Alhassan and Mahawa saw too many vulnerable families struggling without a safety net in Sierra Leone. 
            They decided to create an organization that doesn't just offer temporary relief, but builds lasting foundations 
            through education and empowerment. Today, Search for a Smile is a growing family of advocates, proving that 
            genuine care and targeted support can transform communities.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default FoundersSection;