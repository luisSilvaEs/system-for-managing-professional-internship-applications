// /app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword } from "@/security/passwords";
import jwt from 'jsonwebtoken';
import { getUserByEmail } from '@/lib/dynamodb'; //function to get user details from DynamoDB

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const { Item } = await getUserByEmail(email); // Retrieve user from DynamoDB by email
    
    if (!Item) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const passwordMatch = verifyPassword(password, Item.password); // Compare passwords

    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // Generate JWT

    if (!JWT_SECRET) {
      console.error("JWT_SECRET is not defined");
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
    
    const token = jwt.sign({ userId: Item.email }, JWT_SECRET, { expiresIn: '1h' });

    const response = NextResponse.json({ success: true });
    response.cookies.set('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60, // 1 hour
    });
    console.log(`Response-> ${response.cookies}`);
    
    //return NextResponse.json({ success: true });
    return response;
    
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error->' }, { status: 500 });
  }
}
