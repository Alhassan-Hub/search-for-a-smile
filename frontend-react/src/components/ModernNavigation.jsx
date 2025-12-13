import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  BookOpen, 
  Target, 
  Map, 
  Users, 
  Camera, 
  Bell, 
  HeartHandshake,
  ChevronRight
} from 'lucide-react';

const ModernNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, color: 'text-neon-blue' },
    { id: 'story', label: 'Our Story', icon: BookOpen, color: 'text-neon-purple' },
    { id: 'mission', label: 'What We Do', icon: Target, color: 'text-neon-pink' },
    { id: 'journey', label: 'Our Journey', icon: Map, color: 'text-neon-blue' },
    { id: 'founders', label: 'Meet the Founders', icon: Users, color: 'text-neon-purple' },
    { id: 'gallery', label: 'Photo Gallery', icon: Camera, color: 'text-neon-pink' },
    { id: 'recent', label: 'Latest Updates', icon: Bell, color: 'text-neon-blue' },
    { id: 'join', label: 'Join Our Family', icon: HeartHandshake, color: 'text-neon-purple' },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setTimeout(() => setIsOpen(false), 200);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.id)
      }));

      const currentSection = sections.find(section => {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-[100] w-10 h-10 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-700 flex flex-col items-center justify-center gap-1 hover:border-neon-blue/40 hover:bg-slate-800/90 transition-all duration-200 group shadow-lg"
        aria-label="Menu"
      >
        <motion.span
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 6 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="w-5 h-0.5 bg-slate-300 rounded-full group-hover:bg-neon-blue transition-colors"
        />
        <motion.span
          animate={{
            opacity: isOpen ? 0 : 1,
            width: isOpen ? 0 : '20px',
          }}
          transition={{ duration: 0.2 }}
          className="h-0.5 bg-slate-300 rounded-full group-hover:bg-neon-blue transition-all"
        />
        <motion.span
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -6 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="w-5 h-0.5 bg-slate-300 rounded-full group-hover:bg-neon-blue transition-colors"
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] md:bg-black/40"
            />

            <motion.div
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ 
                type: "tween",
                duration: 0.3,
                ease: "easeOut"
              }}
              className="fixed left-0 top-0 h-full w-80 z-[95] overflow-hidden"
            >
              <div className="h-full bg-slate-950/95 backdrop-blur-xl border-r border-slate-800 shadow-2xl relative">
                
                <div className="relative z-10 h-full flex flex-col">
                  
                  {/* Header - Text at the RIGHT */}
                  <div className="p-6 border-b border-slate-800 flex justify-end">
                    <div className="text-right">
                      <h2 className="text-lg font-semibold text-white">Search for a Smile</h2>
                      <p className="text-xs text-slate-400 mt-1">A home for connection</p>
                    </div>
                  </div>

                  <nav className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-1">
                      {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeSection === item.id;
                        
                        return (
                          <motion.button
                            key={item.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => scrollToSection(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                              isActive
                                ? 'bg-slate-800/50 border border-slate-700'
                                : 'hover:bg-slate-800/30'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              isActive 
                                ? 'bg-slate-800' 
                                : 'bg-slate-900/50'
                            }`}>
                              <Icon 
                                size={18} 
                                className={`${item.color} ${isActive ? 'opacity-100' : 'opacity-70'}`}
                              />
                            </div>
                            
                            <span className={`flex-1 text-left font-medium ${
                              isActive 
                                ? 'text-white' 
                                : 'text-slate-300'
                            }`}>
                              {item.label}
                            </span>
                            
                            {isActive ? (
                              <div className="w-1.5 h-1.5 rounded-full bg-neon-blue" />
                            ) : (
                              <ChevronRight size={16} className="text-slate-500" />
                            )}
                          </motion.button>
                        );
                      })}
                    </div>

                    <div className="my-6 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

                    <div className="px-4">
                      <div className="bg-slate-900/30 rounded-lg p-4 border border-slate-800">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-slate-400">Community</span>
                          <span className="text-sm font-medium text-neon-blue">23 Members</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-400">Founded</span>
                          <span className="text-sm font-medium text-slate-300">2023</span>
                        </div>
                      </div>
                    </div>
                  </nav>

                  <div className="p-6 border-t border-slate-800">
                    <p className="text-xs text-slate-500 text-center">
                      Search for a Smile • Sierra Leone
                    </p>
                    <p className="text-xs text-slate-600 text-center mt-1">
                      Building community through connection
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Progress dots */}
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
      >
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block group relative"
                aria-label={item.label}
              >
                <div className="relative">
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-neon-blue'
                        : 'bg-slate-600 group-hover:bg-slate-500'
                    }`}
                  />
                  
                  {isActive && (
                    <div className="absolute inset-0 rounded-full bg-neon-blue blur-sm" />
                  )}
                </div>
                
                <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <span className="text-xs font-medium text-slate-300 flex items-center gap-1">
                    <Icon size={12} className={item.color} />
                    {item.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>
    </>
  );
};

export default ModernNavigation;