import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, ShieldCheck, UserCheck, FileCheck, Wallet, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchMode, setSearchMode] = useState<'standard' | 'ai'>('ai');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const path = searchMode === 'ai' ? '/ai-hub' : '/search';
      navigate(`${path}?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <section 
      className="relative w-full sm:min-h-[85vh] min-h-[100svh] overflow-hidden flex flex-col justify-between bg-[#F0F7FA]"
    >
      {/* Background Image Container */}
      <div 
        className="absolute inset-0 w-full h-full z-0 pointer-events-none sm:bg-contain bg-[length:auto_60%] sm:bg-right-top opacity-100"
        style={{ 
          backgroundImage: "url('https://ik.imagekit.io/kceia4cyw/Property/Gemini_Generated_Image_1vblti1vblti1vbl.png?tr=f-webp')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center 200px',
        }}
      >
        {/* Gradient overlay to blend left side (Hidden on mobile to keep image vibrant) */}
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-[#F0F7FA] via-[#F0F7FA]/50 to-transparent w-full lg:w-[45%]" />
        
        {/* Bottom fade to blend with the section background */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#F0F7FA] to-transparent" />
      </div>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-8 relative z-10 flex-1 flex flex-col items-center text-center py-12 sm:py-20">
        
        {/* Top Spacer for mobile if needed, or just padding */}
        
        {/* Text Content - Positioned at the top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-auto pt-4 sm:pt-8"
        >
          <p className="font-red-hat text-[#4CAF50] font-black text-[10px] sm:text-xs tracking-[3px] uppercase mb-4">
            Your Wish. Our Command.
          </p>

          <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-7xl font-bold text-[#1A2B49] leading-[1.1] mb-6">
            Find Your <span className="text-[#4CAF50]">Dream Home</span> <br />
            in Delhi
          </h1>

          <p className="hidden sm:block font-red-hat text-[#4B5563] text-sm sm:text-lg font-medium leading-relaxed max-w-2xl">
            Verified properties, loan assistance & <span className="text-[#4CAF50] font-bold">0 down payment</span> options.
          </p>
        </motion.div>

        {/* Center Spacer to push search bar to the middle */}
        <div className="flex-1" />

        {/* Search Assembly - Positioned in the center */}
        <div className="flex flex-col items-center w-full max-w-[850px] my-auto py-10 px-2 sm:px-0">
          {/* Search Mode Toggles */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center p-1 bg-white rounded-2xl border border-gray-100 shadow-xl mb-6"
          >
            <button 
              onClick={() => setSearchMode('standard')} 
              className={cn(
                "px-5 sm:px-8 py-2 sm:py-2.5 rounded-xl transition-all flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-widest uppercase",
                searchMode === 'standard' 
                  ? "bg-[#1A2B49] text-white shadow-md" 
                  : "text-[#1A2B49] hover:bg-gray-100"
              )}
            >
              <Search className="w-3.5 h-3.5" />
              Standard
            </button>
            <button 
              onClick={() => setSearchMode('ai')} 
              className={cn(
                "px-5 sm:px-8 py-2 sm:py-2.5 rounded-xl transition-all flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-widest uppercase",
                searchMode === 'ai' 
                  ? "bg-[#4CAF50] text-white shadow-md" 
                  : "text-[#1A2B49] hover:bg-gray-100"
              )}
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI Finder
              <span className={cn("text-[7px] px-1.5 py-0.5 rounded-full ml-1 border", searchMode === 'ai' ? "bg-white/20 border-white/30" : "bg-gray-100 border-gray-200")}>BETA</span>
            </button>
          </motion.div>

          {/* Main Search Bar Card */}
          <motion.form 
            onSubmit={handleSearch}
            className="w-full bg-white rounded-[2rem] p-2 sm:p-3 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 relative z-20"
          >
            <div className="flex-1 flex items-center px-4 sm:px-6 gap-3 sm:gap-4 sm:border-r border-gray-100">
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                {searchMode === 'ai' ? (
                  <Sparkles className="w-5 h-5 text-[#4CAF50]" />
                ) : (
                  <Search className="w-5 h-5 text-[#1A2B49]" />
                )}
              </div>
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={searchMode === 'ai' 
                  ? "Describe your dream home..." 
                  : "Search location, area or project..."
                }
                className="w-full bg-transparent border-none py-4 sm:py-6 text-[#1A2B49] font-red-hat text-sm sm:text-lg placeholder:text-gray-400 focus:outline-none focus:ring-0 font-bold"
              />
            </div>
            
            <button 
              type="submit"
              className="bg-[#4CAF50] hover:bg-[#43a047] text-white px-8 sm:px-12 py-4 sm:py-6 rounded-[1.5rem] font-black font-red-hat flex items-center justify-center gap-3 transition-all shadow-[0_10px_20px_rgba(76,175,80,0.2)] active:scale-95 group shrink-0"
            >
              <span className="tracking-widest uppercase text-xs sm:text-sm">
                {searchMode === 'ai' ? 'Magic Search' : 'Search Now'}
              </span>
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.form>
          
          {/* Try This Tags */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6 relative z-10 px-4"
          >
            <span className="text-white/60 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest mr-1 sm:mr-2">Try:</span>
            {['3 BHK under 50 Lakhs', 'Villa near Bus Stand', 'House in Model Town'].map((tag) => (
              <button 
                key={tag}
                onClick={() => setSearchTerm(tag)}
                className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 text-white text-[8px] sm:text-[10px] font-bold hover:bg-white hover:border-[#4CAF50] hover:text-[#4CAF50] transition-all whitespace-nowrap"
              >
                {tag}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Bottom Spacer to balance the search bar in the middle */}
        <div className="flex-1" />
      </div>
    </section>
  );
};

export default HeroSection;