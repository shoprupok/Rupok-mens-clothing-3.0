import React, { useState } from 'react';
import { Order } from '../types';
import { Search, Package, Truck, CheckCircle2, PhoneCall } from 'lucide-react';
import { RUPOK } from '../data/config';

interface OrderTrackingViewProps {
  orders: Order[];
  onShopNow: () => void;
}

export const OrderTrackingView: React.FC<OrderTrackingViewProps> = ({ orders, onShopNow }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState<string>(orders[0]?.id || '');

  const filteredOrders = orders.filter((o) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      o.id.toLowerCase().includes(q) ||
      o.phone.includes(q) ||
      o.customerName.toLowerCase().includes(q)
    );
  });

  const selectedOrder = orders.find((o) => o.id === selectedOrderId) || filteredOrders[0] || null;

  const getStepStatus = (currentStatus: Order['status'], stepIndex: number) => {
    const statusMap: { [key in Order['status']]: number } = {
      Processing: 0,
      Packed: 1,
      Dispatched: 2,
      Delivered: 3,
    };
    const currentIdx = statusMap[currentStatus] ?? 0;
    if (stepIndex < currentIdx) return 'completed';
    if (stepIndex === currentIdx) return 'active';
    return 'pending';
  };

  const couriersList = RUPOK.delivery.couriers.map((c) => c.name.replace(' Courier', '')).join(' / ');

  const trackingSteps = [
    { label: 'Order Placed', desc: 'Order verified & in queue' },
    { label: 'Packed & Quality Checked', desc: 'Garment ironed & poly packed' },
    { label: `Dispatched via Courier`, desc: `In transit with ${couriersList}` },
    { label: 'Delivered', desc: 'Customer received package' },
  ];

  return (
    <div className="px-3 sm:px-4 py-4 space-y-6 max-w-4xl mx-auto">
      {/* Title Header */}
      <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-orange-50 text-[#f45b16] text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-1">
              <Truck size={13} /> Live Parcel Tracking
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
              Track Your Order
            </h1>
            <p className="text-xs text-zinc-500 font-medium">
              Real-time delivery status for Inside & Outside Dhaka shipments
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3 top-3 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by Order ID or Phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-9 pr-3.5 py-2 text-xs sm:text-sm font-medium focus:outline-none focus:bg-white focus:border-[#f45b16]"
            />
          </div>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white border border-zinc-200 rounded-3xl p-8 text-center text-zinc-500 space-y-3">
          <div className="w-16 h-16 rounded-full bg-orange-50 text-[#f45b16] flex items-center justify-center mx-auto">
            <Package size={32} />
          </div>
          <h2 className="text-base font-bold text-zinc-900">No active orders yet</h2>
          <p className="text-xs max-w-sm mx-auto text-zinc-500">
            Place your first order today with Cash on Delivery and enjoy premium styling at your doorstep.
          </p>
          <button
            onClick={onShopNow}
            className="bg-[#7bdc00] hover:bg-[#6ec500] text-zinc-950 font-black px-6 py-2.5 rounded-xl text-xs shadow-xs cursor-pointer"
          >
            Explore Best Sellers
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Order List Selector */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500 px-1">
              Your Orders ({filteredOrders.length})
            </h2>

            {filteredOrders.map((ord) => (
              <button
                key={ord.id}
                onClick={() => setSelectedOrderId(ord.id)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  selectedOrder?.id === ord.id
                    ? 'bg-orange-50/70 border-[#f45b16] ring-1 ring-[#f45b16] shadow-xs'
                    : 'bg-white border-zinc-200 hover:border-zinc-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono font-black text-xs sm:text-sm text-zinc-900">
                      {ord.id}
                    </span>
                    <p className="text-[10px] text-zinc-500 mt-0.5">{ord.date}</p>
                  </div>
                  <span className="bg-[#f45b16] text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                    {ord.status}
                  </span>
                </div>

                <div className="flex justify-between items-center mt-2.5 pt-2 border-t border-zinc-100 text-xs">
                  <span className="text-zinc-600 font-medium">{ord.items.length} items</span>
                  <span className="font-extrabold text-zinc-900">৳{ord.total.toLocaleString()}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Detailed Order Timeline and Breakdown */}
          {selectedOrder && (
            <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-3xl p-5 sm:p-6 space-y-6 shadow-2xs">
              {/* Order Header */}
              <div className="flex flex-wrap justify-between items-center pb-4 border-b border-zinc-100 gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-base sm:text-lg text-zinc-900">
                      {selectedOrder.id}
                    </span>
                    <span className="bg-green-100 text-green-800 text-[11px] font-black px-2.5 py-0.5 rounded-full">
                      {selectedOrder.courier}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Consignment Tracking: <strong className="font-mono text-zinc-800">{selectedOrder.trackingNumber}</strong>
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs text-zinc-500 block">Total Amount:</span>
                  <span className="text-lg font-black text-[#f45b16]">
                    ৳{selectedOrder.total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Visual Timeline Steps */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-600 mb-4">
                  Shipment Progress
                </h3>

                <div className="space-y-4 relative pl-6 border-l-2 border-zinc-200 ml-3">
                  {trackingSteps.map((step, idx) => {
                    const status = getStepStatus(selectedOrder.status, idx);
                    return (
                      <div key={idx} className="relative group">
                        {/* Dot indicator */}
                        <div
                          className={`absolute -left-[31px] top-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            status === 'completed'
                              ? 'bg-[#7bdc00] border-[#7bdc00] text-zinc-950'
                              : status === 'active'
                              ? 'bg-[#f45b16] border-[#f45b16] text-white ring-4 ring-orange-100 animate-subtle-pulse'
                              : 'bg-white border-zinc-300 text-transparent'
                          }`}
                        >
                          {status === 'completed' && <CheckCircle2 size={12} strokeWidth={3} />}
                        </div>

                        <div>
                          <h4 className={`text-xs sm:text-sm font-bold ${
                            status === 'pending' ? 'text-zinc-400' : 'text-zinc-900'
                          }`}>
                            {step.label}
                          </h4>
                          <p className="text-[11px] text-zinc-500 mt-0.5 font-medium">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Details */}
              <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-4 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-500 font-medium">Recipient:</span>
                  <span className="font-bold text-zinc-900">{selectedOrder.customerName} ({selectedOrder.phone})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500 font-medium">Delivery Address:</span>
                  <span className="font-semibold text-zinc-900 text-right max-w-xs">{selectedOrder.address}, {selectedOrder.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500 font-medium">Payment Mode:</span>
                  <span className="font-bold text-zinc-900 uppercase">{selectedOrder.paymentMethod}</span>
                </div>
              </div>

              {/* Ordered Items List */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">
                  Items in this package ({selectedOrder.items.length})
                </h3>

                <div className="space-y-2">
                  {selectedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-xl border border-zinc-100 bg-white"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-12 h-14 object-cover object-top rounded-lg bg-zinc-100"
                        />
                        <div>
                          <p className="text-xs font-bold text-zinc-900 line-clamp-1">{item.product.name}</p>
                          <p className="text-[11px] text-zinc-500">
                            Size: <strong className="text-zinc-700">{item.selectedSize}</strong> • Qty: <strong className="text-zinc-700">{item.quantity}</strong>
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-extrabold text-zinc-900">
                        ৳{(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Helpline support */}
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-xl flex items-center justify-between text-xs">
                <span className="text-zinc-700 font-medium">Need immediate shipment assistance?</span>
                <a
                  href={`tel:${RUPOK.contact.primaryPhone}`}
                  className="flex items-center gap-1.5 font-bold text-[#f45b16] hover:underline"
                >
                  <PhoneCall size={13} />
                  <span>Call Support ({RUPOK.contact.primaryPhoneFormatted})</span>
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
