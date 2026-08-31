import React, { useState } from 'react';
import { Product } from '../types';
import { X, Heart, Star, ShoppingBag, Zap, ShieldCheck, Truck, RotateCcw, Check, Sparkles } from 'lucide-react';
import { RUPOK } from '../data/config';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string, quantity: number) => void;
  onBuyNow: (product: Product, size: string, color: string, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M (38)');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState<number>(1);
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  const discountPercent = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );

  const images = [product.image, ...(product.additionalImages || [])];

  const handleAddToCartClick = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const handleBuyNowClick = () => {
    onBuyNow(product, selectedSize, selectedColor, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div 
        id="product-detail-modal"
        className="relative bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl overflow-y-auto z-10 flex flex-col md:flex-row border border-zinc-100"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center text-zinc-700 hover:text-black hover:bg-zinc-100 transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 bg-zinc-50 flex flex-col justify-between">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-100 shadow-inner">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover object-top"
            />
            {discountPercent > 0 && (
              <span className="absolute top-3 left-3 bg-[#f45b16] text-white text-xs font-black px-2.5 py-1 rounded-md shadow-sm">
                -{discountPercent}% OFF
              </span>
            )}
            <button
              onClick={() => onToggleWishlist(product)}
              className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all ${
                isWishlisted ? 'bg-[#f45b16] text-white' : 'bg-white text-zinc-700 hover:text-[#f45b16]'
              }`}
            >
              <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    selectedImage === img ? 'border-[#f45b16] ring-2 ring-orange-200' : 'border-zinc-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Guarantee Highlights in modal */}
          <div className="mt-4 pt-4 border-t border-zinc-200/80 grid grid-cols-2 gap-2 text-[11px] text-zinc-600 font-semibold">
            <span className="flex items-center gap-1.5">
              <Truck size={14} className="text-[#f45b16]" /> {RUPOK.delivery.insideDhaka.estimatedTime} Fast Delivery
            </span>
            <span className="flex items-center gap-1.5">
              <RotateCcw size={14} className="text-[#7bdc00]" /> Easy Exchange (Check at Delivery)
            </span>
          </div>
        </div>

        {/* Right Column: Product Specs & Purchase Options */}
        <div className="w-full md:w-1/2 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            {/* Category tag */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#f45b16] bg-orange-50 px-2 py-0.5 rounded">
                {product.categoryName}
              </span>
              <div className="flex items-center gap-1 text-xs font-bold text-zinc-800">
                <Star size={14} className="text-amber-400 fill-amber-400" />
                <span>{product.rating}</span>
                <span className="text-zinc-400 font-normal">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Title & Bangla Name */}
            <h2 className="text-lg sm:text-xl font-black text-zinc-900 mt-2 leading-snug">
              {product.name}
            </h2>
            {product.banglaName && (
              <p className="font-bangla text-xs text-zinc-500 font-medium mt-0.5">
                {product.banglaName}
              </p>
            )}

            {/* Pricing */}
            <div className="flex items-baseline gap-2.5 my-3">
              <span className="text-2xl sm:text-3xl font-black text-zinc-950">
                ৳{product.price.toLocaleString()}
              </span>
              {product.oldPrice > product.price && (
                <span className="text-zinc-400 line-through text-sm font-semibold">
                  ৳{product.oldPrice.toLocaleString()}
                </span>
              )}
              <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded">
                Save ৳{(product.oldPrice - product.price).toLocaleString()}
              </span>
            </div>

            {/* Fabric Specs */}
            <div className="bg-zinc-50 border border-zinc-200/80 rounded-xl p-3 my-3 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-zinc-500 font-medium">Fabric:</span>
                <span className="text-zinc-900 font-bold">{product.fabric}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 font-medium">Fit Type:</span>
                <span className="text-zinc-900 font-bold">{product.fit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 font-medium">Availability:</span>
                <span className="text-green-700 font-bold">In Stock ({product.stock} units)</span>
              </div>
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-bold text-zinc-700">Color:</span>
                  <span className="text-zinc-900 font-semibold">{selectedColor}</span>
                </div>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                        selectedColor === c.name
                          ? 'border-[#f45b16] bg-orange-50/50 text-[#f45b16] ring-1 ring-[#f45b16]'
                          : 'border-zinc-200 hover:border-zinc-300 text-zinc-700'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-zinc-300 shadow-2xs"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            <div className="mb-3">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-bold text-zinc-700">Select Size:</span>
                <button
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="text-[#f45b16] hover:underline font-bold text-[11px] cursor-pointer"
                >
                  {showSizeGuide ? 'Hide Size Chart' : '📏 Size Guide'}
                </button>
              </div>

              {/* Size Guide Table Toggle */}
              {showSizeGuide && (
                <div className="bg-orange-50/60 border border-orange-200 rounded-xl p-2.5 mb-2 text-[10px] text-zinc-700">
                  <table className="w-full text-center">
                    <thead>
                      <tr className="border-b border-orange-200 font-bold">
                        <th className="py-1">Size</th>
                        <th>Chest (in)</th>
                        <th>Length (in)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="font-bold">M (38)</td><td>38 - 39</td><td>28</td></tr>
                      <tr><td className="font-bold">L (40)</td><td>40 - 41</td><td>29</td></tr>
                      <tr><td className="font-bold">XL (42)</td><td>42 - 43</td><td>30</td></tr>
                      <tr><td className="font-bold">XXL (44)</td><td>44 - 45</td><td>31</td></tr>
                    </tbody>
                  </table>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      selectedSize === s
                        ? 'bg-zinc-900 text-white shadow-sm ring-2 ring-[#f45b16]'
                        : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center gap-3 my-3">
              <span className="text-xs font-bold text-zinc-700">Quantity:</span>
              <div className="flex items-center border border-zinc-200 rounded-xl overflow-hidden bg-zinc-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-zinc-700 hover:bg-zinc-200 font-bold text-sm"
                >
                  -
                </button>
                <span className="px-3 py-1 font-bold text-xs min-w-[28px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3 py-1 text-zinc-700 hover:bg-zinc-200 font-bold text-sm"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-zinc-500 font-semibold">
                Total: <strong className="text-zinc-900">৳{(product.price * quantity).toLocaleString()}</strong>
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-4 pt-3 border-t border-zinc-100 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleAddToCartClick}
                className={`py-3 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer ${
                  addedAnimation
                    ? 'bg-[#7bdc00] text-zinc-950'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-white'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check size={16} strokeWidth={3} />
                    <span>Added!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNowClick}
                className="py-3 px-4 rounded-xl font-black text-xs sm:text-sm bg-[#7bdc00] hover:bg-[#6ec500] text-zinc-950 flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <Zap size={16} fill="currentColor" />
                <span>Buy Now (৳{(product.price * quantity).toLocaleString()})</span>
              </button>
            </div>

            <p className="text-center text-[10px] text-zinc-500 font-medium">
              🚚 Pay on Delivery via Cash or bKash / Nagad
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
