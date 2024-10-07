
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}

// Convert the secret to Uint8Array for use with the jose library
const secretKey = new TextEncoder().encode(JWT_SECRET);

export async function middleware(request: NextRequest) {
    
  const token = request.cookies.get('token')?.value;

  if (!token) {
    // Redirect to the login page if there is no token
    console.log(`13. No token found`);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    await jwtVerify(token, secretKey);
    console.log(`19. Token valid`);
    // If the token is valid, allow the request to proceed
    return NextResponse.next();
  } catch (error) {
    console.log(`23. Token invalid ${error}`);
    // Redirect to the login page if the token is invalid or expired
    return NextResponse.redirect(new URL('/login', request.url));
  }
    
}

// Configure which routes this middleware should run on
export const config = {
  matcher: ['/private/:path*', '/dashboard/:path*'], // Protect these routes
};
