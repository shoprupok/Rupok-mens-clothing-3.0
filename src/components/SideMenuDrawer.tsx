import React from 'react';
import { ProductCategory, ActiveTab } from '../types';
import { CATEGORIES_DATA } from '../data/products';
import { X, Phone, MessageSquare, MapPin } from 'lucide-react';
import { RUPOK } from '../data/config';

interface SideMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (cat: ProductCategory) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const SideMenuDrawer: React.FC<SideMenuDrawerProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
  setActiveTab,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />

      <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
        <div className="w-screen max-w-xs sm:max-w-sm bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
            <div>
              <div className="font-bangla text-[#f45b16] text-3xl font-black leading-none">
                {RUPOK.brand.nameBangla}
              </div>
              <div className="text-[9px] font-extrabold tracking-[2px] text-zinc-900 uppercase mt-0.5">
                MEN'S CLOTHING
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body Menu Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            {/* Quick Navigation */}
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block mb-2 px-2">
                Main Menu
              </span>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setActiveTab('home');
                    onClose();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-bold text-zinc-800 hover:bg-orange-50 hover:text-[#f45b16] transition-colors"
                >
                  🏠 Home Page
                </button>
                <button
                  onClick={() => {
                    setActiveTab('shop');
                    onClose();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-bold text-zinc-800 hover:bg-orange-50 hover:text-[#f45b16] transition-colors"
                >
                  🛍️ Shop All Products
                </button>
                <button
                  onClick={() => {
                    setActiveTab('orders');
                    onClose();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-bold text-zinc-800 hover:bg-orange-50 hover:text-[#f45b16] transition-colors"
                >
                  📋 Track My Order
                </button>
              </div>
            </div>

            {/* Categories */}
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block mb-2 px-2">
                Shop By Category
              </span>
              <div className="space-y-1">
                {CATEGORIES_DATA.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      onClose();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-zinc-700 hover:bg-orange-50 hover:text-[#f45b16] flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </span>
                    <span className="font-bangla text-[11px] text-zinc-400">
                      {cat.banglaName}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Helpline / Contact */}
            <div className="bg-orange-50/70 border border-orange-200/80 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-900">
                <Phone size={14} className="text-[#f45b16]" />
                <span>Customer Support</span>
              </div>
              <p className="text-xs text-zinc-600">
                Direct hotline ({RUPOK.contact.supportHours}):<br />
                <a href={`tel:${RUPOK.contact.primaryPhone}`} className="font-bold text-zinc-900 text-sm hover:underline">
                  {RUPOK.contact.primaryPhoneFormatted}
                </a>
              </p>

              <a
                href={RUPOK.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageSquare size={14} />
                <span>WhatsApp Order Support</span>
              </a>
            </div>

            {/* Business Address */}
            <div className="px-2 text-[11px] text-zinc-500 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-zinc-700">
                <MapPin size={13} className="text-[#f45b16]" />
                <span>Registered Office</span>
              </div>
              <p>{RUPOK.contact.address.display}</p>
            </div>
          </div>

          {/* Footer Info */}
          <div className="p-4 border-t border-zinc-200 bg-zinc-50 text-[10px] text-zinc-500 text-center font-medium">
            © {RUPOK.brand.started} {RUPOK.brand.nameEnglish}. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};
