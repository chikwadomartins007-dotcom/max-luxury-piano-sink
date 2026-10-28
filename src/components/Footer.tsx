import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#05070a] border-t border-white/10 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="#"
              className="text-base font-serif tracking-[0.2em] text-white uppercase block"
            >
              MAX LUXURY HOME TECH
            </a>
            <p className="text-slate-400 font-light leading-relaxed max-w-sm">
              Engineers of transcendent circadian illumination and whisper-silent micro-climate
              terminals. Seamlessly integrated into ultra-luxury private residences worldwide.
            </p>
            <div className="pt-2 text-[11px] font-mono text-slate-500">
              Private Client Desk: concierge@maxluxuryhometech.com
            </div>
          </div>

          {/* Systems Column */}
          <div>
            <div className="text-white font-medium uppercase tracking-widest text-[11px] mb-4">
              Systems
            </div>
            <ul className="space-y-2.5 font-light">
              <li>
                <a href="#systems" className="hover:text-amber-200 transition-colors">
                  Lumen Lunar Crescent Sconce
                </a>
              </li>
              <li>
                <a href="#systems" className="hover:text-amber-200 transition-colors">
                  Aura Precision Climate Dial
                </a>
              </li>
              <li>
                <a href="#systems" className="hover:text-amber-200 transition-colors">
                  Crescent Arc Floor Node
                </a>
              </li>
              <li>
                <a href="#systems" className="hover:text-amber-200 transition-colors">
                  Celeste Integrated Matrix
                </a>
              </li>
              <li>
                <a href="#systems" className="hover:text-amber-200 transition-colors">
                  Atmosphere Core Master Bridge
                </a>
              </li>
            </ul>
          </div>

          {/* Integration & Protocols */}
          <div>
            <div className="text-white font-medium uppercase tracking-widest text-[11px] mb-4">
              Integration
            </div>
            <ul className="space-y-2.5 font-light">
              <li>
                <span className="hover:text-slate-200 transition-colors">Matter &amp; Thread Protocol</span>
              </li>
              <li>
                <span className="hover:text-slate-200 transition-colors">KNX Architectural Bus</span>
              </li>
              <li>
                <span className="hover:text-slate-200 transition-colors">Crestron Home Certified</span>
              </li>
              <li>
                <span className="hover:text-slate-200 transition-colors">Control4 Automation</span>
              </li>
              <li>
                <span className="hover:text-slate-200 transition-colors">Lutron Palladiom Pairing</span>
              </li>
            </ul>
          </div>

          {/* Architectural Release Newsletter */}
          <div>
            <div className="text-white font-medium uppercase tracking-widest text-[11px] mb-4">
              Architectural Gazette
            </div>
            <p className="font-light text-slate-400 mb-3 leading-relaxed">
              Receive confidential quarterly releases on new luminaire geometry and HVAC integration blueprints.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="architect@atelier.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0d111a] border border-white/10 px-3 py-2 text-xs rounded-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-300"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to Gazette"
                  className="absolute right-1 top-1 bottom-1 px-2.5 bg-amber-300 text-slate-950 rounded-sm hover:brightness-105 transition-all flex items-center justify-center cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>Subscribed to Private Gazette</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Legal & Single Row */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} MAX LUXURY HOME TECH. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">
              Privacy Architecture
            </a>
            <a href="#" className="hover:text-slate-400 transition-colors">
              Terms of Acquisition
            </a>
            <a href="#" className="hover:text-slate-400 transition-colors">
              Architectural Warranty
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
