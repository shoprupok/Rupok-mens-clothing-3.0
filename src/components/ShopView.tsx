import React, { useState } from 'react';
import { Product, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';
import { CATEGORIES_DATA } from '../data/products';
import { Filter, SlidersHorizontal, ArrowUpDown, Sparkles } from 'lucide-react';

interface ShopViewProps {
  products: Product[];
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  wishlistIds: Set<string>;
  onToggleWishlist: (p: Product) => void;
  onQuickAdd: (p: Product) => void;
  onSelectProduct: (p: Product) => void;
  justAddedId: string | null;
}

export const ShopView: React.FC<ShopViewProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  wishlistIds,
  onToggleWishlist,
  onQuickAdd,
  onSelectProduct,
  justAddedId,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [priceFilter, setPriceFilter] = useState<number>(2000);

  const filteredProducts = products
    .filter((p) => {
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchPrice = p.price <= priceFilter;
      return matchCat && matchPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });

  return (
    <div className="px-3 sm:px-4 py-4 space-y-5 max-w-6xl mx-auto">
      {/* Category Pills Slider */}
      <div className="bg-white border border-zinc-200 rounded-2xl p-3 shadow-2xs">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#f45b16] text-white shadow-xs'
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
            }`}
          >
            All Products ({products.length})
          </button>

          {CATEGORIES_DATA.map((cat) => {
            const count = products.filter((p) => p.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#f45b16] text-white shadow-xs'
                    : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20' : 'bg-zinc-200'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Control Bar: Count + Sort + Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-50 border border-zinc-200/80 rounded-2xl p-3.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-zinc-800">
            Showing <span className="text-[#f45b16] font-black">{filteredProducts.length}</span> Products
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Price Range Filter Slider */}
          <div className="hidden sm:flex items-center gap-2 text-xs">
            <span className="text-zinc-500 font-medium">Max Price:</span>
            <span className="font-bold text-zinc-900">৳{priceFilter}</span>
            <input
              type="range"
              min={500}
              max={2500}
              step={50}
              value={priceFilter}
              onChange={(e) => setPriceFilter(Number(e.target.value))}
              className="accent-[#f45b16] w-24"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 bg-white border border-zinc-200 rounded-xl px-2.5 py-1.5 text-xs">
            <ArrowUpDown size={13} className="text-zinc-400" />
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-transparent font-bold text-zinc-800 focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured / Best Sellers</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white border border-zinc-200 rounded-3xl p-12 text-center text-zinc-500 space-y-2">
          <p className="text-base font-bold text-zinc-800">No products match your filter</p>
          <p className="text-xs text-zinc-500">Try adjusting the price slider or selecting another category.</p>
          <button
            onClick={() => {
              onSelectCategory('all');
              setPriceFilter(2500);
            }}
            className="mt-3 bg-[#f45b16] text-white text-xs font-bold px-4 py-2 rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlistIds.has(product.id)}
              onToggleWishlist={onToggleWishlist}
              onQuickAdd={onQuickAdd}
              onSelectProduct={onSelectProduct}
              isAddedJustNow={justAddedId === product.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};
