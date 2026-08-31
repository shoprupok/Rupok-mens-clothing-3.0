import React, { useState } from 'react';
import { CartItem, DeliveryArea, PaymentMethod, Order } from '../types';
import confetti from 'canvas-confetti';
import { X, CheckCircle2, ShieldCheck, Truck, Phone, MapPin, User, ArrowRight, MessageSquare, Copy, Check } from 'lucide-react';
import { RUPOK } from '../data/config';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  deliveryArea: DeliveryArea;
  setDeliveryArea: (area: DeliveryArea) => void;
  discountAmount: number;
  onOrderPlaced: (order: Order) => void;
  onViewOrders: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  deliveryArea,
  setDeliveryArea,
  discountAmount,
  onOrderPlaced,
  onViewOrders,
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState(deliveryArea === 'inside_dhaka' ? 'Dhaka' : 'Chattogram');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [trxId, setTrxId] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee =
    deliveryArea === 'inside_dhaka'
      ? RUPOK.delivery.insideDhaka.fee
      : RUPOK.delivery.outsideDhaka.fee;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const activePaymentConfig = RUPOK.payment.methods.find((m) => m.id === paymentMethod);
  const paymentPhone = activePaymentConfig?.number || RUPOK.contact.displayPhone;
  const couriersSummary = RUPOK.delivery.couriers.map((c) => c.name.replace(' Courier', '')).join(' / ');

  const validateForm = () => {
    const errs: { [key: string]: string } = {};

    if (!customerName.trim()) {
      errs.customerName = 'Please enter your full name';
    }

    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length !== 11 || !cleanPhone.startsWith('01')) {
      errs.phone = 'Enter a valid 11-digit Bangladesh phone number (01XXXXXXXXX)';
    }

    if (!address.trim() || address.trim().length < 8) {
      errs.address = 'Please enter detailed delivery address (House, Road, Area)';
    }

    if (paymentMethod !== 'cod' && !trxId.trim()) {
      errs.trxId = `Please enter ${paymentMethod.toUpperCase()} Transaction ID`;
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `RUP-${Math.floor(10000 + Math.random() * 90000)}`;
      const now = new Date();
      const dateString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      const newOrder: Order = {
        id: generatedId,
        date: dateString,
        customerName: customerName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        city: deliveryArea === 'inside_dhaka' ? 'Dhaka' : city,
        deliveryArea,
        deliveryFee,
        items: [...items],
        subtotal,
        discount: discountAmount,
        total: grandTotal,
        paymentMethod,
        status: 'Processing',
        courier:
          deliveryArea === 'inside_dhaka'
            ? RUPOK.delivery.insideDhaka.courier
            : RUPOK.delivery.outsideDhaka.courier,
        trackingNumber: `PTH-${Math.floor(100000000 + Math.random() * 900000000)}`,
        notes: notes.trim() ? notes.trim() : undefined,
      };

      // Trigger Confetti!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f45b16', '#7bdc00', '#111111', '#ff7a22'],
        });
      } catch (err) {
        // ignore if not supported
      }

      onOrderPlaced(newOrder);
      setConfirmedOrder(newOrder);
      setIsSubmitting(false);
    }, 800);
  };

  const handleCopyOrderId = () => {
    if (!confirmedOrder) return;
    navigator.clipboard?.writeText(confirmedOrder.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={!confirmedOrder ? onClose : undefined} />

      <div 
        id="checkout-modal-container"
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden z-10 border border-zinc-100 max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-200 flex items-center justify-between bg-zinc-50/80 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#f45b16] flex items-center justify-center font-bangla font-black text-sm">
              {RUPOK.brand.nameBangla}
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg text-zinc-900 leading-tight">
                {confirmedOrder ? 'Order Confirmed!' : 'Quick Checkout'}
              </h2>
              <p className="text-xs text-zinc-500 font-medium">
                {confirmedOrder ? `Thank you for shopping with ${RUPOK.brand.nameEnglish}` : `Fast Delivery via ${couriersSummary}`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200 transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-1">
          {confirmedOrder ? (
            /* Order Success View */
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto animate-subtle-pulse shadow-sm">
                <CheckCircle2 size={40} />
              </div>

              <div>
                <span className="inline-block bg-orange-100 text-[#f45b16] text-[11px] font-black uppercase px-3 py-1 rounded-full mb-1">
                  Cash on Delivery Confirmed
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-zinc-900">
                  Congratulations, {confirmedOrder.customerName}!
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-md mx-auto">
                  Your order has been received. Our team will pack and dispatch your stylish items promptly.
                </p>
              </div>

              {/* Order Details Card */}
              <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 text-left space-y-2.5 max-w-lg mx-auto text-xs sm:text-sm">
                <div className="flex justify-between items-center pb-2 border-b border-zinc-200">
                  <span className="text-zinc-500 font-medium">Order Number:</span>
                  <div className="flex items-center gap-1.5 font-mono font-black text-zinc-900 text-sm">
                    <span>{confirmedOrder.id}</span>
                    <button
                      onClick={handleCopyOrderId}
                      className="p-1 text-zinc-400 hover:text-zinc-700 rounded transition-colors"
                      title="Copy Order ID"
                    >
                      {copiedId ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500 font-medium">Phone:</span>
                  <span className="font-bold text-zinc-900">{confirmedOrder.phone}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500 font-medium">Delivery Address:</span>
                  <span className="font-semibold text-zinc-900 text-right max-w-[240px]">
                    {confirmedOrder.address}, {confirmedOrder.city}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500 font-medium">Courier Partner:</span>
                  <span className="font-bold text-[#f45b16]">{confirmedOrder.courier}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500 font-medium">Tracking Number:</span>
                  <span className="font-mono text-zinc-800 font-bold">{confirmedOrder.trackingNumber}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500 font-medium">Estimated Delivery:</span>
                  <span className="font-bold text-green-700">
                    {confirmedOrder.deliveryArea === 'inside_dhaka'
                      ? RUPOK.delivery.insideDhaka.estimatedTime
                      : RUPOK.delivery.outsideDhaka.estimatedTime}
                  </span>
                </div>

                <div className="flex justify-between pt-2 border-t border-zinc-200 font-black text-base text-zinc-950">
                  <span>Payable at Delivery:</span>
                  <span className="text-[#f45b16]">৳{confirmedOrder.total.toLocaleString()}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 max-w-lg mx-auto pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onViewOrders();
                  }}
                  className="flex-1 py-3 px-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Truck size={16} />
                  <span>Track Live Order Status</span>
                </button>

                <a
                  href={`https://wa.me/${RUPOK.contact.whatsappNumber}?text=Hello%20${encodeURIComponent(RUPOK.brand.nameEnglish)},%20I%20have%20placed%20order%20${confirmedOrder.id}%20total%20৳${confirmedOrder.total}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare size={16} />
                  <span>WhatsApp Updates</span>
                </a>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              {/* Customer Information */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                  <User size={14} className="text-[#f45b16]" /> 1. Customer Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Tanvir Ahmed"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className={`w-full bg-zinc-50 border rounded-xl px-3.5 py-2 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:bg-white transition-colors ${
                        errors.customerName ? 'border-red-500 ring-1 ring-red-300' : 'border-zinc-200 focus:border-[#f45b16]'
                      }`}
                    />
                    {errors.customerName && (
                      <p className="text-[10px] text-red-600 mt-1 font-semibold">{errors.customerName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      Mobile Number (01XXXXXXXXX) *
                    </label>
                    <input
                      type="tel"
                      placeholder="01712345678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      maxLength={11}
                      className={`w-full bg-zinc-50 border rounded-xl px-3.5 py-2 text-xs sm:text-sm text-zinc-900 font-mono focus:outline-none focus:bg-white transition-colors ${
                        errors.phone ? 'border-red-500 ring-1 ring-red-300' : 'border-zinc-200 focus:border-[#f45b16]'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[10px] text-red-600 mt-1 font-semibold">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-3 pt-2 border-t border-zinc-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#f45b16]" /> 2. Delivery Location
                </h3>

                {/* Delivery Area Selection */}
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setDeliveryArea('inside_dhaka');
                      setCity('Dhaka');
                    }}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      deliveryArea === 'inside_dhaka'
                        ? 'border-[#f45b16] bg-orange-50/70 ring-2 ring-[#f45b16]'
                        : 'border-zinc-200 bg-zinc-50 hover:bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xs sm:text-sm text-zinc-900">Inside Dhaka</span>
                      <strong className="text-xs sm:text-sm text-[#f45b16]">{RUPOK.delivery.insideDhaka.feeFormatted}</strong>
                    </div>
                    <p className="text-[10px] text-zinc-500 mt-0.5 font-medium">Home delivery in {RUPOK.delivery.insideDhaka.estimatedTime}</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDeliveryArea('outside_dhaka');
                      if (city === 'Dhaka') setCity('Chattogram');
                    }}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      deliveryArea === 'outside_dhaka'
                        ? 'border-[#f45b16] bg-orange-50/70 ring-2 ring-[#f45b16]'
                        : 'border-zinc-200 bg-zinc-50 hover:bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xs sm:text-sm text-zinc-900">Outside Dhaka</span>
                      <strong className="text-xs sm:text-sm text-[#f45b16]">{RUPOK.delivery.outsideDhaka.feeFormatted}</strong>
                    </div>
                    <p className="text-[10px] text-zinc-500 mt-0.5 font-medium">Steadfast delivery in {RUPOK.delivery.outsideDhaka.estimatedTime}</p>
                  </button>
                </div>

                {deliveryArea === 'outside_dhaka' && (
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      District / City *
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:bg-white focus:border-[#f45b16]"
                    >
                      <option value="Chattogram">Chattogram (চট্টগ্রাম)</option>
                      <option value="Sylhet">Sylhet (সিলেট)</option>
                      <option value="Rajshahi">Rajshahi (রাজশাহী)</option>
                      <option value="Khulna">Khulna (খুলনা)</option>
                      <option value="Barishal">Barishal (বরিশাল)</option>
                      <option value="Rangpur">Rangpur (রংপুর)</option>
                      <option value="Dinajpur">Dinajpur (দিনাজপুর)</option>
                      <option value="Mymensingh">Mymensingh (ময়মনসিংহ)</option>
                      <option value="Cumilla">Cumilla (কুমিল্লা)</option>
                      <option value="Gazipur">Gazipur (গাজীপুর)</option>
                      <option value="Narayanganj">Narayanganj (নারায়ণগঞ্জ)</option>
                      <option value="Bogra">Bogra (বগুড়া)</option>
                      <option value="Cox's Bazar">Cox's Bazar (কক্সবাজার)</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    Full Delivery Address (House, Road, Area, Thana) *
                  </label>
                  <textarea
                    rows={2}
                    placeholder="House 12, Road 4, Sector 7, Uttara / Ward No, Thana..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={`w-full bg-zinc-50 border rounded-xl px-3.5 py-2 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:bg-white transition-colors ${
                      errors.address ? 'border-red-500 ring-1 ring-red-300' : 'border-zinc-200 focus:border-[#f45b16]'
                    }`}
                  />
                  {errors.address && (
                    <p className="text-[10px] text-red-600 mt-1 font-semibold">{errors.address}</p>
                  )}
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-3 pt-2 border-t border-zinc-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-[#f45b16]" /> 3. Payment Method
                </h3>

                <div className="grid grid-cols-3 gap-2">
                  {RUPOK.payment.methods.map((method) => {
                    const isSelected = paymentMethod === method.id;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-2.5 rounded-xl text-center border transition-all cursor-pointer ${
                          isSelected
                            ? method.id === 'cod'
                              ? 'border-[#f45b16] bg-orange-50/80 ring-2 ring-[#f45b16]'
                              : method.id === 'bkash'
                              ? 'border-[#E2136E] bg-pink-50 ring-2 ring-[#E2136E]'
                              : 'border-[#F7941D] bg-amber-50 ring-2 ring-[#F7941D]'
                            : 'border-zinc-200 bg-zinc-50 hover:bg-white'
                        }`}
                      >
                        <span className="block text-lg">{method.icon}</span>
                        <strong
                          className={`block text-[11px] sm:text-xs mt-1 ${
                            method.id === 'bkash'
                              ? 'text-[#E2136E]'
                              : method.id === 'nagad'
                              ? 'text-[#F7941D]'
                              : 'text-zinc-900'
                          }`}
                        >
                          {method.name}
                        </strong>
                      </button>
                    );
                  })}
                </div>

                {paymentMethod !== 'cod' && (
                  <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-xs space-y-2">
                    <p className="text-zinc-700 font-medium">
                      Send <strong>৳{grandTotal.toLocaleString()}</strong> to {paymentMethod.toUpperCase()} Personal Number: <strong className="text-zinc-900 font-mono">{paymentPhone}</strong>
                    </p>
                    <div>
                      <label className="block font-bold text-zinc-700 mb-1">
                        {paymentMethod.toUpperCase()} Transaction ID (TrxID) *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 9J28DA10K"
                        value={trxId}
                        onChange={(e) => setTrxId(e.target.value.toUpperCase())}
                        className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-1.5 font-mono text-xs font-bold uppercase focus:outline-none focus:border-[#f45b16]"
                      />
                      {errors.trxId && (
                        <p className="text-[10px] text-red-600 mt-1 font-semibold">{errors.trxId}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Optional Notes */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Delivery Notes / Landmark (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Call before arrival / Deliver after 4 PM"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs text-zinc-900 focus:outline-none focus:bg-white focus:border-[#f45b16]"
                />
              </div>

              {/* Order Summary Box */}
              <div className="bg-orange-50/50 border border-orange-200/80 rounded-2xl p-4 text-xs space-y-1.5">
                <div className="flex justify-between text-zinc-600">
                  <span>Items ({items.length})</span>
                  <span className="font-semibold text-zinc-900">৳{subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-700 font-semibold">
                    <span>Discount</span>
                    <span>-৳{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-600">
                  <span>Delivery ({deliveryArea === 'inside_dhaka' ? 'Inside Dhaka' : 'Outside Dhaka'})</span>
                  <span className="font-semibold text-zinc-900">৳{deliveryFee}</span>
                </div>
                <div className="flex justify-between text-base font-black text-zinc-950 pt-2 border-t border-orange-200">
                  <span>Grand Total</span>
                  <span className="text-[#f45b16]">৳{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Submit Order Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#7bdc00] hover:bg-[#6ec500] disabled:bg-zinc-300 text-zinc-950 font-black rounded-xl text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Processing Order...</span>
                ) : (
                  <>
                    <span>CONFIRM & PLACE ORDER (৳{grandTotal.toLocaleString()})</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
