import React from 'react';
import { HERO_IMAGE } from '../data/products';
import { ArrowDown, Sliders, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreCollection: () => void;
  onOpenStudio: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCollection, onOpenStudio }) => {
  return (
    <section className="relative overflow-hidden bg-[#080a0f] border-b border-white/10">
      {/* Background Hero Image with Measured Gradient Scrim */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full bg-[#0d111a]">
          <img
            src={HERO_IMAGE}
            alt="Max Luxury Home Tech penthouse architectural lighting and climate installation"
            className="w-full h-full object-cover object-center scale-100 transition-transform duration-1000 ease-out"
            referrerPolicy="no-referrer"
          />
          {/* Subtle multi-stop gradient scrim to guarantee WCAG AA text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#080a0f] via-[#080a0f]/85 to-[#080a0f]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080a0f] via-transparent to-[#080a0f]/30" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 md:pt-28 md:pb-36 min-h-[82vh] flex flex-col justify-end">
        <div className="max-w-3xl">
          {/* Subtle unboxed metadata kicker */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-300/90 font-medium mb-4">
            <span>Signature Architecture</span>
            <span aria-hidden="true">·</span>
            <span>Est. Precision Engineering</span>
            <span aria-hidden="true">·</span>
            <span>Lighting & Climate</span>
          </div>

          {/* Balanced Display Headline */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-white leading-[1.12] mb-6"
            style={{ textWrap: 'balance' }}
          >
            Sculptural Light. <br />
            <span className="italic font-normal text-amber-200">Invisible Climate.</span>
          </h1>

          {/* Body Prose */}
          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed mb-8 max-w-2xl">
            Max Luxury Home Tech engineers circadian moonlight luminaires and whisper-silent
            micro-climate regulation for the world&apos;s most distinguished residences. Designed to be felt,
            not noticed.
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreCollection}
              className="px-6 py-3.5 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 text-slate-950 text-xs font-semibold uppercase tracking-[0.18em] rounded-sm hover:brightness-105 transition-all shadow-lg shadow-amber-900/20 cursor-pointer flex items-center gap-2"
            >
              <span>Explore The Collection</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenStudio}
              className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/20 text-xs font-medium uppercase tracking-[0.18em] rounded-sm transition-all cursor-pointer flex items-center gap-2 backdrop-blur-sm"
            >
              <Sliders className="w-4 h-4 text-amber-300" />
              <span>Simulate Penthouse Atmosphere</span>
            </button>
          </div>
        </div>

        {/* 4-Column Architectural Performance Strip */}
        <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-slate-400">
          <div>
            <div className="font-mono text-xl sm:text-2xl text-white font-medium tabular-nums">98.4 CRI</div>
            <div className="text-xs uppercase tracking-wider text-slate-400 mt-1">Circadian Spectrum</div>
          </div>
          <div>
            <div className="font-mono text-xl sm:text-2xl text-white font-medium tabular-nums">&lt;18 dBA</div>
            <div className="text-xs uppercase tracking-wider text-slate-400 mt-1">Laminar Silent Airflow</div>
          </div>
          <div>
            <div className="font-mono text-xl sm:text-2xl text-white font-medium tabular-nums">±0.1°F</div>
            <div className="text-xs uppercase tracking-wider text-slate-400 mt-1">Micro-Zone Precision</div>
          </div>
          <div>
            <div className="font-mono text-xl sm:text-2xl text-white font-medium tabular-nums">100% Offline</div>
            <div className="text-xs uppercase tracking-wider text-slate-400 mt-1">Cryptographic Edge Core</div>
          </div>
        </div>
      </div>
    </section>
  );
};
