import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { formatStringToCamelCaps, removeSpanishSymbols } from "./utils";

const s3 = new S3Client({ region: process.env.SES_REGION });

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
    const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
    const { Body } = await s3.send(command);
    const chunks: Uint8Array[] = [];
    for await (const chunk of Body as any) {
        chunks.push(chunk);
    }
    return Buffer.concat(chunks);
}

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
    const form = pdfDoc.getForm();
    const fields = form.getFields();

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

