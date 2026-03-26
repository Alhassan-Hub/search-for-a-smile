import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';

const PhotoGallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // You can just copy and paste more objects here when you get more photos! No database needed.
  const photos = [
    { id: 1, src: '/images/charity/village-ramadan-march-2024.jpg', category: 'charity', title: 'Village Ramadan Distribution', date: 'March 2024', description: 'Distributing provisions to vulnerable families during Ramadan.' },
    { id: 2, src: '/images/gatherings/first-gathering-june-2024.jpg', category: 'gathering', title: 'First Community Gathering', date: 'June 2024', description: 'Building our foundation of genuine connection and friendship.' },
    { id: 3, src: '/images/charity/orphanage-july-2024-1.jpg', category: 'charity', title: 'Orphanage Support', date: 'July 2024', description: 'Delivering essential supplies to children in need.' },
    { id: 4, src: '/images/hiking/march-hiking-2025-group.jpg', category: 'adventure', title: 'Team Hiking Adventure', date: 'March 2025', description: 'Strengthening our team bonds through nature.' },
  ];

  const filters = [
    { id: 'all', label: 'All Highlights' },
    { id: 'charity', label: 'Charity Work' },
    { id: 'gathering', label: 'Community' },
  ];

  const filteredPhotos = activeFilter === 'all' ? photos : photos.filter(photo => photo.category === activeFilter);

  return (
    <section className="py-24 bg-[#E0F2FE]">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="text-center mb-16">
          <span className="text-[#0284C7] font-sans text-sm tracking-[0.2em] uppercase font-bold">Our Impact</span>
          {/* Changed the framing to "Selected Highlights" */}
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0A192F] mt-4 mb-10">Selected Highlights</h2>
          
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-2.5 rounded-full font-sans text-sm font-semibold transition-all ${
                  activeFilter === filter.id
                    ? 'bg-[#0A192F] text-[#FFFFFF] shadow-md'
                    : 'bg-[#FFFFFF] text-[#64748B] hover:text-[#0A192F] border border-[#FFFFFF]'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedPhoto(photo)}
              className="group cursor-pointer bg-[#FFFFFF] rounded-[2rem] p-3 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-square rounded-2xl overflow-hidden bg-[#F0F9FF] relative">
                <img 
                  src={photo.src} 
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => { e.target.src = "https://placehold.co/600x600/F0F9FF/0A192F?text=Photo" }}
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-serif font-bold text-[#0A192F] mb-1">{photo.title}</h3>
                <p className="text-[#0284C7] font-sans text-xs font-bold tracking-wider uppercase">{photo.date}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* The "Psychology" Fix: Telling the user we do more than just these photos */}
        <div className="max-w-2xl mx-auto text-center bg-[#F0F9FF] rounded-2xl p-8 border border-[#FFFFFF] shadow-sm">
          <Heart className="w-8 h-8 text-[#0284C7] mx-auto mb-4" />
          <p className="text-[#64748B] font-sans text-base leading-relaxed">
            These are just a few captured moments from our journey. Countless other smiles, distributions, and genuine connections happen every single day off-camera. Our real impact is measured in lives changed, not just photos taken.
          </p>
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 bg-[#0A192F]/95 backdrop-blur-sm z-[100] flex items-center justify-center p-4 md:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FFFFFF] rounded-3xl p-6 md:p-8 max-w-3xl w-full relative"
            >
              <button onClick={() => setSelectedPhoto(null)} className="absolute top-4 right-4 text-[#64748B] hover:text-[#0A192F] bg-[#F0F9FF] p-2 rounded-full transition-colors z-10">
                <X size={20} />
              </button>

              <div className="aspect-video bg-[#F0F9FF] rounded-2xl overflow-hidden mb-6">
                <img src={selectedPhoto.src} alt={selectedPhoto.title} className="w-full h-full object-contain" />
              </div>

              <div className="text-center px-4">
                <h3 className="text-2xl font-serif font-bold text-[#0A192F] mb-1">{selectedPhoto.title}</h3>
                <p className="text-[#0284C7] font-sans text-sm font-bold tracking-widest uppercase mb-4">{selectedPhoto.date}</p>
                <p className="text-[#64748B] font-sans text-base leading-relaxed">{selectedPhoto.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhotoGallery;