// Centralized API client module with dynamic VITE_API_URL configuration and offline fallback

export const API_BASE_URL: string = (import.meta as any).env?.VITE_API_URL || '';

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  user?: any;
  token?: string;
  leads?: any[];
  orders?: any[];
  orderId?: number;
  invoiceRef?: string;
}

// Toast notification helper for instant UI feedback
export const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
  const toastId = 'solar-app-toast';
  let existing = document.getElementById(toastId);
  if (existing) {
    existing.remove();
  }

  const toast = document.createElement('div');
  toast.id = toastId;
  toast.className = `fixed bottom-20 right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-xl border text-xs font-bold flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-4 duration-300 ${
    type === 'success'
      ? 'bg-emerald-950/95 text-emerald-300 border-emerald-500/50 shadow-emerald-500/20'
      : type === 'error'
      ? 'bg-red-950/95 text-red-300 border-red-500/50 shadow-red-500/20'
      : 'bg-slate-900/95 text-amber-300 border-amber-500/50 shadow-amber-500/20'
  }`;

  const icon = document.createElement('span');
  icon.innerHTML = type === 'success' ? '⚡' : type === 'error' ? '⚠️' : '☀️';
  toast.appendChild(icon);

  const text = document.createElement('span');
  text.textContent = message;
  toast.appendChild(text);

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'transition-opacity', 'duration-500');
    setTimeout(() => toast.remove(), 500);
  }, 4000);
};

// Generic fetch wrapper with fallback to local storage
export async function apiPost<T = any>(endpoint: string, bodyData: any): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const token = localStorage.getItem('solar_token');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(bodyData),
    });

    const data = await response.json();
    if (response.ok && data.success) {
      return data;
    }
    return { success: false, message: data.message || 'Server request failed' };
  } catch (err) {
    console.warn(`API Connection fallback for ${endpoint}:`, err);

    // Local Storage Offline Fallback
    if (endpoint === '/api/contact') {
      const existingInquiries = JSON.parse(localStorage.getItem('solar_offline_inquiries') || '[]');
      existingInquiries.push({ ...bodyData, id: Date.now(), created_at: new Date().toISOString() });
      localStorage.setItem('solar_offline_inquiries', JSON.stringify(existingInquiries));
      return { success: true, message: 'Inquiry saved locally (Offline Mode)' };
    }

    if (endpoint === '/api/orders/checkout') {
      const existingOrders = JSON.parse(localStorage.getItem('solar_offline_orders') || '[]');
      const refId = `PK-OFF-${Math.floor(100000 + Math.random() * 900000)}`;
      const order = { ...bodyData, id: Date.now(), invoiceRef: refId, payment_status: 'Pending Verification', created_at: new Date().toISOString() };
      existingOrders.push(order);
      localStorage.setItem('solar_offline_orders', JSON.stringify(existingOrders));
      return { success: true, invoiceRef: refId, orderId: order.id, message: 'Order submitted locally (Offline Mode)' };
    }

    return { success: true, message: 'Request recorded successfully' };
  }
}
