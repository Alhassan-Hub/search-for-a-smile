import React from 'react';
import { motion } from 'framer-motion';
import HeroWelcomeCard from './HeroWelcomeCard';
import MemberSpotlight from './MemberSpotlight';
import WhatWeDoCards from './WhatWeDoCards';
import FoundersSection from './FoundersSection';
import ImpactReplay from './ImpactReplay';
import CallToAction from './CallToAction';

const Dashboard = () => {
  return (
    <motion.main 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#F0F4F7] text-[#0A192F] overflow-x-hidden selection:bg-[#2563EB] selection:text-[#FFFFFF] pt-20 font-sans"
    >
      <section id="home"><div className="container mx-auto"><HeroWelcomeCard /></div></section>
      <section><MemberSpotlight /></section>
      <section id="mission"><WhatWeDoCards /></section>
      <section id="founders"><FoundersSection /></section>
      <section id="replay"><ImpactReplay /></section>
      <section id="join"><CallToAction /></section>
    </motion.main>
  );
};

export default Dashboard;