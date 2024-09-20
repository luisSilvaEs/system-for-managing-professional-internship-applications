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

export const sendEmail = async (data:any, attachment?: any) => {
  //getPdfFieldNames("./tmp/Solicitud-de-Residencia_2024-fillable.pdf");
  const { 
    emailResidente,
    nombreResidente, 
    numeroControl, 
    carreraResidente, 
    nombreEmpresa 
    } = data;
  

  const rawEmailData = `From: ${process.env.SES_FROM_EMAIL}
To: ${emailResidente}
Subject: Solicitud residencia de ${nombreResidente}
MIME-Version: 1.0
Content-Type: multipart/related; boundary="NextPart"

--NextPart
Content-Type: multipart/alternative; boundary="HtmlPart"

--HtmlPart
Content-Type: text/html; charset=utf-8

<html>
  <body>
    <h1>Solicidud de residencia profesional nuevo.</h1>
    <p>El alumno <strong>${nombreResidente}</strong> de la carrera <strong>${carreraResidente}</strong> y con número de control <strong>${numeroControl}</strong>
    ha llenado el formulario para realizar prácticas en la empresa <strong>${nombreEmpresa}</strong>.</p>
    <p>Para ver la solicitud completa, abrir el archivo adjunto.</p>
    
    <!-- Attachment inside the body -->
    <embed src="cid:Solicitud-de-Residencia-Nueva.pdf" type="application/pdf" width="600" height="400" />

    <p>Excelente día</p>
  </body>
  <footer>
  <p style="font-size: 0.8em; font-style: italic; color: gray;">
  Sistema de Control de Residencias Profesionales. Desarrollado por Luis Alberto Silva Escamilla. Todos los derechos reservados © 2024.
  </p>
  </footer>
</html>

--HtmlPart--

--NextPart
Content-Type: application/pdf; name="Solicitud-de-Residencia-Nueva.pdf"
Content-Disposition: inline; filename="Solicitud-de-Residencia-Nueva.pdf"
Content-ID: <Solicitud-de-Residencia-Nueva.pdf>
Content-Transfer-Encoding: base64

${attachment}

--NextPart--
`;


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

export const createAttachment = async (data:any) => {
  //generatePDF("./tmp/Solicitud-de-Residencia_2024-fillable.pdf", data );//locally
  const s3BucketName = process.env.S3_PDF_BUCKET_NAME || '';
  const s3filePath =  process.env.S3_PDF_TEMPLATE_FILE_PATH || '';
  console.log(`Bucket: ${s3BucketName} Resource: ${s3filePath}`);
  
  const newPDFKey = await generatePDF(s3BucketName, s3filePath, data) || "";
  
  const pdfBytes = await downloadPdfFromS3(s3BucketName, newPDFKey);

  const attachment = Buffer.from(pdfBytes).toString('base64');

  return attachment;
};
