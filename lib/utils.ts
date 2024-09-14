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
  
  // Example usage:
  const originalText = "¡Hola! ¿Cómo estás? Él tiene un interés increíble.";
  const cleanedText = removeSpanishSymbols(originalText);
  console.log(cleanedText); // Output: "Hola! Como estas? El tiene un interes increible."
  

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
        carreraResidente: carrera,
        numeroControl: numeroControl,
        calleResidente: `${domicilioCalle} #${domicilioNumeroExterior} ${domicilioNumeroInterior && domicilioNumeroInterior !== "" ? "Int "+domicilioNumeroInterior : "" }`,
        coloniaResidente: domicilioColonia,
        cpResidente: domicilioCP,
        ciudadResidente: ciudad,
        telefonoResidente: telefonoOcelular,
        emailResidente: email,
        telefonoCasaResidente: '',
        nombreEmpresa: nombreEmpresa,
        giroRamoSector: giroRamoSector,
        otroGiro: otroRamoSector,
        calleEmpresa: `${calleEmpresa} #${numeroExteriorEmpresa} ${numeroInteriorEmpresa && numeroInteriorEmpresa !== "" ? "Int "+numeroInteriorEmpresa : "" }`,
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

