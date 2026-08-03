import { User } from '@/types';

export const setAuthToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('yourrent_token', token);
    document.cookie = `yourrent_token=${token}; path=/; max-age=86400; SameSite=Lax`;
  }
};

export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('yourrent_token');
  }
  return null;
};

export const setUserSession = (user: User) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('yourrent_user', JSON.stringify(user));
    document.cookie = `yourrent_role=${user.role}; path=/; max-age=86400; SameSite=Lax`;
  }
};

export const getUserSession = (): User | null => {
  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem('yourrent_user');
    return raw ? JSON.parse(raw) : null;
  }
  return null;
};

export const clearAuth = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('yourrent_token');
    localStorage.removeItem('yourrent_user');
    document.cookie = 'yourrent_token=; path=/; max-age=0;';
    document.cookie = 'yourrent_role=; path=/; max-age=0;';
  }
};