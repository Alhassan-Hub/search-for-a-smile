import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BecomeMemberModal from './BecomeMemberModal';
import DonationModal from './DonationModal';
import { Heart, UserPlus } from 'lucide-react';

const CallToAction = () => {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showDonateModal, setShowDonateModal] = useState(false);

  return (
    <>
      <section className="py-24 bg-[#F0F4F7] px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-[#FFFFFF] border border-[#E2E8F0] rounded-[3rem] p-12 md:p-20 text-center shadow-[0_20px_60px_-15px_rgba(10,25,47,0.05)] overflow-hidden"
          >
            {/* Elegant Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F0F4F7] rounded-full blur-[80px] -z-0"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2563EB]/5 rounded-full blur-[80px] -z-0"></div>

            <div className="relative z-10">
              
              <span className="text-[#2563EB] font-sans text-xs md:text-sm tracking-[0.2em] uppercase font-bold mb-4 block">
                Take Action
              </span>

              <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 text-[#0A192F] leading-tight">
                Ready to change <br className="hidden md:block" /> a life today?
              </h2>
              
              <p className="text-lg md:text-xl text-[#64748B] mb-12 max-w-2xl mx-auto font-sans leading-relaxed">
                We are building a foundation of hope for vulnerable mothers and young girls across Sierra Leone. Whether you give your time or your resources, you are essential to this mission.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                
                {/* Primary Button: Donate */}
                <button
                  onClick={() => setShowDonateModal(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-[#0A192F] text-[#FFFFFF] rounded-full font-sans font-bold text-base hover:bg-[#2563EB] hover:-translate-y-1 transition-all duration-300 shadow-xl"
                >
                  <Heart size={20} />
                  Make a Donation
                </button>

                {/* Secondary Button: Join */}
                <button
                  onClick={() => setShowJoinModal(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-[#FFFFFF] border-2 border-[#E2E8F0] text-[#0A192F] rounded-full font-sans font-bold text-base hover:border-[#0A192F] transition-all duration-300"
                >
                  <UserPlus size={20} />
                  Join Our Team
                </button>
              </div>

              <p className="mt-12 text-sm text-[#64748B] font-sans font-medium tracking-wide">
                Together, we are rewriting stories.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Render Modals */}
      <AnimatePresence>
        {showJoinModal && <BecomeMemberModal onClose={() => setShowJoinModal(false)} />}
        {showDonateModal && <DonationModal onClose={() => setShowDonateModal(false)} />}
      </AnimatePresence>
    </>
  );
};

export default CallToAction;