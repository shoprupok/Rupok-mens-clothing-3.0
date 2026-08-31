import React from 'react';
import { Product } from '../types';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveWishlist,
  onAddToCart,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-orange-100 text-[#f45b16] flex items-center justify-center">
                <Heart size={18} fill="currentColor" />
              </div>
              <div>
                <h2 className="font-extrabold text-base sm:text-lg text-zinc-900 leading-tight">
                  Your Wishlist
                </h2>
                <p className="text-xs text-zinc-500 font-medium">
                  {wishlistProducts.length} saved {wishlistProducts.length === 1 ? 'item' : 'items'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {wishlistProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-500">
                <div className="w-16 h-16 rounded-full bg-orange-50 text-[#f45b16] flex items-center justify-center mb-3">
                  <Heart size={30} />
                </div>
                <h3 className="text-base font-bold text-zinc-900">Your wishlist is empty</h3>
                <p className="text-xs text-zinc-500 mt-1 max-w-xs">
                  Tap the heart icon on any shirt, polo, or pant to save it for later.
                </p>
              </div>
            ) : (
              wishlistProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex gap-3 bg-white p-3 rounded-2xl border border-zinc-200 shadow-2xs hover:border-orange-200 transition-colors"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    onClick={() => {
                      onClose();
                      onSelectProduct(p);
                    }}
                    className="w-18 h-22 object-cover object-top rounded-xl bg-zinc-100 shrink-0 cursor-pointer"
                  />

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 
                          onClick={() => {
                            onClose();
                            onSelectProduct(p);
                          }}
                          className="text-xs sm:text-sm font-bold text-zinc-900 truncate hover:text-[#f45b16] cursor-pointer"
                        >
                          {p.name}
                        </h4>
                        <button
                          onClick={() => onRemoveWishlist(p)}
                          className="text-zinc-400 hover:text-red-600 transition-colors p-1"
                          title="Remove"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <p className="font-bangla text-[10px] text-zinc-400 truncate mt-0.5">
                        {p.banglaName}
                      </p>

                      <div className="flex items-baseline gap-1.5 mt-1">
                        <span className="font-extrabold text-xs sm:text-sm text-zinc-950">
                          ৳{p.price.toLocaleString()}
                        </span>
                        {p.oldPrice > p.price && (
                          <span className="text-zinc-400 line-through text-[11px]">
                            ৳{p.oldPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => onAddToCart(p)}
                      className="mt-2 w-full py-1.5 bg-[#7bdc00] hover:bg-[#6ec500] text-zinc-950 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                    >
                      <ShoppingBag size={13} />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
