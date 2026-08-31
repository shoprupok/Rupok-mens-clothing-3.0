import React, { useState } from 'react';
import { Product } from '../types';
import { Heart, Star, Plus, Check, Eye, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickAdd: (product: Product, selectedSize?: string) => void;
  onSelectProduct: (product: Product) => void;
  onBuyNow?: (product: Product, selectedSize?: string) => void;
  isAddedJustNow?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickAdd,
  onSelectProduct,
  onBuyNow,
  isAddedJustNow = false,
}) => {
  const [selectedQuickSize, setSelectedQuickSize] = useState<string>(product.sizes[0] || 'M (38)');

  const discountPercent = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );

  return (
    <div 
      id={`product-card-${product.id}`}
      className="group relative bg-white border border-zinc-200 hover:border-orange-400/80 rounded-2xl overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
    >
      {/* Product Image and Badges */}
      <div className="relative w-full aspect-[4/5] bg-zinc-100 overflow-hidden cursor-pointer">
        <img
          src={product.image}
          alt={product.name}
          onClick={() => onSelectProduct(product)}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Discount & Hot Deal Badge */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {discountPercent > 0 && (
            <div className="bg-[#f45b16] text-white text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-lg shadow-sm">
              -{discountPercent}%
            </div>
          )}
          {product.rating >= 4.9 && (
            <div className="bg-yellow-400 text-zinc-950 text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md shadow-xs flex items-center gap-0.5">
              <span>★ TOP RATED</span>
            </div>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all shadow-md active:scale-90 cursor-pointer z-10 ${
            isWishlisted 
              ? 'bg-[#f45b16] text-white' 
              : 'bg-white/95 text-zinc-700 hover:text-[#f45b16] hover:bg-white'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={16}
            fill={isWishlisted ? 'currentColor' : 'none'}
            strokeWidth={2.2}
          />
        </button>

        {/* Quick Size Overlay on hover */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2.5 pt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end gap-1.5">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar max-w-full">
            {product.sizes.slice(0, 4).map((sz) => (
              <button
                key={sz}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedQuickSize(sz);
                  onQuickAdd(product, sz);
                }}
                className={`px-2 py-1 rounded-md text-[10px] font-black transition-all cursor-pointer shadow-xs ${
                  selectedQuickSize === sz
                    ? 'bg-[#7bdc00] text-zinc-950 scale-105'
                    : 'bg-white/90 text-zinc-900 hover:bg-white'
                }`}
                title={`Quick add size ${sz}`}
              >
                {sz}
              </button>
            ))}
          </div>
          <span 
            onClick={() => onSelectProduct(product)}
            className="text-[10px] text-zinc-300 font-bold flex items-center gap-1 hover:text-white"
          >
            <Eye size={12} /> বিস্তারিত দেখুন (Quick View)
          </span>
        </div>
      </div>

      {/* Product Info Section */}
      <div className="p-3 sm:p-3.5 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category Subtitle & Color Swatches */}
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#f45b16]">
              {product.categoryName}
            </span>

            {/* Colors Dot Preview */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex items-center -space-x-1">
                {product.colors.slice(0, 3).map((col) => (
                  <span
                    key={col.name}
                    className="w-2.5 h-2.5 rounded-full border border-white shadow-2xs inline-block"
                    style={{ backgroundColor: col.hex }}
                    title={col.name}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => onSelectProduct(product)}
            className="text-xs sm:text-sm font-bold text-zinc-900 line-clamp-1 hover:text-[#f45b16] transition-colors cursor-pointer mt-0.5"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Bangla Name */}
          {product.banglaName && (
            <p className="font-bangla text-[10px] text-zinc-400 font-normal truncate">
              {product.banglaName}
            </p>
          )}

          {/* Price Row */}
          <div className="flex items-baseline gap-1.5 mt-1.5">
            <span className="font-black text-sm sm:text-base text-zinc-950">
              ৳{product.price.toLocaleString()}
            </span>
            {product.oldPrice > product.price && (
              <span className="text-zinc-400 line-through text-xs font-medium">
                ৳{product.oldPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Rating and Dual Action Buttons (LiveShopping BD Style) */}
        <div className="flex items-center justify-between gap-1.5 mt-2 pt-2 border-t border-zinc-100">
          <div className="flex items-center gap-1 text-[11px] font-bold text-zinc-800">
            <Star size={13} className="text-amber-400 fill-amber-400" />
            <span>{product.rating}</span>
            <span className="text-zinc-400 font-normal">({product.reviewsCount})</span>
          </div>

          {/* Action Buttons: Order Now & Add to Bag */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onSelectProduct(product)}
              className="hidden sm:inline-flex px-2 py-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 text-[#f45b16] font-bold text-[10px] transition-colors"
              title="Order Now"
            >
              অর্ডার
            </button>

            {/* Quick Add Button */}
            <button
              onClick={() => onQuickAdd(product, selectedQuickSize)}
              className={`h-8 px-2.5 rounded-xl flex items-center gap-1 font-bold text-xs transition-all shadow-xs active:scale-95 cursor-pointer ${
                isAddedJustNow
                  ? 'bg-[#7bdc00] text-zinc-950 font-black'
                  : 'bg-zinc-900 hover:bg-[#f45b16] text-white'
              }`}
              title="Add to Bag"
              aria-label="Add to cart"
            >
              {isAddedJustNow ? (
                <>
                  <Check size={14} strokeWidth={3} />
                  <span className="text-[10px] font-black">Added</span>
                </>
              ) : (
                <>
                  <Plus size={15} strokeWidth={2.5} />
                  <span className="text-[10px] font-bold">Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

