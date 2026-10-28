import React from 'react';
import { Sparkles, Cpu, Wind, Layers, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';

export const CraftsmanshipSection: React.FC = () => {
  return (
    <section id="craftsmanship" className="py-20 lg:py-28 bg-[#080a0f] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-amber-300 font-medium mb-3">
            <span>Engineering &amp; Philosophy</span>
            <span aria-hidden="true">·</span>
            <span>Uncompromising Materiality</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-serif text-white tracking-tight leading-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            Crafted for Architectural Immersion
          </h2>
          <p className="text-slate-400 font-light leading-relaxed text-sm sm:text-base">
            Conventional smart devices impose clutter on walls and ceilings. Max Luxury Home Tech
            dissolves technology into the architectural envelope—combining precision photometrics,
            laminar acoustics, and solid aerospace alloys.
          </p>
        </div>

        {/* 4 Architectural Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <div className="bg-[#0d111a] border border-white/10 p-6 rounded-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-amber-300/10 border border-amber-300/20 rounded-sm flex items-center justify-center text-amber-300 mb-5">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif text-white mb-2">Astronomical Circadian Curves</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Our luminaires mirror the natural spectrum of lunar phases and solar transitions. With
                CRI 98.4+ and zero blue light in twilight mode, your biological clock remains in harmony.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 font-mono text-[11px] text-amber-200/80">
              0.01% Stepless Dimming
            </div>
          </div>

          <div className="bg-[#0d111a] border border-white/10 p-6 rounded-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-cyan-300/10 border border-cyan-300/20 rounded-sm flex items-center justify-center text-cyan-300 mb-5">
                <Wind className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif text-white mb-2">Laminar Acoustic Comfort</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Traditional AC blasts noisy, turbulent air. Our micro-linear cassettes discharge smooth
                laminar air at under 18 decibels—imperceptible to human hearing while regulating temperatures to ±0.1°F.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 font-mono text-[11px] text-cyan-200/80">
              NC-18 Acoustic Rating
            </div>
          </div>

          <div className="bg-[#0d111a] border border-white/10 p-6 rounded-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-amber-300/10 border border-amber-300/20 rounded-sm flex items-center justify-center text-amber-300 mb-5">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif text-white mb-2">Billet Titanium &amp; PVD</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Milled from solid aerospace-grade alloys with physical vapor deposition (PVD) finishes.
                No injection-molded plastics, visible screws, or fragile mechanical switches.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 font-mono text-[11px] text-amber-200/80">
              Grade 5 Titanium Alloy
            </div>
          </div>

          <div className="bg-[#0d111a] border border-white/10 p-6 rounded-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-emerald-300/10 border border-emerald-300/20 rounded-sm flex items-center justify-center text-emerald-300 mb-5">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif text-white mb-2">Cryptographic Edge Autonomy</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Your home commands execute locally in under 5 milliseconds. No external cloud reliance,
                zero telemetry recording, and 100% operational uptime even during wide-area network outages.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 font-mono text-[11px] text-emerald-200/80">
              Zero Cloud Telemetry
            </div>
          </div>
        </div>

        {/* Claim-to-Proof Adjacency: Attributable Testimonials */}
        <div className="pt-12 border-t border-white/10">
          <div className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-6 font-medium">
            Architectural Installations &amp; Client Verdicts
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="bg-[#0b0e15] border border-white/5 p-6 rounded-sm flex flex-col justify-between"
              >
                <p className="text-xs sm:text-sm text-slate-300 italic font-serif leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <div className="text-xs text-white font-medium">{t.author}</div>
                  <div className="text-[11px] text-amber-200/90">{t.role} · {t.firm}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
