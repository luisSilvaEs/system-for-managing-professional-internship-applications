// /lib/email.tsx
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { generatePDF } from '@/lib/pdfConvert';

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
  console.log(`Bucket ${s3BucketName} Resource${s3filePath}`);
  generatePDF(s3BucketName, s3filePath, data);
  if (!process.env.SES_ACCESS_KEY_ID || !process.env.SES_SECRET_ACCESS_KEY) {
    console.error("Missing AWS SES credentials in environment variables.");
    throw new Error("AWS SES credentials are not properly configured.");
  }

  const params = {
    Source: process.env.SES_FROM_EMAIL,
    Destination: {
      ToAddresses: [emailResidente],
    },
    Message: {
      Subject: {
        Data: nombreResidente,
      },
      Body: {
        Html: {
          Data: `
          <html>
              <body>
                <h1>Hello from Amazon SES!</h1>
                <p>This is a test email sent using Amazon SES with HTML content.</p>
                <p>Best Regards,<br/>${nombreEmpresa}</p>
              </body>
            </html>
          `
        }
      },
    },
  };

  try {
    const command = new SendEmailCommand(params);
    const response = await sesClient.send(command);
    console.log("Email sent successfully:", response);
    return response;
  } catch (error) {
    console.error(`Error at /lib/email.ts sending email: ${error} Val params: ${JSON.stringify(params)}`);
    throw new Error("Failed to send email");
  }
};
