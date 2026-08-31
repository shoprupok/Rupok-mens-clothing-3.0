import React from 'react';
import { CATEGORIES_DATA } from '../data/products';
import { ProductCategory } from '../types';
import { ChevronRight } from 'lucide-react';

interface CategoryGridProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  onViewAll: () => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  selectedCategory,
  onSelectCategory,
  onViewAll,
}) => {
  return (
    <section id="category-section" className="px-3 sm:px-4 py-3 sm:py-4">
      {/* Section Head */}
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 tracking-tight">
            Shop By Category
          </h2>
          <p className="text-xs text-zinc-500 font-medium">Explore curated styles for every occasion</p>
        </div>
        <button
          onClick={onViewAll}
          className="group inline-flex items-center gap-0.5 text-xs sm:text-sm font-bold text-[#f45b16] hover:text-[#d4480c] transition-colors cursor-pointer"
        >
          <span>View All</span>
          <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* 4 Column Category Grid matching original template */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
        {CATEGORIES_DATA.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`group flex flex-col items-center text-center p-2 rounded-2xl transition-all cursor-pointer ${
                isSelected ? 'bg-orange-50/80 ring-2 ring-[#f45b16]' : 'hover:bg-zinc-50'
              }`}
            >
              {/* Circular category icon container */}
              <div 
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-2xl sm:text-3xl shadow-xs transition-all transform group-hover:scale-105 ${
                  isSelected 
                    ? 'bg-[#f45b16] text-white shadow-md' 
                    : 'bg-gradient-to-br from-zinc-100 to-zinc-200 text-zinc-800 group-hover:from-orange-100 group-hover:to-orange-200'
                }`}
              >
                <span>{cat.icon}</span>
              </div>

              {/* Title & Bangla Name */}
              <p className="text-[11px] sm:text-xs font-bold text-zinc-800 mt-2 leading-tight">
                {cat.name}
              </p>
              <span className="font-bangla text-[10px] text-zinc-500 font-medium hidden sm:block mt-0.5">
                {cat.banglaName}
              </span>
            </button>
          );
        })}

        {/* "All Categories" 8th Box */}
        <button
          onClick={() => onSelectCategory('all')}
          className={`group flex flex-col items-center text-center p-2 rounded-2xl transition-all cursor-pointer ${
            selectedCategory === 'all' ? 'bg-orange-50/80 ring-2 ring-[#f45b16]' : 'hover:bg-zinc-50'
          }`}
        >
          <div 
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-2xl sm:text-3xl shadow-xs transition-all transform group-hover:scale-105 ${
              selectedCategory === 'all'
                ? 'bg-[#f45b16] text-white shadow-md'
                : 'bg-gradient-to-br from-zinc-900 to-zinc-800 text-white group-hover:bg-[#f45b16]'
            }`}
          >
            <span>▦</span>
          </div>
          <p className="text-[11px] sm:text-xs font-bold text-zinc-800 mt-2 leading-tight">
            All
            <br />
            Categories
          </p>
        </button>
      </div>
    </section>
  );
};
