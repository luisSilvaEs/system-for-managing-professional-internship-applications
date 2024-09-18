import Ajv, { type KeywordDefinition, JSONSchemaType } from "ajv";
import addFormats from "ajv-formats"; // Import ajv-formats
import { JSONSchemaBridge } from "uniforms-bridge-json-schema";
import { RadioField } from "uniforms-semantic";
import { getCustomDateRange } from "@/lib/utils";

// Initialize Ajv with options
const ajv = new Ajv({ allErrors: true, useDefaults: true, $data: true, strictSchema: false });

// Add formats to Ajv instance
addFormats(ajv); // Add ajv-formats to handle formats like "email"

// Extend JSONSchemaType to allow additional properties
type JSONSchemaTypeWithUniforms<T> = JSONSchemaType<T> & {
  properties: {
    [key in keyof T]: JSONSchemaType<T[key]> & {
      uniforms?: any; // Allow any for uniforms customization
    };
  };
};

// Add "uniforms" keyword with correct definition
const noopKeywordDefinition: KeywordDefinition = {
  keyword: "uniforms",
  type: ["object", "boolean", "string", "number", "array", "null"], // Allow various types, including "object"
  schemaType: "object",
  code() {
    // No-op code; it doesn"t modify validation results
  },
};

ajv.addKeyword(noopKeywordDefinition);

type FormData = {
  lugar: string;
  fecha: string;
  jefeDivision: string;
  opcionElegida: "Banco de Proyectos" | "Propuesta propia" | "Trabajador";
  periodoProyectado: string;
  numeroResidentes: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  carrera: string;
  numeroControl: string;
  domicilioCalle: string;
  domicilioNumeroExterior: string;
  domicilioNumeroInterior: string;
  domicilioColonia: string;
  domicilioCP: number;
  ciudad: string;
  telefonoOcelular: string;
  email: string;
  nombreEmpresa: string;
  giroRamoSector: "Industrial"|"Servicios"|"Público"|"Privado"|"Otro";
  otroRamoSector?: string | null;
  calleEmpresa: string;
  numeroExteriorEmpresa: string;
  numeroInteriorEmpresa: string;
  coloniaEmpresa: string;
  cpEmpresa: number;
  ciudadEmpresa: string;
  telefonoEmpresa: string;
  nombreTitularEmpresa: string;
  puestoTitularEmpresa: string;
  nombrePersonaAQuienVaPresentacion: string;
  puestoPersonaAQuienVaPresentacion: string;
};

