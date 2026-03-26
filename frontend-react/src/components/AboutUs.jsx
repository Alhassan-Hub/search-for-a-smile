import React from 'react';
import { motion } from 'framer-motion';
import OurStorySection from './OurStorySection';
import OurJourney from './OurJourney';
import PhotoGallery from './PhotoGallery';

const AboutUs = () => {
  return (
    <motion.main 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen pt-20 bg-[#E0F2FE] selection:bg-[#0284C7] selection:text-[#FFFFFF]"
    >
      <OurStorySection />
      <OurJourney />
      <PhotoGallery />
    </motion.main>
  );
};

export default AboutUs;