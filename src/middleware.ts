import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('accessToken')?.value;
  const userRole = req.cookies.get('userRole')?.value;
  const { pathname } = req.nextUrl;

  // Protected Dashboard Routes
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    if (pathname.startsWith('/dashboard/admin') && userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard/tenant', req.url));
    }

    if (pathname.startsWith('/dashboard/landlord') && userRole !== 'LANDLORD' && userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard/tenant', req.url));
    }
  }

  // Auth Pages
  if ((pathname === '/login' || pathname === '/register') && token) {
    return NextResponse.redirect(new URL('/dashboard/tenant', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};