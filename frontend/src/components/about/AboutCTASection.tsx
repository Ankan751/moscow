import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTASection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden min-h-[500px] flex items-center">
      {/* Dynamic Optimized Background Image (WebP via Cloudinary) */}
      <div
        className="absolute inset-0 z-0 scale-105"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/diidko3fa/image/upload/f_auto,q_auto/v1776720252/clay-leconey-XSONkHbAHkU-unsplash_e7oan8.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />

      {/* Luxury Dark Overlay */}
      <div className="absolute inset-0 z-1 bg-gradient-to-r from-[#14263D]/90 via-[#14263D]/70 to-transparent" />
      <div className="absolute inset-0 z-1 bg-black/40" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-[1280px] mx-auto px-8 text-center relative z-10"
      >
        <p className="font-red-hat text-xs uppercase tracking-[4px] text-[#38BDF8] mb-6 font-bold">Get Started</p>
        <h2 className="font-fraunces text-4xl sm:text-5xl font-bold text-white mb-6 drop-shadow-md">
          Ready to Find Your <span className=" italic font-light">Dream Property?</span>
        </h2>

        <div className="flex flex-col sm:flex-row gap-6 mt-15 justify-center items-center">
          <Link
            to="/properties"
            className="bg-white text-black font-red-hat font-bold text-sm px-10 py-4 rounded-lg hover:bg-[#0EA5E9] hover:shadow-lg hover:shadow-[#38BDF8]/30 transition-all uppercase tracking-widest active:scale-95 w-full sm:w-auto text-center"
          >
            Browse Properties
          </Link>
          <Link
            to="/contact"
            className=" bg-white text-black font-red-hat font-bold text-sm px-10 py-4 rounded-lg hover:bg-white hover:text-[#14263D] transition-all uppercase tracking-widest active:scale-95 w-full sm:w-auto text-center"
          >
            Contact Us
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
