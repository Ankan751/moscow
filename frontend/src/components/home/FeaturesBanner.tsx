import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, UserCheck, FileCheck, Wallet } from 'lucide-react';

const FeaturesBanner: React.FC = () => {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-4 sm:px-8 relative z-20 -mt-10 sm:-mt-16 mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full bg-white rounded-3xl p-6 sm:pb-8 shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-gray-50"
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
    </section>
  );
};

export default FeaturesBanner;
