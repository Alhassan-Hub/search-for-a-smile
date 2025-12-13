import React from 'react';
import HamburgerNavigation from './ModernNavigation';
import HeroWelcomeCard from './HeroWelcomeCard';
import MemberSpotlight from './MemberSpotlight'; // NEW
import OurStorySection from './OurStorySection';
import WhatWeDoCards from './WhatWeDoCards';
import FoundersSection from './FoundersSection';
import OurJourney from './OurJourney';
import JourneyVisualizer from './JourneyVisualizer'; // NEW MAP
import PhotoGallery from './PhotoGallery';
// import ImpactReplay from './ImpactReplay'; // Optional: Add if you have video
import RecentActivities from './RecentActivities';
import LoveWall from './LoveWall'; // NEW
import CallToAction from './CallToAction';
import VolunteerSection from './VolunteerSection'; // NEW
import ImpactReplay from './ImpactReplay';
const Dashboard = () => {
  return (
    <>
      <HamburgerNavigation />
      
      <main className="min-h-screen bg-dark-bg overflow-x-hidden selection:bg-neon-pink selection:text-white">
        
        {/* 1. Hero */}
        <section id="home" className="pt-32 pb-10 px-6">
           <div className="container mx-auto max-w-7xl">
            <HeroWelcomeCard />
           </div>
        </section>

        {/* 2. Member Spotlight (Shows Random Real Member) */}
        <section className="py-10">
          <MemberSpotlight />
        </section>
        
        {/* 3. Our Story */}
        <section id="story" className="py-20 px-6">
          <OurStorySection />
        </section>
        
        {/* 4. What We Do */}
        <section id="mission" className="py-20 px-6 bg-gray-900/20">
          <div className="container mx-auto max-w-7xl">
            <WhatWeDoCards />
          </div>
        </section>
        
        {/* 5. Founders */}
        <section id="founders" className="py-20 px-6">
          <FoundersSection />
        </section>

        {/* 6. Timeline */}
        <section id="journey" className="py-20 px-6">
          <OurJourney />
        </section>

        {/* 7. Journey Map (Real Bo Locations) */}
        <section className="px-6 pb-20">
          <JourneyVisualizer />
        </section>
        
        {/* 8. Gallery */}
        <section id="gallery" className="py-20 px-6">
          <PhotoGallery />
        </section>
        
        <section id="replay">
  <ImpactReplay />
</section>

        {/* 10. Recent Activities */}
        <section id="recent" className="py-20 px-6">
           <RecentActivities />
        </section>

        {/* 11. Love Wall */}
        <section className="py-0">
          <LoveWall />
        </section>

        {/* 12. Call To Action + Volunteer */}
        <section id="join" className="py-20 px-6">
          <CallToAction />
          <VolunteerSection />
        </section>
        
      </main>
    </>
  );
};

export default Dashboard;