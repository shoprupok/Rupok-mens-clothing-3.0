import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Flame, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RUPOK } from '../data/config';

import modelPhoto1 from '../assets/images/rupok_model_exact_1_1787971843099.jpg';
import modelPhoto2 from '../assets/images/rupok_model_exact_2_1787971866858.jpg';
import modelPhoto3 from '../assets/images/rupok_model_exact_3_1787971883320.jpg';
import modelPhoto4 from '../assets/images/rupok_model_exact_4_1787971898628.jpg';
import modelPhoto5 from '../assets/images/rupok_model_exact_5_1787971912723.jpg';

interface HeroProps {
  onShopNow: () => void;
  onSelectProduct?: (productId: string) => void;
}

export interface HeroModelSlide {
  id: string;
  image: string;
  alt: string;
}

const HERO_SLIDES: HeroModelSlide[] = [
  {
    id: 'slide-1',
    image: modelPhoto1,
    alt: 'Rupok Men Fashion Model Outfit 1'
  },
  {
    id: 'slide-2',
    image: modelPhoto2,
    alt: 'Rupok Men Fashion Model Outfit 2'
  },
  {
    id: 'slide-3',
    image: modelPhoto3,
    alt: 'Rupok Men Fashion Model Outfit 3'
  },
  {
    id: 'slide-4',
    image: modelPhoto4,
    alt: 'Rupok Men Fashion Model Outfit 4'
  },
  {
    id: 'slide-5',
    image: modelPhoto5,
    alt: 'Rupok Men Fashion Model Outfit 5'
  }
];

const BRAND_TICKER_TEXTS = [
  "রূপক – Rupok Men's Clothing একটি আধুনিক পুরুষদের ফ্যাশন ব্র্যান্ড।",
  "আমাদের লক্ষ্য হলো মানসম্মত, স্টাইলিশ ও সময়োপযোগী পোশাক যুক্তিসঙ্গত মূল্যে গ্রাহকদের কাছে পৌঁছে দেওয়া।",
  "১০০% এক্সপোর্ট কোয়ালিটি ফেব্রিক, আকর্ষণীয় এশিয়ান ফিটিং ও কালার গ্যারান্টি।",
  "ডেলিভারির সময় পার্সেল চেক করে নেওয়ার নিশ্চয়তা এবং ৭ দিনে সহজ এক্সচেঞ্জ।"
];

