import React from 'react';
import { ShieldCheck, Sparkles, RefreshCw, Eye, Award, CheckCircle2 } from 'lucide-react';

export const WhyChooseRupok: React.FC = () => {
  const pillars = [
    {
      icon: <Award className="text-[#f45b16]" size={22} />,
      title: '১০০% এক্সপোর্ট কোয়ালিটি',
      subtitle: 'প্রিমিয়াম কম্বড কটন ও কালার গ্যারান্টি',
      desc: 'দীর্ঘস্থায়ী ফেব্রিক যা বারবার ধোয়ার পরও নতুনের মতো উজ্জ্বল থাকে।',
    },
    {
      icon: <Eye className="text-blue-600" size={22} />,
      title: 'ডেলিভারির সময় চেক',
      subtitle: 'দেখে পছন্দ হলে টাকা পরিশোধ করুন',
      desc: 'ডেলিভারি ম্যানের সামনে পার্সেল খুলে কোয়ালিটি ও সাইজ যাচাই করার পূর্ণ সুবিধা।',
    },
    {
      icon: <RefreshCw className="text-green-600" size={22} />,
      title: '৭ দিনে সহজ এক্সচেঞ্জ',
      subtitle: 'কোনো শর্ত ছাড়া সাইজ পরিবর্তন',
      desc: 'সাইজ বা ফিটিংসে সমস্যা হলে দ্রুত ও বিনা ঝামেলায় এক্সচেঞ্জ করে দেওয়া হয়।',
    },
    {
      icon: <Sparkles className="text-amber-500" size={22} />,
      title: 'স্মার্ট এশিয়ান ফিটিংস',
      subtitle: 'বাংলাদেশি ছেলেদের পারফেক্ট সাইজিং',
      desc: 'আন্তর্জাতিক প্যাটার্ন অনুযায়ী আধুনিক ও আরামদায়ক কাটিং।',
    },
  ];

  return (
    <section id="why-choose-rupok" className="mx-3 sm:mx-4 my-4 p-4 sm:p-6 rounded-2xl bg-zinc-900 text-white shadow-lg relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#f45b16]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Heading */}
      <div className="text-center max-w-md mx-auto mb-5 relative z-10">
        <div className="inline-flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold text-yellow-300 mb-2">
          <ShieldCheck size={13} />
          <span>আমাদের প্রতিশ্রুতি ও কোয়ালিটি গ্যারান্টি</span>
        </div>
        <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight">
          কেন <span className="text-[#f45b16]">রূপক (RUPÓK)</span> সেরা পছন্দ?
        </h2>
        <p className="text-xs text-zinc-400 font-medium mt-1">
          মানসম্মত পোশাক ও ১০০% বিশ্বস্ত অনলাইন শপিংয়ের নিশ্চয়তা
        </p>
      </div>

      {/* 4 Pillars Grid (2x2 on Mobile, 4x1 on Desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
        {pillars.map((pillar, idx) => (
          <div
            key={idx}
            className="bg-white/5 hover:bg-white/10 transition-colors p-3.5 rounded-xl border border-white/10 flex flex-col justify-between"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                {pillar.icon}
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-black text-white leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-[10px] text-yellow-300/90 font-medium">
                  {pillar.subtitle}
                </p>
              </div>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              {pillar.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
