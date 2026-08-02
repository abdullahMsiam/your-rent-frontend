'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Home, User as UserIcon, LogOut, PlusCircle, ShieldCheck } from 'lucide-react';

export function Navbar() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setToken(Cookies.get('accessToken') || null);
    setRole(Cookies.get('userRole') || null);
  }, []);

  const handleLogout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('userRole');
    setToken(null);
    setRole(null);
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-xl text-slate-900 tracking-tight">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
            <Home className="w-5 h-5" />
          </div>
          YourRent
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/properties" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">
            Explore Rentals
          </Link>

          {token ? (
            <div className="flex items-center gap-4">
              {role === 'LANDLORD' && (
                <Link
                  href="/dashboard/landlord/properties/new"
                  className="flex items-center gap-1.5 text-xs font-semibold bg-indigo-50 text-indigo-600 px-3 py-2 rounded-xl hover:bg-indigo-100 transition"
                >
                  <PlusCircle className="w-4 h-4" /> Add Property
                </Link>
              )}
              {role === 'ADMIN' && (
                <Link
                  href="/dashboard/admin"
                  className="flex items-center gap-1.5 text-xs font-semibold bg-amber-50 text-amber-700 px-3 py-2 rounded-xl hover:bg-amber-100 transition"
                >
                  <ShieldCheck className="w-4 h-4" /> Admin Console
                </Link>
              )}
              <Link
                href={`/dashboard/${role?.toLowerCase() || 'tenant'}`}
                className="flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-slate-900"
              >
                <UserIcon className="w-4 h-4" /> Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-rose-600 transition"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-slate-700 hover:text-slate-900 px-3 py-2"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-4 py-2 rounded-xl transition"
              >
                Get Started
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}