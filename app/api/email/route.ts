// /app/api/email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sendConfirmationEmail } from '../../../lib/email'; // Adjust the path to your email utility
//import { saveToDynamoDB } from '../../../lib/dynamodb'; // Adjust the path to your DynamoDB utility

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
    await sendConfirmationEmail({ nombre, email, nombreEmpresa });

    // Send success response back to the client
    return NextResponse.json({
      message: 'Application submitted successfully and email sent.',
    }, { status: 200 });

  } catch (error) {
    console.error('Error processing application:', error);
    return NextResponse.json({ message: 'Failed to process application.' }, { status: 500 });
  }
}
