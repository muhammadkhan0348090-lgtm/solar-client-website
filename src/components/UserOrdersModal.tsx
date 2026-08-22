import React, { useState, useEffect } from 'react';
import { X, Package, Clock, CheckCircle2, AlertTriangle, Truck, RefreshCw } from 'lucide-react';

interface Order {
  id: number;
  package_name: string;
  total_amount: number;
  advance_payment: number;
  payment_method: string;
  transaction_id: string;
  customer_name: string;
  customer_phone: string;
  delivery_address: string;
  payment_status: string;
  created_at: string;
}

interface UserOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserOrdersModal: React.FC<UserOrdersModalProps> = ({ isOpen, onClose }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserOrders = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('solar_token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/orders/my-orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.warn('Fetch user orders error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchUserOrders();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-[95vw] sm:w-[90vw] md:w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden text-white flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-white">My Solar System Orders</h3>
              <p className="text-xs text-slate-300 hidden sm:block">Track order payment verification and dispatch status.</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={fetchUserOrders}
              disabled={isLoading}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              title="Refresh Orders"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>


        {/* Orders List */}
        <div className="p-6 overflow-y-auto space-y-4">
          {orders.length === 0 ? (
            <div className="py-16 text-center text-slate-400 space-y-2">
              <Package className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-sm font-bold text-slate-300">No solar system orders found.</p>
              <p className="text-xs text-slate-500">Select a solar package and complete checkout to view order status.</p>
            </div>
          ) : (
            orders.map((ord) => (
              <div
                key={ord.id}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-lg"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest">
                      ORDER #{ord.id}
                    </span>
                    <h4 className="text-base font-black text-white">{ord.package_name}</h4>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-black border flex items-center gap-1.5 ${
                      ord.payment_status === 'Approved'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
                        : ord.payment_status === 'Dispatched'
                        ? 'bg-sky-950 text-sky-300 border-sky-500/50'
                        : ord.payment_status === 'Rejected'
                        ? 'bg-red-950 text-red-300 border-red-500/50'
                        : 'bg-amber-950 text-amber-300 border-amber-500/50'
                    }`}
                  >
                    {ord.payment_status === 'Approved' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : ord.payment_status === 'Dispatched' ? (
                      <Truck className="w-3.5 h-3.5 text-sky-400" />
                    ) : ord.payment_status === 'Rejected' ? (
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                    )}
                    <span>{ord.payment_status}</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block">Total System Price:</span>
                    <span className="font-bold text-white">Rs. {Number(ord.total_amount).toLocaleString()} PKR</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Advance Paid:</span>
                    <span className="font-bold text-emerald-400">Rs. {Number(ord.advance_payment).toLocaleString()} PKR</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Payment Method:</span>
                    <span className="font-medium text-slate-300">{ord.payment_method}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Transaction ID (TID):</span>
                    <span className="font-mono font-bold text-sky-400">{ord.transaction_id}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Delivery Address: {ord.delivery_address}</span>
                  <span>{new Date(ord.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
