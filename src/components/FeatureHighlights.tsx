import React from 'react';
import { Award, Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import { RUPOK } from '../data/config';

export const FeatureHighlights: React.FC = () => {
  const features = [
    {
      icon: Award,
      badge: '🏅',
      title: 'Premium',
      subtitle: 'Quality',
      detail: '100% Export Grade',
    },
    {
      icon: Truck,
      badge: '🚚',
      title: 'Fast',
      subtitle: 'Delivery',
      detail: `${RUPOK.delivery.insideDhaka.estimatedTime} Nationwide`,
    },
    {
      icon: RotateCcw,
      badge: '↻',
      title: 'Easy',
      subtitle: 'Exchange',
      detail: 'Check at Delivery',
    },
    {
      icon: ShieldCheck,
      badge: '🛡️',
      title: 'Secure',
      subtitle: 'Payment',
      detail: 'Cash on Delivery & bKash',
    },
  ];

  return (
    <section id="features-highlights" className="px-3 sm:px-4 py-2 mb-2">
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {features.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="group border border-zinc-200 hover:border-orange-300 rounded-2xl p-2.5 sm:p-4 text-center bg-white hover:bg-orange-50/40 transition-all shadow-2xs hover:shadow-xs flex flex-col items-center justify-center cursor-default"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-orange-50 group-hover:bg-orange-100 flex items-center justify-center text-[#f45b16] transition-colors mb-1.5">
                <Icon size={22} className="group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-[11px] sm:text-xs font-bold text-zinc-800 leading-tight">
                {item.title}
                <br />
                <span className="text-zinc-600 font-semibold">{item.subtitle}</span>
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
