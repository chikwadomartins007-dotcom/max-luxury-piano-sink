import React, { useState } from 'react';
import { Product, CartItem, ProductFinish, CategoryType, AtmospherePreset } from './types';
import { PRODUCTS } from './data/products';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SystemSimulator } from './components/SystemSimulator';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { ConfiguratorSection } from './components/ConfiguratorSection';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { Footer } from './components/Footer';
import { Check, SlidersHorizontal } from 'lucide-react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // Lumen Lunar Crescent Sconce
      quantity: 1,
      selectedFinish: PRODUCTS[0].finishes[0],
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToCart = (product: Product, quantity = 1, finish?: ProductFinish) => {
    const chosenFinish = finish || product.finishes[0];
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedFinish.id === chosenFinish.id
      );
      if (existingIdx > -1) {
        const next = [...prevCart];
        next[existingIdx].quantity += quantity;
        return next;
      }
      return [...prevCart, { product, quantity, selectedFinish: chosenFinish }];
    });
    showToast(`Added ${quantity}× ${product.name} (${chosenFinish.name}) to Acquisitions`);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleAddSystemPresetToCart = (preset: AtmospherePreset) => {
    // Add the signature sconce and climate dial configured to this atmosphere
    handleAddToCart(PRODUCTS[0], 2, PRODUCTS[0].finishes[0]);
    handleAddToCart(PRODUCTS[1], 1, PRODUCTS[1].finishes[0]);
    showToast(`Configured ${preset.name} suite package (2× Sconces + 1× Climate Dial) in bag.`);
    setIsCartOpen(true);
  };

  const handleSelectSpacePackage = (spaceName: string) => {
    // Add unified cassette + floor node to bag
    handleAddToCart(PRODUCTS[3], 1, PRODUCTS[3].finishes[0]);
    handleAddToCart(PRODUCTS[2], 1, PRODUCTS[2].finishes[0]);
    showToast(`Configured hardware blueprint for ${spaceName} in bag.`);
    setIsCartOpen(true);
  };

  // Filter products by category
  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#080a0f] text-slate-100 flex flex-col font-sans selection:bg-amber-300 selection:text-slate-950">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#121622] border border-amber-300/60 shadow-2xl px-5 py-3.5 rounded-sm flex items-center gap-3 text-xs text-white backdrop-blur-md animate-fade-in">
          <div className="w-5 h-5 rounded-full bg-amber-300 text-slate-950 flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Header */}
      <Header
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectCategory={(cat) => {
          setActiveCategory(cat as CategoryType);
          const el = document.getElementById('systems');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreCollection={() => {
            const el = document.getElementById('systems');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenStudio={() => {
            const el = document.getElementById('studio');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Featured Systems Catalog Section */}
        <section id="systems" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-amber-300 font-medium mb-3">
                <span>Curated Hardware Catalog</span>
                <span aria-hidden="true">·</span>
                <span>Lighting &amp; Climate</span>
              </div>
              <h2
                className="text-3xl sm:text-4xl font-serif text-white tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                The Architectural Collection
              </h2>
            </div>

            {/* Filter Tabs / Segmented Controls (Interactive buttons) */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#10141e] border border-white/10 rounded-sm">
              {[
                { id: 'all', label: 'All Systems' },
                { id: 'lighting', label: 'Smart Lighting' },
                { id: 'climate', label: 'Climate Control' },
                { id: 'unified', label: 'Unified Light & Air' },
                { id: 'hubs', label: 'Control Hubs' },
              ].map((tab) => {
                const isActive = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategory(tab.id as CategoryType)}
                    className={`px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider rounded-sm transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-amber-300 text-slate-950 font-semibold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product Grid: 3-column desktop, 2-column tablet, 1-column mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const inCart = cart.some((i) => i.product.id === product.id);
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickAdd={(p) => handleAddToCart(p, 1)}
                  onOpenDetails={(p) => setSelectedProduct(p)}
                  isAdded={inCart}
                />
              );
            })}
          </div>

          {/* Catalog Count Note */}
          <div className="mt-12 text-center text-xs text-slate-500 font-mono">
            Showing {filteredProducts.length} of {PRODUCTS.length} Architectural Systems · Custom Bespoke Millwork Dimensions Available Upon Request
          </div>
        </section>

        {/* Interactive Penthouse Atmosphere & Climate Simulator */}
        <SystemSimulator onAddSystemPreset={handleAddSystemPresetToCart} />

        {/* Spatial Planning & Residence Configurator */}
        <ConfiguratorSection onSelectSpacePackage={handleSelectSpacePackage} />

        {/* Craftsmanship, Engineering & Attributable Proof */}
        <CraftsmanshipSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Product Detail Modal (PDP) */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
