import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { Flame, Clock, ShoppingBag, ArrowRight, Zap, Star } from 'lucide-react';

interface FlashDealsSectionProps {
  products: Product[];
  onSelectProduct: (p: Product) => void;
  onQuickAdd: (p: Product) => void;
  onViewAll: () => void;
}

export const FlashDealsSection: React.FC<FlashDealsSectionProps> = ({
  products,
  onSelectProduct,
  onQuickAdd,
  onViewAll,
}) => {
  // Live Countdown Timer (e.g. 5 hours 42 mins 18 secs)
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 43,
    seconds: 29,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 6, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter flash deal products
  const dealProducts = products.filter((p) => p.oldPrice && p.oldPrice > p.price).slice(0, 4);

  return (
    <section id="flash-deals-section" className="mx-3 sm:mx-4 my-4 p-3.5 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-rose-500/10 border border-orange-200/80 shadow-xs relative overflow-hidden">
      {/* Background Decorative Accent */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-orange-400/20 to-transparent rounded-full blur-2xl pointer-events-none" />

      {/* Header Bar with Countdown */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4 pb-3 border-b border-orange-200/60">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center text-white shadow-xs">
            <Zap size={18} className="fill-yellow-300 text-yellow-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-base sm:text-lg font-black text-zinc-900 uppercase tracking-tight">
                FLASH SALE
              </h2>
              <span className="bg-red-500 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full animate-pulse">
                সীমিত সময়
              </span>
            </div>
            <p className="text-[11px] text-zinc-600 font-medium">বিশেষ ছাড়যুক্ত ট্রেন্ডিং কালেকশন</p>
          </div>
        </div>

        {/* Real-time Countdown Box */}
        <div className="flex items-center gap-1 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-xl border border-orange-200 shadow-2xs">
          <Clock size={13} className="text-red-500" />
          <div className="flex items-center gap-1 font-mono font-bold text-xs text-zinc-900">
            <span className="bg-zinc-900 text-white px-1.5 py-0.5 rounded text-[11px]">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span>:</span>
            <span className="bg-zinc-900 text-white px-1.5 py-0.5 rounded text-[11px]">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span>:</span>
            <span className="bg-red-600 text-white px-1.5 py-0.5 rounded text-[11px] animate-pulse">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* Flash Sale Product Cards (2 Columns Mobile / 4 Columns Desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
        {dealProducts.map((product) => {
          const discountPercent = product.oldPrice 
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) 
            : 0;
          
          return (
            <div
              key={product.id}
              className="bg-white rounded-xl overflow-hidden border border-zinc-200/80 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              {/* Product Thumbnail */}
              <div 
                className="relative aspect-[3/4] overflow-hidden bg-zinc-100 cursor-pointer"
                onClick={() => onSelectProduct(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Discount Badge */}
                <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs flex items-center gap-0.5">
                  <Flame size={11} className="fill-yellow-300 text-yellow-300" />
                  <span>-{discountPercent}%</span>
                </div>

                {/* Quick Add Overlay on Desktop */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickAdd(product);
                  }}
                  className="absolute bottom-2 right-2 bg-white/95 hover:bg-[#7bdc00] hover:text-zinc-950 text-zinc-900 p-2 rounded-xl shadow-md transition-all cursor-pointer"
                  title="Quick Add to Cart"
                >
                  <ShoppingBag size={15} />
                </button>
              </div>

              {/* Product Info & Stock Progress */}
              <div className="p-2.5 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-1 text-[10px] text-amber-500 font-bold mb-1">
                    <Star size={11} className="fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-zinc-400">({product.reviewsCount})</span>
                  </div>

                  <h3 
                    onClick={() => onSelectProduct(product)}
                    className="text-xs sm:text-sm font-bold text-zinc-900 line-clamp-1 hover:text-[#f45b16] cursor-pointer transition-colors"
                  >
                    {product.name}
                  </h3>
                  <p className="text-[10.5px] text-zinc-500 font-bangla line-clamp-1 mb-2">
                    {product.banglaName}
                  </p>
                </div>

                <div>
                  {/* Price Row */}
                  <div className="flex items-baseline gap-1.5 mb-2">
                    <span className="text-sm sm:text-base font-black text-[#f45b16]">
                      ৳{product.price}
                    </span>
                    {product.oldPrice && (
                      <span className="text-xs text-zinc-400 line-through">
                        ৳{product.oldPrice}
                      </span>
                    )}
                  </div>

                  {/* Stock Left Urgency Bar */}
                  <div className="w-full bg-orange-100 rounded-full h-2 overflow-hidden mb-1">
                    <div className="bg-gradient-to-r from-orange-500 to-red-600 h-full rounded-full w-[78%]" />
                  </div>
                  <span className="text-[9.5px] text-zinc-500 font-semibold block text-right">
                    🔥 দ্রুত শেষ হচ্ছে (Stock: {product.stock})
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer CTA */}
      <div className="mt-3.5 pt-2 flex justify-center">
        <button
          onClick={onViewAll}
          className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#f45b16] hover:text-[#d4480c] bg-white/90 hover:bg-white px-4 py-2 rounded-xl border border-orange-200 shadow-2xs transition-all cursor-pointer"
        >
          <span>সবগুলো ফ্ল্যাশ ডিল দেখুন</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </section>
  );
};