// Define JSON schema
const schema: JSONSchemaTypeWithUniforms<FormData> = {
  title: "Student Schema",
  type: "object",
  properties: {
    lugar: {
      type: "string",
      uniforms: {
        placeholder: "Huauchinango, Puebla"
      }
    },
    fecha: {
      type: "string"
    },
    jefeDivision: {
      type: "string",
      enum: ["Rubén Darío Cruz Cabrera", "Daniel Saucedo León", "Juan Sánchez Melo", "Juan Carlos López Vázquez", "Israel Martínez López", "Román Garrido Hernández"],
      uniforms: {
        label: "Jefe de división",
        options: [
          { label: "Rubén Darío Cruz Cabrera", value: "Rubén Darío Cruz Cabrera" },
          { label: "Daniel Saucedo León", value: "Daniel Saucedo León" },
          { label: "Juan Sánchez Melo", value: "Juan Sánchez Melo" },
          { label: "Juan Carlos López Vázquez", value: "Juan Carlos López Vázquez" },
          { label: "Israel Martínez López", value: "Israel Martínez López" },
          { label: "Román Garrido Hernández", value: "Román Garrido Hernández" },
        ],
      },
    },
    opcionElegida: {
      type: "string",
      enum: ["Banco de Proyectos", "Propuesta propia", "Trabajador"],
      uniforms: {
        component: RadioField,
        options: [
          { label: "Banco de Proyectos", value: "Banco de Proyectos" },
          { label: "Propuesta propia", value: "Propuesta propia" },
          { label: "Trabajador", value: "Trabajador" },
        ],
        errorMessage: `Debe marcar de entre alguna de las opciones mostradas arriba`
      },
    },
    periodoProyectado: {
      type: "string",
      value: `${getCustomDateRange()}`
    },
    numeroResidentes: {
      type: "integer",
      minimum: 1,
      maximum: 3
    },
    nombre: { type: "string", uniforms: {
      errorMessage: `Campo "Nombre(s)" es obligatorio`
    } },
    apellidoPaterno: { type: "string" },
    apellidoMaterno: { type: "string" },
    carrera: {
      type: "string",
      enum: ["Ingeniería en Administración", "Ingeniería Eléctrica", "Ingeniería Informática", "Ingeniería Industrial", "Ingeniería Mecatrónica", "Ingeniería en Sistemas Computacionales", "Maestría en Tecnologías de la Información"],
      uniforms: {
        options: [
          { label: "Ingeniería en Administración", value: "Ingeniería en Administración" },
          { label: "Ingeniería Eléctrica", value: "Ingeniería Eléctrica" },
          { label: "Ingeniería Informática", value: "Ingeniería Informática" },
          { label: "Ingeniería Industrial", value: "Ingeniería Industrial" },
          { label: "Ingeniería Mecatrónica", value: "Ingeniería Mecatrónica" },
          { label: "Ingeniería en Sistemas Computacionales", value: "Ingeniería en Sistemas Computacionales" },
          { label: "Maestría en Tecnologías de la Información", value: "Maestría en Tecnologías de la Información" },
        ],
      },
    },
    numeroControl: { 
      type: "string",
      label: "Num. de control",
      uniforms: { placeholder: "G1234567" }
    },
    domicilioCalle: { type: "string", label: "Calle o fraccionamiento" },
    domicilioNumeroExterior: { type: "string", label: "Num. exterior" },
    domicilioNumeroInterior: { type: "string", label: "Num. interior (opcional)" },
    domicilioColonia: {
      type: "string",
      label: "Colonia"
    },
    domicilioCP: {
      type: "number",
      label: "C.P.",
      pattern: "^\d{5}$",
      uniforms: { 
        errorMessage: "Código postal debe tener solo dígitos y de 5 cifras",
      }
    },
    ciudad: {
      type: "string",
      label: "Ciudad",
    },
    telefonoOcelular: {
      type: "string",
      label: "Teléfono o celular"
    },
    email: { 
      type: "string", 
      label: "Correo eléctronico (email)",
      format: "email",
      pattern: "^[a-zA-Z0-9._-]+@(hotmail\\.com|gmail\\.com|yahoo\\.com|me\\.com|icloud\\.com|outlook\\.com)$",
      uniforms: { 
        placeholder: "example@domain.com",
        errorMessage: "Email debe tener un formato válido (e.g., example@gmail.com).",
      }
    },
    nombreEmpresa: {
      type: "string",
      label: "Nombre de la empresa"
    },
    giroRamoSector: {
      type: "string",
      label: "Giro, ramo o sector",
    },
    otroRamoSector: {
      type: "string",
      label: "Especifique",
      nullable: true, // Mark as nullable to handle optional values
    },
    calleEmpresa: {
      type: "string",
      label: "Calle o Fraccionamiento"
    },
    numeroExteriorEmpresa: {
      type: "string",
      label: "Num. exterior"
    },
    numeroInteriorEmpresa: {
      type: "string",
      label: "Num. interior (opcional)"
    },
    coloniaEmpresa: {
      type: "string",
      label: "Colonia"
    },
    cpEmpresa: {
      type: "number",
      pattern: "^\d{5}$",
      uniforms: { 
        errorMessage: "Código postal debe tener solo dígitos y de 5 cifras",
      },
      label: "C.P.",
    },
    ciudadEmpresa: {
      type: "string",
      label: "Ciudad"
    },
    telefonoEmpresa: {
      type: "string",
      label: "Teléfono"
    },
    nombreTitularEmpresa: {
      type: "string",
      label: "Nombre del (a) titular de la empresa"
    },
    puestoTitularEmpresa: {
      type: "string",
      label: "Puesto"
    },
    nombrePersonaAQuienVaPresentacion: {
      type: "string",
      label: "Nombre de (la) persona a quien va dirigida la carta de presentación"
    },
    puestoPersonaAQuienVaPresentacion: {
      type: "string",
      label: "Puesto"
    }
  },
  required: ["nombre", "email", "domicilioCP", "opcionElegida", "giroRamoSector"],
};

// Corrected validator function with proper type signature
function createValidator(schema: object) {
  const validator = ajv.compile(schema);

  return (model: Record<string, unknown>) => {
    validator(model);
    return validator.errors?.length ? { details: validator.errors } : null;
  };
}

// Create validator function
const schemaValidator = createValidator(schema);

// Create JSONSchemaBridge
export const bridge = new JSONSchemaBridge({schema, validator: schemaValidator});
