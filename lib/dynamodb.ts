import { PutItemCommand, ScanCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import dynamoClient from "@/lib/dynamoClient";
import { GetItemResponse, DynamoDBItem } from "@/types/student";

const fetchData = async () => {
    const params = {
      TableName: process.env.NEXT_PUBLIC_TABLE_NAME || '', 
    };
  
    try {
      const data = await dynamoClient.send(new ScanCommand(params));
      return data.Items; // Returns the items from the DynamoDB table
    } catch (error) {
      console.error("Error fetching data from DynamoDB:", error);
      return [];
    }
  };
  
  export default fetchData;

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
    //console.log("-->", params);
    try {
        const command = new PutItemCommand(params);
        const response = await dynamoClient.send(command);
        console.log("Data saved to DynamoDB successfully:", response);
    } catch (error) {
        console.error("Error saving to DynamoDB:", error);
        throw new Error("Failed to save data to DynamoDB");
    }
}

export async function saveUserToDynamoDB(data: any) {
  console.log("Hi from saveUserToDynamoDB", data);
  const { email, password, name, fatherName, motherName } = data;
  const params = {
    TableName: process.env.DYNAMODB_TABLE_USERS_NAME,
    Item: {
      email: { S: email },
      password: { S: password },
      name: { S: name },
      fatherName: { S: fatherName },
      motherName: { S: motherName },
      timestamp: { S: new Date().toISOString() }
    }
  }

  console.log("Params", params);

  try {
    const commandUser = new PutItemCommand(params);
    const response = await dynamoClient.send(commandUser);
    console.log("User saved to DynamoDB successfully:", response);
  } catch (error) {
      console.error("Error saving to DynamoDB:", error);
      throw new Error("Failed to save user to DynamoDB");
  }
}

export const getEntryByID = async (id: number): Promise<GetItemResponse> => {
  try {
    const params = {
      TableName: process.env.NEXT_PUBLIC_TABLE_NAME || '',
      Key: marshall({
        id: id,
      }),
    };
    //marshall is used to convert the JavaScript object into a format suitable for DynamoDB

    const command = new GetItemCommand(params);//GetItemCommand is used to fetch a specific entry from DynamoDB.
    const response = await dynamoClient.send(command);

    if (response.Item) {
        const item: DynamoDBItem = unmarshall(response.Item);
        console.log('Response', item);
        return { Item: item }; // unmarshall is used to parse the DynamoDB response back into a standard JavaScript object.
    } else {
      return {}; // Handle case where the item doesn't exist
    }
  } catch (error) {
    console.error('Error fetching item from DynamoDB:', error);
    throw new Error('Error fetching item');
  }
};

/*
export const getUserByEmail = async ( email: string ): Promise<GetItemResponse> => {
  try {
    const params = {
      TableName: process.env.NEXT_PUBLIC_USER_SYS_TABLE_NAME || '',
      Key: marshall({
        email: email,
      }),
    };
    //marshall is used to convert the JavaScript object into a format suitable for DynamoDB
    const command = new GetItemCommand(params);//GetItemCommand is used to fetch a specific entry from DynamoDB.
    const response = await dynamoClient.send(command);

    if (response.Item) {
        const item: DynamoDBItem = unmarshall(response.Item);
        console.log('Response', item);
        return { Item: item }; // unmarshall is used to parse the DynamoDB response back into a standard JavaScript object.
    } else {
      return {}; // Handle case where the item doesn't exist
    }
  } catch (error) {
    console.error('Error fetching user from DynamoDB:', error);
    throw new Error('Error fetching item');
  }
};
*/
