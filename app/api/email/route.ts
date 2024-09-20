// /app/api/email/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { sendEmail, createAttachment } from '@/lib/email';
import { saveToDynamoDB } from '@/lib/dynamodb';

export async function POST(request: Request) {
  //console.log("SES_ACCESS_KEY_ID from environment:", process.env.SES_ACCESS_KEY_ID); //Added to debug on Amplify
  try {
    const data = await request.json();
    const { emailResidente } = data;

    if (!emailResidente || !/\S+@\S+\.\S+/.test(emailResidente)) {
      console.error("Invalid email address:", emailResidente);
      return NextResponse.json({ message: 'Invalid email address' }, { status: 400 });
    }

    //console.log("You got to /email/route.ts file");//Added to debug on Amplify
    const attachmentPDF = await createAttachment( data );
    await sendEmail(data, attachmentPDF);
    await saveToDynamoDB(data);
    
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
  }
}
