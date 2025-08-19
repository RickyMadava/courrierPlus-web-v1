import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Rate limiting headers
  response.headers.set('X-RateLimit-Limit', '100');
  response.headers.set('X-RateLimit-Remaining', '99');
  
  // CORS headers
  response.headers.set('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || 'http://localhost:3000');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Security headers
  response.headers.set('X-DNS-Prefetch-Control', 'off');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // Check for suspicious patterns in URL
  const url = request.nextUrl.pathname;
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+=/i,
    /\.\./,
    /\/etc\/passwd/,
    /\/proc\//,
    /\x00/
  ];
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(url)) {
      return new NextResponse('Forbidden', { status: 403 });
    }
  }
  
  // Validate Content-Type for POST/PUT requests
  if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
    const contentType = request.headers.get('content-type');
    if (contentType && !contentType.includes('application/json') && !contentType.includes('multipart/form-data')) {
      return new NextResponse('Unsupported Media Type', { status: 415 });
    }
  }
  
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};