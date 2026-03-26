import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import BecomeMemberModal from './BecomeMemberModal';

const WhatWeDoCards = () => {
  const [showMemberModal, setShowMemberModal] = useState(false);

  const pillars = [
    {
      title: 'Supporting Mothers',
      description: 'We stand by vulnerable families, ensuring mothers have the resources, food, and support they need to raise their children in a safe environment.',
      features: ['Food Distributions', 'Essential Resources', 'Community Aid', 'Emotional Support'],
    },
    {
      title: 'Vital Education',
      description: 'Education is the foundation of hope. We fund schooling, provide supplies, and create learning environments where every child can thrive.',
      features: ['School Funding', 'Learning Supplies', 'Safe Classrooms', 'Mentorship'],
    },
    {
      title: 'Empowering Girls',
      description: 'We actively create safe spaces for young girls, providing education on protection, self-defense, and confidence building.',
      features: ['Safety Education', 'Empowerment Workshops', 'Building Confidence', 'Protection Programs'],
    },
  ];

  return (
    <section className="py-24 bg-[#F0F4F7]">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-[#64748B] font-sans text-xs md:text-sm tracking-[0.2em] uppercase font-semibold">
            Our Mission
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0A192F] mt-4 mb-6">
            What We Do
          </h2>
          <div className="w-16 h-1 bg-[#2563EB] mx-auto rounded-full"></div>
        </motion.div>

        {/* 
          THE PERMANENT STAGGERED LAYOUT
          By using w-[92%] on mobile, we force the cards to stay left or right,
          creating that permanent staircase look even on small iPhones!
        */}
        <div className="flex flex-col gap-6 md:gap-12 relative">
          
          {pillars.map((pillar, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                // Notice the w-[92%] for mobile, forcing the permanent stagger!
                className={`w-[92%] sm:w-[85%] md:w-[65%] lg:w-[55%] flex ${isLeft ? 'self-start' : 'self-end'}`}
              >
                <div className="bg-[#FFFFFF] p-6 md:p-10 rounded-3xl md:rounded-[2rem] shadow-[0_10px_40px_-10px_rgba(10,25,47,0.05)] border border-[#FFFFFF] hover:border-[#E2E8F0] transition-colors w-full">
                  
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#0A192F] mb-3 md:mb-4">
                    {pillar.title}
                  </h3>
                  
                  <p className="text-[#64748B] font-sans text-sm md:text-lg leading-relaxed mb-6 md:mb-8">
                    {pillar.description}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 pt-5 md:pt-6 border-t border-[#F0F4F7]">
                    {pillar.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-[#2563EB] flex-shrink-0 mt-0.5" />
                        <span className="text-[#0A192F] font-sans text-xs md:text-sm font-semibold">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 md:mt-24 text-center"
        >
          <div className="inline-block bg-[#FFFFFF] p-8 md:p-14 rounded-3xl md:rounded-[2rem] shadow-sm max-w-4xl w-full border border-[#E2E8F0]">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#0A192F] mb-4">
              Ready to make a difference?
            </h3>
            <p className="text-[#64748B] font-sans text-sm md:text-lg mb-8 max-w-xl mx-auto">
              Join our growing family of volunteers and supporters. Every hand helps build a better future for Sierra Leone.
            </p>
            <button
              onClick={() => setShowMemberModal(true)}
              className="inline-flex items-center gap-2 px-8 py-3.5 md:px-10 md:py-4 bg-[#2563EB] text-[#FFFFFF] rounded-full font-sans font-bold text-sm md:text-base hover:bg-[#1D4ED8] transition-all duration-300 shadow-md hover:-translate-y-1"
            >
              Join Our Family <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>

      </div>

      <AnimatePresence>
        {showMemberModal && <BecomeMemberModal onClose={() => setShowMemberModal(false)} />}
      </AnimatePresence>
    </section>
  );
};

export default WhatWeDoCards;