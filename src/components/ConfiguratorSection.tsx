import React, { useState } from 'react';
import { RESIDENCE_SPACES } from '../data/products';
import { Check, Compass, ArrowRight } from 'lucide-react';

interface ConfiguratorSectionProps {
  onSelectSpacePackage: (spaceName: string) => void;
}

export const ConfiguratorSection: React.FC<ConfiguratorSectionProps> = ({ onSelectSpacePackage }) => {
  const [selectedSpace, setSelectedSpace] = useState(RESIDENCE_SPACES[0]);

  return (
    <section className="py-20 lg:py-24 bg-[#0a0d14] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-amber-300 font-medium mb-3">
              <span>Spatial Planning</span>
              <span aria-hidden="true">·</span>
              <span>Architectural Specifications</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl font-serif text-white tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Curate Your Residential Space
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-light max-w-md">
            Every residence requires harmonious distribution of photometric lumens and thermal air volumes.
            Select your architectural space to inspect optimal node configurations.
          </p>
        </div>

        {/* Space Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {RESIDENCE_SPACES.map((space) => {
            const isSelected = selectedSpace.id === space.id;
            return (
              <button
                key={space.id}
                onClick={() => setSelectedSpace(space)}
                className={`p-6 text-left rounded-sm border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#121622] border-amber-300/80 shadow-lg text-white'
                    : 'bg-[#0e121a] border-white/10 text-slate-400 hover:text-slate-200 hover:bg-[#121620]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-serif text-lg text-white font-medium">{space.name}</span>
                  {isSelected && <span className="text-amber-300 font-mono text-xs">Selected</span>}
                </div>
                <p className="text-xs text-slate-400 mb-4 font-light leading-relaxed">
                  {space.description}
                </p>
                <div className="font-mono text-xs text-amber-200/90">{space.estimatedCoverage}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Space Layout Card */}
        <div className="bg-[#0e121a] border border-white/10 p-6 sm:p-8 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-400">
              <Compass className="w-4 h-4 text-amber-300" />
              <span>Recommended Hardware &amp; Cassette Blueprint</span>
            </div>
            <h3 className="text-xl font-serif text-white">
              {selectedSpace.name} Atmospheric Integration
            </h3>
            <p className="text-sm text-amber-200/90 font-light">
              {selectedSpace.recommendedFixtures}
            </p>
          </div>

          <button
            onClick={() => onSelectSpacePackage(selectedSpace.name)}
            className="px-6 py-3.5 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 text-slate-950 font-medium text-xs uppercase tracking-widest rounded-sm hover:brightness-105 transition-all flex items-center gap-2 whitespace-nowrap shrink-0 shadow-md cursor-pointer"
          >
            <span>Request Space Blueprint &amp; Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
