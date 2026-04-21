import React from 'react';
import { Link } from 'react-router-dom';
import { Bed, Bath, Move, Square } from 'lucide-react';

interface PropertyCardProps {
  id: string;
  image: string;
  name: string;
  price: string;
  location: string;
  city?: string;
  beds: number | string;
  baths: number | string;
  length?: number;
  breadth?: number;
  type?: string;
  facing?: string;
  sqft: number | string;
  badge?: string;
  tags?: string[];
  instagramLink?: string;
  youtubeLink?: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  image,
  name,
  price,
  location,
  city,
  beds,
  baths,
  length,
  breadth,
  type,
  facing,
  sqft,
  badge,
  tags = [],
  instagramLink,
  youtubeLink
}) => {

  return (
    <Link to={`/property/${id}`} className="block group bg-[#FAF8F4] rounded-xl sm:rounded-3xl border border-[#1F3A5F]/5 hover:shadow-2xl hover:shadow-[#38BDF8]/15 transition-all duration-500 overflow-hidden pb-4 sm:pb-5">
      {/* Image Container — compact on mobile, full on desktop */}
      <div className="relative overflow-hidden mb-3 sm:mb-5 h-[220px] sm:h-[300px]">
        <img
          src={(() => {
            if (!image) return '';
            try {
              if (image.includes('ik.imagekit.io')) {
                const url = new URL(image);
                url.searchParams.set("tr", "w-400,q-70");
                return url.toString();
              }
            } catch (e) {
              return image;
            }
            return image;
          })()}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Badge */}
        {badge && (
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-lg text-white font-red-hat text-[9px] font-bold shadow-md ${badge === 'HOT' ? 'bg-black' :
              badge === 'SOLD' ? 'bg-[#1F3A5F]' :
                badge === 'FOR RENT' ? 'bg-[#1F3A5F]' :
                  'bg-black'
            } tracking-widest uppercase`}>
            {badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 space-y-1 sm:space-y-2 relative">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-fraunces font-bold text-[15px] sm:text-2xl text-[#1F3A5F] group-hover:text-[#38BDF8] transition-colors truncate flex-1">
            {name}
          </h3>
          <span className="font-space-mono font-bold text-base sm:text-xl text-[#38BDF8]">
            {price}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-[#4B5563]">
          <span className="font-red-hat text-[11px] sm:text-sm font-medium">
            {location}{city ? `, ${city}` : ''}
          </span>
        </div>

        {/* Specs Row */}
        <div className="flex items-center gap-4 sm:gap-5 pt-3">
          {type !== 'Plot' ? (
            <>
              <div className="flex items-center gap-1.5 text-[#4B5563]">
                <Bed className="w-4 h-4 text-[#1F3A5F]" />
                <span className="font-red-hat text-[11px] sm:text-sm font-bold text-[#1F3A5F]">{beds || 0}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#4B5563]">
                <Bath className="w-4 h-4 text-[#1F3A5F]" />
                <span className="font-red-hat text-[11px] sm:text-sm font-bold text-[#1F3A5F]">{baths || 0}</span>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-1.5 text-[#4B5563]">
              <Move className="w-4 h-4 text-[#1F3A5F]" />
              <span className="font-red-hat text-[11px] sm:text-sm font-bold text-[#1F3A5F]">{length || 0}x{breadth || 0}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-[#4B5563]">
            <Square className="w-4 h-4 text-[#1F3A5F]" />
            <span className="font-red-hat text-[11px] sm:text-sm font-bold text-[#1F3A5F]">{sqft} sqft</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
