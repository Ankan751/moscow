import React, { useState, useEffect } from 'react';
import { ChevronDown, Plus, Minus, Search, Check } from 'lucide-react';
import * as Slider from '@radix-ui/react-slider';

interface FilterSidebarProps {
  onFilterChange: (filters: any) => void;
  filters?: any;
  isOpen?: boolean;
}

const LuxurySwitch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <button
    role="switch"
    aria-checked={checked}
    onClick={onChange}
    className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/30 ${checked ? 'bg-[#38BDF8]' : 'bg-[#E5E5E5]'
      }`}
  >
    <span
      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-1'
        }`}
    />
  </button>
);

const FilterSection = ({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[#E5E5E5] py-6 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full mb-4 group"
      >
        <h3 className="font-red-hat text-[10px] font-bold uppercase tracking-[3px] text-[#1F2937]">{title}</h3>
        <div className="text-[#4B5563] group-hover:text-black transition-colors">
          {open ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        </div>
      </button>
      {open && <div className="space-y-4">{children}</div>}
    </div>
  );
};

const FilterSidebar: React.FC<FilterSidebarProps> = React.memo(({ onFilterChange, filters, isOpen = true }) => {
  const [activeFilters, setActiveFilters] = useState({
    propertyType: filters?.propertyType || [] as string[],
    facing: filters?.facing || '',
    minPrice: filters?.minPrice ?? 0,
    maxPrice: filters?.maxPrice ?? 1000,
    bedrooms: filters?.bedrooms || 0,
    bathrooms: filters?.bathrooms || 0,
    amenities: filters?.amenities || [] as string[]
  });

  useEffect(() => {
    if (filters) {
      setActiveFilters({
        propertyType: filters.propertyType || [],
        facing: filters.facing || '',
        minPrice: filters.minPrice ?? 0,
        maxPrice: filters.maxPrice ?? 1000,
        bedrooms: filters.bedrooms || 0,
        bathrooms: filters.bathrooms || 0,
        amenities: filters.amenities || []
      });
    }
  }, [JSON.stringify(filters)]);

  // Keeps the typing debounce so inputs also don't spam the database
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFilterChange(activeFilters);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [activeFilters.minPrice, activeFilters.maxPrice]);

  const propertyTypes = ['Apartment', 'House', 'Villa', 'Plot', 'Commercial'];
  const facings = ['N', 'S', 'E', 'W', 'NE', 'NW', 'SE', 'SW'];
  const amenities = ['Pool', 'Gym', 'Parking', 'Garden', 'Security', 'Clubhouse'];

  const toggleType = (type: string) => {
    const newTypes = activeFilters.propertyType.includes(type)
      ? activeFilters.propertyType.filter(t => t !== type)
      : [...activeFilters.propertyType, type];

    const next = { ...activeFilters, propertyType: newTypes };
    setActiveFilters(next);
    onFilterChange(next);
  };

  const setFacing = (facing: string) => {
    const next = { ...activeFilters, facing: activeFilters.facing === facing ? '' : facing };
    setActiveFilters(next);
    onFilterChange(next);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'minPrice' | 'maxPrice') => {
    const val = Number(e.target.value);
    setActiveFilters(prev => ({ ...prev, [field]: val }));
  };

  const handleApplyPrice = () => {
    onFilterChange(activeFilters);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleApplyPrice();
      e.currentTarget.blur();
    }
  };

  // Handles the slider dragging (Visual only)
  const handleSliderChange = (value: number[]) => {
    setActiveFilters(prev => ({ ...prev, minPrice: value[0], maxPrice: value[1] }));
  };

  // Handles letting go of the slider (Sends to database)
  const handleSliderCommit = (value: number[]) => {
    const next = { ...activeFilters, minPrice: value[0], maxPrice: value[1] };
    onFilterChange(next);
  };

  return (
    <div className={`w-full h-full bg-transparent ${isOpen ? 'block' : 'hidden lg:block'}`}>

      <div className="flex items-center justify-between mb-8">
        <h2 className="font-fraunces text-2xl font-bold text-[#1F2937]">Refine Results</h2>
        <button
          onClick={() => {
            const reset = { propertyType: [], facing: '', minPrice: 0, maxPrice: 1000, bedrooms: 0, bathrooms: 0, amenities: [] };
            setActiveFilters(reset);
            onFilterChange(reset);
          }}
          className="font-red-hat text-[10px] font-bold text-[#38BDF8] uppercase tracking-widest hover:underline"
        >
          Reset Filters
        </button>
      </div>

      <div className="space-y-1">

        <FilterSection title="Property Type">
          <div className="grid grid-cols-1 gap-2">
            {propertyTypes.map(type => (
              <button
                key={type}
                onClick={() => toggleType(type)}
                className={`flex items-center justify-between px-4 py-3 rounded-lg border transition-all text-sm font-red-hat ${activeFilters.propertyType.includes(type)
                  ? 'bg-[#1F3A5F] border-[#1F3A5F] text-white shadow-md shadow-[#38BDF8]/10'
                  : 'bg-white border-[#E5E5E5] text-[#4B5563] hover:border-[#38BDF8] hover:text-[#1F3A5F]'
                  }`}
              >
                {type}
                {activeFilters.propertyType.includes(type) && <Check className="w-4 h-4 text-[#38BDF8]" />}
              </button>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Price Range (Lakhs)">

          {/* Custom Dual-Thumb Slider */}
          <div className="px-2 py-4 mb-2">
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[Number(activeFilters.minPrice) || 0, Number(activeFilters.maxPrice) || 1000]}
              max={1000}
              step={10}
              onValueChange={handleSliderChange}
              onValueCommit={handleSliderCommit}
            >
              <Slider.Track className="bg-[#E5E5E5] relative grow rounded-full h-1.5">
                <Slider.Range className="absolute bg-[#1F3A5F] rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white border-[3px] border-[#1F3A5F] rounded-full hover:bg-[#FDF8E7] focus:outline-none focus:ring-4 focus:ring-[#38BDF8]/30 hover:border-[#38BDF8] transition-all cursor-grab active:cursor-grabbing shadow-lg"
                aria-label="Minimum Price"
              />
              <Slider.Thumb
                className="block w-5 h-5 bg-white border-[3px] border-[#1F3A5F] rounded-full hover:bg-[#FDF8E7] focus:outline-none focus:ring-4 focus:ring-[#38BDF8]/30 hover:border-[#38BDF8] transition-all cursor-grab active:cursor-grabbing shadow-lg"
                aria-label="Maximum Price"
              />
            </Slider.Root>
          </div>

          {/* Input Boxes Linked to Slider */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-[#9CA3AF]">Min</label>
              <input
                type="number"
                placeholder="0"
                value={activeFilters.minPrice}
                onChange={(e) => handlePriceChange(e, 'minPrice')}
                onKeyDown={handleKeyDown}
                className="w-full bg-white border border-[#E6E0DA] rounded-lg px-3 py-2 text-sm font-bold focus:border-[#38BDF8] outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-[#9CA3AF]">Max</label>
              <input
                type="number"
                placeholder="1000"
                value={activeFilters.maxPrice}
                onChange={(e) => handlePriceChange(e, 'maxPrice')}
                onKeyDown={handleKeyDown}
                className="w-full bg-white border border-[#E6E0DA] rounded-lg px-3 py-2 text-sm font-bold focus:border-[#38BDF8] outline-none"
              />
            </div>
          </div>
          <p className="text-[10px] text-[#9CA3AF] mt-2 italic">Values in Lakhs (e.g., 0.1 = ₹10k, 1 = ₹1L)</p>
        </FilterSection>

        <FilterSection title="Facing Direction">
          <div className="grid grid-cols-4 gap-2">
            {facings.map(f => (
              <button
                key={f}
                onClick={() => setFacing(f)}
                className={`flex items-center justify-center h-10 rounded-lg border transition-all text-xs font-red-hat font-bold ${activeFilters.facing === f
                  ? 'bg-[#1F3A5F] border-[#1F3A5F] text-[#38BDF8] shadow-md shadow-black/5'
                  : 'bg-white border-[#E5E5E5] text-[#4B5563] hover:border-[#38BDF8] hover:text-[#1F3A5F]'
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Bedrooms">
          <div className="flex gap-2">
            {[2, 3, 4, 5].map(b => (
              <button
                key={b}
                onClick={() => {
                  const next = { ...activeFilters, bedrooms: activeFilters.bedrooms === b ? 0 : b };
                  setActiveFilters(next);
                  onFilterChange(next);
                }}
                className={`flex-1 h-12 rounded-xl border transition-all text-sm font-red-hat font-bold ${activeFilters.bedrooms === b
                  ? 'bg-[#1F3A5F] border-[#1F3A5F] text-[#38BDF8] shadow-md shadow-black/5'
                  : 'bg-white border-[#E6E0DA] text-[#5A5856] hover:border-[#38BDF8] hover:text-[#1F3A5F]'
                  }`}
              >
                {b}+
              </button>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Amenities">
          <div className="space-y-4 pt-1">
            {amenities.map(a => (
              <div key={a} className="flex items-center justify-between group">
                <span className="font-red-hat text-sm font-medium text-[#5A5856] group-hover:text-[#1F3A5F] transition-colors">{a}</span>
                <LuxurySwitch
                  checked={activeFilters.amenities.includes(a)}
                  onChange={() => {
                    const newA = activeFilters.amenities.includes(a)
                      ? activeFilters.amenities.filter(item => item !== a)
                      : [...activeFilters.amenities, a];
                    const next = { ...activeFilters, amenities: newA };
                    setActiveFilters(next);
                    onFilterChange(next);
                  }}
                />
              </div>
            ))}
          </div>
        </FilterSection>

      </div>
    </div>
  );
});

export default FilterSidebar;