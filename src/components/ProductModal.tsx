import React, { useState } from 'react';
import { Product, ProductFinish } from '../types';
import { X, Check, Shield, Truck, Settings, Sparkles, Plus, Minus } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, finish: ProductFinish) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  const [selectedFinish, setSelectedFinish] = useState<ProductFinish>(product.finishes[0]);
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedFinish);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
    >
      <div
        className="relative bg-[#0d111a] border border-white/15 rounded-sm max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Product Details"
          className="absolute top-4 right-4 z-20 p-2 bg-[#080a0f]/80 hover:bg-white/10 text-slate-300 hover:text-white rounded-sm border border-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Gallery / Image Column */}
          <div className="relative bg-[#080a0f] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-white/10 mb-4 bg-black">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              {product.tag && (
                <div className="absolute top-3 left-3 bg-[#080a0f]/90 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-amber-300 border border-white/10">
                  {product.tag}
                </div>
              )}
            </div>

            {/* Architecture Assurance Bar */}
            <div className="space-y-3 pt-4 border-t border-white/10 text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-amber-300 shrink-0" />
                <span>5-Year Concierge Architectural Warranty</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Complimentary Insured White-Glove Transport</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Settings className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Matter, KNX, Control4 &amp; Crestron Compatible</span>
              </div>
            </div>
          </div>

          {/* Contiguous Purchase & Details Column */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Unboxed Metadata */}
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-300 font-medium mb-2">
                <span>{product.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-slate-400">★ {product.rating}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-slate-400">({product.reviewCount} Reviews)</span>
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-tight leading-tight mb-2">
                {product.name}
              </h2>
              <p className="text-sm text-slate-400 mb-6 font-light">
                {product.subtitle}
              </p>

              {/* Price Banner */}
              <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-white/10">
                <span className="font-mono text-2xl sm:text-3xl text-white font-medium tabular-nums">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="font-mono text-sm text-slate-400 line-through tabular-nums">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-xs text-emerald-400 font-mono ml-auto">
                  {product.leadTime}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-300 leading-relaxed font-light mb-6">
                {product.description}
              </p>

              {/* Finish Selection */}
              <div className="mb-6">
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-medium mb-2">
                  Select Architectural Finish: <span className="text-amber-200">{selectedFinish.name}</span>
                </label>
                <div className="flex items-center gap-3">
                  {product.finishes.map((finish) => (
                    <button
                      key={finish.id}
                      onClick={() => setSelectedFinish(finish)}
                      title={finish.name}
                      className={`relative flex items-center gap-2 px-3 py-2 rounded-sm border text-xs cursor-pointer transition-all ${
                        selectedFinish.id === finish.id
                          ? 'border-amber-300 bg-amber-300/10 text-white shadow-sm'
                          : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/30 shrink-0"
                        style={{ backgroundColor: finish.hex }}
                      />
                      <span className="truncate max-w-[120px]">{finish.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Key Features List */}
              <div className="mb-6">
                <h4 className="text-xs uppercase tracking-wider text-slate-300 font-medium mb-3">
                  System Architecture
                </h4>
                <ul className="space-y-2 text-xs text-slate-300 font-light">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-300 mt-0.5">·</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Specifications Table */}
              <div className="mb-6 bg-black/40 border border-white/10 rounded-sm p-4">
                <h4 className="text-xs uppercase tracking-wider text-slate-300 font-medium mb-2.5">
                  Technical Specifications
                </h4>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="py-1 border-b border-white/5 flex flex-col">
                      <span className="text-slate-400 text-[10px] uppercase">{spec.label}</span>
                      <span className="text-white mt-0.5">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contiguous Purchase Module Action Bar */}
            <div className="pt-6 border-t border-white/10 flex items-center gap-4">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-white/15 rounded-sm bg-white/5">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2.5 text-slate-300 hover:text-white cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-xs text-white px-3 tabular-nums font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2.5 text-slate-300 hover:text-white cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Bag CTA */}
              <button
                onClick={handleAdd}
                className="flex-1 py-3.5 px-6 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 text-slate-950 font-medium text-xs uppercase tracking-widest rounded-sm hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-900/20"
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-950" />
                    <span>Added to Residential Order</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>
                      Acquire System · ${(product.price * quantity).toLocaleString()}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
