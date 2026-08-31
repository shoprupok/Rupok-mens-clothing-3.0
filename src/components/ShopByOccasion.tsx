import React from 'react';
import { ProductCategory } from '../types';
import { Briefcase, Coffee, Moon, Compass, ArrowRight } from 'lucide-react';

interface ShopByOccasionProps {
  onSelectCategory: (cat: ProductCategory) => void;
}

export const ShopByOccasion: React.FC<ShopByOccasionProps> = ({ onSelectCategory }) => {
  const occasions = [
    {
      id: 'formal',
      title: 'অফিস ও ফরমাল',
      sub: 'স্মার্ট ও প্রফেশনাল আউটফিট',
      category: 'full-sleeve-shirt' as ProductCategory,
      badge: 'OFFICE READY',
      bgGradient: 'from-slate-900 to-zinc-800',
      icon: <Briefcase size={18} className="text-sky-400" />,
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop&q=80',
    },
    {
      id: 'ethnic',
      title: 'জুমুআ ও উৎসব',
      sub: 'ঐতিহ্যবাহী লাক্সারি পাঞ্জাবি',
      category: 'panjabi' as ProductCategory,
      badge: 'EID & FESTIVE',
      bgGradient: 'from-amber-950 to-orange-950',
      icon: <Moon size={18} className="text-amber-400" />,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&auto=format&fit=crop&q=80',
    },
    {
      id: 'casual',
      title: 'উইকেন্ড ও আড্ডা',
      sub: 'রিল্যাক্সড পোলো ও ড্রপ শোল্ডার',
      category: 'polo' as ProductCategory,
      badge: 'WEEKEND DROP',
      bgGradient: 'from-blue-950 to-indigo-950',
      icon: <Coffee size={18} className="text-emerald-400" />,
      image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&auto=format&fit=crop&q=80',
    },
    {
      id: 'travel',
      title: 'ট্রাভেল ও স্ট্রিটওয়্যার',
      sub: 'আরামদায়ক স্ট্রেচ চিনো ও টি-শার্ট',
      category: 'pant' as ProductCategory,
      badge: 'COMFORT FIT',
      bgGradient: 'from-stone-900 to-zinc-800',
      icon: <Compass size={18} className="text-orange-400" />,
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <section id="shop-by-occasion" className="px-3 sm:px-4 py-4 sm:py-6">
      <div className="flex justify-between items-end mb-3 sm:mb-4">
        <div>
          <span className="text-[10px] sm:text-xs font-black tracking-wider text-[#f45b16] uppercase">
            LOOKBOOK & OCCASION
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
            অকেশন অনুযায়ী স্টাইলিং
          </h2>
        </div>
      </div>

      {/* 2x2 Grid of Occasion Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
        {occasions.map((occ) => (
          <div
            key={occ.id}
            onClick={() => onSelectCategory(occ.category)}
            className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-[4/5] flex flex-col justify-between p-3.5 text-white shadow-md hover:shadow-xl transition-all"
          >
            {/* Background Image with Dark Overlay */}
            <img
              src={occ.image}
              alt={occ.title}
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${occ.bgGradient} opacity-85 group-hover:opacity-75 transition-opacity`} />

            {/* Top Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="bg-black/60 backdrop-blur-xs text-yellow-300 text-[9px] font-black px-2 py-0.5 rounded-full border border-white/10 uppercase tracking-wider">
                {occ.badge}
              </span>
              <div className="p-1 rounded-full bg-white/20 backdrop-blur-xs">
                {occ.icon}
              </div>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10">
              <h3 className="text-sm sm:text-base font-black text-white leading-tight mb-0.5 drop-shadow-xs">
                {occ.title}
              </h3>
              <p className="text-[10.5px] text-zinc-200 line-clamp-1 mb-2">
                {occ.sub}
              </p>
              <div className="inline-flex items-center gap-1 text-[10px] font-bold text-yellow-300 group-hover:text-white transition-colors">
                <span>কালেকশন দেখুন</span>
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
