import React from 'react';
import { Product } from '../types';
import { Plus, Eye, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickAdd: (product: Product) => void;
  onOpenDetails: (product: Product) => void;
  isAdded?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickAdd,
  onOpenDetails,
  isAdded = false,
}) => {
  return (
    <div className="group relative bg-[#0e121a] border border-white/10 rounded-sm overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/40 hover:shadow-xl hover:shadow-black/50">
      {/* Product Image Stage (65-75% visual weight) */}
      <div
        onClick={() => onOpenDetails(product)}
        className="relative w-full aspect-[4/3] bg-[#090c12] overflow-hidden cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Ambient Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e121a] via-transparent to-transparent opacity-60 pointer-events-none" />

        {/* Subtle Tag (Maximum 1 subtle text tag, clean unboxed text) */}
        {product.tag && (
          <div className="absolute top-3 left-3 bg-[#080a0f]/85 backdrop-blur-md px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-amber-300 border border-white/10">
            {product.tag}
          </div>
        )}

        {/* Hover Quick View Trigger */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40 backdrop-blur-[2px]">
          <span className="px-4 py-2 bg-white text-slate-950 text-xs uppercase tracking-widest font-medium rounded-sm flex items-center gap-1.5 shadow-lg">
            <Eye className="w-3.5 h-3.5" />
            Inspect Specifications
          </span>
        </div>
      </div>

      {/* Product Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata: Category · Rating · Review Count */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium uppercase tracking-wider mb-2">
            <span className="text-amber-300/90">{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-slate-400 tabular-nums">★ {product.rating}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-slate-400 tabular-nums">({product.reviewCount})</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onOpenDetails(product)}
            className="text-base sm:text-lg font-serif text-white hover:text-amber-200 transition-colors cursor-pointer leading-snug mb-1"
          >
            {product.name}
          </h3>

          {/* Subtitle / Architectural Role */}
          <p className="text-xs text-slate-400 line-clamp-1 mb-4 font-light">
            {product.subtitle}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-lg text-white font-medium tabular-nums">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="font-mono text-xs text-slate-400 line-through tabular-nums">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <div className="text-[11px] text-slate-400">{product.leadTime.split('·')[0]}</div>
          </div>

          <button
            onClick={() => onQuickAdd(product)}
            aria-label={`Add ${product.name} to cart`}
            className={`px-3 py-2 text-xs font-medium uppercase tracking-wider rounded-sm transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              isAdded
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-white/5 hover:bg-white/10 text-white border border-white/15'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Acquired</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 text-amber-300" />
                <span>Acquire</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
