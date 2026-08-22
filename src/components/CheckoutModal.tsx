import React, { useState } from 'react';
import { X, CreditCard, Building2, Copy, CheckCircle2, ShieldCheck, Upload, ArrowRight, Loader2, DollarSign, FileText } from 'lucide-react';

interface PackageItem {
  title: string;
  pricePkr: number;
  capacityKw?: number;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: PackageItem | null;
  currentUser?: any;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  selectedPackage,
  currentUser,
}) => {
  const [paymentOption, setPaymentOption] = useState<'advance' | 'full'>('advance');
  const [paymentMethod, setPaymentMethod] = useState<'easypaisa' | 'bank'>('easypaisa');
  const [customerName, setCustomerName] = useState(currentUser ? currentUser.name : '');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [receiptImage, setReceiptImage] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successData, setSuccessData] = useState<{ invoiceRef: string; orderId: number } | null>(null);

  if (!isOpen || !selectedPackage) return null;

  const totalAmount = selectedPackage.pricePkr;
  const advancePayment = paymentOption === 'advance' ? Math.round(totalAmount * 0.1) : totalAmount;

  const easypaisaDetails = {
    method: 'Easypaisa / JazzCash Direct Transfer',
    title: 'TraderNFT Solar PV Pvt Ltd',
    number: '0348-0906798',
  };

  const bankDetails = {
    method: 'Direct Bank Transfer (IBAN)',
    bank: 'Meezan Bank Ltd / HBL',
    title: 'Solar Company Pakistan',
    iban: 'PK92MEZN0001234567890123',
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    if (!transactionId.trim()) {
      setErrorMessage('Please enter the 11/12-digit Transaction ID (TID).');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/orders/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser ? currentUser.id : null,
          packageName: selectedPackage.title,
          totalAmount,
          advancePayment,
          paymentMethod: paymentMethod === 'easypaisa' ? easypaisaDetails.method : bankDetails.method,
          transactionId: transactionId.trim(),
          receiptImage,
          customerName: customerName.trim(),
          customerPhone: customerPhone.trim(),
          deliveryAddress: deliveryAddress.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessData({ invoiceRef: data.invoiceRef, orderId: data.orderId });
      } else {
        setErrorMessage(data.message || 'Checkout failed. Please try again.');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setErrorMessage('Network error while processing checkout order.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-[95vw] sm:w-[90vw] md:w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden text-white flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-slate-950 p-4 sm:p-6 border-b border-slate-800 relative flex items-center justify-between gap-2">
          <div>
            <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              SECURE SOLAR CHECKOUT
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">{selectedPackage.title}</h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>


        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {successData ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-400/40">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-black text-white">Payment Receipt Submitted!</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Your order has been recorded in our database under Invoice Reference{' '}
                <span className="text-amber-400 font-bold">#{successData.invoiceRef}</span>. Our verification team will confirm your Transaction ID shortly.
              </p>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-left max-w-md mx-auto space-y-2">
                <div className="flex justify-between text-slate-400">
                  <span>Invoice Reference:</span>
                  <span className="font-bold text-amber-300">#{successData.invoiceRef}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Package:</span>
                  <span className="font-bold text-white">{selectedPackage.title}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Payment Amount:</span>
                  <span className="font-bold text-emerald-400">Rs. {advancePayment.toLocaleString()} PKR</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Status:</span>
                  <span className="font-bold text-amber-400">Pending Verification</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSuccessData(null);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-full bg-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg"
              >
                Close Checkout
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {errorMessage && (
                <div className="p-3.5 bg-red-950/80 border border-red-500/50 rounded-2xl text-red-200 text-xs font-semibold">
                  {errorMessage}
                </div>
              )}

              {/* 1. Select Payment Option (10% Advance vs Full) */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300">1. Select Payment Mode:</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentOption('advance')}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      paymentOption === 'advance'
                        ? 'bg-amber-500/10 border-amber-400 text-white shadow-lg'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase text-amber-400">10% Token Advance</span>
                    <p className="text-base font-black text-white mt-1">
                      Rs. {Math.round(totalAmount * 0.1).toLocaleString()} PKR
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">Pay 10% advance to book order</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentOption('full')}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      paymentOption === 'full'
                        ? 'bg-amber-500/10 border-amber-400 text-white shadow-lg'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase text-emerald-400">Full System Price</span>
                    <p className="text-base font-black text-white mt-1">Rs. {totalAmount.toLocaleString()} PKR</p>
                    <p className="text-[11px] text-slate-400 mt-1">Complete turn-key payment</p>
                  </button>
                </div>
              </div>

              {/* 2. Select Payment Method & Transfer Account Details */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-300">2. Select Payment Transfer Method:</label>

                <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('easypaisa')}
                    className={`flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all ${
                      paymentMethod === 'easypaisa'
                        ? 'bg-emerald-500 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Easypaisa / JazzCash</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all ${
                      paymentMethod === 'bank'
                        ? 'bg-emerald-500 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Direct Bank Transfer (IBAN)</span>
                  </button>
                </div>

                {/* Account Details Box with Copy Buttons */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                  {paymentMethod === 'easypaisa' ? (
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-400">{easypaisaDetails.method}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(`${easypaisaDetails.number} (${easypaisaDetails.title})`, 'easypaisa')}
                          className="flex items-center gap-1 text-[11px] font-bold text-amber-300 hover:text-amber-200 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-700"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{copiedField === 'easypaisa' ? 'Copied!' : 'Copy Account Details'}</span>
                        </button>
                      </div>

                      <div className="mt-2 text-xs space-y-1">
                        <p className="text-slate-300">
                          Account Title: <span className="font-bold text-white">{easypaisaDetails.title}</span>
                        </p>
                        <p className="text-slate-300">
                          Account / Mobile Number: <span className="font-bold text-amber-400 text-sm">{easypaisaDetails.number}</span>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-400">{bankDetails.method}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(`IBAN: ${bankDetails.iban} | Bank: ${bankDetails.bank} | Title: ${bankDetails.title}`, 'bank')}
                          className="flex items-center gap-1 text-[11px] font-bold text-amber-300 hover:text-amber-200 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-700"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{copiedField === 'bank' ? 'Copied!' : 'Copy Account Details'}</span>
                        </button>
                      </div>

                      <div className="mt-2 text-xs space-y-1">
                        <p className="text-slate-300">
                          Bank Name: <span className="font-bold text-white">{bankDetails.bank}</span>
                        </p>
                        <p className="text-slate-300">
                          Account Title: <span className="font-bold text-white">{bankDetails.title}</span>
                        </p>
                        <p className="text-slate-300">
                          IBAN Number: <span className="font-bold text-amber-400 font-mono text-xs">{bankDetails.iban}</span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 3. Transaction Verification & Customer Form */}
              <div className="space-y-4 pt-2">
                <label className="block text-xs font-bold text-slate-300">3. Enter Payment Verification Details:</label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Client Name"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Phone / WhatsApp *</label>
                    <input
                      type="text"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+923480906798"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">Delivery & Installation Address *</label>
                  <input
                    type="text"
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="House/Plot #, Block, Sector/Colony, City"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">11/12-Digit Transaction ID (TID) *</label>
                    <input
                      type="text"
                      required
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      placeholder="e.g. 034898127361"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-mono placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Upload Receipt Screenshot (Optional)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full text-xs text-slate-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-800 file:text-white hover:file:bg-slate-700"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-transform active:scale-98 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Verifying Order & Generating Invoice...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Payment Receipt (Rs. {advancePayment.toLocaleString()} PKR)</span>
                    <ArrowRight className="w-4 h-4" />
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
