import React from 'react';
import { Instagram, Youtube, Share2, MapPin, Bed, Bath, Move, Square } from 'lucide-react';
import { toast } from 'sonner';

interface PropertyHeaderProps {
  refNumber?: string;
  type?: string;
  name?: string;
  location?: string;
  city?: string;
  price?: string;
  beds?: number;
  baths?: number;
  length?: number;
  breadth?: number;
  sqft?: number;
  facing?: string;
  instagramLink?: string;
  youtubeLink?: string;
}

const PropertyHeader: React.FC<PropertyHeaderProps> = ({
  refNumber = '#AHM-SKT-402',
  type = 'Apartment',
  name = 'Skyline Towers: 4BHK Apartment in Ahmedabad',
  location = 'Satellite, Gandhingar Highway, Ahmedabad',
  city = '',
  price = '75,00,000',
  beds = 4,
  baths = 4,
  length = 0,
  breadth = 0,
  sqft = 1200,
  facing,
  instagramLink,
  youtubeLink
}) => {

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const SpecItem = ({ icon: Icon, value, label }: { icon: any; value: string | number; label: string }) => (
    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-[#E6E0DA]">
      <Icon className="w-4 h-4 text-[var(--gold-400)]" />
      <span className="font-red-hat text-sm font-semibold text-[var(--charcoal-ink)]">{value}</span>
      <span className="font-red-hat text-[10px] text-[var(--slate-gray)] uppercase tracking-wider">{label}</span>
    </div>
  );

  return (
    <div className="bg-[#f8fdff]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">

          {/* Main Info Section */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-red-hat font-bold text-[10px] bg-[var(--gold-900)] text-white px-2 py-0.5 rounded uppercase tracking-widest">
                Featured
              </span>
              <span className="font-red-hat text-xs font-bold text-[var(--slate-gray)] uppercase tracking-widest">
                Get A Dream Homeclusive
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="font-fraunces text-3xl sm:text-4xl lg:text-5xl text-[var(--charcoal-ink)] leading-[1.1] tracking-tight">
                {name}
              </h1>
              <div className="flex items-center gap-1.5 text-[var(--slate-gray)]">
                <MapPin className="w-4 h-4 text-[var(--gold-400)]" />
                <span className="font-red-hat text-sm sm:text-base font-medium">
                  {location}{city ? `, ${city}` : ''}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              {type !== 'Plot' ? (
                <>
                  <SpecItem icon={Bed} value={beds} label="Beds" />
                  <SpecItem icon={Bath} value={baths} label="Baths" />
                </>
              ) : (
                <SpecItem icon={Move} value={`${length}x${breadth}`} label="Plot" />
              )}
              <SpecItem icon={Square} value={sqft.toLocaleString()} label="Sq Ft" />
              {facing && <SpecItem icon={Move} value={facing} label="Facing" />}
            </div>
          </div>

          {/* Pricing Section */}
          <div className="lg:text-right space-y-2 p-6 bg-white rounded-3xl border border-[#E6E0DA] lg:min-w-[300px] shadow-sm">
            <p className="font-red-hat text-xs font-bold text-[var(--slate-gray)] uppercase tracking-widest">
              Listing Price
            </p>
            <div className="flex items-baseline lg:justify-end gap-2">
              <span className="font-space-mono text-4xl sm:text-5xl font-bold text-[var(--charcoal-ink)]">
                {price}
              </span>
            </div>

            <div className="flex items-center lg:justify-end gap-4 mt-6">
              {instagramLink && (
                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-[#E6E0DA] text-[var(--charcoal-ink)] hover:text-[#e1306c] hover:shadow-md transition-all"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {youtubeLink && (
                <a
                  href={youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-[#E6E0DA] text-[var(--charcoal-ink)] hover:text-[#ff0000] hover:shadow-md transition-all"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              )}
              <button
                onClick={handleShare}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-[#E6E0DA] text-[var(--charcoal-ink)] hover:shadow-md transition-all"
                title="Copy link"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PropertyHeader;