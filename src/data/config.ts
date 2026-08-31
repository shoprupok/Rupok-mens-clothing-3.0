/* =========================================================
   RUPOK MEN'S CLOTHING — BUSINESS INFORMATION & CONFIGURATION
   Single Source of Truth for all Business Logic, Content & Contacts
   ========================================================= */

export interface RupokSocialPlatform {
  url: string;
  show: boolean;
}

export interface RupokConfig {
  brand: {
    nameBangla: string;
    nameEnglish: string;
    tagline: string;
    description: string;
    started: string;
    mission: string;
    vision: string;
    values: string[];
  };
  contact: {
    primaryPhone: string;
    primaryPhoneFormatted: string;
    displayPhone: string;
    whatsappNumber: string;
    whatsappDisplay: string;
    whatsappLink: string;
    email: string;
    supportHours: string;
    supportHoursBangla: string;
    address: {
      display: string;
      district: string;
      division: string;
      country: string;
      fullText: string;
    };
  };
  social: {
    facebook: RupokSocialPlatform;
    youtube: RupokSocialPlatform;
    tiktok: RupokSocialPlatform;
    whatsapp: RupokSocialPlatform;
    instagram: RupokSocialPlatform;
  };
  delivery: {
    insideDhaka: {
      fee: number;
      feeFormatted: string;
      estimatedTime: string;
      courier: 'Pathao Courier';
      freeShippingThreshold: number | null;
    };
    outsideDhaka: {
      fee: number;
      feeFormatted: string;
      estimatedTime: string;
      courier: 'Steadfast Courier';
      freeShippingThreshold: number | null;
    };
    couriers: Array<{
      name: string;
      coverage: string;
    }>;
    cashOnDeliveryAvailable: boolean;
    inspectionAllowed: boolean;
  };
  payment: {
    methods: Array<{
      id: 'cod' | 'bkash' | 'nagad';
      name: string;
      nameBangla: string;
      number?: string;
      type?: string;
      icon: string;
      badge?: string;
      color?: string;
      description?: string;
      instruction?: string;
    }>;
  };
  offers: {
    primaryDiscountPercent: number;
    headline: string;
    subheadline: string;
    promoCode: {
      code: string;
      discountPercent: number;
      description: string;
    };
  };
  policies: {
    exchangeTitle: string;
    exchangeSubtitle: string;
    exchangePolicy: string;
    qualityGuarantee: string;
    supportNote: string;
  };
}

