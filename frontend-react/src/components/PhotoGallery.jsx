import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PhotoGallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Your real photos will go here
  const photos = [
    {
      id: 1,
      src: '/images/charity/village-ramadan-march-2024.jpg',
      category: 'charity',
      title: 'Village Ramadan Distribution',
      date: 'March 24, 2024',
      description: 'Our first charity event - distributing provisions to villagers during Ramadan',
    },
    {
      id: 2,
      src: '/images/gatherings/first-gathering-june-2024.jpg',
      category: 'gathering',
      title: 'First Get-Together',
      date: 'June 17, 2024',
      description: 'Building our family through genuine connection',
    },
    {
      id: 3,
      src: '/images/charity/orphanage-july-2024-1.jpg',
      category: 'charity',
      title: 'Orphanage Support',
      date: 'July 28, 2024',
      description: 'Donating supplies to children in need',
    },
    {
      id: 4,
      src: '/images/hiking/march-hiking-2025-group.jpg',
      category: 'adventure',
      title: 'First Hiking Adventure',
      date: 'March 31, 2025',
      description: 'Team bonding through nature and adventure',
    },
    // Add more as you upload photos
  ];

  const filters = [
    { id: 'all', label: 'All Events', icon: '🌟' },
    { id: 'charity', label: 'Charity', icon: '❤' },
    { id: 'gathering', label: 'Get-Togethers', icon: '🤝' },
    { id: 'adventure', label: 'Adventures', icon: '🥾' },
  ];

  const filteredPhotos = activeFilter === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === activeFilter);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-5xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-purple">
          Our Story in Pictures
        </h2>
        <p className="text-center text-gray-400 text-lg mb-12">Real moments, real impact, real family</p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-neon-pink to-neon-purple shadow-neon-pink'
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white'
              }`}
            >
              {filter.icon} {filter.label}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedPhoto(photo)}
              className="group cursor-pointer"
            >
              <div className="relative bg-gradient-to-br from-card-bg to-transparent border border-neon-purple/20 rounded-2xl overflow-hidden hover:border-neon-purple/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-neon-purple">
                {/* Photo Container */}
                <div className="aspect-video bg-gray-900 flex items-center justify-center relative overflow-hidden">
                  {/* Real photo */}
                  <img 
                    src={photo.src} 
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white text-sm font-semibold">View Details →</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{photo.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{photo.description}</p>
                  <p className="text-xs text-gray-500">{photo.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <div className="text-6xl mb-4">📸</div>
            <p>More photos coming soon!</p>
          </div>
        )}
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-dark-bg border border-neon-purple/30 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold mb-2">{selectedPhoto.title}</h3>
                  <p className="text-gray-400 text-sm">{selectedPhoto.date}</p>
                </div>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="text-gray-400 hover:text-white text-3xl leading-none"
                >
                  ×
                </button>
              </div>

              {/* Large Photo */}
              <div className="aspect-video bg-gray-900 rounded-xl flex items-center justify-center mb-6">
                <img 
                  src={selectedPhoto.src} 
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              <p className="text-gray-300 text-lg leading-relaxed">
                {selectedPhoto.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PhotoGallery;