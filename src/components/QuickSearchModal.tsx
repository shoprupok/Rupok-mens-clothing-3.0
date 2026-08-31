import React, { useState } from 'react';
import { Product } from '../types';
import { Search, X, Star, ArrowRight, Sparkles } from 'lucide-react';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (p: Product) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const searchResults = products.filter((p) => {
    if (!query.trim()) return false;
    const q = query.toLowerCase().trim();
    return (
      p.name.toLowerCase().includes(q) ||
      (p.banglaName && p.banglaName.toLowerCase().includes(q)) ||
      p.categoryName.toLowerCase().includes(q) ||
      p.fabric.toLowerCase().includes(q) ||
      p.colors.some((c) => c.name.toLowerCase().includes(q))
    );
  });

  const popularTags = ['Cotton Shirt', 'Polo T-Shirt', 'Oxford', 'Chino Pant', 'Panjabi', 'Drop Shoulder'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden z-10 border border-zinc-100 mt-12 sm:mt-16">
        {/* Search Input Header */}
        <div className="p-4 border-b border-zinc-200 flex items-center gap-3 bg-zinc-50">
          <Search size={20} className="text-[#f45b16]" />
          <input
            type="text"
            autoFocus
            placeholder="Search shirts, polos, pants, fabrics..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm sm:text-base font-medium text-zinc-900 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-zinc-400 hover:text-zinc-700 rounded"
            >
              <X size={16} />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-bold text-zinc-500 hover:text-zinc-900 px-2 py-1 bg-zinc-200/80 rounded-lg"
          >
            ESC
          </button>
        </div>

        {/* Popular Tags */}
        <div className="px-4 py-2.5 bg-orange-50/50 border-b border-orange-100 flex items-center gap-2 overflow-x-auto">
          <span className="text-[11px] font-bold text-zinc-500 shrink-0">Popular:</span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="text-[11px] bg-white border border-orange-200 hover:border-[#f45b16] text-zinc-700 px-2.5 py-0.5 rounded-full whitespace-nowrap transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-zinc-400 text-xs">
              <Sparkles size={24} className="mx-auto text-orange-300 mb-2" />
              Type anything to discover premium styles instantly.
            </div>
          ) : searchResults.length === 0 ? (
            <div className="py-8 text-center text-zinc-500 text-xs">
              No matching products found for "<strong className="text-zinc-900">{query}</strong>".
            </div>
          ) : (
            searchResults.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onClose();
                  onSelectProduct(product);
                }}
                className="flex items-center justify-between p-2.5 rounded-2xl border border-zinc-100 hover:border-orange-200 hover:bg-orange-50/40 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-14 object-cover object-top rounded-xl bg-zinc-100 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-[#f45b16] uppercase">
                      {product.categoryName}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-[#f45b16] transition-colors">
                      {product.name}
                    </h4>
                    <p className="font-bangla text-[10px] text-zinc-400">
                      {product.banglaName}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs sm:text-sm font-black text-zinc-950 block">
                    ৳{product.price.toLocaleString()}
                  </span>
                  <div className="flex items-center gap-0.5 text-[10px] text-orange-500 font-bold justify-end">
                    <Star size={10} fill="currentColor" />
                    <span>{product.rating}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
