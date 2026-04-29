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
    <section className="relative w-full min-h-[85vh] overflow-hidden flex flex-col justify-between bg-[#F0F7FA]">

      {/* Background Image placed more to the right */}
      <div className="absolute inset-0 w-full h-full z-0 flex justify-end pointer-events-none">
        <img
          src="https://ik.imagekit.io/kceia4cyw/Property/Gemini_Generated_Image_1vblti1vblti1vbl.png?tr=f-webp"
          alt="Dream Home Background"
          className="w-full h-full object-contain object-right-top"
        />
        {/* Gradient overlay to blend left side without hiding the center */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F0F7FA] via-[#F0F7FA]/50 to-transparent w-full lg:w-[45%]" />
        {/* Bottom fade for the banner */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#FDFBF7] to-transparent" />
      </div>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-8 relative z-10 flex-1 flex flex-col justify-start pt-24 sm:pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start pt-10 pb-16 lg:py-0"
          >
            <p className="font-red-hat text-[#4CAF50] font-black text-[10px] sm:text-xs tracking-[3px] uppercase mb-4">
              Your Wish. Our Command.
            </p>

            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A2B49] leading-[1.1] mb-6">
              Find Your <br />
              <span className="text-[#4CAF50]">Dream Home</span> <br />
              in Delhi
            </h1>

            <p className="font-red-hat text-[#4B5563] text-sm sm:text-base font-medium mb-10 leading-relaxed max-w-md">
              Verified properties, loan assistance & <br className="hidden sm:block" />
              <span className="text-[#4CAF50] font-bold">0 down payment</span> options.
            </p>


          </motion.div>

          {/* Right side is intentionally empty to let the image show */}
          <div className="hidden lg:block"></div>
        </div>
      </div>

      {/* Floating Search Bar & Features Banner Wrapper */}
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-8 relative z-20 mt-auto">
        <div className="flex flex-col items-center w-full">

          {/* Search Mode Toggles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2 mb-4 relative z-20 -translate-y-[250px]"
          >
            <button
              onClick={() => setSearchMode('standard')}
              className={cn(
                "px-6 py-2.5 rounded-xl backdrop-blur-md border transition-all flex items-center gap-2 text-xs font-bold tracking-widest uppercase",
                searchMode === 'standard'
                  ? "bg-white border-white text-[#1A2B49] shadow-xl"
                  : "bg-black/40 border-white/20 text-white/70 hover:bg-black/60"
              )}
            >
              <Search className={cn("w-3.5 h-3.5", searchMode === 'standard' ? "text-[#4CAF50]" : "text-white/70")} />
              Standard
            </button>
            <button
              onClick={() => setSearchMode('ai')}
              className={cn(
                "px-6 py-2.5 rounded-xl backdrop-blur-md border transition-all flex items-center gap-2 text-xs font-bold tracking-widest uppercase",
                searchMode === 'ai'
                  ? "bg-white border-white text-[#1A2B49] shadow-xl"
                  : "bg-black/40 border-white/20 text-white/70 hover:bg-black/60"
              )}
            >
              <Sparkles className={cn("w-3.5 h-3.5", searchMode === 'ai' ? "text-[#4CAF50]" : "text-white/70")} />
              AI Finder
              <span className="bg-[#4CAF50]/20 text-[#4CAF50] text-[8px] px-1.5 py-0.5 rounded-full ml-1">BETA</span>
            </button>
          </motion.div>

          {/* Search Bar - Glassmorphism style */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSearch}
            className="w-full max-w-[700px] bg-white/20 backdrop-blur-md rounded-2xl p-2.5 shadow-2xl border border-white/30 flex items-center relative z-20 -translate-y-[250px]"
          >
            <div className="flex-1 flex items-center px-4 sm:px-6 gap-4">
              {searchMode === 'ai' ? (
                <Sparkles className="w-5 h-5 text-[#4CAF50]/60" />
              ) : (
                <Search className="w-5 h-5 text-[#4CAF50]/60" />
              )}
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={searchMode === 'ai'
                  ? "Describe your dream home (e.g. '3 BHK near the temple')..."
                  : "Search by location, project or property name..."
                }
                className="w-full bg-transparent border-none py-5 text-black font-red-hat text-base placeholder:text-black/60 focus:outline-none focus:ring-0 font-bold"
              />
            </div>
            <button
              type="submit"
              className="bg-white hover:bg-[#F0FDF4] text-[#1A2B49] px-6 py-4 rounded-xl font-black font-red-hat flex items-center gap-2 transition-all shadow-lg active:scale-95 group"
            >
              {searchMode === 'ai' ? (
                <Sparkles className="w-4 h-4 text-[#4CAF50] group-hover:animate-pulse" />
              ) : (
                <Search className="w-4 h-4 text-[#4CAF50]" />
              )}
              <span className="tracking-widest uppercase text-[10px]">
                {searchMode === 'ai' ? 'Magic Search' : 'Search'}
              </span>
            </button>
          </motion.form>

          {/* Try This Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3 -mt-[234px] mb-12 relative z-10"
          >
            <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest mr-2">Try this:</span>
            {['3 BHK under 50 Lakhs', 'Villa near Bus Stand', 'House in Model Town', 'Plot for investment'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchTerm(tag)}
                className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 text-white text-[10px] font-bold hover:bg-white hover:border-[#4CAF50] hover:text-[#4CAF50] transition-all"
              >
                {tag}
              </button>
            ))}
          </motion.div>

          {/* Features Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="w-full bg-white rounded-3xl p-6 sm:pb-8 shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-gray-50 relative z-10"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 lg:divide-x divide-gray-100">

              <div className="flex items-center gap-4 justify-start sm:justify-center lg:justify-start px-2 lg:px-6">
                <div className="w-12 h-12 rounded-full bg-[#4CAF50]/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-[#4CAF50]" />
                </div>
                <div>
                  <h4 className="font-fraunces font-bold text-[#1A2B49] text-base sm:text-[17px]">Verified Properties</h4>
                  <p className="font-red-hat text-xs sm:text-sm text-[#4B5563] mt-1">100% Verified Listings</p>
                </div>
              </div>

              <div className="flex items-center gap-4 justify-start sm:justify-center lg:justify-start px-2 lg:px-6">
                <div className="w-12 h-12 rounded-full bg-[#4CAF50]/10 flex items-center justify-center shrink-0">
                  <UserCheck className="w-6 h-6 text-[#4CAF50]" />
                </div>
                <div>
                  <h4 className="font-fraunces font-bold text-[#1A2B49] text-base sm:text-[17px]">Loan Assistance</h4>
                  <p className="font-red-hat text-xs sm:text-sm text-[#4B5563] mt-1">Easy Home Loans</p>
                </div>
              </div>

              <div className="flex items-center gap-4 justify-start sm:justify-center lg:justify-start px-2 lg:px-6">
                <div className="w-12 h-12 rounded-full bg-[#4CAF50]/10 flex items-center justify-center shrink-0">
                  <FileCheck className="w-6 h-6 text-[#4CAF50]" />
                </div>
                <div>
                  <h4 className="font-fraunces font-bold text-[#1A2B49] text-base sm:text-[17px]">Legal Checked</h4>
                  <p className="font-red-hat text-xs sm:text-sm text-[#4B5563] mt-1">Secure & Transparent</p>
                </div>
              </div>

              <div className="flex items-center gap-4 justify-start sm:justify-center lg:justify-start px-2 lg:px-6">
                <div className="w-12 h-12 rounded-full bg-[#4CAF50]/10 flex items-center justify-center shrink-0">
                  <Wallet className="w-6 h-6 text-[#4CAF50]" />
                </div>
                <div>
                  <h4 className="font-fraunces font-bold text-[#1A2B49] text-base sm:text-[17px]">0 Down Payment</h4>
                  <p className="font-red-hat text-xs sm:text-sm text-[#4B5563] mt-1">Select Properties</p>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
};

export default HeroSection;