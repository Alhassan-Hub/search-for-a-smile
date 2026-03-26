import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, UserPlus, Heart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom'; // Added routing hooks
import BecomeMemberModal from './BecomeMemberModal';
import DonationModal from './DonationModal';

const OrganizationHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showDonateModal, setShowDonateModal] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isOpen]);

  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'about', label: 'About Us', path: '/about' },
    { id: 'mission', label: 'What We Do', path: '/#mission' },
    { id: 'founders', label: 'Leadership', path: '/#founders' },
  ];

  // This custom function routes smoothly without black screens!
  const handleNavClick = (e, path) => {
    e.preventDefault();
    setIsOpen(false);

    // If it's a section link (like #mission)
    if (path.includes('#')) {
      const [basePath, hash] = path.split('#');
      if (location.pathname !== basePath) {
        navigate(basePath);
        setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 300);
      } else {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Normal page navigation
      navigate(path);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[50] bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#F0F4F7]">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          
          <div className="flex-shrink-0 cursor-pointer" onClick={(e) => handleNavClick(e, '/')}>
            <h1 className="text-xl md:text-2xl font-serif font-bold text-[#0A192F] tracking-wide">
              Search for a Smile.
            </h1>
          </div>

          <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item) => (
              <button key={item.id} onClick={(e) => handleNavClick(e, item.path)} className="text-sm font-sans font-medium text-[#64748B] hover:text-[#0A192F] transition-colors tracking-wide">
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a href="/sfas-quran.apk" download className="flex items-center gap-1.5 font-sans text-xs font-semibold text-[#64748B] hover:text-[#0A192F] px-3 py-2 transition-colors">
              <Download size={14} /> Quran App
            </a>
            <button onClick={() => setShowJoinModal(true)} className="px-5 py-2.5 rounded-full border border-[#0A192F] text-[#0A192F] font-sans text-xs font-semibold hover:bg-[#F0F4F7] transition-colors">
              Join Us
            </button>
            <button onClick={() => setShowDonateModal(true)} className="px-6 py-2.5 rounded-full bg-[#0A192F] text-[#FFFFFF] font-sans text-xs font-semibold hover:bg-[#2563EB] transition-all">
              Donate
            </button>
          </div>

          <button onClick={() => setIsOpen(true)} className="lg:hidden p-2 text-[#0A192F] hover:bg-[#F0F4F7] rounded-full transition-colors">
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-0 z-[9999] bg-[#FFFFFF] flex flex-col min-h-screen w-full">
            <div className="px-6 h-20 flex justify-between items-center border-b border-[#F0F4F7]">
              <h1 className="text-xl font-serif font-bold text-[#0A192F]">Search for a Smile.</h1>
              <button onClick={() => setIsOpen(false)} className="p-2 text-[#0A192F] hover:bg-[#F0F4F7] rounded-full transition-colors">
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-10 flex flex-col gap-6 items-center bg-[#FFFFFF]">
              {navItems.map((item) => (
                <button key={item.id} onClick={(e) => handleNavClick(e, item.path)} className="text-2xl font-serif text-[#0A192F] hover:text-[#64748B] transition-colors">
                  {item.label}
                </button>
              ))}

              <div className="w-full h-px bg-[#F0F4F7] my-4"></div>

              <div className="flex flex-col gap-4 w-full max-w-xs">
                <a href="/sfas-quran.apk" download className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#F0F4F7] text-[#0A192F] font-sans text-sm font-semibold">
                  <Download size={16} /> Download Quran App
                </a>
                <button onClick={() => { setIsOpen(false); setShowJoinModal(true); }} className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#0A192F] text-[#0A192F] font-sans text-sm font-semibold">
                  <UserPlus size={16} /> Join the Family
                </button>
                <button onClick={() => { setIsOpen(false); setShowDonateModal(true); }} className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#0A192F] text-[#FFFFFF] font-sans text-sm font-semibold">
                  <Heart size={16} /> Donate Now
                </button>
              </div>
            </div>
          </motion.div>
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