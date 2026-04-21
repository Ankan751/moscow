import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';


const AboutHeritageSection: React.FC = () => {
  return (
    <section className="bg-transparent py-24">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left - Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Elegant Luxury Frame */}
            <div className="absolute -inset-4 border border-[#38BDF8]/30 rounded-2xl md:-inset-6 translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4 -z-10 bg-[#FAF8F4]" />
            <div className="border border-[#1F3A5F]/10 rounded-2xl p-2 bg-white shadow-xl relative z-10">
              <div className="relative h-[400px] sm:h-[600px] lg:h-[700px] rounded-xl overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dp4xt0bve/image/upload/f_webp,q_auto/v1776496833/about_us1.jpg"
                  alt="Architectural detail"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F3A5F]/40 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:pt-12"
          >
            {/* Label */}
            <p className="font-red-hat text-xs uppercase tracking-[2.4px] text-[#4B5563] mb-6 font-bold">
              Our Heritage
            </p>

            {/* Headline */}
            <h2 className="mb-8">
              <span className="font-fraunces text-[36px] sm:text-[40px] leading-[1.25] text-[#1F2937] block font-bold">
                Redefining the Real Estate Landscape with
              </span>
              <span className="font-fraunces italic text-[36px] sm:text-[40px] leading-[1.25] text-[#4B5563] block font-light mt-1">
                Better Property Discovery
              </span>
            </h2>

            {/* Description */}
            <div className="space-y-5 mb-10">
              <p className="font-red-hat text-base leading-7 text-[#4B5563] font-medium">
                Hanumant Properties, led by Chartered Financial Analyst Gaurav Sharma (Director), is a distinguished real estate service dedicated to helping clients buy and invest in property with complete confidence. Combining deep financial expertise with strong local market insight, we deliver a refined, transparent, and seamless property experience. Our approach ensures every transaction is not only smooth and reliable, but also strategically aligned with long-term value and investment growth.
              </p>
            </div>

            {/* Blockquote */}
            <motion.blockquote 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="border-l-[3px] border-[#38BDF8] pl-6 mb-10"
            >
              <p className="font-fraunces italic text-2xl leading-relaxed text-[#1F3A5F]">
                "We believe finding a home should be inspiring,
                not exhausting."
              </p>
            </motion.blockquote>

            {/* Link */}

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutHeritageSection;
