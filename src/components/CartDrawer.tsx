import React, { useState } from 'react';
import { CartItem, DeliveryArea } from '../types';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag, Check, Sparkles } from 'lucide-react';
import { RUPOK } from '../data/config';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  deliveryArea: DeliveryArea;
  setDeliveryArea: (area: DeliveryArea) => void;
  onCheckout: () => void;
  couponCode: string;
  setCouponCode: (code: string) => void;
  discountAmount: number;
  onApplyCoupon: (code: string) => boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  deliveryArea,
  setDeliveryArea,
  onCheckout,
  couponCode,
  setCouponCode,
  discountAmount,
  onApplyCoupon,
}) => {
  if (!isOpen) return null;

  const [inputCode, setInputCode] = useState(couponCode);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState(discountAmount > 0);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee =
    items.length === 0
      ? 0
      : deliveryArea === 'inside_dhaka'
      ? RUPOK.delivery.insideDhaka.fee
      : RUPOK.delivery.outsideDhaka.fee;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  // Free shipping threshold for Inside Dhaka
  const freeShippingThreshold = RUPOK.delivery.insideDhaka.freeShippingThreshold || 2000;
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const success = onApplyCoupon(inputCode.trim());
    if (success) {
      setCouponSuccess(true);
      setCouponError('');
    } else {
      setCouponError(`Invalid coupon code. Try ${RUPOK.offers.promoCode.code}`);
      setCouponSuccess(false);
    }
  };

  const couriersText = RUPOK.delivery.couriers.map((c) => c.name.replace(' Courier', '')).join(' / ');

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          id="cart-drawer-container"
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-zinc-200 flex items-center justify-between bg-zinc-50/70">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-orange-100 text-[#f45b16] flex items-center justify-center">
                <ShoppingBag size={20} />
              </div>
              <div>
                <h2 className="font-extrabold text-base sm:text-lg text-zinc-900 leading-tight">
                  Shopping Bag
                </h2>
                <p className="text-xs text-zinc-500 font-medium">
                  {items.length} {items.length === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200 transition-colors"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Progress bar */}
          {items.length > 0 && (
            <div className="bg-orange-50/70 border-b border-orange-100 p-3 text-xs">
              <div className="flex justify-between items-center mb-1.5 font-bold text-zinc-800">
                <span className="flex items-center gap-1 text-[#f45b16]">
                  <Sparkles size={13} />
                  {amountToFreeShipping === 0 
                    ? '🎉 You unlocked FREE Inside Dhaka Delivery!'
                    : `Add ৳${amountToFreeShipping.toLocaleString()} more for FREE Delivery!`}
                </span>
                <span className="text-[10px] text-zinc-500">৳{freeShippingThreshold.toLocaleString()} Target</span>
              </div>
              <div className="w-full h-1.5 bg-orange-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#f45b16] rounded-full transition-all duration-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-500">
                <div className="w-16 h-16 rounded-full bg-orange-50 text-[#f45b16] flex items-center justify-center mb-3">
                  <ShoppingBag size={30} />
                </div>
                <h3 className="text-base font-bold text-zinc-900">Your bag is empty</h3>
                <p className="text-xs text-zinc-500 mt-1 max-w-xs">
                  Looks like you haven't added any handsome shirts or polos yet.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 bg-[#7bdc00] text-zinc-950 px-5 py-2.5 rounded-xl font-bold text-xs shadow-xs hover:bg-[#6ec500]"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 bg-white p-3 rounded-2xl border border-zinc-200/90 shadow-2xs group hover:border-orange-200 transition-colors"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-22 object-cover object-top rounded-xl bg-zinc-100 shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="text-xs sm:text-sm font-bold text-zinc-900 truncate" title={item.product.name}>
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-zinc-400 hover:text-red-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[11px] text-zinc-500 font-medium">
                        <span className="bg-zinc-100 px-1.5 py-0.5 rounded font-bold text-zinc-800">
                          {item.selectedSize}
                        </span>
                        {item.selectedColor && (
                          <span className="bg-orange-50 text-[#f45b16] px-1.5 py-0.5 rounded font-semibold">
                            {item.selectedColor}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-zinc-100">
                      <span className="font-extrabold text-xs sm:text-sm text-zinc-950">
                        ৳{(item.product.price * item.quantity).toLocaleString()}
                      </span>

                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden bg-zinc-50">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-2 py-0.5 text-zinc-600 hover:bg-zinc-200 text-xs font-bold"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2 py-0.5 text-xs font-bold text-zinc-900 min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2 py-0.5 text-zinc-600 hover:bg-zinc-200 text-xs font-bold"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Calculations and Checkout */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-zinc-200 bg-zinc-50/90 space-y-3">
              {/* Delivery Area Picker */}
              <div>
                <label className="text-[11px] font-bold text-zinc-700 block mb-1.5">
                  Select Delivery Location:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryArea('inside_dhaka')}
                    className={`p-2 rounded-xl text-left border text-xs transition-all cursor-pointer ${
                      deliveryArea === 'inside_dhaka'
                        ? 'border-[#f45b16] bg-orange-50 text-[#f45b16] font-bold shadow-xs'
                        : 'border-zinc-200 bg-white text-zinc-700'
                    }`}
                  >
                    <div className="flex justify-between">
                      <span>Inside Dhaka</span>
                      <strong>{RUPOK.delivery.insideDhaka.feeFormatted}</strong>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryArea('outside_dhaka')}
                    className={`p-2 rounded-xl text-left border text-xs transition-all cursor-pointer ${
                      deliveryArea === 'outside_dhaka'
                        ? 'border-[#f45b16] bg-orange-50 text-[#f45b16] font-bold shadow-xs'
                        : 'border-zinc-200 bg-white text-zinc-700'
                    }`}
                  >
                    <div className="flex justify-between">
                      <span>Outside Dhaka</span>
                      <strong>{RUPOK.delivery.outsideDhaka.feeFormatted}</strong>
                    </div>
                  </button>
                </div>
              </div>

              {/* Coupon Form */}
              <form onSubmit={handleCouponSubmit} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={14} className="absolute left-2.5 top-2.5 text-zinc-400" />
                  <input
                    type="text"
                    placeholder={`Coupon code (e.g. ${RUPOK.offers.promoCode.code})`}
                    value={inputCode}
                    onChange={(e) => {
                      setInputCode(e.target.value.toUpperCase());
                      setCouponError('');
                    }}
                    className="w-full bg-white border border-zinc-200 rounded-xl pl-8 pr-3 py-1.5 text-xs uppercase font-mono font-bold text-zinc-900 focus:outline-none focus:border-[#f45b16]"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-zinc-900 hover:bg-[#f45b16] text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {couponError && <p className="text-[11px] text-red-600 font-semibold">{couponError}</p>}
              {couponSuccess && (
                <p className="text-[11px] text-green-700 font-semibold flex items-center gap-1">
                  <Check size={12} strokeWidth={3} /> Code applied! {RUPOK.offers.promoCode.discountPercent}% discount saved.
                </p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1 text-xs pt-2 border-t border-zinc-200/80">
                <div className="flex justify-between text-zinc-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-zinc-900">৳{subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-700 font-semibold">
                    <span>Coupon Discount</span>
                    <span>-৳{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-600">
                  <span>
                    Delivery Charge ({deliveryArea === 'inside_dhaka' ? 'Inside Dhaka' : 'Outside Dhaka'})
                  </span>
                  <span className="font-semibold text-zinc-900">৳{deliveryFee}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-black text-zinc-950 pt-2 border-t border-zinc-200">
                  <span>Total Amount</span>
                  <span className="text-[#f45b16]">৳{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Button with signatures */}
              <button
                id="cart-checkout-btn"
                onClick={onCheckout}
                className="w-full py-3.5 bg-[#7bdc00] hover:bg-[#6ec500] text-zinc-950 font-black rounded-xl text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight size={16} />
              </button>

              <div className="flex justify-between items-center text-[10px] text-zinc-500 font-semibold pt-1">
                <span>🛡️ Cash on Delivery Available</span>
                <span>🚚 Delivered via {couriersText}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
