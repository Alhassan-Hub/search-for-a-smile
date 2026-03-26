import React from 'react';
import { motion } from 'framer-motion';

const OurStorySection = () => {
  return (
    <section className="py-24 bg-[#E0F2FE]">
      <div className="container mx-auto px-6 max-w-4xl">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#0284C7] font-sans text-sm tracking-[0.2em] uppercase font-bold">
            Who We Are
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#0A192F] mt-4">
            Our Story.
          </h2>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#FFFFFF] rounded-[2rem] p-10 md:p-16 shadow-[0_20px_60px_-15px_rgba(2,132,199,0.1)] border border-[#FFFFFF]"
        >
          <div className="prose prose-lg max-w-none text-[#0A192F] font-sans">
            <p className="text-xl md:text-2xl font-serif text-[#0A192F] leading-relaxed mb-8">
              <span className="text-5xl font-bold text-[#0284C7] float-left mr-3 -mt-2">S</span>
              earch for a Smile began with a simple observation: too many vulnerable families and young girls in Sierra Leone were struggling without a reliable safety net or genuine support system.
            </p>
            
            <p className="text-[#64748B] leading-relaxed mb-8">
              Founded in 2023 by Alhassan Bah and Mahawa Gberie, our organization was built to be more than just a charity handing out temporary relief. We wanted to build a foundation—a true family of advocates dedicated to creating long-term, sustainable impact. 
            </p>
            
            <p className="text-[#64748B] leading-relaxed mb-10">
              What started as a small group has now grown into a committed family of 25 active members. Together, we organize critical food distributions, fund educational initiatives, and host empowerment workshops that blend real purpose with genuine community care.
            </p>
            
            <div className="mt-12 p-8 bg-[#F0F9FF] border border-[#E0F2FE] rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#0284C7]"></div>
              <h3 className="font-serif font-bold text-2xl text-[#0A192F] mb-3">Our Core Mission</h3>
              <p className="text-[#0A192F] text-lg font-medium leading-relaxed">
                To stand by struggling mothers, fiercely empower and protect the girl child, and ensure every young person has the education and support they need to build a lasting future.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default OurStorySection;