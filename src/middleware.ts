import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Security headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // CSP headers pour résoudre les erreurs font et connect-src
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "connect-src 'self' http://localhost:4000 https://fonts.googleapis.com https://fonts.gstatic.com",
    "img-src 'self' data: blob:",
  ].join("; ");

  response.headers.set("Content-Security-Policy", csp);

  // Check for authentication using httpOnly cookies
  const accessToken = request.cookies.get('access-token');
  const pathname = request.nextUrl.pathname;
  
  // Debug logging
  console.log('Middleware - Path:', pathname);
  console.log('Middleware - Access Token:', accessToken?.value ? 'Present' : 'Missing');

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/register', '/forgot-password', '/reset-password', '/'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // API routes and static files should be allowed through
  const isApiRoute = pathname.startsWith('/api');
  const isStaticFile = pathname.startsWith('/_next') || pathname === '/favicon.ico';

  if (isApiRoute || isStaticFile) {
    return response;
  }


  // If trying to access protected route without token, redirect to login
  if (!accessToken && !isPublicRoute) {
    console.log('Middleware: Redirecting to login - no access token');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If authenticated and trying to access auth pages, redirect to dashboard
  if (accessToken && (pathname === '/login' || pathname === '/register')) {
    console.log('Middleware: Redirecting to dashboard - already authenticated');
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  console.log('Middleware: Allowing access to', pathname);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login, register, forgot-password, reset-password (auth pages)
     * - / (landing page)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|login|register|forgot-password|reset-password|^/$).*)",
  ],
};
