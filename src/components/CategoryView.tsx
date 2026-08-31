import React from 'react';
import { CATEGORIES_DATA, PRODUCTS_DATA } from '../data/products';
import { ProductCategory } from '../types';
import { ChevronRight, Sparkles } from 'lucide-react';

interface CategoryViewProps {
  onSelectCategory: (cat: ProductCategory) => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({ onSelectCategory }) => {
  return (
    <div className="px-3 sm:px-4 py-4 space-y-5 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-6 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-[#f45b16] uppercase tracking-wider mb-1">
          <Sparkles size={14} /> Catalog Index
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
          Explore All Categories
        </h1>
        <p className="text-xs text-zinc-500 font-medium mt-0.5">
          Curated Bangladeshi men's collections tailored for comfort, fit, and elegance.
        </p>
      </div>

      {/* Categories Grid with visual cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {CATEGORIES_DATA.map((cat) => {
          const itemCount = PRODUCTS_DATA.filter((p) => p.category === cat.id).length;
          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative bg-white border border-zinc-200/90 hover:border-orange-300 rounded-3xl overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              {/* Category Image */}
              <div className="relative aspect-[4/3] bg-zinc-100 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Floating Icon */}
                <div className="absolute top-3 left-3 w-10 h-10 rounded-2xl bg-white/90 backdrop-blur-xs flex items-center justify-center text-xl shadow-md">
                  {cat.icon}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-base font-black leading-tight drop-shadow-sm">
                    {cat.name}
                  </h3>
                  <p className="font-bangla text-xs text-zinc-200 font-medium">
                    {cat.banglaName}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-3.5 flex items-center justify-between bg-white">
                <span className="text-xs font-semibold text-zinc-500">
                  {itemCount} {itemCount === 1 ? 'Design' : 'Designs'} Available
                </span>

                <span className="w-8 h-8 rounded-full bg-orange-50 group-hover:bg-[#f45b16] text-[#f45b16] group-hover:text-white flex items-center justify-center transition-colors">
                  <ChevronRight size={16} />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
