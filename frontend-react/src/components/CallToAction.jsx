import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BecomeMemberModal from './BecomeMemberModal';

const CallToAction = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section className="py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-neon-blue/10 via-neon-purple/10 to-neon-pink/10 border border-neon-blue/30 rounded-3xl p-16 text-center overflow-hidden"
        >
          {/* Background Effects */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-40 h-40 bg-neon-blue/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-neon-pink/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-neon-purple/10 rounded-full blur-3xl"></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink">
                Ready to Find Your Home?
              </h2>
              <p className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
                We're just getting started, and we need YOU.
              </p>
              <p className="text-lg text-gray-400 mb-10 max-w-3xl mx-auto">
                Search for a Smile is 2 years young. We've built a strong foundation with 23 amazing members and completed multiple impactful events. But the best is yet to come.
              </p>
              <p className="text-lg text-gray-300 mb-10 max-w-3xl mx-auto font-semibold">
                Will you join us in writing this story?
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <button
                onClick={() => setShowModal(true)}
                className="group relative px-10 py-5 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-neon-blue"
              >
                <span className="relative z-10">Become a Member</span>
                <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon-pink rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              <button
                onClick={() => scrollToSection('story')}
                className="px-10 py-5 border-2 border-neon-pink rounded-full font-bold text-lg hover:bg-neon-pink/10 hover:scale-105 transition-all"
              >
                Read Our Story
              </button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-8 text-sm text-gray-500"
            >
              💙 Together, we're not just changing lives — we're rewriting stories
            </motion.p>
          </div>
        </motion.div>
      </section>

      <AnimatePresence>
        {showModal && <BecomeMemberModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </>
  );
};

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export default CallToAction;