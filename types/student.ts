export type StudentDynamoDB = {
    id: number;
    numeroControl: string;
    apellidoMaterno: string;
    apellidoPaterno: string;
    nombre: string;
    carreraResidente: string;
    periodo: string;
    telefono: string;
    lugar: string;
    fecha: string;
    email: string;
    jefeDivision: string;
    opcionElegida: string;
    numeroResidentes: string;
    calleResidente: string;
    coloniaResidente: string;
    cpResidente: number;
    ciudad: string;
    nombreEmpresa: string;
    giroRamoSector: string;
    otroRamoSector: string;
    calleEmpresa: string;
    coloniaEmpresa: string;
    cpEmpresa: number;
    ciudadEmpresa: string;
    telefonoEmpresa: string;
    nombreTitularEmpresa: string;
    puestoTitularEmpresa: string;
    nombrePersonaCartaPresentacion: string;
    puestoPersonaCartaPresentacion: string;
  };

  export type CleanedItem = {
    [key: string]: string | number;
  };

 

  // Define the DynamoDB AttributeValue type
  export type AttributeValue = {
    S?: string;
    N?: string;
  };

  // Define the possible DynamoDB attribute types
type DynamoDBAttributeValue =
| { S: string }         // String type
| { N: string }         // Number type (DynamoDB stores numbers as strings)
| { BOOL: boolean }     // Boolean type
| { L: DynamoDBAttributeValue[] } // List type (array of DynamoDB attributes)
| { M: Record<string, DynamoDBAttributeValue> }; // Map type (nested object)

// Define the type for an item returned from DynamoDB
export type DynamoDBItem = Record<string, DynamoDBAttributeValue>;

// Define the response type when fetching an item from DynamoDB
export interface GetItemResponse {
Item?: DynamoDBItem;  // Item might be undefined if the entry doesn't exist
}
