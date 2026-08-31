import React from 'react';
import { Package, Clock, RotateCcw, Lock, PhoneCall, Truck } from 'lucide-react';
import { RUPOK } from '../data/config';

export const ServiceInfoGrid: React.FC = () => {
  const couriersText = RUPOK.delivery.couriers.map((c) => c.name.replace(' Courier', '')).join(' & ') + ' Courier';

  const serviceItems = [
    {
      icon: Package,
      badge: '📦',
      title: 'Cash on Delivery',
      subtitle: 'Available Nationwide',
    },
    {
      icon: Clock,
      badge: '⏰',
      title: 'Order Place',
      subtitle: '24/7 Online Service',
    },
    {
      icon: RotateCcw,
      badge: '↻',
      title: 'Easy Exchange',
      subtitle: 'Check at Delivery',
    },
    {
      icon: Lock,
      badge: '🔒',
      title: 'Secure Payment',
      subtitle: '100% Safe & Verified',
    },
    {
      icon: PhoneCall,
      badge: '☎',
      title: 'Customer Support',
      subtitle: RUPOK.contact.supportHours,
    },
    {
      icon: Truck,
      badge: '🚚',
      title: 'We Deliver via',
      subtitle: couriersText,
    },
  ];

  return (
    <div 
      id="service-info-box"
      className="mx-3 sm:mx-4 my-5 p-4 sm:p-5 border border-zinc-200 bg-white rounded-2xl shadow-2xs"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-4">
        {serviceItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-start gap-2.5 sm:gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#f45b16] flex items-center justify-center shrink-0 group-hover:bg-[#f45b16] group-hover:text-white transition-colors">
                <Icon size={16} strokeWidth={2.2} />
              </div>
              <div>
                <strong className="block text-xs sm:text-sm font-bold text-zinc-900 leading-tight">
                  {item.title}
                </strong>
                <p className="text-[10px] sm:text-xs text-zinc-500 mt-0.5 leading-tight font-medium">
                  {item.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
