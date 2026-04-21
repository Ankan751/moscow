import React from 'react';

const ContactInfoCards: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Visit Our Office Card */}
      <div className="bg-[#F0F9FF] border border-[#BFDBFE] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
            <span className="material-icons text-2xl text-black">
              location_on
            </span>
          </div>
          <div className="flex-1">
            <h3 className="font-fraunces font-bold text-lg text-[#1F2937] mb-2">
              Visit Our Office
            </h3>
            <p className="font-red-hat font-medium text-sm text-[#4B5563] leading-relaxed mb-3">
              502, Devpath Building,<br />
              Near Torrent Lab,<br />
              Ashram Road, Ahmedabad
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-red-hat font-bold text-sm text-black hover:text-[#0EA5E9] transition-colors"
            >
              <span>Get Directions</span>
              <span className="material-icons text-sm">
                arrow_forward
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Call or Email Us Card */}
      <div className="bg-[#FAF5FF] border border-[#E9D5FF] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="material-icons text-2xl text-black">
              phone
            </span>
          </div>
          <div className="flex-1">
            <h3 className="font-fraunces font-bold text-lg text-[#1F2937] mb-3">
              Call or Email Us
            </h3>
            <div className="space-y-2">
              <a
                href="tel:7819081887"
                className="flex items-center gap-2 font-red-hat font-medium text-sm text-[#4B5563] hover:text-black transition-colors"
              >
                <span className="material-icons text-base">
                  call
                </span>
                <span>78190-81887</span>
              </a>
              <a
                href="tel:9872311311"
                className="flex items-center gap-2 font-red-hat font-medium text-sm text-[#4B5563] hover:text-black transition-colors"
              >
                <span className="material-icons text-base">
                  call
                </span>
                <span>9872 311311</span>
              </a>
              <a
                href="mailto:contact@hanumantproperties.com"
                className="flex items-center gap-2 font-red-hat font-medium text-sm text-[#4B5563] hover:text-black transition-colors"
              >
                <span className="material-icons text-base">
                  email
                </span>
                <span>contact@hanumantproperties.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Business Hours Card */}
      <div className="bg-[#FFFBEB] border border-[#FEF08A] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="material-icons text-2xl text-black">
              schedule
            </span>
          </div>
          <div className="flex-1">
            <h3 className="font-fraunces font-bold text-lg text-[#1F2937] mb-3">
              Business Hours
            </h3>
            <div className="space-y-2 font-red-hat font-medium text-sm text-[#4B5563]">
              <div className="flex justify-between items-center">
                <span>Available:</span>
                <span className="font-bold text-[#1F2937]">24/7 Service</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">Always here for your property needs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoCards;
