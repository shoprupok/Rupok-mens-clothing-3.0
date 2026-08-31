import React, { useState } from 'react';
import { Gift, Check, Sparkles, Copy } from 'lucide-react';
import { RUPOK } from '../data/config';

export const NewsletterVIP: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('RUPOK10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailOrPhone.trim()) {
      setIsSubscribed(true);
    }
  };

  return (
    <section id="vip-club-section" className="mx-3 sm:mx-4 my-4 p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 text-white shadow-xl border border-white/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#f45b16]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
        {/* Left info */}
        <div className="max-w-md">
          <div className="inline-flex items-center gap-1.5 bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 text-[10px] font-black px-2.5 py-0.5 rounded-full mb-2 uppercase tracking-wider">
            <Gift size={12} />
            <span>VIP CLUB PRIVILEGE</span>
          </div>
          <h2 className="text-lg sm:text-2xl font-black text-white leading-tight mb-1.5">
            রূপক ভিআইপি ক্লাবে যোগ দিন
          </h2>
          <p className="text-xs text-zinc-300 font-medium leading-relaxed">
            কুপন কোড ব্যবহার করে প্রথম কেনাকাটায় পেয়ে যান তাৎক্ষণিক ১০% বিশেষ ছাড়!
          </p>
        </div>

        {/* Right Action: Coupon Copy & Phone Input */}
        <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-2.5">
          {/* Coupon Code Pill */}
          <div className="flex items-center justify-between gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-2 rounded-xl">
            <div className="text-left">
              <span className="text-[9px] uppercase font-bold text-zinc-400 block">কুপন কোড</span>
              <span className="font-mono font-black text-sm text-yellow-300 tracking-wider">
                RUPOK10
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="bg-white hover:bg-zinc-100 text-zinc-950 text-xs font-bold px-3 py-1.5 rounded-lg shadow-xs transition-all flex items-center gap-1 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-green-600" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Subscribe */}
          {isSubscribed ? (
            <div className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5">
              <Check size={14} />
              <span>ধন্যবাদ! আপনি ভিআইপি ক্লাবে যুক্ত হয়েছেন।</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex items-center gap-1.5 w-full sm:w-auto">
              <input
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="মোবাইল নম্বর লিখুন..."
                className="bg-white/10 border border-white/20 text-white placeholder-zinc-400 text-xs px-3 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-yellow-400 flex-1 sm:w-44"
              />
              <button
                type="submit"
                className="bg-[#7bdc00] hover:bg-[#6ec500] text-zinc-950 font-black text-xs px-4 py-2 rounded-xl transition-all shadow-md shrink-0 cursor-pointer"
              >
                যুক্ত হোন
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
