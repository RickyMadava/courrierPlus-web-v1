import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default withAuth(
  function middleware() {
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

    return response;
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

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
