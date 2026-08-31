import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Truck, RotateCcw, Headphones, ExternalLink, Clock } from 'lucide-react';
import { RUPOK } from '../data/config';
import { ActiveTab, ProductCategory } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  onSelectCategory?: (cat: ProductCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onSelectCategory }) => {
  return (
    <footer id="main-footer" className="mt-8 border-t border-zinc-200 bg-[#121214] text-white rounded-t-3xl overflow-hidden shadow-2xl">
      {/* Top Value Propositions (LiveShopping BD Style 4-Pillars) */}
      <div className="border-b border-zinc-800/80 px-4 sm:px-8 py-6 grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs bg-[#18181b]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-[#f45b16] border border-orange-500/20 flex items-center justify-center shrink-0">
            <Truck size={20} />
          </div>
          <div>
            <strong className="text-white block font-bold text-xs">দ্রুততম হোম ডেলিভারি</strong>
            <span className="text-zinc-400 text-[10.5px]">ঢাকা ২৪ ঘণ্টা • সারা দেশ ৪৮-৭২ ঘণ্টা</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-[#7bdc00] border border-emerald-500/20 flex items-center justify-center shrink-0">
            <ShieldCheck size={20} />
          </div>
          <div>
            <strong className="text-white block font-bold text-xs">ক্যাশ অন ডেলিভারি</strong>
            <span className="text-zinc-400 text-[10.5px]">ডেলিভারি ম্যানের সামনে চেক করুন</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-[#ff7a22] border border-amber-500/20 flex items-center justify-center shrink-0">
            <RotateCcw size={20} />
          </div>
          <div>
            <strong className="text-white block font-bold text-xs">{RUPOK.policies.exchangeTitle}</strong>
            <span className="text-zinc-400 text-[10.5px]">সাইজ বা ফিটিং সমস্যায় সহজ সমাধান</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0">
            <Headphones size={20} />
          </div>
          <div>
            <strong className="text-white block font-bold text-xs">কাস্টমার হেল্পলাইন</strong>
            <span className="text-zinc-400 text-[10.5px] font-mono">{RUPOK.contact.displayPhone}</span>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Directory (LiveShopping BD Structure) */}
      <div className="p-6 sm:p-8 md:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-xs text-zinc-400">
        {/* Column 1: Brand & Socials */}
        <div className="space-y-4">
          <div className="flex flex-col items-start gap-1">
            <div className="font-bangla text-[#f45b16] text-3xl font-black leading-none">
              {RUPOK.brand.nameBangla}
            </div>
            <div className="text-[9px] font-extrabold tracking-[3px] text-white uppercase">
              MEN'S CLOTHING
            </div>
          </div>
          <p className="text-[11.5px] leading-relaxed text-zinc-400">
            {RUPOK.brand.tagline} — {RUPOK.brand.description}
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-2 pt-1">
            {RUPOK.social.facebook.show && (
              <a
                href={RUPOK.social.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-zinc-800 hover:bg-[#1877F2] text-white flex items-center justify-center transition-colors text-xs font-bold border border-zinc-700/60"
                title="Facebook"
              >
                f
              </a>
            )}
            {RUPOK.social.whatsapp.show && (
              <a
                href={RUPOK.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-zinc-800 hover:bg-[#25D366] text-white flex items-center justify-center transition-colors text-xs font-bold border border-zinc-700/60"
                title="WhatsApp"
              >
                💬
              </a>
            )}
            {RUPOK.social.youtube.show && (
              <a
                href={RUPOK.social.youtube.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-zinc-800 hover:bg-[#FF0000] text-white flex items-center justify-center transition-colors text-xs font-bold border border-zinc-700/60"
                title="YouTube"
              >
                ▶
              </a>
            )}
            {RUPOK.social.tiktok.show && (
              <a
                href={RUPOK.social.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-zinc-800 hover:bg-black text-white flex items-center justify-center transition-colors text-xs font-bold border border-zinc-700/60"
                title="TikTok"
              >
                ♪
              </a>
            )}
          </div>
        </div>

        {/* Column 2: Categories (LiveShopping Style Category Directory) */}
        <div className="space-y-3">
          <h4 className="text-white font-bold uppercase tracking-wider text-xs border-b border-zinc-800 pb-2">
            কালেকশন ক্যাটাগরি
          </h4>
          <ul className="space-y-2 text-[11.5px]">
            <li>
              <button
                onClick={() => {
                  if (onSelectCategory) onSelectCategory('panjabi');
                  setActiveTab('shop');
                }}
                className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
              >
                <span>• পাঞ্জাবি কালেকশন (Panjabi)</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  if (onSelectCategory) onSelectCategory('shirt');
                  setActiveTab('shop');
                }}
                className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
              >
                <span>• ফরমাল ও ক্যাজুয়াল শার্ট (Shirts)</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  if (onSelectCategory) onSelectCategory('polo');
                  setActiveTab('shop');
                }}
                className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
              >
                <span>• পোলো টি-শার্ট (Polo T-Shirts)</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  if (onSelectCategory) onSelectCategory('pants');
                  setActiveTab('shop');
                }}
                className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
              >
                <span>• চিনো ও প্রিমিয়াম প্যান্ট (Pants)</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  if (onSelectCategory) onSelectCategory('accessories');
                  setActiveTab('shop');
                }}
                className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
              >
                <span>• বেল্ট ও এক্সেসরিজ (Accessories)</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab('home');
                  setTimeout(() => {
                    const el = document.getElementById('shop-the-look-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="text-yellow-300 hover:text-yellow-200 transition-colors cursor-pointer text-left flex items-center gap-1.5 font-bold"
              >
                <span>• লুকবুক কম্বো সেট (-১৫% ছাড়)</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Customer Care & Services */}
        <div className="space-y-3">
          <h4 className="text-white font-bold uppercase tracking-wider text-xs border-b border-zinc-800 pb-2">
            কাস্টমার সার্ভিস ও পলিসি
          </h4>
          <ul className="space-y-2 text-[11.5px]">
            <li>
              <button
                onClick={() => setActiveTab('orders')}
                className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
              >
                <span>• অর্ডার ট্র্যাকিং (Track Order)</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('account')}
                className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
              >
                <span>• রিটার্ন ও এক্সচেঞ্জ পলিসি</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('account')}
                className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
              >
                <span>• সাইজ গাইড ও ফিটিং তথ্য</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('account')}
                className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
              >
                <span>• ডেলিভারি চার্জ ও সময়সীমা</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('account')}
                className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
              >
                <span>• শর্তাবলী ও গোপনীয়তা নীতি</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact, Showroom & Delivery Logistics */}
        <div className="space-y-3">
          <h4 className="text-white font-bold uppercase tracking-wider text-xs border-b border-zinc-800 pb-2">
            যোগাযোগ ও আউটলেট
          </h4>
          <div className="space-y-2.5 text-[11.5px]">
            <div className="flex items-start gap-2">
              <MapPin size={15} className="text-[#f45b16] shrink-0 mt-0.5" />
              <span>{RUPOK.contact.address.display}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={15} className="text-[#7bdc00] shrink-0" />
              <a href={`tel:${RUPOK.contact.primaryPhone}`} className="hover:text-white transition-colors font-mono font-bold">
                {RUPOK.contact.primaryPhoneFormatted}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={15} className="text-zinc-400 shrink-0" />
              <span>{RUPOK.contact.supportHours}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={15} className="text-[#ff7a22] shrink-0" />
              <a href={`mailto:${RUPOK.contact.email}`} className="hover:text-white transition-colors">
                {RUPOK.contact.email}
              </a>
            </div>

            {/* Courier & Payment Badges */}
            <div className="pt-2 border-t border-zinc-800 text-[10.5px]">
              <span className="text-zinc-300 font-bold block mb-1">কুরিয়ার ও পেমেন্ট পার্টনার:</span>
              <div className="flex flex-wrap gap-1.5">
                <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded text-[10px] font-semibold">ক্যাশ অন ডেলিভারি</span>
                <span className="bg-zinc-800 text-pink-400 px-2 py-0.5 rounded text-[10px] font-bold">bKash</span>
                <span className="bg-zinc-800 text-orange-400 px-2 py-0.5 rounded text-[10px] font-bold">Nagad</span>
                <span className="bg-zinc-800 text-red-400 px-2 py-0.5 rounded text-[10px] font-bold">Pathao</span>
                <span className="bg-zinc-800 text-cyan-400 px-2 py-0.5 rounded text-[10px] font-bold">Steadfast</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="px-6 py-4 bg-black border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10.5px] text-zinc-500">
        <div>
          © {RUPOK.brand.started} {RUPOK.brand.nameEnglish}. All rights reserved.
        </div>
        <div className="flex items-center gap-3">
          <span>{RUPOK.brand.tagline}</span>
          <span>•</span>
          <span className="font-bangla font-bold text-zinc-400">{RUPOK.brand.nameBangla}</span>
        </div>
      </div>
    </footer>
  );
};

