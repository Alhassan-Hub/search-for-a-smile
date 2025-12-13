import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DonationModal from './DonationModal'; // 1. IMPORT THE MODAL

const VolunteerSection = () => {
  const [showDonation, setShowDonation] = useState(false); // 2. STATE FOR MODAL

  return (
    <>
      <div className="py-16 border-t border-gray-800 bg-gray-900/30">
        <div className="text-center mb-10">
          <h3 className="text-3xl font-bold text-white">More Ways to Support</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-6">
          
          {/* Volunteer Card - (Just a placeholder for now) */}
          <motion.div whileHover={{ y: -5 }} className="bg-dark-bg border border-neon-blue/30 rounded-xl p-8 text-center hover:shadow-neon-blue">
            <div className="text-4xl mb-4">🙌</div>
            <h4 className="font-bold text-white text-xl mb-2">Volunteer</h4>
            <p className="text-gray-400">Join our team on the ground.</p>
          </motion.div>

          {/* --- THE DONATION BUTTON IS HERE --- */}
          <motion.div 
            whileHover={{ y: -5 }} 
            onClick={() => setShowDonation(true)} // 3. THIS MAKES IT CLICKABLE
            className="bg-dark-bg border border-neon-pink/30 rounded-xl p-8 text-center hover:shadow-neon-pink cursor-pointer group"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🎁</div>
            <h4 className="font-bold text-white text-xl mb-2">Donate Items/Money</h4>
            <p className="text-gray-400">Click here to support via Orange/AfriMoney.</p>
          </motion.div>
          {/* ----------------------------------- */}

          {/* Sponsor Card */}
          <motion.div whileHover={{ y: -5 }} className="bg-dark-bg border border-neon-purple/30 rounded-xl p-8 text-center hover:shadow-neon-purple">
            <div className="text-4xl mb-4">👶</div>
            <h4 className="font-bold text-white text-xl mb-2">Sponsor a Child</h4>
            <p className="text-gray-400">Support education directly.</p>
          </motion.div>
        </div>
      </div>

      {/* 4. RENDER THE MODAL */}
      <AnimatePresence>
        {showDonation && <DonationModal onClose={() => setShowDonation(false)} />}
      </AnimatePresence>
    </>
  );
};

export default VolunteerSection;