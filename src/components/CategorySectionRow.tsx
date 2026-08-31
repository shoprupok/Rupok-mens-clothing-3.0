import React from 'react';
import { Product, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';
import { ChevronRight, ArrowRight } from 'lucide-react';

interface CategorySectionRowProps {
  title: string;
  banglaTitle: string;
  subtitle?: string;
  category: ProductCategory;
  icon?: React.ReactNode;
  badge?: string;
  products: Product[];
  wishlistIds: Set<string>;
  onToggleWishlist: (p: Product) => void;
  onQuickAdd: (p: Product, size?: string) => void;
  onSelectProduct: (p: Product) => void;
  justAddedId: string | null;
  onViewCategory: (cat: ProductCategory) => void;
  limit?: number;
}

export const CategorySectionRow: React.FC<CategorySectionRowProps> = ({
  title,
  banglaTitle,
  subtitle,
  category,
  icon,
  badge,
  products,
  wishlistIds,
  onToggleWishlist,
  onQuickAdd,
  onSelectProduct,
  justAddedId,
  onViewCategory,
  limit = 4,
}) => {
  const categoryProducts = products.filter((p) => p.category === category).slice(0, limit);

  if (categoryProducts.length === 0) return null;

  return (
    <section className="px-3 sm:px-4 py-4 sm:py-6 border-b border-zinc-100 last:border-b-0">
      {/* Category Section Header (LiveShopping BD Style) */}
      <div className="flex justify-between items-end mb-3.5 sm:mb-4 bg-zinc-50/80 p-3 sm:p-4 rounded-2xl border border-zinc-200/70">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            {icon && <span className="text-[#f45b16]">{icon}</span>}
            <span className="text-[10px] sm:text-xs font-black tracking-wider text-[#f45b16] uppercase">
              {title}
            </span>
            {badge && (
              <span className="bg-yellow-400 text-zinc-950 text-[9px] font-black uppercase px-1.5 py-0.2 rounded shadow-2xs">
                {badge}
              </span>
            )}
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-black text-zinc-900 tracking-tight">
            {banglaTitle}
          </h2>
          {subtitle && (
            <p className="text-xs text-zinc-500 hidden sm:block mt-0.5">{subtitle}</p>
          )}
        </div>

        <button
          onClick={() => onViewCategory(category)}
          className="group inline-flex items-center gap-1 bg-white hover:bg-orange-50 text-xs sm:text-sm font-bold text-zinc-800 hover:text-[#f45b16] border border-zinc-200 hover:border-orange-200 px-3 py-1.5 rounded-xl transition-all shadow-2xs cursor-pointer shrink-0"
        >
          <span>সব দেখুন</span>
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform text-[#f45b16]" />
        </button>
      </div>

      {/* 2-Column (Mobile) / 4-Column (Desktop) Product Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {categoryProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isWishlisted={wishlistIds.has(product.id)}
            onToggleWishlist={onToggleWishlist}
            onQuickAdd={(p, s) => onQuickAdd(p, s)}
            onSelectProduct={(p) => onSelectProduct(p)}
            isAddedJustNow={justAddedId === product.id}
          />
        ))}
      </div>
    </section>
  );
};
