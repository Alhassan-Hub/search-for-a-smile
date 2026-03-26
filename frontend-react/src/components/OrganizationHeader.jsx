import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Home, BookOpen, Target, Map, Users, 
  Camera, Bell, HeartHandshake, Download, User, LogOut, Heart
} from 'lucide-react';
import BecomeMemberModal from './BecomeMemberModal';
import DonationModal from './DonationModal';

const OrganizationHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [user, setUser] = useState(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Simulating user auth check
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.reload();
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'story', label: 'Our Story', icon: BookOpen },
    { id: 'mission', label: 'What We Do', icon: Target },
    { id: 'journey', label: 'Our Journey', icon: Map },
    { id: 'founders', label: 'Meet the Founders', icon: Users },
    { id: 'gallery', label: 'Photo Gallery', icon: Camera },
    { id: 'recent', label: 'Latest Updates', icon: Bell },
    { id: 'join', label: 'Join Our Family', icon: HeartHandshake },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setTimeout(() => setIsOpen(false), 200);
    }
  };

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  return (
    <>
      {/* 
        MAIN TOP NAVBAR 
        Clean white background, subtle soft shadow, charcoal text
      */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-soft border-b border-gray-100"
      >
        <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          
          {/* LEFT: Menu Toggle & Brand Name */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-xl bg-brand-light text-brand-dark hover:bg-brand-gold-light hover:text-brand-gold transition-colors"
            >
              <Menu size={24} />
            </button>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-brand-dark tracking-tight">
                Search for a <span className="text-brand-gold">Smile</span>
              </h1>
            </div>
          </div>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            
            {/* Download App Button - Soft and Professional */}
            <a 
              href="/sfas-quran.apk" 
              download
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-brand-light border border-gray-200 text-brand-dark rounded-full font-medium text-sm hover:border-brand-gold hover:text-brand-gold transition-all"
            >
              <Download size={16} />
              <span>SFAS Quran App</span>
            </a>

            {/* Donate Button - Prominent Gold Button */}
            <button 
              onClick={() => setShowDonateModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-gold text-white font-semibold text-sm shadow-md hover:bg-yellow-600 transition-all hover:-translate-y-0.5"
            >
              <Heart size={16} className="fill-white" />
              <span className="hidden sm:inline">Donate Now</span>
              <span className="sm:hidden">Donate</span>
            </button>

            {/* User Profile / Login */}
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="w-10 h-10 rounded-full bg-brand-light border border-gray-200 flex items-center justify-center text-brand-dark font-bold text-sm shadow-sm hover:border-brand-gold transition-colors"
                >
                  {getInitials(user.username)}
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute right-0 top-12 w-48 bg-white border border-gray-100 rounded-2xl shadow-elegant p-2 flex flex-col gap-1"
                    >
                      <div className="px-3 py-2 border-b border-gray-100 mb-1">
                        <p className="text-xs text-brand-gray">Signed in as</p>
                        <p className="text-sm font-bold text-brand-dark truncate">{user.username}</p>
                      </div>
                      <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors w-full text-left"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <a href="/login.html" className="p-2 text-brand-gray hover:text-brand-gold transition-colors bg-brand-light rounded-full">
                 <User size={20} />
              </a>
            )}
          </div>
        </div>
      </motion.header>

      {/* 
        MODERN SIDE MENU (Replacing the neon hamburger menu)
      */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm z-[90]"
            />

            {/* Menu Drawer */}
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-80 z-[100] bg-white shadow-2xl flex flex-col"
            >
              {/* Menu Header */}
              <div className="p-6 flex items-center justify-between border-b border-gray-100">
                <div>
                  <h2 className="text-lg font-bold text-brand-dark">Menu</h2>
                  <p className="text-xs text-brand-gray mt-1">Search for a Smile</p>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 text-brand-gray transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all ${
                        isActive 
                          ? 'bg-brand-gold-light text-brand-gold font-semibold' 
                          : 'text-brand-dark hover:bg-brand-light hover:text-brand-gold'
                      }`}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}

                {/* Mobile Only Links */}
                <div className="pt-6 mt-6 border-t border-gray-100 md:hidden">
                  <a 
                    href="/sfas-quran.apk" 
                    download
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-brand-light text-brand-dark rounded-xl font-medium"
                  >
                    <Download size={18} /> Download Quran App
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showJoinModal && <BecomeMemberModal onClose={() => setShowJoinModal(false)} />}
        {showDonateModal && <DonationModal onClose={() => setShowDonateModal(false)} />}
      </AnimatePresence>
    </>
  );
};

export default OrganizationHeader;