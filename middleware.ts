import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}

// Convert the secret to Uint8Array for use with the jose library
const secretKey = new TextEncoder().encode(JWT_SECRET);

// Rate-limiting settings
const RATE_LIMIT = 10; // Max requests per minute per IP
const WINDOW_MS = 60 * 1000; // Time window in milliseconds (1 minute)
const IP_REQUESTS = new Map<string, { count: number; lastRequest: number }>();

export async function middleware(request: NextRequest) {
  const urlPath = request.nextUrl.pathname;

  // a) **Rate-Limiting for /api/email Endpoint**
  if (urlPath === '/api/email') {
    const ip = request.headers.get('x-forwarded-for') || request.ip || 'unknown';
    const now = Date.now();
    const record = IP_REQUESTS.get(ip) || { count: 0, lastRequest: now };

    if (now - record.lastRequest > WINDOW_MS) {
      // Reset count and timestamp if time window expired
      record.count = 0;
      record.lastRequest = now;
    }

    record.count += 1;

    if (record.count > RATE_LIMIT) {
      console.log(`Rate limit exceeded for IP: ${ip}`);
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Save updated record
    IP_REQUESTS.set(ip, record);
  }

  // b) **JWT Authentication for /private and /dashboard Endpoints**
  if (urlPath.startsWith('/private') || urlPath.startsWith('/dashboard')) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      // Redirect to the login page if there is no token
    console.log(`53. No token found`);
    return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      await jwtVerify(token, secretKey);
      console.log(`59. Token valid`);
      // If the token is valid, allow the request to proceed
      //return NextResponse.next();commented since is is considered in c) case
    } catch (error) {
      console.log(`63. Token invalid ${error}`);
      // Redirect to the login page if the token is invalid or expired
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // c) **Allow the request to proceed if all checks pass**
  return NextResponse.next();
}

// Configure routes for middleware
export const config = {
  matcher: [
    '/private/:path*',       // Protect private routes with JWT
    '/dashboard/:path*',     // Protect dashboard routes with JWT
    '/api/email',            // Apply rate limiting to the email endpoint
  ],
};