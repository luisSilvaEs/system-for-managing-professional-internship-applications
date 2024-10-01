// /app/api/register/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { saveUserToDynamoDB } from '@/lib/dynamodb';
import { hashPassword } from "@/security/passwords";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { email, password, name, fatherName, motherName } = data;
    console.log("POST function /app/api/register", data);
    /*
    const hashedPassword = hashPassword(password);
    
    const dynamoDBData = {
        ...data
    };
    
    dynamoDBData.password = hashedPassword;
    */

    await saveUserToDynamoDB(data);
    
    return NextResponse.json({ message: 'User added to the data base' }, { status: 200 });
  } catch (error) {
    console.error("Error adding user to data base:", error);
    return NextResponse.json({ message: 'Failed to add user' }, { status: 500 });
  }
}
