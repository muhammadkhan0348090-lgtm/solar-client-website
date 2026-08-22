import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Download, Search, RefreshCw, CheckCircle2, Clock, Phone, ShoppingBag, Users, AlertTriangle, Truck, Eye } from 'lucide-react';

interface Lead {
  id: number;
  name: string;
  phone: string;
  city?: string;
  system_size?: string;
  message?: string;
  status: string;
  created_at: string;
}

interface Order {
  id: number;
  package_name: string;
  total_amount: number;
  advance_payment: number;
  payment_method: string;
  transaction_id: string;
  receipt_image?: string;
  customer_name: string;
  customer_phone: string;
  delivery_address: string;
  payment_status: string;
  created_at: string;
}

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'orders'>('orders');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [previewReceipt, setPreviewReceipt] = useState<string | null>(null);

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/admin/leads');
      const data = await response.json();
      if (response.ok && data.success) {
        setLeads(data.leads || []);
      }
    } catch (err) {
      console.warn('Failed to fetch leads:', err);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/admin/orders');
      const data = await response.json();
      if (response.ok && data.success) {
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.warn('Failed to fetch orders:', err);
    }
  };

  const refreshAllData = async () => {
    setIsLoading(true);
    await Promise.all([fetchLeads(), fetchOrders()]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      refreshAllData();
    }
  }, [isOpen]);

  const handleUpdateLeadStatus = async (id: number, newStatus: string) => {
    setUpdatingId(id);
    try {
      const response = await fetch(`/api/admin/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
        );
      }
    } catch (err) {
      console.error('Failed to update lead status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleUpdateOrderStatus = async (id: number, newStatus: string) => {
    setUpdatingId(id);
    try {
      const response = await fetch(`/api/admin/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentStatus: newStatus }),
      });

      if (response.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === id ? { ...o, payment_status: newStatus } : o))
        );
      }
    } catch (err) {
      console.error('Failed to update order status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleExportCSV = () => {
    window.open('/api/admin/leads/export', '_blank');
  };

  if (!isOpen) return null;

  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.city && l.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (l.system_size && l.system_size.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredOrders = orders.filter(
    (o) =>
      o.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.transaction_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.package_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-[95vw] sm:w-[92vw] lg:w-full max-w-6xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden text-white flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-white">Protected Admin Dashboard</h3>
              <p className="text-xs text-slate-300 hidden sm:block">
                Verify transaction IDs, manage solar orders & lead inquiries, and export database records.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={handleExportCSV}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md transition-all h-[44px]"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={refreshAllData}
              disabled={isLoading}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              title="Refresh Data"
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

        {/* Tab Switcher & Filter Bar */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-bold w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                activeTab === 'orders' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Orders & Payments ({orders.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('leads')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                activeTab === 'leads' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Leads Inquiries ({leads.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-72">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search TID, customer, or package..."
                className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <button
              onClick={refreshAllData}
              disabled={isLoading}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Body Views */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'orders' ? (
            /* ORDERS & PAYMENTS TAB */
            filteredOrders.length === 0 ? (
              <div className="py-16 text-center text-slate-400 text-xs font-semibold">
                No orders or payment receipts found matching your search.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">Package</th>
                      <th className="p-3">Paid / Total</th>
                      <th className="p-3">TID</th>
                      <th className="p-3">Receipt</th>
                      <th className="p-3">Status Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/60 font-medium">
                    {filteredOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-800/50 transition-colors">
                        <td className="p-3 font-bold text-amber-400">#{ord.id}</td>
                        <td className="p-3 font-bold text-white">
                          <div>{ord.customer_name}</div>
                          <div className="text-[10px] text-slate-400 font-normal">{ord.delivery_address}</div>
                        </td>
                        <td className="p-3">
                          <a
                            href={`https://wa.me/${ord.customer_phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-400 font-bold hover:underline"
                          >
                            {ord.customer_phone}
                          </a>
                        </td>
                        <td className="p-3 font-bold text-white">{ord.package_name}</td>
                        <td className="p-3">
                          <span className="text-emerald-400 font-bold">Rs. {Number(ord.advance_payment).toLocaleString()}</span>
                          <span className="text-[10px] text-slate-400 block">Total: Rs. {Number(ord.total_amount).toLocaleString()}</span>
                        </td>
                        <td className="p-3 font-mono font-bold text-sky-400">{ord.transaction_id}</td>
                        <td className="p-3">
                          {ord.receipt_image ? (
                            <button
                              onClick={() => setPreviewReceipt(ord.receipt_image || null)}
                              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-[10px] flex items-center gap-1 border border-slate-700"
                            >
                              <Eye className="w-3 h-3" />
                              <span>View Receipt</span>
                            </button>
                          ) : (
                            <span className="text-slate-500 text-[10px]">No image</span>
                          )}
                        </td>
                        <td className="p-3">
                          <select
                            value={ord.payment_status}
                            disabled={updatingId === ord.id}
                            onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold border focus:outline-hidden ${
                              ord.payment_status === 'Approved'
                                ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
                                : ord.payment_status === 'Dispatched'
                                ? 'bg-sky-950 text-sky-300 border-sky-500/50'
                                : ord.payment_status === 'Rejected'
                                ? 'bg-red-950 text-red-300 border-red-500/50'
                                : 'bg-amber-950 text-amber-300 border-amber-500/50'
                            }`}
                          >
                            <option value="Pending Verification">Pending Verification</option>
                            <option value="Approved">Approved</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : (
            /* LEADS TAB */
            filteredLeads.length === 0 ? (
              <div className="py-16 text-center text-slate-400 text-xs font-semibold">
                No quotation leads found matching your search.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="p-3">ID</th>
                      <th className="p-3">Client Name</th>
                      <th className="p-3">Phone / WhatsApp</th>
                      <th className="p-3">City</th>
                      <th className="p-3">System Size</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/60 font-medium">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-800/50 transition-colors">
                        <td className="p-3 font-bold text-amber-400">#{lead.id}</td>
                        <td className="p-3 font-bold text-white">{lead.name}</td>
                        <td className="p-3">
                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-400 font-bold hover:underline"
                          >
                            {lead.phone}
                          </a>
                        </td>
                        <td className="p-3 text-slate-300">{lead.city || 'N/A'}</td>
                        <td className="p-3 font-bold text-amber-300">{lead.system_size || 'General'}</td>
                        <td className="p-3">
                          <select
                            value={lead.status}
                            disabled={updatingId === lead.id}
                            onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold border focus:outline-hidden ${
                              lead.status === 'Installed'
                                ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
                                : lead.status === 'Contacted'
                                ? 'bg-amber-950 text-amber-300 border-amber-500/50'
                                : 'bg-slate-950 text-slate-300 border-slate-700'
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Installed">Installed</option>
                          </select>
                        </td>
                        <td className="p-3 text-slate-400 text-[11px]">
                          {new Date(lead.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}
        </div>

        {/* Receipt Modal Preview */}
        {previewReceipt && (
          <div className="fixed inset-0 z-60 bg-slate-950/90 flex items-center justify-center p-4">
            <div className="relative max-w-lg bg-slate-900 p-4 rounded-2xl border border-slate-700 space-y-4">
              <button
                onClick={() => setPreviewReceipt(null)}
                className="absolute top-2 right-2 p-1.5 bg-slate-800 rounded-full text-white"
              >
                <X className="w-4 h-4" />
              </button>
              <h4 className="text-sm font-bold text-white">Payment Receipt Image</h4>
              <img src={previewReceipt} alt="Receipt Screenshot" className="max-h-[70vh] rounded-xl object-contain mx-auto" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
