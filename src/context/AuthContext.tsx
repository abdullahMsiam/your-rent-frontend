'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedToken = Cookies.get('accessToken');
    const savedUser = Cookies.get('userData');

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (err) {
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = (newToken: string, newUser: User) => {
    const cleanToken = newToken.replace(/^Bearer\s+/i, '');

    Cookies.set('accessToken', cleanToken, { path: '/', expires: 7 });
    Cookies.set('userRole', newUser.role, { path: '/', expires: 7 });
    Cookies.set('userData', JSON.stringify(newUser), { path: '/', expires: 7 });

    setToken(cleanToken);
    setUser(newUser);
  };

  const logout = () => {
    Cookies.remove('accessToken', { path: '/' });
    Cookies.remove('userRole', { path: '/' });
    Cookies.remove('userData', { path: '/' });

    setToken(null);
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}