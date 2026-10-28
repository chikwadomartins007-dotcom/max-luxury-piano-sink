import React, { useState } from 'react';
import { ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onSelectCategory: (category: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart, onSelectCategory }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (href: string, category?: string) => {
    setMobileMenuOpen(false);
    if (category) {
      onSelectCategory(category);
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#080a0f]/90 backdrop-blur-md border-b border-white/10 transition-colors">
        {/* Top Bar Announcement Bar */}
        <div className="bg-[#10141e] border-b border-white/5 py-1.5 px-4 text-center text-xs text-slate-400">
          <span className="text-amber-200/90 font-medium">Max Luxury Home Tech</span>
          <span className="mx-2 text-slate-600">·</span>
          <span>Architectural Lighting & Climate Systems</span>
          <span className="mx-2 text-slate-600">·</span>
          <span className="text-slate-300">Complimentary White-Glove Delivery on orders over $2,000</span>
        </div>

        {/* Top Bar Contract: Zone 1 (Brand) — Zone 2 (4-5 Nav Links) — Zone 3 (Primary Action) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
          {/* Zone 1: Wordmark */}
          <a
            href="#"
            className="text-lg sm:text-xl font-serif tracking-[0.18em] text-white hover:text-amber-200 transition-colors uppercase whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span className="text-amber-300/90 text-sm font-sans tracking-normal font-light">☾</span>
            <span>MAX LUXURY HOME TECH</span>
          </a>

          {/* Zone 2: 4–5 concise single-line text links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-[0.15em] font-medium text-slate-300">
            <button
              onClick={() => handleNavClick('#systems', 'all')}
              className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              All Systems
            </button>
            <button
              onClick={() => handleNavClick('#systems', 'lighting')}
              className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Smart Lighting
            </button>
            <button
              onClick={() => handleNavClick('#systems', 'climate')}
              className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Climate Control
            </button>
            <button
              onClick={() => handleNavClick('#studio')}
              className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Atmosphere Studio
            </button>
            <button
              onClick={() => handleNavClick('#craftsmanship')}
              className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Engineering & Craft
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={onOpenCart}
              aria-label="Open Cart Drawer"
              className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-medium uppercase tracking-wider text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 rounded-sm transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <ShoppingBag className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">Acquisitions</span>
              <span className="font-mono tabular-nums text-amber-300 font-semibold">({cartCount})</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="lg:hidden p-2 text-slate-300 hover:text-white bg-white/5 rounded-sm border border-white/10"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-[#080a0f]/95 backdrop-blur-xl flex flex-col pt-20 px-6 pb-8">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <span className="font-serif tracking-[0.16em] text-white text-base uppercase">
              Max Luxury Home Tech
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col gap-6 mt-8 text-sm uppercase tracking-[0.18em] text-slate-300 font-medium">
            <button
              onClick={() => handleNavClick('#systems', 'all')}
              className="text-left py-2 hover:text-amber-300 transition-colors border-b border-white/5 flex items-center justify-between"
            >
              <span>Complete Collection</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </button>
            <button
              onClick={() => handleNavClick('#systems', 'lighting')}
              className="text-left py-2 hover:text-amber-300 transition-colors border-b border-white/5 flex items-center justify-between"
            >
              <span>Smart Lighting Systems</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </button>
            <button
              onClick={() => handleNavClick('#systems', 'climate')}
              className="text-left py-2 hover:text-amber-300 transition-colors border-b border-white/5 flex items-center justify-between"
            >
              <span>Precision Climate Control</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </button>
            <button
              onClick={() => handleNavClick('#studio')}
              className="text-left py-2 hover:text-amber-300 transition-colors border-b border-white/5 flex items-center justify-between"
            >
              <span>Atmosphere Simulator</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </button>
            <button
              onClick={() => handleNavClick('#craftsmanship')}
              className="text-left py-2 hover:text-amber-300 transition-colors border-b border-white/5 flex items-center justify-between"
            >
              <span>Craftsmanship & Specs</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>

          <div className="mt-auto pt-6 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCart();
              }}
              className="w-full py-3.5 bg-gradient-to-r from-amber-200 to-amber-300 text-slate-950 font-medium text-xs uppercase tracking-widest rounded-sm hover:brightness-105 transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Review Bag ({cartCount} Items)</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
