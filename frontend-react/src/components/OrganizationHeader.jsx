import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import BecomeMemberModal from './BecomeMemberModal';
import DonationModal from './DonationModal';

const OrganizationHeader = () => {
  const [user, setUser] = useState(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false); // Dropdown toggle

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.reload();
  };

  // Helper to get initials (e.g. "Allan Bah" -> "AB")
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 w-full z-50 bg-[#0a0a1a]/95 backdrop-blur-md border-b border-white/10"
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          
         {/* 1. LOGO */}
         <Link to="/">
            {/* ADDED 'pl-14 md:pl-0' -> Pushes text right on mobile, keeps it normal on laptop */}
            <div className="cursor-pointer pl-14 md:pl-0"> 
              <h1 className="hidden md:block text-2xl font-bold ...">
                Search for a Smile
              </h1>
              <h1 className="md:hidden text-xl font-black ...">
                SFAS
              </h1>
            </div>
          </Link>

          {/* 2. RIGHT SIDE ACTIONS */}
          <div className="flex items-center gap-3">
            
            {/* DONATE (Hidden on tiny screens to save space, Visible on Medium+) */}
            <button 
              onClick={() => setShowDonateModal(true)}
              className="hidden sm:block px-4 py-2 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold text-xs hover:scale-105 transition-transform"
            >
              Donate
            </button>

            {/* JOIN US (Always Visible) */}
            <button 
              onClick={() => setShowJoinModal(true)}
              className="px-4 py-2 rounded-full border border-neon-blue text-neon-blue font-bold text-xs hover:bg-neon-blue hover:text-black transition-all"
            >
              Join
            </button>

            {/* 3. USER AVATAR OR LOGIN */}
            <div className="h-6 w-px bg-gray-700 mx-1"></div>

            {user ? (
              <div className="relative">
                {/* THE AVATAR CIRCLE */}
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-gray-600 flex items-center justify-center text-white font-bold text-xs shadow-lg hover:border-neon-blue transition-colors"
                >
                  {getInitials(user.username)}
                </button>

                {/* USER DROPDOWN MENU */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute right-0 top-12 w-48 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl p-2 flex flex-col gap-1 overflow-hidden"
                    >
                      <div className="px-3 py-2 border-b border-gray-800 mb-1">
                        <p className="text-xs text-gray-500">Signed in as</p>
                        <p className="text-sm font-bold text-white truncate">{user.username}</p>
                      </div>
                      <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors w-full text-left"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              // LOGIN LINK (Icon only on mobile)
              <a href="/login.html" className="text-gray-400 hover:text-white transition-colors p-1">
                 <User size={20} />
              </a>
            )}
          </div>
        </div>
      </motion.header>

      {/* MODALS */}
      <AnimatePresence>
        {showJoinModal && <BecomeMemberModal onClose={() => setShowJoinModal(false)} />}
        {showDonateModal && <DonationModal onClose={() => setShowDonateModal(false)} />}
      </AnimatePresence>
    </>
  );
};

export default OrganizationHeader;