import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

// Initialize the DynamoDB client
const dynamoClient = new DynamoDBClient({
    region: process.env.SES_REGION,
    credentials: {
        accessKeyId: process.env.SES_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.SES_SECRET_ACCESS_KEY || '',
    }
});

export async function saveToDynamoDB(data:any) {
    const {
        lugar,
        fecha,
        nombre,
        apellidoPaterno,
        apellidoMaterno, 
        numeroControl, 
        carreraResidente,
        jefeDivision,
        opcionElegida,
        periodo, 
        numeroResidentes,
        calleResidente,
        coloniaResidente,
        cpResidente,
        ciudadResidente,
        telefonoResidente,
        emailResidente,
        nombreEmpresa,
        giroRamoSector,
        otroGiro,
        calleEmpresa,
        coloniaEmpresa,
        cpEmpresa,
        ciudadEmpresa,
        telefonoEmpresa,
        nombreTitularEmpresa,
        puestoTitularEmpresa,
        nombrePersonaCartaPresentacion,
        puestoPersonaCartaPresentacion 
    } = data;
    
    const params = {
        TableName: process.env.DYNAMODB_TABLE_NAME,
        Item: {
            id: { N: `${Date.now()}` },
            lugar: { S: lugar },
            fecha: { S: fecha },
            nombre: { S: nombre },
            apellidoPaterno: { S: apellidoPaterno },
            apellidoMaterno: { S: apellidoMaterno },
            email: { S: emailResidente },
            numeroControl: { S: numeroControl },
            carreraResidente: { S: carreraResidente },
            jefeDivision: { S: jefeDivision },
            opcionElegida: { S: opcionElegida },
            periodo: { S: periodo }, 
            numeroResidentes: { S: numeroResidentes },
            calleResidente: { S: `${calleResidente}`  },
            coloniaResidente: { S: coloniaResidente },
            cpResidente: { N: `${cpResidente}` },
            ciudad: { S: ciudadResidente },
            telefono: { S: telefonoResidente },
            nombreEmpresa: { S: nombreEmpresa },
            giroRamoSector: { S: giroRamoSector },
            otroRamoSector: { S: otroGiro },
            calleEmpresa: { S: `${calleEmpresa}` },
            coloniaEmpresa: { S: coloniaEmpresa },
            cpEmpresa: { N: `${cpEmpresa}` },
            ciudadEmpresa: { S: ciudadEmpresa },
            telefonoEmpresa: { S: telefonoEmpresa },
            nombreTitularEmpresa: { S: nombreTitularEmpresa },
            puestoTitularEmpresa: { S: puestoTitularEmpresa },
            nombrePersonaCartaPresentacion: { S: nombrePersonaCartaPresentacion },
            puestoPersonaCartaPresentacion: { S: puestoPersonaCartaPresentacion },
            timestamp: { S: new Date().toISOString() }
        }
    };
    console.log("-->", params);
    try {
        const command = new PutItemCommand(params);
        const response = await dynamoClient.send(command);
        console.log("Data saved to DynamoDB successfully:", response);
    } catch (error) {
        console.error("Error saving to DynamoDB:", error);
        throw new Error("Failed to save data to DynamoDB");
    }
}