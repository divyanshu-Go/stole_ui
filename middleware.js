import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/token';

export async function middleware(request) {
  // Define protected paths
  const protectedPaths = ['/editor', '/profile', '/submit-component', '/add-component'];
  
  // Check if current path is protected
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );
  
  if (!isProtectedPath) {
    return NextResponse.next();
  }
  
  try {
    // Get token from cookie
    const authCookie = request.cookies.get('auth_token');
    const token = authCookie?.value;

    if (!token) {
      console.log('No token found, redirecting to login');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Verify the token - await the result
    const payload = await verifyToken(token);

    if (!payload) {
      console.log('Token verification failed, redirecting to login');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