export const Hero: React.FC<HeroProps> = ({ onShopNow, onSelectProduct }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [tickerIndex, setTickerIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto slideshow every 3 seconds (3000ms) with clean timer reset
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused, currentSlide]);

  // Brand ticker slides from bottom to top every 3.2 seconds
  useEffect(() => {
    const tickerTimer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % BRAND_TICKER_TEXTS.length);
    }, 3200);

    return () => clearInterval(tickerTimer);
  }, []);

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const activeOutfit = HERO_SLIDES[currentSlide];

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section 
      id="hero-banner"
      className="mx-3 sm:mx-4 my-2.5 sm:my-4 rounded-2xl md:rounded-3xl overflow-hidden relative bg-gradient-to-br from-white via-[#fff8f2] to-[#fff0e5] border border-orange-100 shadow-sm p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5 md:gap-7"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Decorative subtle ambient warm glows */}
      <div className="absolute right-0 top-0 w-80 h-80 bg-gradient-to-bl from-orange-200/40 via-yellow-200/20 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-60 h-60 bg-gradient-to-tr from-yellow-200/30 to-transparent rounded-full blur-2xl pointer-events-none" />

      {/* Left Column: Brand Content */}
      <div className="hero-content relative z-10 w-full md:w-[52%] flex flex-col items-start text-left">
        {/* Small Tag */}
        <div className="inline-flex items-center gap-1.5 bg-yellow-100/95 border border-yellow-300 text-yellow-950 text-[11px] sm:text-xs font-black px-3 py-1 rounded-full mb-3 md:mb-5 shadow-2xs">
          <Sparkles size={13} className="text-yellow-600 fill-yellow-500" />
          <span>PREMIUM MEN'S FASHION</span>
        </div>

        {/* Big Serif Heading */}
        <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.04] italic tracking-tight text-zinc-900 mb-2.5 md:mb-3.5">
          Style Your <br />
          <span className="text-[#f45b16] not-italic font-black underline decoration-yellow-400 decoration-4 underline-offset-4">
            Identity
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-zinc-600 text-xs sm:text-sm md:text-base leading-relaxed mb-5 md:mb-7 max-w-lg font-medium">
          {RUPOK.brand.tagline}
        </p>

        {/* Unified Orange Background Shape behind Offer Badge, Shop Now Button & Live Sliding Brand Ticker on the Right */}
        <div className="w-full max-w-xl">
          <div 
            id="hero-shop-orange-backdrop"
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#f45b16] via-[#ea580c] to-[#ff7a22] text-white p-2.5 sm:p-3 shadow-xl border border-orange-300/40"
            style={{
              boxShadow: '0 12px 32px rgba(244, 91, 22, 0.28)',
            }}
          >
            {/* Ambient Background Glows */}
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-yellow-300/25 rounded-full blur-md pointer-events-none" />
            <div className="absolute -left-4 -top-4 w-12 h-12 bg-white/20 rounded-full blur-xs pointer-events-none" />

            {/* Row Layout: [UP TO 70% OFF] + [SHOP NOW Button] + [Upward Sliding Text on the Right] */}
            <div className="relative z-10 flex flex-col md:flex-row items-stretch md:items-center gap-2.5">
              {/* Left Action CTA Elements (Strictly non-collapsible) */}
              <div className="flex items-center gap-2 shrink-0 z-10">
                {/* UP TO 70% OFF Badge */}
                <div className="border border-yellow-300 bg-white/95 text-zinc-950 rounded-xl px-2.5 py-1.5 text-center shadow-xs flex items-center gap-1 shrink-0">
                  <span className="text-[9px] font-black tracking-wider uppercase text-zinc-700 flex items-center gap-0.5">
                    <Flame size={11} className="text-yellow-500 fill-yellow-500" /> UP TO
                  </span>
                  <span className="text-base sm:text-lg font-black text-[#f45b16] leading-none">
                    {RUPOK.offers.primaryDiscountPercent}% OFF
                  </span>
                </div>

                {/* Shop Now CTA Button */}
                <button
                  id="hero-shop-now-btn"
                  onClick={onShopNow}
                  className="group inline-flex items-center gap-1.5 bg-[#7bdc00] hover:bg-[#6ec500] text-zinc-950 px-4 sm:px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all transform active:scale-95 cursor-pointer shrink-0"
                >
                  <span>SHOP NOW</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Right Side: Smooth Vertical Slide-Up Brand Description Ticker without overlapping CTA */}
              <div 
                className="flex-1 min-w-0 bg-black/25 backdrop-blur-xs border border-white/20 rounded-xl px-3 py-2 flex items-center overflow-hidden h-11 sm:h-12 relative isolate"
                style={{
                  maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={tickerIndex}
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -24, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-start sm:items-center gap-1.5 text-[11px] sm:text-xs font-medium text-white drop-shadow-xs w-full text-left"
                  >
                    <span className="text-yellow-300 font-black shrink-0 text-xs mt-0.5 sm:mt-0">✦</span>
                    <span className="line-clamp-2 leading-tight">
                      {BRAND_TICKER_TEXTS[tickerIndex]}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Micro Guarantee Badges */}
        <div className="mt-4 sm:mt-5 flex items-center gap-3 sm:gap-4 text-[10px] sm:text-[11px] font-semibold text-zinc-500 flex-wrap">
          <span className="flex items-center gap-1">
            <ShieldCheck size={13} className="text-green-600" /> 100% Export Quality
          </span>
          <span className="flex items-center gap-1">
            <span className="text-orange-500">🚚</span> Dhaka {RUPOK.delivery.insideDhaka.feeFormatted} | Outside {RUPOK.delivery.outsideDhaka.feeFormatted}
          </span>
          <span className="flex items-center gap-1">
            <Check size={13} className="text-blue-600" /> Easy Exchange (Check at Delivery)
          </span>
        </div>
      </div>

      {/* Right Column: High-Fashion Model Lookbook Slideshow */}
      <div className="relative z-10 w-full md:w-[48%] lg:w-[45%] flex flex-col items-center justify-center">
        {/* Main Showcase Card - Compact & Balanced Size */}
        <div className="relative w-full max-w-[240px] sm:max-w-[270px] md:max-w-[300px] aspect-[3/4] rounded-2xl overflow-hidden shadow-xl bg-zinc-900 border-2 border-white/70 group">
          {/* Animated Model Photo with smooth slide + fade transition */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeOutfit.id}
              initial={{ opacity: 0, scale: 1.03, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.98, x: -20 }}
              transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
              className="absolute inset-0 w-full h-full cursor-pointer"
              onClick={onShopNow}
            >
              <img
                src={activeOutfit.image}
                alt={activeOutfit.alt}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </AnimatePresence>

          {/* 3-Second Smooth Countdown Progress Bar at Top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-20 overflow-hidden">
            <motion.div
              key={`bar-${currentSlide}-${isPaused}`}
              initial={{ width: '0%' }}
              animate={{ width: isPaused ? '0%' : '100%' }}
              transition={{ duration: isPaused ? 0 : 3, ease: 'linear' }}
              className="h-full bg-yellow-400 shadow-xs"
            />
          </div>

          {/* Left / Right Chevron Controls */}
          <button
            id="hero-prev-slide-btn"
            onClick={handlePrev}
            aria-label="Previous outfit"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-zinc-950/60 hover:bg-yellow-400 hover:text-zinc-950 text-white backdrop-blur-md flex items-center justify-center transition-all z-20 shadow-md cursor-pointer border border-white/20 active:scale-90"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            id="hero-next-slide-btn"
            onClick={handleNext}
            aria-label="Next outfit"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-zinc-950/60 hover:bg-yellow-400 hover:text-zinc-950 text-white backdrop-blur-md flex items-center justify-center transition-all z-20 shadow-md cursor-pointer border border-white/20 active:scale-90"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Pagination Dots (5 Outfits) */}
        <div className="flex items-center gap-1.5 mt-3 sm:mt-4 z-20">
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === currentSlide;
            return (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full h-2 cursor-pointer ${
                  isActive
                    ? 'w-7 bg-yellow-400 shadow-sm'
                    : 'w-2 bg-zinc-300 hover:bg-zinc-400'
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

