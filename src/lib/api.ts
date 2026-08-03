import Cookies from 'js-cookie';
import { isTokenValid } from './auth';

const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://your-rent-bk-gamma.vercel.app/api';


export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const BASE_URL = `${rawApiUrl}${cleanEndpoint}`

  const token = Cookies.get('accessToken');

  // Pre-check token validity on client
  if (token && !isTokenValid(token)) {
    Cookies.remove('accessToken', { path: '/' });
    Cookies.remove('userRole', { path: '/' });
    if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
      window.location.href = '/login?expired=true';
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

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Handle Unauthorized / Forbidden
  if (res.status === 401 || res.status === 403) {
    Cookies.remove('accessToken', { path: '/' });
    Cookies.remove('userRole', { path: '/' });
    if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
      window.location.href = '/login';
    }
  }

  const jsonResponse = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(jsonResponse.message || jsonResponse.error || 'Request failed');
  }

  // Returns the entire payload to allow components to handle wrapped or unwrapped data
  return jsonResponse as T;
}