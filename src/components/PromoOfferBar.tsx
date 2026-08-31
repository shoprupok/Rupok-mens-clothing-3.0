import React, { useState } from 'react';
import { Flame, Copy, Check, ArrowRight } from 'lucide-react';
import { RUPOK } from '../data/config';

interface PromoOfferBarProps {
  onShopNow: () => void;
}

export const PromoOfferBar: React.FC<PromoOfferBarProps> = ({ onShopNow }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(RUPOK.offers.promoCode.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      id="promo-offer-bar"
      className="mx-3 sm:mx-4 my-4 p-4 rounded-2xl bg-gradient-to-r from-[#fff9eb] via-[#fff3e0] to-[#fff] border border-amber-200 shadow-xs flex flex-col sm:flex-row justify-between items-center gap-3.5"
    >
      <div className="flex items-center gap-3 text-left w-full sm:w-auto">
        <div className="w-10 h-10 rounded-xl bg-yellow-400 text-zinc-950 flex items-center justify-center font-bold shrink-0 shadow-xs">
          <Flame size={22} className="animate-subtle-pulse text-zinc-950 fill-zinc-950" />
        </div>
        <div>
          <strong className="text-zinc-900 text-sm sm:text-base font-black flex items-center gap-1.5 leading-tight">
            <span>{RUPOK.offers.headline}</span>
            <span className="bg-yellow-400 text-zinc-950 text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-wide shadow-2xs">
              Special Flash Sale
            </span>
          </strong>
          <p className="text-[11px] sm:text-xs text-zinc-600 font-semibold mt-0.5">
            Use code <button onClick={handleCopyCode} className="inline-flex items-center gap-1 font-mono font-black text-zinc-900 bg-yellow-100/80 px-1.5 py-0.5 rounded border border-yellow-300 hover:border-yellow-500 transition-colors">{copied ? <Check size={11} className="text-green-700" /> : <Copy size={11} />} {RUPOK.offers.promoCode.code}</button> for extra {RUPOK.offers.promoCode.discountPercent}% OFF
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        <button
          onClick={onShopNow}
          className="group w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-[#7bdc00] hover:bg-[#6ec500] text-zinc-950 px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <span>SHOP NOW</span>
          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
