import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Check, Heart, Camera, PenTool, Users, Mic, Truck, Utensils } from 'lucide-react';
import emailjs from '@emailjs/browser';

const BecomeMemberModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', address: '', gender: '', skills: [], whyJoin: ''
  });

  const skillOptions = [
    { name: 'Photography', icon: Camera }, { name: 'Design', icon: PenTool },
    { name: 'Events', icon: Users }, { name: 'Speaking', icon: Mic },
    { name: 'Social Media', icon: Heart }, { name: 'Teaching', icon: Users },
    { name: 'Cooking', icon: Utensils }, { name: 'Logistics', icon: Truck },
  ];

  const handleSkillToggle = (skill) => {
    if (formData.skills.includes(skill)) {
      setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
    } else {
      setFormData({ ...formData, skills: [...formData.skills, skill] });
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const nextStep = () => { if (step < totalSteps) setStep(step + 1); };
  const prevStep = () => { if (step > 1) setStep(step - 1); };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // ADDED cc_email here so Mahawa receives it too!
    const templateParams = {
      ...formData,
      skills: formData.skills.join(', '),
      cc_email: 'Mahawagberie@gmail.com' 
    };

    try {
      const SERVICE_ID = "service_wj6hoft"; 
      const ADMIN_TEMPLATE_ID = "template_j6v5un3"; 
      const USER_TEMPLATE_ID = "template_cj0yqgv";
      const PUBLIC_KEY = "Ve9Z4uAPnHV1dJ-PO";

      await Promise.all([
        emailjs.send(SERVICE_ID, ADMIN_TEMPLATE_ID, templateParams, PUBLIC_KEY),
        emailjs.send(SERVICE_ID, USER_TEMPLATE_ID, templateParams, PUBLIC_KEY)
      ]);

      setSubmitSuccess(true);
      setTimeout(() => onClose(), 4000);
    } catch (error) {
      console.error("❌ Email failed:", error);
      alert("Failed to send application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#0A192F]/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}
        className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-[2rem] w-full max-w-2xl overflow-hidden relative shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-[#64748B] hover:text-[#0A192F] bg-[#F0F4F7] p-2 rounded-full z-20 transition-colors">
          <X size={20} />
        </button>

        {!submitSuccess && (
          <div className="absolute top-0 left-0 w-full h-1.5 bg-[#F0F4F7]">
            <motion.div 
              className="h-full bg-[#0284C7]"
              initial={{ width: '0%' }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        )}

        <div className="p-8 md:p-12 min-h-[500px] flex flex-col">
          {submitSuccess ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-[#F0FDF4] rounded-full flex items-center justify-center mb-6">
                <Check size={48} className="text-[#16A34A]" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-[#0A192F] mb-2">Welcome Home!</h2>
              <p className="text-[#64748B] font-sans">Your application was sent successfully. We will be in touch soon.</p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <span className="text-[#0284C7] font-sans text-xs font-bold tracking-widest uppercase block mb-2">
                  Step {step} of {totalSteps}
                </span>
                <h2 className="text-3xl font-serif font-bold text-[#0A192F]">
                  {step === 1 && "The Basics"}
                  {step === 2 && "Your Superpowers"}
                  {step === 3 && "Your Story"}
                </h2>
              </div>

              <div className="flex-1 relative">
                <AnimatePresence mode="wait">
                  
                  {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full bg-[#F0F9FF] border border-[#E2E8F0] rounded-xl p-4 text-[#0A192F] focus:border-[#0284C7] outline-none transition-colors font-sans" placeholder="Full Name" />
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-[#F0F9FF] border border-[#E2E8F0] rounded-xl p-4 text-[#0A192F] focus:border-[#0284C7] outline-none transition-colors font-sans" placeholder="Phone Number" />
                      </div>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-[#F0F9FF] border border-[#E2E8F0] rounded-xl p-4 text-[#0A192F] focus:border-[#0284C7] outline-none transition-colors font-sans" placeholder="Email Address" />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <select name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-[#F0F9FF] border border-[#E2E8F0] rounded-xl p-4 text-[#0A192F] focus:border-[#0284C7] outline-none transition-colors font-sans">
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full bg-[#F0F9FF] border border-[#E2E8F0] rounded-xl p-4 text-[#0A192F] focus:border-[#0284C7] outline-none transition-colors font-sans" placeholder="City/Address" />
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <p className="text-[#64748B] mb-6 font-sans">Tap the skills you can bring to the family:</p>
                      <div className="grid grid-cols-2 gap-3 md:gap-4">
                        {skillOptions.map((skill) => {
                          const isSelected = formData.skills.includes(skill.name);
                          return (
                            <button
                              key={skill.name}
                              onClick={() => handleSkillToggle(skill.name)}
                              className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all font-sans font-medium ${
                                isSelected
                                  ? 'bg-[#0A192F] border-[#0A192F] text-[#FFFFFF] shadow-md'
                                  : 'bg-[#F0F9FF] border-[#E2E8F0] text-[#64748B] hover:border-[#0284C7]'
                              }`}
                            >
                              <skill.icon size={18} className={isSelected ? 'text-[#FFFFFF]' : 'text-[#0284C7]'} />
                              <span>{skill.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <label className="text-[#0A192F] font-bold font-sans mb-3 block">Why do you want to join us?</label>
                      <textarea name="whyJoin" value={formData.whyJoin} onChange={handleChange} className="w-full h-48 bg-[#F0F9FF] border border-[#E2E8F0] rounded-xl p-5 text-[#0A192F] focus:border-[#0284C7] outline-none resize-none font-sans transition-colors" placeholder="Tell us your story..."></textarea>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              <div className="flex justify-between mt-10 pt-6 border-t border-[#F0F4F7]">
                {step > 1 ? (
                  <button onClick={prevStep} className="flex items-center gap-2 text-[#64748B] font-bold font-sans hover:text-[#0A192F] transition-colors">
                    <ChevronLeft size={20} /> Back
                  </button>
                ) : <div></div>}

                {step < totalSteps ? (
                  <button onClick={nextStep} className="flex items-center gap-2 bg-[#F0F4F7] text-[#0A192F] px-8 py-3.5 rounded-full font-bold font-sans hover:bg-[#E2E8F0] transition-colors">
                    Next <ChevronRight size={20} />
                  </button>
                ) : (
                  <button onClick={handleSubmit} disabled={isSubmitting} className="flex items-center justify-center gap-2 bg-[#0284C7] text-[#FFFFFF] px-10 py-3.5 rounded-full font-bold font-sans hover:bg-[#0369A1] transition-all shadow-md hover:-translate-y-1 w-full md:w-auto">
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