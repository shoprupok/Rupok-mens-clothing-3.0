import React, { useState } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { ChevronRight, Sparkles, Flame, Crown, Tag } from 'lucide-react';

interface CuratedTabsSectionProps {
  products: Product[];
  wishlistIds: Set<string>;
  onToggleWishlist: (p: Product) => void;
  onQuickAdd: (p: Product) => void;
  onSelectProduct: (p: Product) => void;
  justAddedId: string | null;
  onViewAll: () => void;
}

type TabType = 'best-sellers' | 'new-arrivals' | 'premium' | 'under-999';

export const CuratedTabsSection: React.FC<CuratedTabsSectionProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onQuickAdd,
  onSelectProduct,
  justAddedId,
  onViewAll,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('best-sellers');

  // Filter products based on selected tab
  const getFilteredProducts = () => {
    switch (activeTab) {
      case 'best-sellers':
        return products.filter((p) => p.isBestSeller);
      case 'new-arrivals':
        return products.filter((p) => p.isNewArrival);
      case 'premium':
        return products.filter((p) => p.price >= 1100);
      case 'under-999':
        return products.filter((p) => p.price <= 999);
      default:
        return products;
    }
  };

  const displayedProducts = getFilteredProducts().slice(0, 8);

  const tabs: { id: TabType; label: string; icon: React.ReactNode; count: number }[] = [
    {
      id: 'best-sellers',
      label: 'বেস্ট সেলার',
      icon: <Flame size={14} className="text-amber-500 fill-amber-400" />,
      count: products.filter((p) => p.isBestSeller).length,
    },
    {
      id: 'new-arrivals',
      label: 'নতুন কালেকশন',
      icon: <Sparkles size={14} className="text-purple-500 fill-purple-400" />,
      count: products.filter((p) => p.isNewArrival).length,
    },
    {
      id: 'premium',
      label: 'প্রিমিয়াম ড্রপ',
      icon: <Crown size={14} className="text-yellow-600 fill-yellow-400" />,
      count: products.filter((p) => p.price >= 1100).length,
    },
    {
      id: 'under-999',
      label: 'বাজেট ৳৯৯৯',
      icon: <Tag size={14} className="text-emerald-500 fill-emerald-400" />,
      count: products.filter((p) => p.price <= 999).length,
    },
  ];

  return (
    <section id="curated-products-section" className="px-3 sm:px-4 py-4 sm:py-6">
      {/* Section Heading & View All Button */}
      <div className="flex justify-between items-end mb-3 sm:mb-4">
        <div>
          <span className="text-[10px] sm:text-xs font-black tracking-wider text-[#f45b16] uppercase">
            TRENDING PICKS
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
            জনপ্রিয় কালেকশন
          </h2>
        </div>
        <button
          onClick={onViewAll}
          className="group inline-flex items-center gap-0.5 text-xs sm:text-sm font-bold text-[#f45b16] hover:text-[#d4480c] transition-colors cursor-pointer"
        >
          <span>সব কালেকশন</span>
          <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Tab Filter Pill Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer shadow-2xs ${
                isActive
                  ? 'bg-zinc-900 text-white shadow-md'
                  : 'bg-zinc-100/90 text-zinc-700 hover:bg-zinc-200/80 border border-zinc-200/60'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-zinc-200 text-zinc-600'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2-Column (Mobile) / 4-Column (Desktop) Product Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {displayedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isWishlisted={wishlistIds.has(product.id)}
            onToggleWishlist={onToggleWishlist}
            onQuickAdd={(p) => onQuickAdd(p)}
            onSelectProduct={(p) => onSelectProduct(p)}
            isAddedJustNow={justAddedId === product.id}
          />
        ))}
      </div>
    </section>
  );
};
