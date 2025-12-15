import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Check, Heart, Camera, PenTool, Users, Mic, Truck, Utensils } from 'lucide-react';
import emailjs from '@emailjs/browser'; // Import EmailJS

const BecomeMemberModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    skills: [],
    whyJoin: ''
  });

  // Fun skills to click on
  const skillOptions = [
    { name: 'Photography/Video', icon: Camera },
    { name: 'Graphic Design', icon: PenTool },
    { name: 'Event Planning', icon: Users },
    { name: 'Public Speaking', icon: Mic },
    { name: 'Social Media', icon: Heart },
    { name: 'Teaching', icon: Users },
    { name: 'Cooking', icon: Utensils },
    { name: 'Logistics', icon: Truck },
  ];

  const handleSkillToggle = (skill) => {
    if (formData.skills.includes(skill)) {
      setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
    } else {
      setFormData({ ...formData, skills: [...formData.skills, skill] });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => { if (step < totalSteps) setStep(step + 1); };
  const prevStep = () => { if (step > 1) setStep(step - 1); };
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    const templateParams = {
      ...formData,
      skills: formData.skills.join(', ')
    };

    try {
      const SERVICE_ID = "service_wj6hoft"; 
      const ADMIN_TEMPLATE_ID = "template_j6v5un3"; 
      const USER_TEMPLATE_ID = "template_cjOyqgv";
      const PUBLIC_KEY = "Ve9Z4uAPnHV1dJ-PO";

      // ⚡ CHANGE: Send BOTH at the same time using Promise.all
      await Promise.all([
        emailjs.send(SERVICE_ID, ADMIN_TEMPLATE_ID, templateParams, PUBLIC_KEY),
        emailjs.send(SERVICE_ID, USER_TEMPLATE_ID, templateParams, PUBLIC_KEY)
      ]);

      console.log("✅ Both emails sent successfully!"); // Check console for this

      setSubmitSuccess(true);
      setTimeout(() => onClose(), 4000);
      
    } catch (error) {
      console.error("❌ Email failed:", error); // Check console for this
      alert("Failed to send application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60] flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-[#0f1016] border border-neon-blue/30 rounded-3xl w-full max-w-2xl overflow-hidden relative shadow-2xl shadow-neon-blue/10"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white z-20"><X size={24} /></button>

        {/* PROGRESS BAR */}
        {!submitSuccess && (
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-800">
            <motion.div 
              className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
              initial={{ width: '0%' }}
              animate={{ width: ${(step / totalSteps) * 100}% }}
              transition={{ duration: 0.5 }}
            />
          </div>
        )}

        <div className="p-8 md:p-12 min-h-[500px] flex flex-col">
          {submitSuccess ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                <Check size={48} className="text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Welcome Home!</h2>
              <p className="text-gray-400">Application sent successfully.</p>
            </div>
          ) : (
            <>
              {/* HEADER */}
              <div className="mb-8">
                <span className="text-neon-blue text-sm font-bold tracking-wider">STEP {step} OF {totalSteps}</span>
                <h2 className="text-3xl font-bold text-white mt-2">
                  {step === 1 && "The Basics"}
                  {step === 2 && "Your Superpowers"}
                  {step === 3 && "Your Story"}
                </h2>
              </div>

              {/* STEPS */}
              <div className="flex-1 relative">
                <AnimatePresence mode="wait">
                  
                  {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-white focus:border-neon-blue outline-none" placeholder="Full Name" />
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-white focus:border-neon-blue outline-none" placeholder="Phone Number" />
                      </div>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-white focus:border-neon-blue outline-none" placeholder="Email Address" />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <select name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-white focus:border-neon-blue outline-none">
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-white focus:border-neon-blue outline-none" placeholder="City/Address" />
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <p className="text-gray-400 mb-4 text-sm">Tap the skills you have:</p>
                      <div className="grid grid-cols-2 gap-3">
                        {skillOptions.map((skill) => (
                          <button
                            key={skill.name}
                            onClick={() => handleSkillToggle(skill.name)}
                            className={p-3 rounded-xl border flex items-center gap-2 transition-all ${formData.skills.includes(skill.name) ? 'bg-neon-blue/20 border-neon-blue text-white' : 'bg-gray-900 border-gray-700 text-gray-400'}}
                          >
                            <skill.icon size={18} />
                            <span className="text-sm font-medium">{skill.name}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <label className="text-gray-400 text-sm mb-2 block">Why do you want to join?</label>
                      <textarea name="whyJoin" value={formData.whyJoin} onChange={handleChange} className="w-full h-40 bg-gray-900 border border-gray-700 rounded-xl p-4 text-white focus:border-neon-blue outline-none resize-none" placeholder="Tell us your story..."></textarea>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* BUTTONS */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-800">
                {step > 1 ? (
                  <button onClick={prevStep} className="flex items-center gap-2 text-gray-400 hover:text-white"><ChevronLeft size={20} /> Back</button>
                ) : <div></div>}

                {step < totalSteps ? (
                  <button onClick={nextStep} className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform">Next <ChevronRight size={20} /></button>
                ) : (
                  <button onClick={handleSubmit} disabled={isSubmitting} className="flex items-center gap-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-lg shadow-neon-blue/20">
                    {isSubmitting ? 'Sending...' : 'Submit Application'}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BecomeMemberModal;