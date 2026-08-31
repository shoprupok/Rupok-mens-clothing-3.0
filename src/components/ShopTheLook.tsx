import React, { useState } from 'react';
import { Product } from '../types';
import { Sparkles, ShoppingBag, ArrowRight, Check, Zap, Layers } from 'lucide-react';
import { RUPOK } from '../data/config';

interface OutfitBundle {
  id: string;
  name: string;
  banglaName: string;
  tagline: string;
  image: string;
  items: {
    product: Product;
    role: string;
    selectedSize: string;
  }[];
  bundleDiscountPercent: number;
}

interface ShopTheLookProps {
  products: Product[];
  onAddOutfitToCart: (items: { product: Product; size: string; color: string; quantity: number }[]) => void;
  onSelectProduct: (p: Product) => void;
}

export const ShopTheLook: React.FC<ShopTheLookProps> = ({
  products,
  onAddOutfitToCart,
  onSelectProduct,
}) => {
  // Find matching items from catalog
  const zaraShirt = products.find((p) => p.id === 'hero-zara-terracotta') || products[0];
  const lacosteShirt = products.find((p) => p.id === 'hero-lacoste-blue') || products[3];
  const chinoPant = products.find((p) => p.id === 'prod-4') || products[3];
  const panjabiNavy = products.find((p) => p.id === 'prod-8') || products[7];
  const leatherBelt = products.find((p) => p.id === 'prod-9') || products[8];
  const adidasPolo = products.find((p) => p.id === 'hero-adidas-rust') || products[6];

  const outfits: OutfitBundle[] = [
    {
      id: 'outfit-executive-modern',
      name: 'The Modern Executive Look',
      banglaName: 'মডার্ন এক্সিকিউটিভ লুক',
      tagline: 'Terracotta Geometric Shirt + Comfort Chino + Cowhide Belt',
      image: zaraShirt.image,
      bundleDiscountPercent: 15,
      items: [
        { product: zaraShirt, role: 'Full Sleeve Shirt', selectedSize: 'M (38)' },
        { product: chinoPant, role: 'Stretch Chino Pant', selectedSize: '32' },
        { product: leatherBelt, role: 'Reversible Leather Belt', selectedSize: 'Free Size' },
      ],
    },
    {
      id: 'outfit-royal-festive',
      name: 'Royal Heritage Panjabi Co-ord',
      banglaName: 'রয়্যাল হেরিটেজ পাঞ্জাবি লুক',
      tagline: 'Navy Jacquard Panjabi + Reversible Leather Belt',
      image: panjabiNavy.image,
      bundleDiscountPercent: 15,
      items: [
        { product: panjabiNavy, role: 'Embroidered Cotton Panjabi', selectedSize: '40 (M)' },
        { product: leatherBelt, role: 'Full Grain Leather Belt', selectedSize: 'Free Size' },
      ],
    },
    {
      id: 'outfit-classic-gentleman',
      name: 'The Classic Blue Gentleman',
      banglaName: 'ক্লাসিক ব্লু জেন্টলম্যান',
      tagline: 'Lacoste Heavy Oxford Shirt + Slim Fit Chinos',
      image: lacosteShirt.image,
      bundleDiscountPercent: 12,
      items: [
        { product: lacosteShirt, role: 'Oxford Cotton Shirt', selectedSize: 'L (40)' },
        { product: chinoPant, role: 'Stretch Chino Pant', selectedSize: '32' },
      ],
    },
  ];

  const [activeOutfitIndex, setActiveOutfitIndex] = useState<number>(0);
  const [selectedSizes, setSelectedSizes] = useState<{ [itemId: string]: string }>({});
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  const activeOutfit = outfits[activeOutfitIndex];

  // Calculate pricing
  const rawTotal = activeOutfit.items.reduce((sum, item) => sum + item.product.price, 0);
  const bundleDiscount = Math.round(rawTotal * (activeOutfit.bundleDiscountPercent / 100));
  const bundlePrice = rawTotal - bundleDiscount;

  const handleAddBundle = () => {
    const bundleItemsToCart = activeOutfit.items.map((item) => {
      const chosenSize = selectedSizes[item.product.id] || item.product.sizes[0] || 'M (38)';
      const chosenColor = item.product.colors[0]?.name || 'Standard';
      return {
        product: item.product,
        size: chosenSize,
        color: chosenColor,
        quantity: 1,
      };
    });

    onAddOutfitToCart(bundleItemsToCart);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2200);
  };

  return (
    <section id="shop-the-look-section" className="px-3 sm:px-6 py-6 sm:py-8 bg-zinc-950 text-white rounded-3xl my-6 mx-2 sm:mx-4 shadow-2xl relative overflow-hidden border border-zinc-800">
      {/* Background ambient glow */}
      <div className="absolute -right-20 -top-20 w-72 h-72 bg-[#f45b16]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between mb-6 pb-4 border-b border-zinc-800/80 gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-yellow-300 mb-2">
            <Sparkles size={13} className="text-yellow-300 animate-spin" style={{ animationDuration: '6s' }} />
            <span>RUPÓK EDITORIAL LOOKBOOK</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
            <span>Shop The Complete Look</span>
            <span className="bg-[#f45b16] text-white text-[11px] font-black uppercase px-2 py-0.5 rounded-lg shadow-sm">
              Save {activeOutfit.bundleDiscountPercent}%
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
            ম্যাচিং শার্ট, প্যান্ট ও এক্সেসরিজ একসাথে বান্ডেল কিনুন এবং সাশ্রয় করুন স্পেশাল ডিসকাউন্ট।
          </p>
        </div>

        {/* Outfit Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {outfits.map((outfit, idx) => (
            <button
              key={outfit.id}
              onClick={() => setActiveOutfitIndex(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeOutfitIndex === idx
                  ? 'bg-white text-zinc-950 shadow-md font-black ring-2 ring-orange-500'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {outfit.name}
            </button>
          ))}
        </div>
      </div>

      {/* Content Layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Lookbook Hero Visual */}
        <div className="lg:col-span-5 relative group">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-xl">
            <img
              src={activeOutfit.image}
              alt={activeOutfit.name}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[11px] font-bold text-yellow-300 uppercase tracking-wider">
                {activeOutfit.banglaName}
              </span>
              <h3 className="text-lg sm:text-xl font-black mt-0.5">
                {activeOutfit.name}
              </h3>
              <p className="text-xs text-zinc-300 mt-1 line-clamp-2">
                {activeOutfit.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Coordinated Items & Quick Add Box */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Layers size={14} className="text-[#f45b16]" /> In This Look ({activeOutfit.items.length} Curated Pieces):
              </h4>
              <span className="text-xs text-emerald-400 font-bold">
                ✓ Free Inside Dhaka Delivery Included
              </span>
            </div>

            {/* List of items in outfit */}
            <div className="space-y-2.5">
              {activeOutfit.items.map((item) => {
                const currentSize = selectedSizes[item.product.id] || item.product.sizes[0] || 'M (38)';
                return (
                  <div
                    key={item.product.id}
                    className="flex items-center gap-3 bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 p-2.5 sm:p-3 rounded-2xl transition-all group"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      onClick={() => onSelectProduct(item.product)}
                      className="w-14 h-16 object-cover object-top rounded-xl bg-zinc-800 shrink-0 cursor-pointer group-hover:opacity-90"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#f45b16]">
                            {item.role}
                          </span>
                          <h5
                            onClick={() => onSelectProduct(item.product)}
                            className="text-xs sm:text-sm font-bold text-white truncate hover:text-[#f45b16] cursor-pointer"
                            title={item.product.name}
                          >
                            {item.product.name}
                          </h5>
                        </div>
                        <span className="text-xs sm:text-sm font-extrabold text-white shrink-0 ml-2">
                          ৳{item.product.price.toLocaleString()}
                        </span>
                      </div>

                      {/* Size Selector for this item */}
                      <div className="flex items-center gap-1.5 mt-2 overflow-x-auto no-scrollbar">
                        <span className="text-[10px] text-zinc-400 font-medium shrink-0">Size:</span>
                        {item.product.sizes.map((sz) => (
                          <button
                            key={sz}
                            type="button"
                            onClick={() =>
                              setSelectedSizes((prev) => ({
                                ...prev,
                                [item.product.id]: sz,
                              }))
                            }
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                              currentSize === sz
                                ? 'bg-[#f45b16] text-white shadow-xs'
                                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bundle Pricing Card & Action Button */}
          <div className="bg-gradient-to-r from-zinc-900 via-zinc-900/95 to-zinc-900 p-4 rounded-2xl border border-zinc-800 mt-2 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400">Regular Separate Price:</span>
              <span className="line-through text-zinc-500 font-medium">
                ৳{rawTotal.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs text-emerald-400 font-bold">
              <span>Lookbook Combo Saving ({activeOutfit.bundleDiscountPercent}% OFF):</span>
              <span>-৳{bundleDiscount.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-zinc-800">
              <div>
                <span className="text-[11px] text-zinc-400 font-medium block">All-in-One Outfit Price:</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-white">
                    ৳{bundlePrice.toLocaleString()}
                  </span>
                  <span className="text-xs text-[#7bdc00] font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                    Best Value
                  </span>
                </div>
              </div>

              {/* 1-Click Buy Complete Outfit */}
              <button
                onClick={handleAddBundle}
                className={`py-3 px-5 sm:px-6 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer ${
                  addedAnimation
                    ? 'bg-[#7bdc00] text-zinc-950'
                    : 'bg-[#7bdc00] hover:bg-[#6ec500] text-zinc-950'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check size={16} strokeWidth={3} />
                    <span>Complete Look Added!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    <span>ADD COMPLETE LOOK TO BAG</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
