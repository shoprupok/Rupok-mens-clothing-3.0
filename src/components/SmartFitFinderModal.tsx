import React, { useState } from 'react';
import { X, Check, Ruler, Sparkles, User, ArrowRight } from 'lucide-react';
import { RUPOK } from '../data/config';

interface SmartFitFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSize?: (size: string) => void;
}

export const SmartFitFinderModal: React.FC<SmartFitFinderModalProps> = ({
  isOpen,
  onClose,
  onSelectSize,
}) => {
  if (!isOpen) return null;

  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(8);
  const [weightKg, setWeightKg] = useState<number>(68);
  const [fitPreference, setFitPreference] = useState<'slim' | 'regular' | 'relaxed'>('regular');
  const [calculatedResult, setCalculatedResult] = useState<{
    size: string;
    chest: string;
    length: string;
    explanation: string;
  } | null>(null);

  const calculateFit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalInches = heightFeet * 12 + heightInches;
    
    // Smart heuristic for Bangladeshi men standard sizing
    let recommendedSize = 'M (38)';
    let chest = '38 - 39"';
    let length = '28"';
    let explanation = 'Perfect standard fit for everyday elegance and comfort.';

    if (weightKg < 60 || totalInches < 65) {
      if (fitPreference === 'relaxed') {
        recommendedSize = 'M (38)';
        chest = '38 - 39"';
        length = '28"';
      } else {
        recommendedSize = 'M (38)';
        chest = '38"';
        length = '28"';
        explanation = 'Tailored clean fit along shoulders and chest.';
      }
    } else if (weightKg <= 72) {
      if (fitPreference === 'slim') {
        recommendedSize = 'M (38)';
        chest = '38 - 39"';
        length = '28"';
        explanation = 'Modern slim contour highlighting chest and torso.';
      } else if (fitPreference === 'relaxed') {
        recommendedSize = 'L (40)';
        chest = '40 - 41"';
        length = '29"';
        explanation = 'Breezy relaxed drape with extra armhole freedom.';
      } else {
        recommendedSize = totalInches >= 70 ? 'L (40)' : 'M (38)';
        chest = totalInches >= 70 ? '40 - 41"' : '38 - 39"';
        length = totalInches >= 70 ? '29"' : '28"';
        explanation = 'Balanced standard fit providing effortless style and flexibility.';
      }
    } else if (weightKg <= 83) {
      if (fitPreference === 'slim') {
        recommendedSize = 'L (40)';
        chest = '40 - 41"';
        length = '29"';
        explanation = 'Snug executive fit designed for smart tailored looks.';
      } else if (fitPreference === 'relaxed') {
        recommendedSize = 'XL (42)';
        chest = '42 - 43"';
        length = '30"';
        explanation = 'Spacious and comfortable cut for effortless movement.';
      } else {
        recommendedSize = 'L (40)';
        chest = '40 - 41"';
        length = '29"';
        explanation = 'Optimally proportioned across chest, waist, and sleeves.';
      }
    } else if (weightKg <= 94) {
      if (fitPreference === 'slim') {
        recommendedSize = 'XL (42)';
        chest = '42 - 43"';
        length = '30"';
      } else {
        recommendedSize = 'XL (42)';
        chest = '42 - 43"';
        length = '30"';
        explanation = 'Comfortable chest circumference with structured shoulders.';
      }
    } else {
      recommendedSize = 'XXL (44)';
      chest = '44 - 46"';
      length = '31"';
      explanation = 'Generous cut accommodating broader torso and athletic builds.';
    }

    setCalculatedResult({
      size: recommendedSize,
      chest,
      length,
      explanation,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div 
        id="smart-fit-finder-modal"
        className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden z-10 border border-zinc-100 flex flex-col"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-200 flex items-center justify-between bg-zinc-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-100 text-[#f45b16] flex items-center justify-center shadow-xs">
              <Ruler size={20} />
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg text-zinc-900 leading-tight flex items-center gap-1.5">
                <span>Smart Fit & Size Advisor</span>
                <span className="bg-yellow-400 text-zinc-950 text-[9px] font-black uppercase px-1.5 py-0.5 rounded">AI Fit</span>
              </h2>
              <p className="text-xs text-zinc-500 font-medium">
                আপনার উচ্চতা ও ওজন অনুযায়ী নিখুঁত সাইজ জেনে নিন
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200 transition-colors cursor-pointer"
            aria-label="Close size finder"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto max-h-[80vh]">
          <form onSubmit={calculateFit} className="space-y-4">
            {/* Height input */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                উচ্চতা (Height)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2">
                  <select
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(Number(e.target.value))}
                    className="w-full bg-transparent text-sm font-bold text-zinc-900 focus:outline-none cursor-pointer"
                  >
                    <option value={4}>4 Feet</option>
                    <option value={5}>5 Feet</option>
                    <option value={6}>6 Feet</option>
                  </select>
                </div>

                <div className="flex items-center bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2">
                  <select
                    value={heightInches}
                    onChange={(e) => setHeightInches(Number(e.target.value))}
                    className="w-full bg-transparent text-sm font-bold text-zinc-900 focus:outline-none cursor-pointer"
                  >
                    {[...Array(12).keys()].map((inch) => (
                      <option key={inch} value={inch}>
                        {inch} Inches
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Weight input */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-zinc-700 mb-1.5">
                <span>ওজন (Weight):</span>
                <span className="text-[#f45b16] font-black text-sm">{weightKg} kg</span>
              </div>
              <input
                type="range"
                min={45}
                max={120}
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-[#f45b16]"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 font-semibold mt-1">
                <span>45 kg</span>
                <span>70 kg</span>
                <span>95 kg</span>
                <span>120 kg</span>
              </div>
            </div>

            {/* Fit Preference */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                পছন্দের ফিটিং (Fit Preference)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'slim', label: 'Slim Fit', bangla: 'স্লিম ফিট' },
                  { id: 'regular', label: 'Regular Fit', bangla: 'রেগুলার ফিট' },
                  { id: 'relaxed', label: 'Relaxed / Comfort', bangla: 'লুজ / কমফোর্ট' },
                ].map((fit) => (
                  <button
                    key={fit.id}
                    type="button"
                    onClick={() => setFitPreference(fit.id as any)}
                    className={`p-2 rounded-xl text-center border text-xs transition-all cursor-pointer ${
                      fitPreference === fit.id
                        ? 'border-[#f45b16] bg-orange-50/80 text-[#f45b16] font-black ring-1 ring-[#f45b16]'
                        : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-white'
                    }`}
                  >
                    <span className="block font-bold">{fit.label}</span>
                    <span className="block text-[10px] text-zinc-500 font-normal">{fit.bangla}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#7bdc00] hover:bg-[#6ec500] text-zinc-950 font-black rounded-xl text-sm flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <Sparkles size={16} />
              <span>আমার সঠিক সাইজ দেখুন</span>
            </button>
          </form>

          {/* Result Box */}
          {calculatedResult && (
            <div className="bg-gradient-to-br from-orange-50 via-amber-50/50 to-white border-2 border-[#f45b16]/40 rounded-2xl p-4 text-center animate-in zoom-in-95 duration-200 shadow-sm space-y-3">
              <span className="inline-block bg-[#f45b16] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                Recommended For You
              </span>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-zinc-900">
                  {calculatedResult.size}
                </h3>
                <p className="text-xs text-zinc-600 font-medium mt-0.5">
                  {calculatedResult.explanation}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-white/80 border border-orange-200 rounded-xl p-2.5 text-xs text-zinc-800 font-bold">
                <div>
                  <span className="text-[10px] text-zinc-400 font-medium block">বুকের মাপ (Chest):</span>
                  <span>{calculatedResult.chest}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 font-medium block">লম্বা (Length):</span>
                  <span>{calculatedResult.length}</span>
                </div>
              </div>

              {onSelectSize && (
                <button
                  type="button"
                  onClick={() => {
                    onSelectSize(calculatedResult.size);
                    onClose();
                  }}
                  className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Check size={14} />
                  <span>Use Size {calculatedResult.size} & Continue</span>
                </button>
              )}
            </div>
          )}

          {/* Size Chart Table Reference */}
          <div className="border-t border-zinc-100 pt-3">
            <h4 className="text-xs font-bold text-zinc-700 mb-2">স্ট্যান্ডার্ড সাইজ চার্ট (ইঞ্চিতে):</h4>
            <div className="overflow-x-auto text-[11px] text-zinc-700">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="bg-zinc-100 text-zinc-800 font-bold">
                    <th className="p-1.5 rounded-l-lg">সাইজ (Size)</th>
                    <th className="p-1.5">বুক (Chest)</th>
                    <th className="p-1.5">লম্বা (Length)</th>
                    <th className="p-1.5 rounded-r-lg">হাতা (Sleeve)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  <tr>
                    <td className="p-1.5 font-bold text-zinc-900">M (38)</td>
                    <td>38 - 39"</td>
                    <td>28"</td>
                    <td>24.5"</td>
                  </tr>
                  <tr>
                    <td className="p-1.5 font-bold text-zinc-900">L (40)</td>
                    <td>40 - 41"</td>
                    <td>29"</td>
                    <td>25"</td>
                  </tr>
                  <tr>
                    <td className="p-1.5 font-bold text-zinc-900">XL (42)</td>
                    <td>42 - 43"</td>
                    <td>30"</td>
                    <td>25.5"</td>
                  </tr>
                  <tr>
                    <td className="p-1.5 font-bold text-zinc-900">XXL (44)</td>
                    <td>44 - 45"</td>
                    <td>31"</td>
                    <td>26"</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[10px] text-zinc-400 mt-2 text-center">
              💡 ডেলিভারির সময় ট্রায়াল দিয়ে দেখে নেওয়ার সুযোগ রয়েছে।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
