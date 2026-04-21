import React from 'react';
import { Search, Grid, List, SlidersHorizontal, ChevronDown } from 'lucide-react';

interface PropertiesHeaderProps {
  total: number;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onSortChange: (sort: string) => void;
  onMobileFilterOpen: () => void;
  onSearch: (term: string) => void;
  searchValue?: string;
  isFilterOpen?: boolean;
}

const PropertiesHeader: React.FC<PropertiesHeaderProps> = ({
  total,
  viewMode,
  onViewModeChange,
  onSortChange,
  onMobileFilterOpen,
  onSearch,
  searchValue = '',
  isFilterOpen = false
}) => {
  return (
    <div className="bg-[#FBFCFF] border-b border-[#E5E5E5]/30 py-8 rounded-b-[40px] shadow-sm mb-8 transition-all">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

          {/* Results Count & Title */}
          <div>
            <h1 className="font-fraunces text-3xl sm:text-4xl text-[#1F3A5F] font-bold mb-1">
              Property Listings
            </h1>
            <p className="font-red-hat text-sm text-[#4B5563]">
              <span className="font-bold text-[#38BDF8]">{total}</span> premium results found
            </p>
          </div>

          {/* Controls Container */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">

            {/* Search Bar Restoration */}
            <div className="relative flex-1 w-full sm:min-w-[300px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4B5563]" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchValue}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full bg-white border border-[#E5E5E5] rounded-xl pl-11 pr-4 py-3 font-red-hat text-sm text-[#1F3A5F] focus:outline-none focus:ring-1 focus:ring-[#38BDF8] focus:border-[#38BDF8] transition-all shadow-sm"
              />
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              {/* Sort Select */}
              <div className="relative group flex-1 sm:flex-none">
                <select
                  onChange={(e) => onSortChange(e.target.value)}
                  className="w-full sm:w-auto appearance-none bg-white border border-[#E6E0DA] rounded-xl px-4 py-3 pr-10 font-red-hat text-sm font-bold text-[var(--charcoal-ink)] uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-[var(--gold-400)] transition-all cursor-pointer shadow-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--charcoal-ink)] pointer-events-none group-hover:translate-y-[-40%] transition-transform" />
              </div>

              {/* View Mode Toggles */}
              <div className="hidden sm:flex items-center bg-white border border-[#E6E0DA] rounded-xl p-1 gap-1 shadow-sm">
                <button
                  onClick={() => onViewModeChange('grid')}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-[var(--charcoal-ink)] shadow-sm' : 'text-[var(--slate-gray)] hover:text-[var(--charcoal-ink)]'
                    }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onViewModeChange('list')}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all ${viewMode === 'list' ? 'bg-white text-[var(--charcoal-ink)] shadow-sm' : 'text-[var(--slate-gray)] hover:text-[var(--charcoal-ink)]'
                    }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default PropertiesHeader;
