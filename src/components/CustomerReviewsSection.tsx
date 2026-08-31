import React from 'react';
import { Star, CheckCircle, ThumbsUp, MessageSquare, Quote } from 'lucide-react';

export const CustomerReviewsSection: React.FC = () => {
  const reviews = [
    {
      id: 'rev-1',
      name: 'Tanvir Ahmed',
      location: 'Dhanmondi, Dhaka',
      rating: 5,
      date: '২ দিন আগে',
      productName: 'Minimalist Oxford Cotton Shirt',
      comment: 'কাপড়ের কোয়ালিটি অনেক প্রিমিয়াম। ধোয়ার পরও রং বা সাইজে কোনো পরিবর্তন হয়নি। ডেলিভারির সময় পার্সেল চেক করে নেওয়ার অপশন থাকায় একদম নিশ্চিন্তে অর্ডার করেছি।',
      helpfulCount: 42,
    },
    {
      id: 'rev-2',
      name: 'Mahmudul Hasan',
      location: 'Chittagong City',
      rating: 5,
      date: '৪ দিন আগে',
      productName: 'Heritage Minimalist Panjabi (Navy)',
      comment: 'ছবিতে যেমন দেখেছি, হাতে পাওয়ার পর তার চেয়েও বেশি সুন্দর লেগেছে। সাইজ ফিটিংস একদম পারফেক্ট। ধন্যবাদ রূপক ফ্যাশন!',
      helpfulCount: 38,
    },
    {
      id: 'rev-3',
      name: 'Saimon Chowdhury',
      location: 'Sylhet Sadar',
      rating: 5,
      date: '১ সপ্তাহ আগে',
      productName: 'Signature Pique Polo T-Shirt',
      comment: 'অর্ডার করার ৪৮ ঘণ্টার মধ্যে সিলেটে ডেলিভারি পেয়েছি। কটন ম্যাটেরিয়াল অনেক সফট ও আরামদায়ক। আবার অর্ডার করব ইনশাআল্লাহ।',
      helpfulCount: 29,
    },
    {
      id: 'rev-4',
      name: 'Rakibul Islam',
      location: 'Uttara, Dhaka',
      rating: 5,
      date: '২ সপ্তাহ আগে',
      productName: 'Slim Fit Stretch Chino Pants',
      comment: 'অফিসের রেগুলার ব্যবহারের জন্য বেস্ট চিনো প্যান্ট। স্ট্রেচেবল হওয়ায় দীর্ঘক্ষণ পরে থাকলেও কোনো অস্বস্তি লাগে না। ১০০% রেকমেন্ডেড!',
      helpfulCount: 51,
    },
  ];

  return (
    <section id="customer-reviews-section" className="px-3 sm:px-4 py-4 sm:py-6 bg-zinc-50 border-y border-zinc-200/70">
      {/* Section Head with Rating Summary */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
        <div>
          <div className="flex items-center gap-1.5 text-amber-500 font-bold text-xs mb-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-zinc-900 font-black text-sm">৪.৯ / ৫.০</span>
            <span className="text-zinc-500 font-medium">(১২,৫০০+ রিভিউ)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
            কাস্টমারদের প্রতিক্রিয়া ও অভিজ্ঞতা
          </h2>
          <p className="text-xs text-zinc-500 font-medium">
            সারা বাংলাদেশ থেকে আমাদের সম্মানিত গ্রাহকদের আসল রিভিউ
          </p>
        </div>

        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-xl text-xs font-bold shrink-0">
          <CheckCircle size={14} className="text-emerald-600" />
          <span>১০০% ভেরিফাইড বায়ার রিভিউ</span>
        </div>
      </div>

      {/* Review Cards Grid (1-Col Mobile / 2-Col Desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white p-4 rounded-2xl border border-zinc-200/80 shadow-xs flex flex-col justify-between"
          >
            <div>
              {/* Header: User Info & Rating */}
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-[#f45b16] text-white font-bold flex items-center justify-center text-xs shadow-xs">
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <h4 className="text-xs sm:text-sm font-black text-zinc-900">
                        {rev.name}
                      </h4>
                      <CheckCircle size={12} className="text-blue-500" title="Verified Buyer" />
                    </div>
                    <p className="text-[10.5px] text-zinc-500">
                      {rev.location} • <span className="text-zinc-400">{rev.date}</span>
                    </p>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-0.5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              {/* Product Purchased Tag */}
              <div className="inline-block bg-orange-50 text-[#f45b16] text-[10px] font-bold px-2 py-0.5 rounded-md mb-2">
                পণ্য: {rev.productName}
              </div>

              {/* Review Text */}
              <p className="text-xs text-zinc-700 leading-relaxed italic mb-3 font-medium">
                "{rev.comment}"
              </p>
            </div>

            {/* Helpful Counter */}
            <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[10.5px] text-zinc-400">
              <span className="flex items-center gap-1 text-zinc-500 font-semibold">
                <ThumbsUp size={11} className="text-zinc-400" />
                {rev.helpfulCount} জনের কাছে উপকারী লেগেছে
              </span>
              <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                <CheckCircle size={10} /> Verified Purchase
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