export const RUPOK: RupokConfig = {
  /* ---------- BRAND ---------- */
  brand: {
    nameBangla: "রূপক",
    nameEnglish: "Rupok Men's Clothing",
    tagline: "Style Your Identity",
    description:
      "রূপক – Rupok Men's Clothing একটি আধুনিক পুরুষদের ফ্যাশন ব্র্যান্ড। " +
      "আমাদের লক্ষ্য হলো মানসম্মত, স্টাইলিশ ও সময়োপযোগী পোশাক " +
      "যুক্তিসঙ্গত মূল্যে গ্রাহকদের কাছে পৌঁছে দেওয়া।",
    started: "2026",
    mission:
      "মানসম্মত ও স্টাইলিশ পুরুষদের পোশাক সহজে ও নির্ভরযোগ্যভাবে গ্রাহকদের কাছে পৌঁছে দেওয়া।",
    vision:
      "বাংলাদেশের অন্যতম বিশ্বস্ত ও জনপ্রিয় মেনস ফ্যাশন ব্র্যান্ড হিসেবে নিজেকে প্রতিষ্ঠিত করা।",
    values: [
      "কোয়ালিটি ফার্স্ট",
      "সততা ও স্বচ্ছতা",
      "গ্রাহক সন্তুষ্টি",
      "সময়মতো ডেলিভারি",
      "যুক্তিসঙ্গত মূল্য"
    ]
  },

  /* ---------- CONTACT & CHANNELS ---------- */
  contact: {
    primaryPhone: "01773979280",
    primaryPhoneFormatted: "+880 1773-979280",
    displayPhone: "01773-979280",
    whatsappNumber: "8801773979280",
    whatsappDisplay: "+880 1773-979280",
    whatsappLink: "https://wa.me/8801773979280",
    email: "shop.rupok@gmail.com",
    supportHours: "8:00 AM – 11:00 PM (Everyday)",
    supportHoursBangla: "প্রতিদিন সকাল ৮:০০ - রাত ১১:০০",
    address: {
      display: "Dinajpur Sadar, Dinajpur, Rangpur, Bangladesh",
      district: "Dinajpur",
      division: "Rangpur",
      country: "Bangladesh",
      fullText: "Dinajpur Sadar, Dinajpur, Rangpur, Bangladesh"
    }
  },

  /* ---------- SOCIAL MEDIA ---------- */
  social: {
    facebook: {
      url: "https://facebook.com/rupokclothing",
      show: true
    },
    youtube: {
      url: "https://youtube.com/@rupokclothing",
      show: true
    },
    tiktok: {
      url: "https://tiktok.com/@rupokclothing",
      show: true
    },
    whatsapp: {
      url: "https://wa.me/8801773979280",
      show: true
    },
    instagram: {
      url: "",
      show: false // Hidden until an Instagram link is provided
    }
  },

  /* ---------- DELIVERY & SHIPPING ---------- */
  delivery: {
    insideDhaka: {
      fee: 70,
      feeFormatted: "৳70",
      estimatedTime: "24-48 Hours",
      courier: "Pathao Courier",
      freeShippingThreshold: 2000
    },
    outsideDhaka: {
      fee: 120,
      feeFormatted: "৳120",
      estimatedTime: "48-72 Hours",
      courier: "Steadfast Courier",
      freeShippingThreshold: null
    },
    couriers: [
      { name: "Pathao Courier", coverage: "Inside Dhaka & Major Cities" },
      { name: "Steadfast Courier", coverage: "All Districts Nationwide" }
    ],
    cashOnDeliveryAvailable: true,
    inspectionAllowed: true
  },

  /* ---------- PAYMENT METHODS ---------- */
  payment: {
    methods: [
      {
        id: "cod",
        name: "Cash on Delivery",
        nameBangla: "ক্যাশ অন ডেলিভারি",
        icon: "💵",
        badge: "Most Popular",
        description: "পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন"
      },
      {
        id: "bkash",
        name: "bKash",
        nameBangla: "বিকাশ",
        number: "01773-979280",
        type: "Personal",
        icon: "📱",
        color: "#E2136E",
        instruction: "Send Money to Personal bKash number"
      },
      {
        id: "nagad",
        name: "Nagad",
        nameBangla: "নগদ",
        number: "01717-758025",
        type: "Personal",
        icon: "💳",
        color: "#F7941D",
        instruction: "Send Money to Personal Nagad number"
      }
    ]
  },

  /* ---------- OFFERS & PROMOTIONS ---------- */
  offers: {
    primaryDiscountPercent: 70,
    headline: "UP TO 70% OFF",
    subheadline: "Special Flash Sale on Men's Essentials",
    promoCode: {
      code: "RUPOK10",
      discountPercent: 10,
      description: "Get extra 10% OFF on all orders with code RUPOK10"
    }
  },

  /* ---------- POLICIES & GUARANTEES ---------- */
  policies: {
    exchangeTitle: "Easy Exchange",
    exchangeSubtitle: "Check at Delivery",
    exchangePolicy: "Product exchange must be checked and requested in front of the delivery person at the time of delivery (ডেলিভারি ম্যানের সামনে প্রোডাক্ট চেক করে রিকোয়েস্ট করতে হবে)।",
    qualityGuarantee: "100% Export Quality Cotton & Premium Fabrics",
    supportNote: "কোনো সমস্যা বা জিজ্ঞাসার জন্য সরাসরি কল বা হোয়াটসঅ্যাপ করুন।"
  }
};
