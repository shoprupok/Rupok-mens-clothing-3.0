import React from 'react';
import { MapPin, Phone, ShieldCheck, RotateCcw, MessageSquare, Truck, Heart, Mail, Clock } from 'lucide-react';
import { ActiveTab } from '../types';
import { RUPOK } from '../data/config';

interface AccountViewProps {
  ordersCount: number;
  wishlistCount: number;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenWishlist: () => void;
}

export const AccountView: React.FC<AccountViewProps> = ({
  ordersCount,
  wishlistCount,
  setActiveTab,
  onOpenWishlist,
}) => {
  return (
    <div className="px-3 sm:px-4 py-4 space-y-5 max-w-3xl mx-auto">
      {/* Profile Card */}
      <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-6 shadow-2xs">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f45b16] to-[#ff7a22] text-white flex items-center justify-center font-bangla text-2xl font-black shadow-md">
            {RUPOK.brand.nameBangla}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-zinc-900">
                {RUPOK.brand.nameEnglish} Shopper
              </h2>
              <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Active Member
              </span>
            </div>
            <p className="text-xs text-zinc-500 font-medium mt-0.5">
              {RUPOK.contact.email} • {RUPOK.contact.address.country}
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-zinc-100">
          <button
            onClick={() => setActiveTab('orders')}
            className="p-3 bg-zinc-50 hover:bg-orange-50/50 rounded-2xl border border-zinc-200/80 text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-500 font-medium">Orders Placed</span>
              <Truck size={16} className="text-[#f45b16]" />
            </div>
            <strong className="text-lg font-black text-zinc-900 block mt-1">
              {ordersCount} Orders
            </strong>
          </button>

          <button
            onClick={onOpenWishlist}
            className="p-3 bg-zinc-50 hover:bg-orange-50/50 rounded-2xl border border-zinc-200/80 text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-500 font-medium">Wishlist Items</span>
              <Heart size={16} className="text-[#f45b16]" />
            </div>
            <strong className="text-lg font-black text-zinc-900 block mt-1">
              {wishlistCount} Saved
            </strong>
          </button>
        </div>
      </div>

      {/* Bangladesh Delivery & Service Policy */}
      <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-[#f45b16]" /> Customer Guarantees & Policy
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-zinc-50 border border-zinc-200/70 rounded-2xl space-y-1">
            <strong className="font-bold text-zinc-900 block flex items-center gap-1.5">
              <RotateCcw size={14} className="text-[#7bdc00]" /> {RUPOK.policies.exchangeTitle}
            </strong>
            <p className="text-zinc-600 text-[11px] leading-relaxed">
              {RUPOK.policies.exchangePolicy}
            </p>
          </div>

          <div className="p-3.5 bg-zinc-50 border border-zinc-200/70 rounded-2xl space-y-1">
            <strong className="font-bold text-zinc-900 block flex items-center gap-1.5">
              <Truck size={14} className="text-[#f45b16]" /> Cash on Delivery
            </strong>
            <p className="text-zinc-600 text-[11px] leading-relaxed">
              Inspect the package upon receiving. Pay the exact invoice amount to delivery rider in cash or digital wallet.
            </p>
          </div>
        </div>
      </div>

      {/* Support & Business Information */}
      <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
          <Phone size={14} className="text-[#f45b16]" /> Contact & Business Information
        </h3>

        <div className="space-y-2.5 text-xs text-zinc-700">
          <div className="flex items-start gap-2.5">
            <MapPin size={16} className="text-[#f45b16] shrink-0 mt-0.5" />
            <div>
              <strong className="text-zinc-900 block">Registered Address</strong>
              <p className="text-zinc-600 text-[11px]">{RUPOK.contact.address.display}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Phone size={16} className="text-[#7bdc00] shrink-0 mt-0.5" />
            <div>
              <strong className="text-zinc-900 block">Customer Hotline ({RUPOK.contact.supportHours})</strong>
              <a href={`tel:${RUPOK.contact.primaryPhone}`} className="text-zinc-600 hover:text-[#f45b16] text-[11px]">
                {RUPOK.contact.primaryPhoneFormatted}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Mail size={16} className="text-zinc-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-zinc-900 block">Email Support</strong>
              <a href={`mailto:${RUPOK.contact.email}`} className="text-zinc-600 hover:text-[#f45b16] text-[11px]">
                {RUPOK.contact.email}
              </a>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <a
            href={RUPOK.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <MessageSquare size={16} />
            <span>Chat Directly on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
