import React from 'react';
import { motion } from 'framer-motion';

const RecentActivities = () => {
  // These are REAL recent activities - you can update this easily!
  const activities = [
    {
      id: 1,
      icon: '🎉',
      title: 'December Get-Together Coming Up!',
      description: 'Join us on December 28, 2025 for our year-end celebration',
      time: 'Upcoming',
      color: 'neon-pink'
    },
    {
      id: 2,
      icon: '🤝',
      title: 'New Members Welcomed',
      description: 'Our family grew! Welcome to all new members joining Search for a Smile',
      time: 'This Month',
      color: 'neon-blue'
    },
    {
      id: 3,
      icon: '📸',
      title: 'Photo Gallery Updated',
      description: 'Added photos from our March 2025 hiking adventure',
      time: 'Recently',
      color: 'neon-purple'
    },
    {
      id: 4,
      icon: '🎯',
      title: 'Planning 2026 Goals',
      description: 'Our team is mapping out exciting initiatives for the new year',
      time: '2 weeks ago',
      color: 'neon-blue'
    },
  ];

  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
          What's Happening Now
        </h2>
        <p className="text-center text-gray-400 mb-12">Stay updated with our latest news</p>

        <div className="max-w-4xl mx-auto">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-16 pb-12 last:pb-0"
            >
              {/* Timeline Line */}
              {index !== activities.length - 1 && (
                <div className="absolute left-6 top-14 w-0.5 h-full bg-gradient-to-b from-neon-blue/50 to-transparent"></div>
              )}

              {/* Icon Circle */}
              <div className={`absolute left-0 top-0 w-12 h-12 rounded-full bg-${activity.color}/20 border-2 border-${activity.color} flex items-center justify-center text-2xl shadow-${activity.color}`}>
                {activity.icon}
              </div>

              {/* Content */}
              <div className="bg-gradient-to-br from-card-bg to-transparent border border-gray-700 rounded-xl p-6 hover:border-neon-blue/30 transition-all hover:-translate-y-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{activity.title}</h3>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
                <p className="text-gray-400">{activity.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Activity Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-gray-500 text-sm">
            💡 Want to suggest an activity? Message us!
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default RecentActivities;