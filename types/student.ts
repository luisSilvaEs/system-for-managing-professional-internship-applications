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