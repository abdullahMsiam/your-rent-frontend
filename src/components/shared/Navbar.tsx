'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Home, LogOut, PlusCircle, ShieldCheck, User as UserIcon, ListChecks } from 'lucide-react';

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-black text-xl text-slate-900">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
            <Home className="w-5 h-5" />
          </div>
          RentNest
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/properties" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            Browse Rentals
          </Link>

          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              {user.role === 'LANDLORD' && (
                <>
                  <Link href="/dashboard/landlord/properties/new" className="flex items-center gap-1.5 text-xs font-semibold bg-indigo-50 text-indigo-600 px-3 py-2 rounded-xl">
                    <PlusCircle className="w-4 h-4" /> Add Property
                  </Link>
                  <Link href="/dashboard/landlord/requests" className="flex items-center gap-1.5 text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-2 rounded-xl">
                    <ListChecks className="w-4 h-4" /> Requests
                  </Link>
                </>
              )}
              {user.role === 'ADMIN' && (
                <Link href="/dashboard/admin" className="flex items-center gap-1.5 text-xs font-semibold bg-amber-50 text-amber-700 px-3 py-2 rounded-xl">
                  <ShieldCheck className="w-4 h-4" /> Admin Console
                </Link>
              )}
              <Link href={`/dashboard/${user.role.toLowerCase()}`} className="flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-slate-900">
                <UserIcon className="w-4 h-4" /> Dashboard
              </Link>
              <button onClick={logout} className="p-2 text-slate-400 hover:text-rose-600">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm font-medium text-slate-700 px-3 py-2">
                Sign In
              </Link>
              <Link href="/register" className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-4 py-2 rounded-xl">
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}