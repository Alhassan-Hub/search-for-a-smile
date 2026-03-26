import React from 'react';
import { motion } from 'framer-motion';
import { X, Check, Gift } from 'lucide-react';

const DonationModal = ({ onClose }) => {
  const orangeNumber = "076 183486"; 
  const afriNumber = "08X XXX XXX"; 
  const whatsappNumber = "23276439273"; 

  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent("Hello Search for a Smile! 💙 I have just sent a donation. Here is my proof:");
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#0A192F]/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 md:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-[2rem] p-8 max-w-md w-full relative shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-[#64748B] hover:text-[#0A192F] bg-[#F0F4F7] p-2 rounded-full transition-colors">
          <X size={20} />
        </button>

        <div className="text-center mb-8 mt-2">
          <div className="w-16 h-16 bg-[#E0F2FE] rounded-full flex items-center justify-center mx-auto mb-4 text-[#0284C7]">
            <Gift size={32} />
          </div>
          <h2 className="text-3xl font-serif font-bold text-[#0A192F]">Support Our Cause</h2>
          <p className="text-[#64748B] font-sans text-sm mt-2">Make a direct impact via Orange Money or AfriMoney.</p>
        </div>

        <div className="space-y-4">
          <div className="bg-[#FFF7ED] border border-[#FFEDD5] p-5 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#F97316] rounded-full flex items-center justify-center font-bold text-[#FFFFFF] shadow-sm">OM</div>
              <div className="text-left">
                <p className="text-[#F97316] font-bold text-sm uppercase tracking-wider">Orange Money</p>
                <p className="text-[#0A192F] font-mono text-xl font-semibold">{orangeNumber}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#FEF2F2] border border-[#FFEDD5] p-5 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#EF4444] rounded-full flex items-center justify-center font-bold text-[#FFFFFF] shadow-sm">AM</div>
              <div className="text-left">
                <p className="text-[#EF4444] font-bold text-sm uppercase tracking-wider">AfriMoney</p>
                <p className="text-[#0A192F] font-mono text-xl font-semibold">{afriNumber}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#F0F4F7]">
          <ol className="text-[#64748B] text-sm mb-6 space-y-1 font-medium pl-4 list-decimal">
            <li>Send your donation securely.</li>
            <li>Take a screenshot of the receipt.</li>
            <li>Send us the proof on WhatsApp!</li>
          </ol>
          <button onClick={handleWhatsAppRedirect} className="w-full py-4 bg-[#25D366] hover:bg-[#16A34A] text-[#FFFFFF] font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-md hover:-translate-y-1">
            <Check size={20} /> I Have Sent the Money
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DonationModal;