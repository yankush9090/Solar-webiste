'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sun, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { loginAdminAction } from '@/lib/db/actions';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('solaris_admin_authenticated') === 'true') {
      router.replace('/admin');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await loginAdminAction(email, password);
      if (!res.success) {
        setErrorMsg(res.error || 'Invalid credentials.');
        setLoading(false);
        return;
      }

      sessionStorage.setItem('solaris_admin_authenticated', 'true');
      sessionStorage.setItem('solaris_admin_email', email);
      router.push('/admin');
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 py-12 text-slate-100">
      <div className="w-full max-w-md space-y-8 bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-solar-500 to-amber-400 flex items-center justify-center text-white mx-auto shadow-md">
            <Sun className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Solaris Admin Console
          </h2>
          <p className="text-xs text-slate-400">
            Secure login for website content and enquiry management
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-950/80 border border-red-800 text-red-300 text-xs rounded-xl">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@solarisenergy.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-solar-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-solar-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-solar-600 hover:bg-solar-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow transition-all flex items-center justify-center disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>

        <div className="pt-2 border-t border-slate-800 text-center">
          <Link href="/" className="text-xs text-slate-400 hover:text-white transition-colors block">
            ← Return to Solaris Energy
          </Link>
        </div>
      </div>
    </div>
  );
}
