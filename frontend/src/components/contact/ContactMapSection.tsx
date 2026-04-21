import React from 'react';
import mapLocationImage from '../../images/Map_Location.jpg';

const ContactMapSection: React.FC = () => {
  return (
    <section className="bg-[#FFFFFF] py-16">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="relative aspect-[1280/400] rounded-2xl overflow-hidden border border-[#E6E0DA] bg-gray-100">
          {/* Map Image */}
          <img
            src={mapLocationImage}
            alt="Office location map"
            className="w-full h-full object-cover"
          />

          {/* Map Overlay Button */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/5 hover:bg-black/10 transition-all">
            <button className="bg-white shadow-2xl rounded-lg px-8 py-4 flex items-center gap-3 hover:shadow-3xl transition-shadow group">
              <span className="material-icons text-2xl text-black group-hover:scale-110 transition-transform">
                location_on
              </span>
              <div className="text-left">
                <p className="font-fraunces font-bold text-base text-[#1F2937] mb-0.5">
                  Hanumant Properties Office
                </p>
                <p className="font-red-hat font-extralight text-xs text-[#4B5563]">
                  Click to view on Google Maps
                </p>
              </div>
              <span className="material-icons text-black">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMapSection;
