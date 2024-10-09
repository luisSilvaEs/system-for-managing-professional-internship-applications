export const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const formatStringToCamelCaps = (str: string) => {
    // Trim leading and trailing spaces and split by spaces
    const words = str.trim().split(/\s+/);
      
    if (words.length > 2) {
      // If there are more than two words, concatenate the first and last word
      const formattedString = capitalizeFirstLetter(words[0]) + capitalizeFirstLetter(words[words.length - 1]);
      return formattedString;
    } else if (words.length === 2) {
      // If there are exactly two words, concatenate them
      const formattedString = capitalizeFirstLetter(words[0]) + capitalizeFirstLetter(words[1]);
      return formattedString;
    } else {
      // If there are no spaces or only one word, capitalize the first letter
      return capitalizeFirstLetter(str);
    }
};

export const removeSpanishSymbols = (input: string): string => {
  // Normalize the string to decompose accented characters into their base characters
  return input
    .normalize("NFD") // Normalize to "NFD" form (decomposed form)
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
    .replace(/[¡¿]/g, ""); // Remove Spanish-specific symbols like '¡' and '¿'
}

export const getCustomDateRange = () : string => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  if (currentMonth >= 1 && currentMonth <= 4) {
    return `Marzo - Julio ${currentYear}`;
  } else if (currentMonth >= 8 && currentMonth <= 9) {
    return `Agosto - Diciembre ${currentYear}`;
  }

  return "Periodo cerrado";
};

export const currentFormattedDate = (date: Date) : string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("es-ES", { month: "long" }); // e.g., 'Sep'
  const year = String(date.getFullYear()); // e.g., '24'
  return `${day} de ${month} de ${year}`;
};

export const formatDataForServices = (data:any) => {

    const {
        lugar,
        fecha,
        jefeDivision,
        opcionElegida,
        periodoProyectado,
        numeroResidentes,
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        carrera,
        numeroControl,
        domicilioCalle,
        domicilioNumeroExterior,
        domicilioNumeroInterior,
        domicilioColonia,
        domicilioCP,
        ciudad,
        telefonoOcelular,
        email,
        nombreEmpresa,
        giroRamoSector,
        otroRamoSector,
        calleEmpresa,
        numeroExteriorEmpresa,
        numeroInteriorEmpresa,
        coloniaEmpresa,
        cpEmpresa,
        ciudadEmpresa,
        telefonoEmpresa,
        nombreTitularEmpresa,
        puestoTitularEmpresa,
        nombrePersonaAQuienVaPresentacion,
        puestoPersonaAQuienVaPresentacion
      } = data;

    /**
     * Actually this data match the PDF form names, however is the same structure to be used in the DynamoDB
     */
    const dataForServices = {
        lugar: lugar,
        fecha: fecha,
        jefeDivision: jefeDivision,
        opcionElegida: opcionElegida,
        periodo: periodoProyectado,
        numeroResidentes: `${numeroResidentes}`,
        nombreResidente: `${nombre} ${apellidoPaterno} ${apellidoMaterno}`,
        nombre: nombre,
        apellidoPaterno: apellidoPaterno,
        apellidoMaterno: apellidoMaterno,
        carreraResidente: carrera,
        numeroControl: numeroControl,
        calleResidente: `${domicilioCalle} #${domicilioNumeroExterior} ${typeof domicilioNumeroInterior !== "undefined" ? "Int "+domicilioNumeroInterior : "" }`,
        coloniaResidente: domicilioColonia,
        cpResidente: domicilioCP,
        ciudadResidente: ciudad,
        telefonoResidente: telefonoOcelular,
        emailResidente: email,
        telefonoCasaResidente: '',
        nombreEmpresa: nombreEmpresa,
        giroRamoSector: giroRamoSector,
        otroGiro: typeof otroRamoSector !== "undefined" ? otroRamoSector : "N/A" ,
        calleEmpresa: `${calleEmpresa} #${numeroExteriorEmpresa} ${typeof numeroInteriorEmpresa !== "undefined" ? "Int "+numeroInteriorEmpresa : "" }`,
        coloniaEmpresa: coloniaEmpresa,
        cpEmpresa: cpEmpresa,
        ciudadEmpresa: ciudadEmpresa,
        telefonoEmpresa: telefonoEmpresa,
        nombreTitularEmpresa: nombreTitularEmpresa,
        puestoTitularEmpresa: puestoTitularEmpresa,
        nombrePersonaCartaPresentacion: nombrePersonaAQuienVaPresentacion,
        puestoPersonaCartaPresentacion: puestoPersonaAQuienVaPresentacion
    };

    return dataForServices;
};

