import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { formatStringToCamelCaps, removeSpanishSymbols } from "./utils";

const s3 = new S3Client({ 
    region: process.env.SES_REGION,
    credentials: {
      accessKeyId: process.env.SES_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.SES_SECRET_ACCESS_KEY || ''
    }
});

//Used in dev to get fields from a new PDF
export const getPdfFieldNames = async ( filePath: string ) => {
    console.log("Got here");
    const existingPdfBytes = fs.readFileSync(filePath);
    console.log("PDF Bytes Length:", existingPdfBytes.length);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const form = pdfDoc.getForm();
    
    const fields = form.getFields();
    console.log('Fields const:', fields);
    fields.forEach((field) => {
        const type = field.constructor.name;
        const name = field.getName();
        console.log(`${type}: ${name}`);
    });
};

export const downloadPdfFromS3 = async (bucketName: string, key: string): Promise<Uint8Array> => {
  console.log(`downloadPdfFromS3 function, params: bucket name: ${bucketName}, file: ${key}`);
  
  try {
    const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
    const { Body } = await s3.send(command);

    if (!Body) {
      throw new Error(`Failed to retrieve object from S3. Body is undefined.`);
    }

    const chunks: Uint8Array[] = [];
    for await (const chunk of Body as any) {
      chunks.push(chunk);
    }

    if (chunks.length === 0) {
      throw new Error(`No data received for file ${key} from bucket ${bucketName}.`);
    }

    console.log(`Successfully downloaded PDF from S3: ${bucketName}/${key}`);
    return Buffer.concat(chunks);
  } catch (error) {
    if (error instanceof Error) {
        console.error(`Error downloading PDF from S3: ${error.message}`);
        throw new Error(`Failed to download PDF from S3: ${error.message}`);
      } else {
        console.error(`Unexpected error: ${String(error)}`);
        throw new Error(`Unexpected error while downloading PDF from S3.`);
      }
  }
};


const uploadPdfToS3 = async(bucketName: string, key: string, fileContent: Uint8Array) => {
    const params = {
        Bucket: bucketName,
        Key: key,
        Body: fileContent,
        ContentType: 'application/pdf',
    };

    try {
        const command = new PutObjectCommand(params);
        await s3.send(command);
        console.log(`File uploaded successfully to ${bucketName}/${key}`);
    } catch (error) {
        console.error('Error uploading file:', error);
    }
}

export const generatePDF = async (s3BucketName: string, s3FilePath: string, data: any) => {
    //const existingPdfBytes = fs.readFileSync(filePath);//locally
    const existingPdfBytes = await downloadPdfFromS3(s3BucketName, s3FilePath);

    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    if (!pdfDoc) {
        console.error('Failed to load PDF document.');
        return;
    }

    if (pdfDoc.getPageCount() === 0) {
        console.error('PDF document has no pages.');
    return;
    } else {
        console.log(`PDF document loaded successfully with ${pdfDoc.getPageCount()} pages.`);
    }
      
      

    const form = pdfDoc.getForm();
    const fields = form.getFields();

    if (fields.length === 0) {
        console.error('No form fields found in the PDF document.');
    } else {
        console.log(`Found ${fields.length} form fields in the PDF document.`);
    }

    fields.forEach((field) => {
        const type = field.constructor.name;
        const fieldName = field.getName();

        if ( data[fieldName] !== undefined ) {
            form.getTextField(fieldName).setText(data[fieldName]);
        }
        
        console.log(`${type}: ${fieldName}`);
    });

    const { opcionElegida, giroRamoSector } = data;
    
    const optionFieldOne = `checkbox${formatStringToCamelCaps(opcionElegida)}`;
    form.getCheckBox( removeSpanishSymbols(optionFieldOne) ).check();

    const optionFieldTwo = `checkbox${formatStringToCamelCaps(giroRamoSector)}`;
    form.getCheckBox( removeSpanishSymbols(optionFieldTwo) ).check();

    const numeroControl = form.getTextField("numeroControl").getText();

    const pdfBytes = await pdfDoc.save();
    //fs.writeFileSync("./tmp/Solicitud-de-Residencia-Nueva.pdf", pdfBytes);
    //console.log("PDF filled and saved locally successfully");

    const newPDFKey = `new-files/Solicitud-de-Residencia-Nueva-${numeroControl}.pdf`;
    await uploadPdfToS3(s3BucketName, newPDFKey, pdfBytes);
    console.log("PDF filled and saved in S3 successfully");
    return newPDFKey;
};

