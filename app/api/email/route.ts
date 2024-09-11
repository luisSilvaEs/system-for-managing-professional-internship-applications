// /app/api/email/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
//import { saveToDynamoDB } from '../../../lib/dynamodb'; // Adjust the path to your DynamoDB utility

/*
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    
    const {
      nombre,
      email,
      nombreEmpresa,
      opcionElegida,
      periodoProyectado,
      numeroResidentes,
      apellidoPaterno,
      apellidoMaterno,
      carrera,
      numeroControl,
      domicilioCalle,
      domicilioNumeroExterior,
      domicilioNumeroInterior,
      domicilioColonia,
      domicilioCP,
      ciudad,
      telefonoOcelular,
      giroRamoSector,
      otroRamoSector,
    } = req.body;

    try {
      await sendEmail(email, nombreEmpresa, body);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to send email' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
*/
/*
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      nombre,
      email,
      nombreEmpresa,
      opcionElegida,
      periodoProyectado,
      numeroResidentes,
      apellidoPaterno,
      apellidoMaterno,
      carrera,
      numeroControl,
      domicilioCalle,
      domicilioNumeroExterior,
      domicilioNumeroInterior,
      domicilioColonia,
      domicilioCP,
      ciudad,
      telefonoOcelular,
      giroRamoSector,
      otroRamoSector,
    } = body;

    if (!nombre || !email || !nombreEmpresa) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    // Save data to DynamoDB (if needed)
    /*
    await saveToDynamoDB({
      nombre,
      email,
      nombreEmpresa,
      opcionElegida,
      periodoProyectado,
      numeroResidentes,
      apellidoPaterno,
      apellidoMaterno,
      carrera,
      numeroControl,
      domicilioCalle,
      domicilioNumeroExterior,
      domicilioNumeroInterior,
      domicilioColonia,
      domicilioCP,
      ciudad,
      telefonoOcelular,
      giroRamoSector,
      otroRamoSector,
    });
    */

    // Send confirmation email
    /*
    await sendConfirmationEmail({ nombre, email, nombreEmpresa });

    
    return NextResponse.json({
      message: 'Application submitted successfully and email sent.',
    }, { status: 200 });

  } catch (error) {
    console.error('Error processing application:', error);
    return NextResponse.json({ message: 'Failed to process application.' }, { status: 500 });
  }
}
*/

export async function POST(request: Request) {
  console.log("SES_ACCESS_KEY_ID from environment:", process.env.SES_ACCESS_KEY_ID);
  try {
    const { email, nombre, nombreEmpresa } = await request.json();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      console.error("Invalid email address:", email);
      return NextResponse.json({ message: 'Invalid email address' }, { status: 400 });
    }

    console.log("You got to /email/route.ts file");
    await sendEmail(email, nombre, nombreEmpresa);
    
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
  }
}
