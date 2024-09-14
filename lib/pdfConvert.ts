import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import { formatStringToCamelCaps, removeSpanishSymbols } from "./utils";

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

export const generatePDF = async (filePath: string, data: any) => {
    const existingPdfBytes = fs.readFileSync(filePath);
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

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync("./tmp/Solicitud-de-Residencia-Nueva.pdf", pdfBytes);
    console.log("PDF filled and saved successfully");

};

