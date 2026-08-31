import React from 'react';
import { CATEGORIES_DATA } from '../data/products';
import { ProductCategory } from '../types';
import { Sparkles, Flame, Percent } from 'lucide-react';

interface CategoryStoryReelsProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  onOpenFlashSale?: () => void;
}

export const CategoryStoryReels: React.FC<CategoryStoryReelsProps> = ({
  selectedCategory,
  onSelectCategory,
  onOpenFlashSale,
}) => {
  return (
    <div className="w-full bg-white border-b border-zinc-100 py-2.5 px-3 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-3.5 sm:gap-5 min-w-max">
        {/* Flash Sale Story */}
        <button
          onClick={onOpenFlashSale || (() => onSelectCategory('all'))}
          className="flex flex-col items-center gap-1 group cursor-pointer"
        >
          <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-[#f45b16] animate-pulse">
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-zinc-950 flex items-center justify-center text-white border-2 border-white shadow-xs group-hover:scale-105 transition-transform">
              <Flame size={22} className="text-amber-400 fill-amber-400 animate-bounce" />
            </div>
            <span className="absolute -bottom-1 -right-1 bg-red-600 text-white text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-tighter shadow-xs">
              HOT
            </span>
          </div>
          <span className="text-[11px] font-bold text-zinc-900 leading-tight">ফ্ল্যাশ সেল</span>
        </button>

        {/* Category Stories */}
        {CATEGORIES_DATA.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="flex flex-col items-center gap-1 group cursor-pointer"
            >
              <div
                className={`p-0.5 rounded-full transition-all ${
                  isSelected
                    ? 'bg-gradient-to-tr from-[#f45b16] to-yellow-400 ring-2 ring-[#f45b16]/30'
                    : 'bg-gradient-to-tr from-orange-300 via-zinc-200 to-orange-400 group-hover:from-[#f45b16] group-hover:to-yellow-400'
                }`}
              >
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-white border-2 border-white shadow-xs group-hover:scale-105 transition-transform relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
              </div>
              <span
                className={`text-[11px] font-semibold leading-tight max-w-[64px] truncate text-center ${
                  isSelected ? 'text-[#f45b16] font-bold' : 'text-zinc-700'
                }`}
              >
                {cat.banglaName}
              </span>
            </button>
          );
        })}

        {/* 70% Mega Offer Story */}
        <button
          onClick={() => onSelectCategory('all')}
          className="flex flex-col items-center gap-1 group cursor-pointer"
        >
          <div className="p-0.5 rounded-full bg-gradient-to-tr from-yellow-400 via-orange-500 to-[#7bdc00]">
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-yellow-400 to-[#f45b16] flex flex-col items-center justify-center text-white border-2 border-white shadow-xs group-hover:scale-105 transition-transform">
              <span className="text-[11px] font-black leading-none">70%</span>
              <span className="text-[8px] font-extrabold uppercase tracking-tight text-yellow-100">OFF</span>
            </div>
          </div>
          <span className="text-[11px] font-bold text-zinc-900 leading-tight">মেগা অফার</span>
        </button>
      </div>
    </div>
  );
};
