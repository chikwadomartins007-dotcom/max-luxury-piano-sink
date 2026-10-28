import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Plus, Minus, Trash2, ShieldCheck, ArrowRight, CheckCircle2, Truck, CreditCard } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    installPreference: 'white-glove',
    paymentMethod: 'card',
  });
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = promoApplied ? rawSubtotal * (discountPercent / 100) : 0;
  const subtotal = Math.max(0, rawSubtotal - discountAmount);
  const whiteGloveThreshold = 2000;
  const isFreeDelivery = rawSubtotal >= whiteGloveThreshold;
  const deliveryFee = rawSubtotal === 0 ? 0 : isFreeDelivery ? 0 : 180;
  const total = subtotal + deliveryFee;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'LUNAR10' || clean === 'ARCHITECT' || clean === 'MAX10') {
      setPromoApplied(true);
      setDiscountPercent(10);
    } else {
      alert('Invalid code. Try "LUNAR10" for 10% private client discount.');
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert('Please fill out all required fields.');
      return;
    }
    const generatedOrderNum = `MLH-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrderNum);
    setCheckoutStep('confirmed');
  };

  const handleResetAndClose = () => {
    onClearCart();
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex justify-end"
    >
      <div
        className="w-full max-w-lg bg-[#0c1017] border-l border-white/10 h-full flex flex-col justify-between shadow-2xl text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#080a0f]">
          <div className="flex items-center gap-2">
            <span className="font-serif tracking-[0.16em] uppercase text-white text-base">
              {checkoutStep === 'cart' && 'Residential Acquisitions'}
              {checkoutStep === 'checkout' && 'White-Glove Dispatch Details'}
              {checkoutStep === 'confirmed' && 'Acquisition Confirmed'}
            </span>
            <span className="font-mono text-xs text-amber-300">
              {checkoutStep === 'cart' && `(${items.reduce((s, i) => s + i.quantity, 0)})`}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart drawer"
            className="p-2 text-slate-400 hover:text-white bg-white/5 rounded-sm border border-white/10 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {checkoutStep === 'cart' && (
            <>
              {/* White Glove Free Threshold Bar */}
              <div className="bg-[#121620] border border-white/10 p-4 rounded-sm text-xs">
                <div className="flex justify-between text-slate-300 mb-1.5 font-medium">
                  <span>
                    {isFreeDelivery
                      ? 'Complimentary White-Glove Installation Unlocked'
                      : `Add $${(whiteGloveThreshold - rawSubtotal).toLocaleString()} for White-Glove Installation`}
                  </span>
                  <span className="font-mono text-amber-300">
                    {Math.min(100, Math.round((rawSubtotal / whiteGloveThreshold) * 100))}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-200 transition-all duration-500"
                    style={{
                      width: `${Math.min(100, (rawSubtotal / whiteGloveThreshold) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Items List */}
              {items.length === 0 ? (
                <div className="text-center py-16 text-slate-400">
                  <p className="font-serif text-lg text-white mb-2">Your acquisition bag is vacant</p>
                  <p className="text-xs text-slate-400 mb-6">
                    Select from our curated collection of architectural lighting and precision climate systems.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 bg-white/10 text-white text-xs uppercase tracking-widest rounded-sm hover:bg-white/15 transition-all cursor-pointer"
                  >
                    Explore Systems
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedFinish.id}`}
                      className="flex gap-4 p-3 bg-[#10141d] border border-white/10 rounded-sm"
                    >
                      {/* Thumbnail */}
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-sm bg-black border border-white/10 shrink-0"
                        referrerPolicy="no-referrer"
                      />

                      {/* Content */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-xs font-serif text-white font-medium truncate">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="text-[11px] text-amber-200/80 font-mono flex items-center gap-1.5 mt-0.5">
                            <span
                              className="w-2 h-2 rounded-full border border-white/20 inline-block"
                              style={{ backgroundColor: item.selectedFinish.hex }}
                            />
                            <span>{item.selectedFinish.name}</span>
                          </div>
                        </div>

                        {/* Price & Stepper */}
                        <div className="flex items-center justify-between pt-2">
                          <span className="font-mono text-xs text-white tabular-nums font-semibold">
                            ${(item.product.price * item.quantity).toLocaleString()}
                          </span>

                          <div className="flex items-center border border-white/10 rounded-sm bg-black/40">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, -1)}
                              className="p-1 text-slate-400 hover:text-white"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono text-[11px] px-2 tabular-nums text-slate-200">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, 1)}
                              className="p-1 text-slate-400 hover:text-white"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Promo Code Input */}
                  <form onSubmit={handleApplyPromo} className="pt-2 flex gap-2">
                    <input
                      type="text"
                      placeholder="Client Privilege Code (Try LUNAR10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 bg-black/40 border border-white/10 px-3 py-2 text-xs rounded-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-300 uppercase tracking-wider"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-white/10 hover:bg-white/15 text-xs text-amber-200 uppercase tracking-wider rounded-sm font-medium transition-all"
                    >
                      Apply
                    </button>
                  </form>
                  {promoApplied && (
                    <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>10% Private Architectural Client Privilege Applied</span>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {checkoutStep === 'checkout' && (
            <form id="checkout-form" onSubmit={handleCompleteOrder} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 uppercase tracking-wider text-[10px] mb-1">
                  Full Name / Client Representative *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. Julian Moreau"
                  value={formData.fullName}
                  onChange={handleFormChange}
                  className="w-full bg-black/40 border border-white/10 p-2.5 rounded-sm text-white focus:outline-none focus:border-amber-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 uppercase tracking-wider text-[10px] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="client@residence.com"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full bg-black/40 border border-white/10 p-2.5 rounded-sm text-white focus:outline-none focus:border-amber-300"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 uppercase tracking-wider text-[10px] mb-1">
                    Direct Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+1 (555) 019-2834"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="w-full bg-black/40 border border-white/10 p-2.5 rounded-sm text-white focus:outline-none focus:border-amber-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 uppercase tracking-wider text-[10px] mb-1">
                  Residence Destination Address *
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  placeholder="144 Central Park West, Penthouse 18B"
                  value={formData.address}
                  onChange={handleFormChange}
                  className="w-full bg-black/40 border border-white/10 p-2.5 rounded-sm text-white focus:outline-none focus:border-amber-300"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-400 uppercase tracking-wider text-[10px] mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="New York"
                    value={formData.city}
                    onChange={handleFormChange}
                    className="w-full bg-black/40 border border-white/10 p-2.5 rounded-sm text-white focus:outline-none focus:border-amber-300"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 uppercase tracking-wider text-[10px] mb-1">
                    State / Region
                  </label>
                  <input
                    type="text"
                    name="state"
                    placeholder="NY"
                    value={formData.state}
                    onChange={handleFormChange}
                    className="w-full bg-black/40 border border-white/10 p-2.5 rounded-sm text-white focus:outline-none focus:border-amber-300"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 uppercase tracking-wider text-[10px] mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="10023"
                    value={formData.postalCode}
                    onChange={handleFormChange}
                    className="w-full bg-black/40 border border-white/10 p-2.5 rounded-sm text-white focus:outline-none focus:border-amber-300"
                  />
                </div>
              </div>

              {/* Delivery Service Selection */}
              <div className="pt-2">
                <label className="block text-slate-400 uppercase tracking-wider text-[10px] mb-1.5">
                  Deployment &amp; Commissioning Tier
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-sm cursor-pointer hover:bg-white/10">
                    <input
                      type="radio"
                      name="installPreference"
                      value="white-glove"
                      checked={formData.installPreference === 'white-glove'}
                      onChange={handleFormChange}
                      className="accent-amber-300"
                    />
                    <div className="text-xs">
                      <div className="text-white font-medium">Complimentary White-Glove Concierge</div>
                      <div className="text-[11px] text-slate-400">
                        Insured courier unboxing + certified commissioning by Max Luxury Home Tech technicians.
                      </div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-sm cursor-pointer hover:bg-white/10">
                    <input
                      type="radio"
                      name="installPreference"
                      value="direct"
                      checked={formData.installPreference === 'direct'}
                      onChange={handleFormChange}
                      className="accent-amber-300"
                    />
                    <div className="text-xs">
                      <div className="text-white font-medium">Direct Architectural Delivery</div>
                      <div className="text-[11px] text-slate-400">
                        Crated shipment directly to your general contractor or electrical installer.
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Payment Method */}
              <div className="pt-2">
                <label className="block text-slate-400 uppercase tracking-wider text-[10px] mb-1.5">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center gap-2 p-2.5 bg-white/5 border border-white/10 rounded-sm cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleFormChange}
                      className="accent-amber-300"
                    />
                    <span className="text-white">Credit Card (Concierge)</span>
                  </label>
                  <label className="flex items-center gap-2 p-2.5 bg-white/5 border border-white/10 rounded-sm cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="wire"
                      checked={formData.paymentMethod === 'wire'}
                      onChange={handleFormChange}
                      className="accent-amber-300"
                    />
                    <span className="text-white">Wire / Bank Invoice</span>
                  </label>
                </div>
              </div>
            </form>
          )}

          {checkoutStep === 'confirmed' && (
            <div className="text-center py-6 space-y-5">
              <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-amber-300">
                  Order Successfully Placed
                </span>
                <h3 className="text-2xl font-serif text-white mt-1">{orderNumber}</h3>
                <p className="text-xs text-slate-400 mt-2">
                  An architectural dispatch confirmation has been transmitted to{' '}
                  <span className="text-white font-medium">{formData.email || 'your email'}</span>.
                </p>
              </div>

              <div className="bg-[#10141d] border border-white/10 p-4 rounded-sm text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400">Client:</span>
                  <span className="text-white font-medium">{formData.fullName}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400">Destination:</span>
                  <span className="text-white truncate max-w-[200px]">{formData.address}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400">Service:</span>
                  <span className="text-amber-200">White-Glove Commissioning</span>
                </div>
                <div className="flex justify-between pt-1 font-mono">
                  <span className="text-slate-400">Total Transacted:</span>
                  <span className="text-white font-semibold text-sm">${total.toLocaleString()}</span>
                </div>
              </div>

              <div className="p-3 bg-amber-400/5 border border-amber-300/20 text-slate-300 text-[11px] rounded-sm text-left flex items-start gap-2">
                <Truck className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <span>
                  Our private client logistics desk will contact you within 2 hours to confirm your residence
                  access window and custom architectural mounting requirements.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer Summary & Controls */}
        <div className="p-6 border-t border-white/10 bg-[#080a0f] space-y-4">
          {checkoutStep !== 'confirmed' && (
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="font-mono text-white tabular-nums">${rawSubtotal.toLocaleString()}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-emerald-400 font-mono">
                  <span>Client Privilege (10%)</span>
                  <span>-${discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400">
                <span>White-Glove Transit &amp; Insurance</span>
                <span className="font-mono text-white tabular-nums">
                  {deliveryFee === 0 ? 'Complimentary' : `$${deliveryFee.toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-medium text-white pt-2 border-t border-white/10">
                <span>Total Investment</span>
                <span className="font-mono text-base text-amber-200 tabular-nums">
                  ${total.toLocaleString()}
                </span>
              </div>
            </div>
          )}

          {checkoutStep === 'cart' && (
            <button
              onClick={() => setCheckoutStep('checkout')}
              disabled={items.length === 0}
              className="w-full py-3.5 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 text-slate-950 font-medium text-xs uppercase tracking-widest rounded-sm hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-amber-900/20"
            >
              <span>Proceed to White-Glove Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {checkoutStep === 'checkout' && (
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setCheckoutStep('cart')}
                className="py-3 px-4 bg-white/5 hover:bg-white/10 text-slate-300 text-xs uppercase tracking-wider rounded-sm transition-all"
              >
                Back
              </button>
              <button
                type="submit"
                form="checkout-form"
                className="flex-1 py-3.5 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 text-slate-950 font-medium text-xs uppercase tracking-widest rounded-sm hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-amber-900/20"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Confirm Architectural Order (${total.toLocaleString()})</span>
              </button>
            </div>
          )}

          {checkoutStep === 'confirmed' && (
            <button
              onClick={handleResetAndClose}
              className="w-full py-3.5 bg-white/10 hover:bg-white/15 text-white text-xs uppercase tracking-widest rounded-sm transition-all cursor-pointer font-medium"
            >
              Return to Catalog
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
