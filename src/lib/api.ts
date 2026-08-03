import Cookies from 'js-cookie';
import { isTokenValid } from './auth';

// 1. Production Fallback URL (Your Vercel Backend)
const DEFAULT_API_URL = 'https://your-rent-bk-gamma.vercel.app/api';

// 2. Safe Base URL Resolver
const getBaseUrl = (): string => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  
  // If env is missing or relative, use production fallback
  if (!envUrl || !envUrl.startsWith('http')) {
    return DEFAULT_API_URL;
  }
  
  // Remove trailing slashes if any (e.g. "https://domain.com/api/" -> "https://domain.com/api")
  return envUrl.replace(/\/+$/, '');
};

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = getBaseUrl();

  // Ensure endpoint always starts with exactly one leading slash
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  // Construct absolute URL safely
  const url = `${baseUrl}${cleanEndpoint}`;

  const token = Cookies.get('accessToken');

  // Client-side Token Expiration Pre-Check
  if (token && !isTokenValid(token)) {
    Cookies.remove('accessToken', { path: '/' });
    Cookies.remove('userRole', { path: '/' });
    if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
      window.location.href = '/login';
    }
    throw new Error('Session expired. Please log in again.');
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  // Handle Backend Verification Failures (401 / 403)
  if (res.status === 401 || res.status === 403) {
    Cookies.remove('accessToken', { path: '/' });
    Cookies.remove('userRole', { path: '/' });
    if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
      window.location.href = '/login';
    }
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'An error occurred while fetching data');
  }

  return res.json();
}