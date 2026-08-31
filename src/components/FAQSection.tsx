import React, { useState } from 'react';
import { HelpCircle, ChevronDown, CheckCircle2, Truck, RefreshCw, ShieldCheck } from 'lucide-react';
import { RUPOK } from '../data/config';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'ডেলিভারি চার্জ কত এবং কতদিনে হাতে পাব?',
      a: `ঢাকা সিটির মধ্যে ডেলিভারি চার্জ ${RUPOK.delivery.insideDhaka.feeFormatted} এবং ২৪ থেকে ৪৮ ঘণ্টার মধ্যে ডেলিভারি সম্পন্ন হয়। ঢাকা সিটির বাইরে চার্জ ${RUPOK.delivery.outsideDhaka.feeFormatted} এবং ২ থেকে ৩ কর্মদিবসের মধ্যে হোম ডেলিভারি পৌঁছে দেওয়া হয়।`,
      icon: <Truck size={16} className="text-orange-500" />,
    },
    {
      q: 'ডেলিভারি ম্যানের সামনে কি পার্সেল চেক করে নেওয়া যাবে?',
      a: 'হ্যাঁ, অবশ্যই! ডেলিভারি ম্যান থাকা অবস্থাতেই আপনি পার্সেল খুলে কোয়ালিটি, সাইজ এবং কালার দেখে নিতে পারবেন। কোনো অমিল থাকলে ডেলিভারি ম্যানের কাছেই সরাসরি রিটার্ন করার সুবিধা রয়েছে।',
      icon: <ShieldCheck size={16} className="text-blue-500" />,
    },
    {
      q: 'সাইজ অথবা ফিটিংস সমস্যা হলে কীভাবে পরিবর্তন করব?',
      a: 'পণ্য গ্রহণের ৭ দিনের মধ্যে আমাদের হটলাইন বা হোয়াটসঅ্যাপে জানালে আমরা দ্রুততম সময়ে আপনার ঠিকানায় সঠিক সাইজ এক্সচেঞ্জ করে পাঠিয়ে দেব। এক্সচেঞ্জের ক্ষেত্রে কোনো অতিরিক্ত ঝামেলা নেই।',
      icon: <RefreshCw size={16} className="text-green-500" />,
    },
    {
      q: 'পেমেন্ট করার পদ্ধতি কী কী?',
      a: 'আমরা ক্যাশ অন ডেলিভারি (Cash on Delivery) সাপোর্ট করি। এছাড়াও আপনি বিকাশ (bKash), নগদ (Nagad), রকেট এবং যেকোনো ডেবিট/ক্রেডিট কার্ডের মাধ্যমে নিরাপদে পেমেন্ট করতে পারবেন।',
      icon: <CheckCircle2 size={16} className="text-purple-500" />,
    },
  ];

  return (
    <section id="faq-section" className="px-3 sm:px-4 py-4 sm:py-6">
      <div className="text-center max-w-md mx-auto mb-4">
        <div className="inline-flex items-center gap-1 bg-orange-100 text-[#f45b16] text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full mb-1.5">
          <HelpCircle size={13} />
          <span>সাধারণ জিজ্ঞাসা</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
          সচরাচর জিজ্ঞাসিত প্রশ্ন ও উত্তর
        </h2>
      </div>

      <div className="space-y-2.5 max-w-3xl mx-auto">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white border border-zinc-200/80 rounded-xl overflow-hidden shadow-2xs transition-all"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-3.5 sm:p-4 text-left font-bold text-xs sm:text-sm text-zinc-900 hover:bg-zinc-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1 rounded-lg bg-zinc-100 shrink-0">
                    {faq.icon}
                  </div>
                  <span>{faq.q}</span>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-zinc-400 transition-transform duration-300 shrink-0 ml-2 ${
                    isOpen ? 'rotate-180 text-[#f45b16]' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 pt-1 text-xs text-zinc-600 leading-relaxed border-t border-zinc-100 bg-orange-50/20 font-medium">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
