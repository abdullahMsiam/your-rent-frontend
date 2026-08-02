'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { fetchApi } from '@/lib/api';
import { Role } from '@/types';

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>('TENANT');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await fetchApi('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ ...formData, role }),
      });
      router.push('/login');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50">
      <div className="bg-slate-900 text-white p-12 hidden lg:flex flex-col justify-between">
        <h1 className="text-3xl font-bold">YourRent</h1>
        <div>
          <h2 className="text-4xl font-extrabold mb-4">Elevate your living experience.</h2>
          <p className="text-slate-400">The most intuitive way to manage, rent, and discover premium properties globally.</p>
        </div>
        <p className="text-xs text-slate-500">© 2026 YourRent. Professional Rental Management.</p>
      </div>
      <div className="flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xs border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Create Account</h2>
          <p className="text-slate-500 text-sm mb-6">Start your journey with YourRent platform.</p>

          {error && <div className="bg-rose-50 text-rose-600 text-sm p-3 rounded-xl mb-4">{error}</div>}

          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setRole('TENANT')}
              className={`p-3 rounded-xl border text-sm font-medium transition ${role === 'TENANT' ? 'border-indigo-600 bg-indigo-50/50 text-indigo-600' : 'border-slate-200 text-slate-600'}`}
            >
              I am a Tenant
            </button>
            <button
              type="button"
              onClick={() => setRole('LANDLORD')}
              className={`p-3 rounded-xl border text-sm font-medium transition ${role === 'LANDLORD' ? 'border-indigo-600 bg-indigo-50/50 text-indigo-600' : 'border-slate-200 text-slate-600'}`}
            >
              I am a Landlord
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-xl transition"
            >
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </form>
          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account? <Link href="/login" className="text-indigo-600 font-semibold">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}