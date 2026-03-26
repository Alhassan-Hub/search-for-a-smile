import React from 'react';
import { Mail, MapPin, MessageCircle } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      window.scrollTo({ top: elementPosition + window.pageYOffset - offset, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#FFFFFF] pt-20 pb-10 border-t border-[#E2E8F0]">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand */}
          <div className="lg:pr-6">
            <h2 className="text-2xl font-serif font-bold text-[#0A192F] mb-4">
              Search for a Smile.
            </h2>
            <p className="text-[#64748B] font-sans text-sm leading-relaxed mb-6">
              A registered non-profit organization dedicated to empowering mothers, educating children, and protecting girls in Sierra Leone.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-[#0A192F] font-sans font-bold text-sm tracking-widest uppercase mb-6">
              Explore
            </h4>
            <ul className="space-y-4">
              <li><button onClick={() => scrollToSection('home')} className="text-[#64748B] hover:text-[#2563EB] font-sans text-sm transition-colors">Home</button></li>
              <li><button onClick={() => scrollToSection('mission')} className="text-[#64748B] hover:text-[#2563EB] font-sans text-sm transition-colors">What We Do</button></li>
              <li><button onClick={() => scrollToSection('founders')} className="text-[#64748B] hover:text-[#2563EB] font-sans text-sm transition-colors">Leadership</button></li>
              <li><button onClick={() => scrollToSection('replay')} className="text-[#64748B] hover:text-[#2563EB] font-sans text-sm transition-colors">Impact Video</button></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-[#0A192F] font-sans font-bold text-sm tracking-widest uppercase mb-6">
              Resources
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="/sfas-quran.apk" download className="text-[#64748B] hover:text-[#2563EB] font-sans text-sm transition-colors">
                  Download Quran App
                </a>
              </li>
              <li>
                <a href="https://sfas-quran-pwa.vercel.app/" target="_blank" rel="noreferrer" className="text-[#64748B] hover:text-[#2563EB] font-sans text-sm transition-colors">
                  Quran Web Version
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Real Contact Info */}
          <div>
            <h4 className="text-[#0A192F] font-sans font-bold text-sm tracking-widest uppercase mb-6">
              Connect
            </h4>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-[#64748B] font-sans text-sm">
                <MapPin size={16} className="text-[#2563EB] flex-shrink-0 mt-1" />
                <span>Sierra Leone, West Africa</span>
              </li>
              
              {/* REAL EMAIL */}
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#2563EB] flex-shrink-0" />
                <a href="mailto:allanbah73@gmail.com" className="text-[#64748B] font-sans text-sm hover:text-[#2563EB] transition-colors">
                  allanbah73@gmail.com
                </a>
              </li>

              {/* REAL WHATSAPP */}
              <li className="flex items-center gap-3">
                <MessageCircle size={16} className="text-[#2563EB] flex-shrink-0" />
                <a href="https://wa.me/23276439273" target="_blank" rel="noreferrer" className="text-[#64748B] font-sans text-sm hover:text-[#2563EB] transition-colors">
                  +232 76 439273 (WhatsApp)
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#F0F4F7] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#64748B] font-sans text-xs">
            &copy; {currentYear} Search for a Smile. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;