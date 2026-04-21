import React from 'react';
import { motion } from 'framer-motion';
import { Award, Feather, Users, MapPin, ShieldCheck, Building2, HardHat, Star } from 'lucide-react';

const WhyChooseSection: React.FC = () => {
  const reasons = [
    {
      icon: Building2,
      title: "PREMIUM PLOTS",
      description: "Exclusive plots available for residential, commercial, and rental investment purposes in prime sectors."
    },
    {
      icon: HardHat,
      title: "CONSTRUCTION EXPERTISE",
      description: "Expertise in providing construction-ready land and technical guidance for all types of development projects."
    },
    {
      icon: Users,
      title: "100+ SATISFIED CLIENTS",
      description: "A strong reputation built on quality and reliability, successfully serving over 100 satisfied clients with transparency."
    },
    {
      icon: Star,
      title: "ELITE TRUST",
      description: "Trusted by high-profile and celebrity clients who demand the highest standards of privacy and professionalism."
    },
    {
      icon: Award,
      title: "END-TO-END SUPPORT",
      description: "Comprehensive guidance including construction services, project management, and legal support from start to finish."
    },
    {
      icon: MapPin,
      title: "PRIME LOCATIONS",
      description: "Strategic focus on prime locations in Dehradun with the highest potential for value appreciation and luxury living."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="bg-transparent py-24 border-t border-[#E5E5E5]/50">
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <p className="font-red-hat text-xs uppercase tracking-[4px] text-[#38BDF8] mb-4 font-bold">
            Hanumant Properties
          </p>
          <h2 className="font-fraunces text-3xl sm:text-4xl font-bold text-[#1F3A5F] mb-6"> Building Your Vision with Confidence </h2>
          <div className="w-12 h-[2px] bg-[#38BDF8] mx-auto mb-8" />
          <p className="font-red-hat text-base text-[#4B5563] leading-relaxed">
            Hanumant Properties is a trusted Dehradun-based real estate firm specializing in premium construction land and end-to-end property solutions. With a strong reputation built on quality and reliability, we cater to a wide range of needs—from residential homes to high-return commercial investments.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16"
        >
          {reasons.map((item, index) => (
            <motion.div variants={itemVariants} key={index} className="flex flex-col items-center text-center group cursor-pointer p-6 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-[#1F3A5F]/5 transition-all duration-500 border border-transparent hover:border-[#1F3A5F]/5">
              {/* Icon Circle */}
              <div className="w-20 h-20 rounded-full bg-[#FAF8F4] border border-[#38BDF8]/20 flex items-center justify-center mb-6 group-hover:bg-[#38BDF8] group-hover:border-[#38BDF8] group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#38BDF8]/30 transition-all duration-500">
                <item.icon className="w-8 h-8 text-[#1F3A5F] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h3 className="font-red-hat font-bold text-lg text-[#1F3A5F] group-hover:text-[#38BDF8] transition-colors mb-3 tracking-[2px] uppercase">
                {item.title}
              </h3>

              {/* Description */}
              <p className="font-red-hat font-medium text-sm text-[#4B5563] leading-relaxed max-w-[300px]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Section Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 text-center max-w-2xl mx-auto"
        >
          <p className="font-cormorant italic text-2xl text-[#1F3A5F] leading-relaxed">
            "At Hanumant Properties, we don’t just sell land—we help you build your vision with confidence and long-term value."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