export const formatUserForServices = (data:any) => {
  const {email, password, name, fatherName, motherName} = data;

  const userForServices = {
    email: email,
    password: password,
    name: name,
    fatherName: fatherName,
    motherName: motherName
  }

  return userForServices;
}

// Function to convert specific keys to more user-friendly labels
const convertKeyToLabel = (key: string): string => {
  switch (key) {
    case "numeroControl":
      return "Numero de Control";
    case "nombrePersonaCartaPresentacion":
      return "Nombre de Persona de Carta de Presentacion";
    case "apellidoMaterno":
    case "apellidoPaterno":
    case "nombre":
      return "Nombre Completo";
    case "carreraResidente":
      return "Carrera a la que pertence";
    case "periodo":
      return "Periodo proyectado para la realización del proyecto";
    case "numeroControl":
      return "Número de control";
    case "telefono":
      return "Teléfono";
    case "lugar":
      return "Lugar";
    case "fecha":
      return "Fecha";
    case "email":
      return "Email";
    case "jefeDivision":
      return "Jefe de División";
    case "opcionElegida":
      return "Opcion Elegida";
    case "numeroResidentes":
      return "Número de Residentes";
    case "calleResidente":
      return "Calle";
    case "coloniaResidente":
      return "Colonia";
    case "cpResidente":
      return "Código Postal";
    case "ciudad":
      return "Ciudad";
    case "nombreEmpresa":
      return "Nombre";
    case "giroRamoSector":
      return "Giro, ramo o sector";
    case "otroRamoSector":
      return "Otro";
    case "calleEmpresa":
      return "Calle";
    case "coloniaEmpresa":
      return "Colonia";
    case "cpEmpresa":
      return "Código Postal";
    case "ciudadEmpresa":
      return "Ciudad";
    case "telefonoEmpresa":
      return "Teléfono";
    case "nombreTitularEmpresa":
      return "Titular de la Empresa";
    case "puestoTitularEmpresa":
      return "Puesto del(a) Titular de la Empresa";
    case "nombrePersonaCartaPresentacion":
      return "Nombre de la Persona a quien va dirigida la cara de presentación";
    case "puestoPersonaCartaPresentacion":
      return "Puesto de la Persona a quien va dirigida la cara de presentación";
    default:
      return key; // Fallback to return the key if no specific label is defined
  }
};


export const extractKeyValuePairs = (obj: any, keys: string[]): { label: string; paragraph: string }[] => {
  const result: { label: string; paragraph: string }[] = [];
  
  if (keys.includes('nombre') && keys.includes('apellidoPaterno') && keys.includes('apellidoMaterno')) {
    const fullName = `${obj.nombre || ''} ${obj.apellidoPaterno || ''} ${obj.apellidoMaterno || ''}`.trim();
    result.push({
      label: convertKeyToLabel('nombre'), // "Nombre Completo"
      paragraph: fullName,
    });

    keys = keys.filter(key => !['nombre', 'apellidoPaterno', 'apellidoMaterno'].includes(key));
  }

  keys.forEach(key => {
    if (obj.hasOwnProperty(key)) {
      result.push({
        label: convertKeyToLabel(key),
        paragraph: obj[key],
      });
    }
  });

  return result;
};

