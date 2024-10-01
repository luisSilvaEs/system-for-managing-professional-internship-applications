// /app/api/auth/login.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword } from "@/security/passwords";
import jwt from 'jsonwebtoken';
import { getUserByEmail } from '@/lib/dynamodb'; // Example function to get user details from DynamoDB

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const { Item } = await getUserByEmail(email); // Retrieve user from DynamoDB by email
    console.log(`User: ${Item.email} and password: ${Item.password} `)
    
    if (!Item) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const passwordMatch = await verifyPassword(password, Item.password); // Compare passwords

    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // Generate JWT
    
    const token = jwt.sign({ userId: Item.email }, JWT_SECRET, { expiresIn: '1h' });

    const response = NextResponse.json({ success: true });
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      path: '/',
      maxAge: 60 * 60, // 1 hour
    });
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error->' }, { status: 500 });
  }
}
