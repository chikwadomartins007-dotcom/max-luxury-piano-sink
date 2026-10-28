import React, { useState } from 'react';
import { ATMOSPHERE_PRESETS, HERO_IMAGE } from '../data/products';
import { AtmospherePreset } from '../types';
import { Sun, Moon, Thermometer, Wind, Droplets, Sliders, Check, ShieldCheck } from 'lucide-react';

interface SystemSimulatorProps {
  onAddSystemPreset: (preset: AtmospherePreset) => void;
}

export const SystemSimulator: React.FC<SystemSimulatorProps> = ({ onAddSystemPreset }) => {
  const [activePreset, setActivePreset] = useState<AtmospherePreset>(ATMOSPHERE_PRESETS[0]);
  const [kelvin, setKelvin] = useState<number>(ATMOSPHERE_PRESETS[0].lightingTemp);
  const [brightness, setBrightness] = useState<number>(ATMOSPHERE_PRESETS[0].brightness);
  const [temperature, setTemperature] = useState<number>(ATMOSPHERE_PRESETS[0].temperature);
  const [fanSpeed, setFanSpeed] = useState<'whisper' | 'laminar' | 'purify'>('whisper');
  const [appliedNotification, setAppliedNotification] = useState(false);

  const selectPreset = (preset: AtmospherePreset) => {
    setActivePreset(preset);
    setKelvin(preset.lightingTemp);
    setBrightness(preset.brightness);
    setTemperature(preset.temperature);
  };

  // Convert kelvin to an approximate RGB ambient warmth tint
  const getKelvinRgb = (k: number) => {
    if (k <= 2000) return 'rgba(255, 140, 40, ';
    if (k <= 2700) return 'rgba(255, 180, 80, ';
    if (k <= 3500) return 'rgba(255, 215, 140, ';
    if (k <= 4500) return 'rgba(255, 245, 220, ';
    return 'rgba(215, 235, 255, ';
  };

  const overlayOpacity = Math.max(0.15, (brightness / 100) * 0.7);
  const glowRgb = getKelvinRgb(kelvin);

  const handleApply = () => {
    onAddSystemPreset(activePreset);
    setAppliedNotification(true);
    setTimeout(() => setAppliedNotification(false), 2400);
  };

  return (
    <section id="studio" className="py-20 lg:py-28 bg-[#0a0d14] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-amber-300 font-medium mb-3">
            <span>Atmosphere Studio</span>
            <span aria-hidden="true">·</span>
            <span>Real-Time Biophilic Simulation</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-serif text-white tracking-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            Experience The Synergy of Light &amp; Climate
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
            Interact with our proprietary ambient lighting algorithms and micro-zone thermal
            regulation in real time. Watch the residential suite respond instantaneously.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Visual Chamber Preview (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative rounded-sm overflow-hidden border border-white/10 bg-[#06080d] flex-1 min-h-[380px] sm:min-h-[460px]">
              {/* Penthouse Living Room Base Image */}
              <img
                src={HERO_IMAGE}
                alt="Living suite atmosphere simulation preview"
                className="absolute inset-0 w-full h-full object-cover filter contrast-[1.05]"
                referrerPolicy="no-referrer"
              />

              {/* Dynamic Lighting Layer */}
              <div
                className="absolute inset-0 transition-all duration-300 pointer-events-none mix-blend-screen"
                style={{
                  backgroundColor: `${glowRgb}${overlayOpacity})`,
                }}
              />

              {/* Ambient Glow Mask for Crescent Cove */}
              <div
                className="absolute top-0 inset-x-0 h-48 transition-all duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${glowRgb}${Math.min(0.9, overlayOpacity * 1.5)}) 0%, transparent 75%)`,
                }}
              />

              {/* Live Status HUD Overlay */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs text-white/90 bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-sm border border-white/10">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: `${glowRgb}1)` }}
                  />
                  <span className="font-serif tracking-wider uppercase">{activePreset.name}</span>
                </div>
                <div className="flex items-center gap-4 font-mono text-[11px] tabular-nums text-slate-300">
                  <span>{kelvin}K</span>
                  <span>{brightness}% ILLUM</span>
                  <span className="text-amber-300 font-medium">{temperature}°F</span>
                  <span className="hidden sm:inline text-emerald-400">AQI: 12 (EXCELLENT)</span>
                </div>
              </div>

              {/* Subtle Climate Whisper Air indicator */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md p-3.5 rounded-sm border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Wind className="w-4 h-4 text-cyan-300" />
                  <div>
                    <div className="text-xs text-white font-medium">Laminar Micro-Climate Regulation</div>
                    <div className="text-[11px] text-slate-400">
                      Modulating damper acoustic floor: <span className="font-mono text-cyan-300">16.4 dBA</span> · Zero drafts
                    </div>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-slate-300">
                  <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                  <span>48% RH</span>
                </div>
              </div>
            </div>
          </div>

          {/* Controls Console (5 Cols) */}
          <div className="lg:col-span-5 bg-[#0e121a] border border-white/10 p-6 sm:p-8 rounded-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <span className="text-xs uppercase tracking-[0.18em] font-medium text-slate-300 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-300" />
                  Atmospheric Presets
                </span>
                <span className="text-[11px] font-mono text-slate-400">Edge Synchronized</span>
              </div>

              {/* Preset Selector Buttons (Segmented Controls) */}
              <div className="grid grid-cols-2 gap-2.5 mb-8">
                {ATMOSPHERE_PRESETS.map((preset) => {
                  const isActive = activePreset.id === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => selectPreset(preset)}
                      className={`p-3 text-left rounded-sm border transition-all cursor-pointer ${
                        isActive
                          ? 'bg-amber-300/10 border-amber-300/60 text-white shadow-sm'
                          : 'bg-white/5 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-xs font-serif font-medium uppercase tracking-wider text-amber-200">
                        {preset.name}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 mt-1 tabular-nums">
                        {preset.lightingTemp}K · {preset.temperature}°F
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Interactive Sliders */}
              <div className="space-y-6">
                {/* 1. Lighting Color Temperature */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-300 flex items-center gap-2">
                      <Sun className="w-3.5 h-3.5 text-amber-300" />
                      Circadian Color Temperature
                    </span>
                    <span className="font-mono text-amber-200 tabular-nums font-medium">{kelvin} K</span>
                  </div>
                  <input
                    type="range"
                    min="1800"
                    max="6000"
                    step="50"
                    value={kelvin}
                    onChange={(e) => setKelvin(Number(e.target.value))}
                    aria-label="Circadian Color Temperature in Kelvin"
                    className="w-full h-1.5 bg-gradient-to-r from-amber-600 via-amber-200 to-sky-200 rounded-lg appearance-none cursor-pointer accent-amber-300"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 uppercase font-mono">
                    <span>1800K Candle</span>
                    <span>3000K Warm</span>
                    <span>6000K Solar</span>
                  </div>
                </div>

                {/* 2. Light Intensity */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-300 flex items-center gap-2">
                      <Moon className="w-3.5 h-3.5 text-amber-300" />
                      Luminous Density (Dimming)
                    </span>
                    <span className="font-mono text-amber-200 tabular-nums font-medium">{brightness}%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                    aria-label="Luminous Density Dimming Percentage"
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-300"
                  />
                </div>

                {/* 3. Climate Temperature */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-300 flex items-center gap-2">
                      <Thermometer className="w-3.5 h-3.5 text-cyan-300" />
                      Thermal Micro-Zone Setpoint
                    </span>
                    <span className="font-mono text-cyan-300 tabular-nums font-medium">{temperature}°F</span>
                  </div>
                  <input
                    type="range"
                    min="64"
                    max="78"
                    step="0.5"
                    value={temperature}
                    onChange={(e) => setTemperature(Number(e.target.value))}
                    aria-label="Thermal Micro-Zone Setpoint Temperature"
                    className="w-full h-1.5 bg-gradient-to-r from-blue-500 via-slate-700 to-amber-600 rounded-lg appearance-none cursor-pointer accent-cyan-300"
                  />
                </div>

                {/* 4. Laminar Fan Flow Profile */}
                <div>
                  <div className="text-xs text-slate-300 mb-2 flex items-center gap-2">
                    <Wind className="w-3.5 h-3.5 text-slate-400" />
                    Laminar Damper Dynamics
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {(['whisper', 'laminar', 'purify'] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setFanSpeed(mode)}
                        className={`py-2 px-2 text-[11px] uppercase tracking-wider rounded-sm border transition-all cursor-pointer ${
                          fanSpeed === mode
                            ? 'bg-cyan-950/60 border-cyan-400/70 text-cyan-200 font-medium'
                            : 'bg-white/5 border-white/5 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {mode === 'whisper' && '14 dBA Silent'}
                        {mode === 'laminar' && 'Balanced'}
                        {mode === 'purify' && 'Air Purify'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-xs text-slate-400 mb-4 leading-relaxed font-light">
                {activePreset.modeDescription}
              </p>
              <button
                onClick={handleApply}
                className="w-full py-3 px-4 bg-gradient-to-r from-amber-200 to-amber-300 text-slate-950 font-medium text-xs uppercase tracking-widest rounded-sm hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                {appliedNotification ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-950" />
                    <span>Ambience Synchronized to System</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Sync Ambience to Residence Cart</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
