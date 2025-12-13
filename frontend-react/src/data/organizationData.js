// src/data/organizationData.js

// 1. REAL MEMBERS LIST
// Add your 23 members here. The spotlight will pick one randomly from this list.
export const teamMembers = [
  {
    id: 1,
    name: "Mahawa Gberie",
    role: "Co-Founder",
    quote: "Every young person deserves genuine friendship and support.",
   image: '/images/team/mahawa-founder.jpg', // Make sure this file exists
  },
  {
    id: 2,
    name: "Alhassan",
    role: "Co-Founder",
    quote: "We created this home to ensure no youth feels alone.",
    image: '/images/team/Alhassan-founder.jpg',
  },
  {
    id: 3,
    name: "Hawa Kuyateh", 
    role: "Member",
    quote: "Change Starts with one step.",
    image: '/images/team/member4.jpg', 
  },
  {
    id: 4,
    name: "Isatu Barrie", 
    role: "Member",
    quote: "Be the change you seek to see.",
    image: '/images/team/member3.jpg',
  },
  {
    id: 5,
    name: "Alpha", 
    role: "Member",
    quote: "Creating light where there was shadow.",
    image: '/images/team/member5.jpg', 
  },
  {
    id: 6,
    name: "Mariama Jalloh",
    role: "Member",
    quote: "The first step is the greatest act.",
    image: '/images/team/member6.jpg'
  },
  {
    id: 7,
    name: "Sulaiman",
    role: "Member",
    quote: "Action is the truest expression of kindness.",
    image: '/images/team/member7.jpg'
  },
  {
    id: 8,
    name: "Belloh Bah",
    role: "Member",
    quote: "Everyday is a new chance to improve lives.",
    image: '/images/team/member8.jpg'
  },

  {
    id: 9,
    name: "Hamid Shaw",
    role: "Member",
    quote: "We saw a need and chose to meet it.",
    image: '/images/team/member9.jpg'
  },

  {
    id: 10,
    name: "Abdulai Barrie",
    role: "Member",
    quote: "Lifting others,lifts us all.",
    image: '/images/team/member10.jpg'
  },
  {
    id: 11,
    name: "Juldeh Jagitay",
    role: "Member",
    quote: "Meeting needs with kindness.",
    image: '/images/team/member11.jpg'
  }
];

// 2. REAL BO CITY EVENTS (For the Map)
// Bo City is located roughly at Top: 60%, Left: 55% on a standard Sierra Leone map.
// I have calibrated these coordinates for the map component below.
export const mapEvents = [
  {
    id: 1,
    title: "Ramadan Distribution",
    location: "Bo District Village",
    date: "March 24, 2024",
    description: "Distributed provisions to local villagers.",
    // Coordinates for Bo area
    top: "62%", 
    left: "54%",
    color: "bg-neon-blue"
  },
  {
    id: 2,
    title: "Orphanage Support",
    location: "Bo City Orphanage",
    date: "July 28, 2024",
    description: "Donation of supplies and spending time with children.",
    top: "60%", 
    left: "56%",
    color: "bg-neon-pink"
  },
  {
    id: 3,
    title: "Masjid Donation",
    location: "Bo Central Masjid",
    date: "Feb 2025",
    description: "Donated kettles and buckets.",
    top: "58%", 
    left: "55%",
    color: "bg-neon-purple"
  },
  {
    id: 4,
    title: "Hiking Adventure",
    location: "Bo Hills",
    date: "March 31, 2025",
    description: "Team bonding hike.",
    top: "55%", 
    left: "58%",
    color: "bg-neon-blue"
  }
];

export const impactVideos = [
  {
    id: 1,
    title: "Year in Review 2024",
    description: "From our first Ramadan distribution to building a family of 23. This is our journey.",
    
    // 1. THUMBNAIL: Let's use the logo for now because we know it exists.
    // Check if your logo is directly in images or public. 
    // Based on your structure, try one of these (uncomment the one that matches):
    
    thumbnail: "/images/team/logo.png",
    // OR if it's inside team:
    // thumbnail: "/images/team/logo.png",
    
    // 2. VIDEO: This matches your folder structure exactly.
    videoUrl: "/videos/movie.mp4"
  }
];