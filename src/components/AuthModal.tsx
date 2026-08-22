import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, ArrowRight, Sun, Loader2, AlertCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessAuth: (user: any, token: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccessAuth }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    const endpoint = activeTab === 'register' ? '/api/auth/register' : '/api/auth/login';
    const payload = activeTab === 'register' ? { name, email, password } : { email, password };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success && data.token && data.user) {
        // Strict success: Only store token & user on 200/201 OK response
        localStorage.setItem('solar_token', data.token);
        localStorage.setItem('solar_user', JSON.stringify(data.user));
        onSuccessAuth(data.user, data.token);
        onClose();
        setName('');
        setEmail('');
        setPassword('');
      } else {
        // Strict failure handling: Display red error message and block login
        setErrorMessage(data.message || (activeTab === 'login' ? 'Invalid email or password' : 'Registration failed'));
      }
    } catch (err) {
      console.error('Auth API Network Error:', err);
      setErrorMessage(activeTab === 'login' ? 'Invalid email or password' : 'Could not connect to authentication server');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden text-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 border-b border-slate-800 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
              <Sun className="w-5 h-5 fill-current" />
            </div>
            <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest">
              STRICT SQLite JWT AUTH
            </span>
          </div>

          <h3 className="text-xl font-black text-white">
            {activeTab === 'login' ? 'Sign In to Account' : 'Register New Account'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Access saved proposals, custom ROI calculations, and protected admin dashboard.
          </p>

          {/* Login / Register Tab Switcher */}
          <div className="flex bg-slate-950 rounded-xl p-1 border border-slate-800 mt-4 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setActiveTab('login');
                setErrorMessage('');
              }}
              className={`flex-1 py-2 rounded-lg transition-all ${
                activeTab === 'login' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('register');
                setErrorMessage('');
              }}
              className={`flex-1 py-2 rounded-lg transition-all ${
                activeTab === 'register' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* Body Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Red Error Message Banner on Failed Login/Register */}
            {errorMessage && (
              <div className="p-3.5 bg-red-950/90 border border-red-500/70 rounded-2xl text-red-200 text-xs font-bold flex items-center gap-2.5 shadow-lg animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {activeTab === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Engineer Ali"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. user@solarcompany.pk"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>

            {/* Quick Admin Credentials Hint */}
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Admin Access Hint:</span>
              <button
                type="button"
                onClick={() => {
                  setEmail('admin@solarcompany.pk');
                  setPassword('admin123');
                  setActiveTab('login');
                }}
                className="text-amber-400 font-bold hover:underline"
              >
                Fill Admin Credentials
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all active:scale-98 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>{activeTab === 'login' ? 'Sign In to Account' : 'Register Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
