// /app/api/email/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
//import { saveToDynamoDB } from '../../../lib/dynamodb'; // Adjust the path to your DynamoDB utility

export async function POST(request: Request) {
  //console.log("SES_ACCESS_KEY_ID from environment:", process.env.SES_ACCESS_KEY_ID); //Added to debug on Amplify
  try {
    const { email, nombre, nombreEmpresa } = await request.json();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      console.error("Invalid email address:", email);
      return NextResponse.json({ message: 'Invalid email address' }, { status: 400 });
    }

    //console.log("You got to /email/route.ts file");//Added to debug on Amplify
    await sendEmail(email, nombre, nombreEmpresa);
    
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
  }
}
