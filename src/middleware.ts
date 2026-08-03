import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('yourrent_token')?.value;
  const role = request.cookies.get('yourrent_role')?.value;
  const { pathname } = request.nextUrl;

  // Protected Dashboard Routes
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    if (pathname.startsWith('/dashboard/admin') && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard/tenant', request.url));
    }

    if (pathname.startsWith('/dashboard/landlord') && role !== 'LANDLORD') {
      return NextResponse.redirect(new URL('/dashboard/tenant', request.url));
    }

    if (pathname.startsWith('/dashboard/tenant') && role !== 'TENANT') {
      if (role === 'LANDLORD') return NextResponse.redirect(new URL('/dashboard/landlord', request.url));
      if (role === 'ADMIN') return NextResponse.redirect(new URL('/dashboard/admin', request.url));
    }
  }

  // Prevent logged-in users from visiting Auth pages
  if ((pathname.startsWith('/auth/login') || pathname.startsWith('/auth/register')) && token) {
    if (role === 'ADMIN') return NextResponse.redirect(new URL('/dashboard/admin', request.url));
    if (role === 'LANDLORD') return NextResponse.redirect(new URL('/dashboard/landlord', request.url));
    return NextResponse.redirect(new URL('/dashboard/tenant', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
};