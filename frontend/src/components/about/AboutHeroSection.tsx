import React from 'react';
import { motion } from 'framer-motion';
import mainAboutImage from '../../images/Main about image.jpg';

const AboutHeroSection: React.FC = () => {
  return (
    <section className="relative  h-[480px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: `url('${mainAboutImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      {/* Gradient Overlay for Legibility */}
      <div className="absolute inset-0 bg-[#1F3A5F]/30 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B1A]/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-[700px] px-8 relative z-10"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-red-hat text-xs uppercase tracking-[4px] text-white/80 mb-6 font-bold drop-shadow-md"
          >
            About JINI HOMES
          </motion.p>
          <h1 className="font-fraunces text-[48px] sm:text-[56px] leading-tight text-white font-bold mb-6 drop-shadow-xl">
            Redefining Real Estate with<br />
            <span className="font-light italic text-[#E8E2DA]">Intelligence & Elegance</span>
          </h1>

          {/* Luxury Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#4CAF50] to-transparent mx-auto mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="font-red-hat text-lg text-white/90 font-medium leading-relaxed drop-shadow-md"
          >
            Where data-driven precision meets the art of living.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHeroSection;
