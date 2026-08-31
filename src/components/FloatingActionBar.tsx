import React from 'react';
import { ShoppingBag, ArrowRight, MessageSquare, PhoneCall, Sparkles } from 'lucide-react';
import { RUPOK } from '../data/config';

interface FloatingActionBarProps {
  cartCount: number;
  subtotal: number;
  onOpenCart: () => void;
  onQuickCheckout: () => void;
}

export const FloatingActionBar: React.FC<FloatingActionBarProps> = ({
  cartCount,
  subtotal,
  onOpenCart,
  onQuickCheckout,
}) => {
  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5 pointer-events-none">
      {/* WhatsApp Concierge floating button */}
      <a
        href={`https://wa.me/${RUPOK.contact.whatsappNumber}?text=Hello%20${encodeURIComponent(RUPOK.brand.nameEnglish)},%20I%20would%20like%20to%20know%20more%20about%20your%20clothing%20collection.`}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto group flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-3.5 py-2.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform active:scale-95 border-2 border-white/80"
        title="Chat with Us on WhatsApp"
        aria-label="WhatsApp Concierge"
      >
        <MessageSquare size={18} className="fill-white text-[#25D366] group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline text-xs font-black tracking-wide pr-1">
          WhatsApp Order
        </span>
      </a>

      {/* Floating Active Cart Bar when items > 0 */}
      {cartCount > 0 && (
        <div className="pointer-events-auto bg-zinc-950 text-white p-2 sm:p-2.5 rounded-2xl shadow-2xl border border-zinc-800 flex items-center gap-2.5 sm:gap-3 animate-in slide-in-from-bottom-5 duration-300 max-w-sm">
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-2.5 py-1.5 hover:bg-zinc-800/80 rounded-xl transition-colors cursor-pointer text-left"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-[#f45b16] flex items-center justify-center text-white">
                <ShoppingBag size={16} />
              </div>
              <span className="absolute -top-1 -right-1 bg-[#7bdc00] text-zinc-950 font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-zinc-950">
                {cartCount}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-400 font-medium block">Your Bag</span>
              <span className="text-xs font-black text-white">৳{subtotal.toLocaleString()}</span>
            </div>
          </button>

          <button
            onClick={onQuickCheckout}
            className="bg-[#7bdc00] hover:bg-[#6ec500] text-zinc-950 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <span>CHECKOUT</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
};
