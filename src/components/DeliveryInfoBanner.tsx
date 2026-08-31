import React from 'react';
import { MapPin, Navigation, Clock } from 'lucide-react';
import { RUPOK } from '../data/config';

export const DeliveryInfoBanner: React.FC = () => {
  return (
    <div 
      id="delivery-rates-banner"
      className="mx-3 sm:mx-4 my-4 p-4 sm:p-5 bg-gradient-to-r from-yellow-50/40 via-orange-50/30 to-yellow-50/40 border border-amber-200/80 rounded-2xl shadow-2xs relative overflow-hidden"
    >
      <div className="grid grid-cols-3 divide-x divide-zinc-200 text-center items-center">
        {/* Inside Dhaka */}
        <div className="px-1 sm:px-3">
          <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-yellow-100 text-yellow-800 mb-1 sm:hidden">
            <MapPin size={14} />
          </div>
          <strong className="block text-lg sm:text-2xl font-black text-zinc-900 leading-tight">
            {RUPOK.delivery.insideDhaka.feeFormatted}
          </strong>
          <p className="text-[10px] sm:text-xs text-zinc-600 font-semibold mt-0.5 leading-tight">
            Inside Dhaka<br />
            <span className="text-zinc-500 font-normal">Delivery Charge</span>
          </p>
        </div>

        {/* Outside Dhaka */}
        <div className="px-1 sm:px-3">
          <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-orange-100 text-[#f45b16] mb-1 sm:hidden">
            <Navigation size={14} />
          </div>
          <strong className="block text-lg sm:text-2xl font-black text-zinc-900 leading-tight">
            {RUPOK.delivery.outsideDhaka.feeFormatted}
          </strong>
          <p className="text-[10px] sm:text-xs text-zinc-600 font-semibold mt-0.5 leading-tight">
            Outside Dhaka<br />
            <span className="text-zinc-500 font-normal">Delivery Charge</span>
          </p>
        </div>

        {/* Speed */}
        <div className="px-1 sm:px-3">
          <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-100 text-green-700 mb-1 sm:hidden">
            <Clock size={14} />
          </div>
          <strong className="block text-base sm:text-xl md:text-2xl font-black text-[#f45b16] leading-tight">
            {RUPOK.delivery.insideDhaka.estimatedTime}
          </strong>
          <p className="text-[10px] sm:text-xs text-zinc-600 font-semibold mt-0.5 leading-tight">
            Delivery Time<br />
            <span className="text-zinc-500 font-normal">Nationwide COD</span>
          </p>
        </div>
      </div>
    </div>
  );
};
