import React from 'react';
import { Menu, Search, Heart, ShoppingBag, PhoneCall, Truck, Sparkles, Flame, ShieldCheck, ChevronRight } from 'lucide-react';
import { ActiveTab, ProductCategory } from '../types';
import { RUPOK } from '../data/config';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedCategory?: ProductCategory;
  onSelectCategory?: (category: ProductCategory) => void;
  wishlistCount: number;
  cartCount: number;
  subtotal?: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenMenu: () => void;
  onOpenFitAdvisor?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedCategory = 'all',
  onSelectCategory,
  wishlistCount,
  cartCount,
  subtotal = 0,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenMenu,
  onOpenFitAdvisor,
}) => {
  return (
    <>
      {/* Top Micro Announcement & Hotline Bar (LiveShopping BD Style) */}
      <div className="bg-[#0f0f11] text-white text-xs py-1.5 px-3 sm:px-6 text-center font-medium tracking-wide flex items-center justify-between border-b border-zinc-800">
        <div className="hidden lg:flex items-center gap-3 text-zinc-300 text-[11.5px]">
          <div className="flex items-center gap-1.5">
            <Truck size={13} className="text-[#7bdc00]" />
            <span>সারা দেশে ক্যাশ অন ডেলিভারি</span>
          </div>
          <span className="text-zinc-600">•</span>
          <div className="flex items-center gap-1.5 text-zinc-300">
            <ShieldCheck size={13} className="text-[#7bdc00]" />
            <span>পার্সেল দেখে মূল্য পরিশোধ</span>
          </div>
        </div>

        <div className="mx-auto lg:mx-0 flex items-center gap-1.5 text-xs">
          <span className="bg-[#f45b16] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-2xs">EXCLUSIVE OFFER</span>
          <span>কুপন <strong className="text-yellow-300 font-black">{RUPOK.offers.promoCode.code}</strong> ব্যবহারে {RUPOK.offers.promoCode.discountPercent}% ছাড়</span>
        </div>

        <div className="hidden sm:flex items-center gap-3">
          {onOpenFitAdvisor && (
            <button
              onClick={onOpenFitAdvisor}
              className="text-zinc-300 hover:text-yellow-300 transition-colors text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>📏 সাইজ ক্যালকুলেটর</span>
            </button>
          )}
          <button
            onClick={() => setActiveTab('orders')}
            className="text-zinc-300 hover:text-white transition-colors text-[11px] font-semibold"
          >
            অর্ডার ট্র্যাকিং
          </button>
          <a 
            href={`tel:${RUPOK.contact.primaryPhone}`}
            className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors text-xs font-mono font-bold"
          >
            <PhoneCall size={12} className="text-[#7bdc00]" />
            <span>{RUPOK.contact.primaryPhoneFormatted}</span>
          </a>
        </div>
      </div>

      {/* Main Brand Header (LiveShopping BD 3-Column Layout) */}
      <header id="main-header" className="h-[74px] md:h-[84px] flex items-center justify-between px-3.5 sm:px-6 md:px-8 border-b border-zinc-200 sticky top-0 bg-white/95 backdrop-blur-md z-30 transition-shadow shadow-2xs">
        {/* Left: Mobile Menu Trigger & Brand Logo */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            id="mobile-menu-btn"
            onClick={onOpenMenu}
            className="p-2 -ml-1.5 rounded-xl text-zinc-800 hover:bg-zinc-100 transition-colors focus:outline-none cursor-pointer"
            aria-label="Open menu"
          >
            <Menu size={24} strokeWidth={2.2} />
          </button>

          {/* Brand Logo */}
          <button
            onClick={() => setActiveTab('home')}
            className="text-left focus:outline-none group flex flex-col items-start justify-center cursor-pointer"
          >
            <div className="font-bangla text-[#f45b16] text-[28px] sm:text-[32px] md:text-[34px] font-black leading-none tracking-tight transition-transform group-hover:scale-102">
              {RUPOK.brand.nameBangla}
            </div>
            <div className="text-[8px] sm:text-[9px] md:text-[9.5px] font-extrabold tracking-[3px] sm:tracking-[3.5px] text-zinc-900 uppercase mt-0.5">
              MEN'S CLOTHING
            </div>
          </button>
        </div>

        {/* Center: LiveShopping BD Prominent Interactive Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <div 
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between bg-zinc-100 hover:bg-zinc-200/80 border border-zinc-200 rounded-2xl px-3.5 py-2 text-xs text-zinc-500 cursor-pointer transition-all shadow-2xs group"
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Search size={16} className="text-zinc-400 group-hover:text-[#f45b16] transition-colors shrink-0" />
              <span className="truncate">পাঞ্জাবি, শার্ট, পোলো বা প্যান্ট খুঁজুন...</span>
            </div>
            <span className="text-[10px] bg-white border border-zinc-300 font-bold px-2 py-0.5 rounded-md text-zinc-600 shrink-0">
              Search
            </span>
          </div>
        </div>

        {/* Right: Hotline Call Badge, Wishlist & Cart Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Quick Hotline Call Pill (LiveShopping Style) */}
          <a
            href={`tel:${RUPOK.contact.primaryPhone}`}
            className="hidden xl:flex items-center gap-2 bg-orange-50 hover:bg-orange-100/80 border border-orange-200/70 text-[#f45b16] px-3 py-1.5 rounded-xl transition-all shadow-2xs cursor-pointer mr-1"
          >
            <div className="w-7 h-7 rounded-lg bg-[#f45b16] text-white flex items-center justify-center shadow-2xs">
              <PhoneCall size={14} />
            </div>
            <div className="text-left leading-tight">
              <span className="text-[9.5px] font-bold text-zinc-500 block uppercase">হটলাইন সাপোর্ট</span>
              <span className="text-xs font-black text-zinc-900 font-mono">{RUPOK.contact.displayPhone}</span>
            </div>
          </a>

          {/* Fit Finder Button */}
          {onOpenFitAdvisor && (
            <button
              onClick={onOpenFitAdvisor}
              className="hidden lg:flex items-center gap-1 bg-zinc-100 hover:bg-orange-50 hover:text-[#f45b16] hover:border-orange-200 text-zinc-700 border border-zinc-200/80 px-2.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs"
              title="Find your size"
            >
              <span>📏 Fit Finder</span>
            </button>
          )}

          {/* Search Trigger for mobile */}
          <button
            id="search-toggle-btn"
            onClick={onOpenSearch}
            className="md:hidden p-2 rounded-xl text-zinc-700 hover:bg-zinc-100 hover:text-[#f45b16] transition-all cursor-pointer"
            aria-label="Search"
            title="Search products"
          >
            <Search size={21} strokeWidth={2.2} />
          </button>

          {/* Wishlist Button */}
          <button
            id="wishlist-toggle-btn"
            onClick={onOpenWishlist}
            className="p-2 rounded-xl text-zinc-700 hover:bg-zinc-100 hover:text-[#f45b16] transition-all relative cursor-pointer"
            aria-label="Wishlist"
            title="Your Wishlist"
          >
            <Heart size={21} strokeWidth={2.2} />
            {wishlistCount > 0 && (
              <span className="absolute top-1.5 right-1.5 bg-[#f45b16] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart / Shopping Bag Button */}
          <button
            id="cart-toggle-btn"
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-zinc-900 hover:bg-[#f45b16] text-white px-3 sm:px-3.5 py-2 rounded-xl transition-all shadow-sm group cursor-pointer"
            aria-label="Shopping Cart"
            title="Open Bag"
          >
            <div className="relative">
              <ShoppingBag size={19} className="group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#7bdc00] text-zinc-950 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-zinc-900">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="hidden sm:flex flex-col text-left leading-none">
              <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">শপিং ব্যাগ</span>
              <span className="text-xs font-black text-yellow-300">
                {cartCount > 0 ? (subtotal > 0 ? `৳${subtotal.toLocaleString()}` : `${cartCount} Items`) : '৳০'}
              </span>
            </div>
          </button>
        </div>
      </header>

      {/* Sticky Secondary Category Bar (LiveShopping BD Style Mega Navigation) */}
      <div className="bg-[#18181b] text-white px-3 sm:px-6 py-2 border-b border-zinc-800 shadow-sm flex items-center justify-between overflow-x-auto no-scrollbar gap-2 sticky top-[74px] md:top-[84px] z-20">
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={() => {
              setActiveTab('home');
              if (onSelectCategory) onSelectCategory('all');
            }}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1 ${
              activeTab === 'home' ? 'bg-[#f45b16] text-white shadow-xs' : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Sparkles size={12} className="text-yellow-300 fill-yellow-300" />
            <span>হোম</span>
          </button>

          <button
            onClick={() => {
              if (onSelectCategory) onSelectCategory('panjabi');
              setActiveTab('shop');
            }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === 'shop' && selectedCategory === 'panjabi' ? 'bg-[#f45b16] text-white' : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
            }`}
          >
            পাঞ্জাবি
          </button>

          <button
            onClick={() => {
              if (onSelectCategory) onSelectCategory('shirt');
              setActiveTab('shop');
            }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === 'shop' && selectedCategory === 'shirt' ? 'bg-[#f45b16] text-white' : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
            }`}
          >
            শার্ট
          </button>

          <button
            onClick={() => {
              if (onSelectCategory) onSelectCategory('polo');
              setActiveTab('shop');
            }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === 'shop' && selectedCategory === 'polo' ? 'bg-[#f45b16] text-white' : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
            }`}
          >
            পোলো টি-শার্ট
          </button>

          <button
            onClick={() => {
              if (onSelectCategory) onSelectCategory('pants');
              setActiveTab('shop');
            }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === 'shop' && selectedCategory === 'pants' ? 'bg-[#f45b16] text-white' : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
            }`}
          >
            প্যান্ট ও চিনো
          </button>

          <button
            onClick={() => {
              if (onSelectCategory) onSelectCategory('accessories');
              setActiveTab('shop');
            }}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === 'shop' && selectedCategory === 'accessories' ? 'bg-[#f45b16] text-white' : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
            }`}
          >
            এক্সেসরিজ
          </button>

          <button
            onClick={() => {
              setActiveTab('home');
              setTimeout(() => {
                const el = document.getElementById('shop-the-look-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="px-2.5 py-1 rounded-lg text-xs font-bold text-yellow-300 hover:bg-zinc-800 transition-all shrink-0 cursor-pointer flex items-center gap-1"
          >
            <span>লুকবুক কম্বো</span>
            <span className="bg-yellow-400 text-zinc-950 text-[9px] font-black px-1.5 py-0.2 rounded">-15%</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('home');
              setTimeout(() => {
                const el = document.getElementById('flash-deals-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="px-2.5 py-1 rounded-lg text-xs font-bold text-red-400 hover:bg-zinc-800 transition-all shrink-0 cursor-pointer flex items-center gap-1"
          >
            <Flame size={12} className="text-red-400 fill-red-400 animate-pulse" />
            <span>ফ্ল্যাশ ডিল 🔥</span>
          </button>
        </div>

        {/* Right quick link: All Categories */}
        <button
          onClick={() => setActiveTab('categories')}
          className="hidden md:inline-flex items-center gap-1 text-xs font-bold text-zinc-400 hover:text-white shrink-0 ml-2 transition-colors"
        >
          <span>সব ক্যাটাগরি</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </>
  );
};

