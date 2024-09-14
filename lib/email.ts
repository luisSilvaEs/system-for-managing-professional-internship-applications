// /lib/email.tsx
import { SESClient, SendRawEmailCommand } from "@aws-sdk/client-ses";
import { generatePDF, downloadPdfFromS3 } from '@/lib/pdfConvert';
import { TextEncoder } from "util";

const sesClient = new SESClient({ 
  region: process.env.SES_REGION,
  credentials: {
    accessKeyId: process.env.SES_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.SES_SECRET_ACCESS_KEY || ''
  }
 });

export const sendEmail = async (data:any) => {
  //getPdfFieldNames("./tmp/Solicitud-de-Residencia_2024-fillable.pdf");
  const { emailResidente, nombreResidente, nombreEmpresa } = data;
  //generatePDF("./tmp/Solicitud-de-Residencia_2024-fillable.pdf", data );//locally
  const s3BucketName = process.env.S3_PDF_BUCKET_NAME || '';
  const s3filePath =  process.env.S3_PDF_TEMPLATE_FILE_PATH || '';
  console.log(`Bucket: ${s3BucketName} Resource: ${s3filePath}`);
  /*
  const newPDFKey = await generatePDF(s3BucketName, s3filePath, data) || "";
  const pdfBytes = await downloadPdfFromS3(s3BucketName, newPDFKey);

  if (!process.env.SES_ACCESS_KEY_ID || !process.env.SES_SECRET_ACCESS_KEY) {
    console.error("Missing AWS SES credentials in environment variables.");
    throw new Error("AWS SES credentials are not properly configured.");
  }

  const attachment = Buffer.from(pdfBytes).toString('base64');
  */
 const attachment = "file.pdf";

  const rawEmailData = `From: ${process.env.SES_FROM_EMAIL}
To: ${emailResidente}
Subject: Solcidud residencia de ${nombreResidente}
MIME-Version: 1.0
Content-Type: multipart/mixed; boundary="NextPart"

--NextPart
Content-Type: text/html; charset=utf-8

<html>
  <body>
    <h1>Solicidud de residencia profesional nuevo.</h1>
    <p>El alumno ${nombreResidente} de la carrera TDB y con numéro de control TDB
    ha llenado el formulario para realizar prácticas en la empresa ${nombreEmpresa}.</p>
    <p>Para ver la solicitud completa, abrir el archivo adjunto.</p>
    <p>Excelente día</p>
  </body>
  <footer>
  <p style="font-size: 0.8em; font-style: italic; color: gray;">
  Sistema de Control de Residencias Profesionales. Desarrollado por Luis Alberto Silva Escamilla. Todos los derechos reservados © 2024.
  </p>
  </footer>
</html>

--NextPart
Content-Type: application/pdf; name="Solicitud-de-Residencia-Nueva.pdf"
Content-Disposition: attachment; filename="Solicitud-de-Residencia-Nueva.pdf"
Content-Transfer-Encoding: base64

${attachment}

--NextPart--`;


  const rawEmailParams = {
    Source: process.env.SES_FROM_EMAIL,
    Destinations: [emailResidente],
    RawMessage: {
      Data: new TextEncoder().encode(rawEmailData)
    }
  };

  try {
    const command = new SendRawEmailCommand(rawEmailParams);
    const response = await sesClient.send(command);
    console.log("Email sent successfully:", response);
    return response;
  } catch (error) {
    console.error(`Error at /lib/email.ts sending email: ${error} Val params: ${JSON.stringify(rawEmailParams)}`);
    throw new Error("Failed to send email");
  }
};
