import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import OrganizationHeader from './components/OrganizationHeader';
import Dashboard from './components/Dashboard';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';

// 1. This completely stops the "overlap" by ensuring every new page starts exactly at the top
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// 2. This handles the smooth cross-fade between your pages
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-sans bg-[#F0F4F7]">
        <OrganizationHeader />
        
        <div className="flex-grow">
          <AnimatedRoutes />
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;