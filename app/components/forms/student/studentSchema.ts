import Ajv, { type KeywordDefinition, JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats'; // Import ajv-formats
import { StringListParameter } from 'aws-cdk-lib/aws-ssm';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';
import { RadioField } from 'uniforms-unstyled';

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

// Add 'uniforms' keyword with correct definition
const noopKeywordDefinition: KeywordDefinition = {
  keyword: 'uniforms',
  type: ['object', 'boolean', 'string', 'number', 'array', 'null'], // Allow various types, including "object"
  schemaType: 'object',
  code() {
    // No-op code; it doesn't modify validation results
  },
};

ajv.addKeyword(noopKeywordDefinition);

type FormData = {
  lugar: string;
  fecha: string;
  jefeDivision: string;
  opcionElegida: 'Banco de Proyectos' | 'Propuesta propia' | 'Trabajador';
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
  domicilioCP: string;
  ciudad: string;
  telefonoOcelular: string;
  email: string;
  nombreEmpresa: string;
  giroRamoSector: 'Industrial'|'Servicios'|'Público'|'Privado'|'Otro';
  otroRamoSector?: string | null;
  calleEmpresa: string;
  numeroExteriorEmpresa: string;
  numeroInteriorEmpresa: string;
  coloniaEmpresa: string;
  cpEmpresa: string;
  ciudadEmpresa: string;
  telefonoEmpresa: string;
  nombreTitularEmpresa: string;
  puestoTitularEmpresa: string;
  nombrePersonaAQuienVaPresentacion: string;
  puestoPersonaAQuienVaPresentacion: string;
};

// Define JSON schema
const schema: JSONSchemaTypeWithUniforms<FormData> = {
  title: 'Student Schema',
  type: 'object',
  properties: {
    lugar: {
      type: 'string'
    },
    fecha: {
      type: 'string'
    },
    jefeDivision: {
      type: 'string'
    },
    opcionElegida: {
      type: 'string',
      enum: ['Banco de Proyectos', 'Propuesta propia', 'Trabajador'],
      uniforms: {
        component: RadioField,
        options: [
          { label: 'Banco de Proyectos', value: 'Banco de Proyectos' },
          { label: 'Propuesta propia', value: 'Propuesta propia' },
          { label: 'Trabajador', value: 'Trabajador' },
        ],
      },
    },
    periodoProyectado: {
      type: 'string'
    },
    numeroResidentes: {
      type: 'integer',
      minimum: 1,
      maximum: 2
    },
    nombre: { type: 'string' },
    apellidoPaterno: { type: 'string' },
    apellidoMaterno: { type: 'string' },
    carrera: {
      type: 'string',
      enum: ['Ingeniería en Administración', 'Ingeniería Eléctrica', 'Ingeniería Informática', 'Ingeniería Industrial', 'Ingeniería Mecatrónica', 'Ingeniería en Sistemas Computacionales', 'Maestría en Tecnologías de la Información'],
      uniforms: {
        options: [
          { label: 'Ingeniería en Administración', value: 'Ingeniería en Administración' },
          { label: 'Ingeniería Eléctrica', value: 'Ingeniería Eléctrica' },
          { label: 'Ingeniería Informática', value: 'Ingeniería Informática' },
          { label: 'Ingeniería Industrial', value: 'Ingeniería Industrial' },
          { label: 'Ingeniería Mecatrónica', value: 'Ingeniería Mecatrónica' },
          { label: 'Ingeniería en Sistemas Computacionales', value: 'Ingeniería en Sistemas Computacionales' },
          { label: 'Maestría en Tecnologías de la Información', value: 'Maestría en Tecnologías de la Información' },
        ],
      },
    },
    numeroControl: { 
      type: 'string',
      uniforms: { placeholder: 'G1234567' }
    },
    domicilioCalle: { type: 'string' },
    domicilioNumeroExterior: { type: 'string' },
    domicilioNumeroInterior: { type: 'string' },
    domicilioColonia: {
      type: 'string'
    },
    domicilioCP: {
      type: 'string'
    },
    ciudad: {
      type: 'string'
    },
    telefonoOcelular: {
      type: 'string'
    },
    email: { 
      type: 'string', 
      format: 'email',
      pattern: '^[a-zA-Z0-9._-]+@(hotmail\\.com|gmail\\.com|yahoo\\.com|me\\.com|icloud\\.com|outlook\\.com)$',
      uniforms: { 
        placeholder: 'example@domain.com',
        errorMessage: "Email must be a valid format (e.g., example@gmail.com).",
       },
    },
    nombreEmpresa: {
      type: 'string'
    },
    giroRamoSector: {
      type: 'string',
    },
    otroRamoSector: {
      type: 'string',
      nullable: true, // Mark as nullable to handle optional values
      uniforms: { placeholder: 'Especifique' },
    },
    calleEmpresa: {
      type: 'string',
    },
    numeroExteriorEmpresa: {
      type: 'string',
    },
    numeroInteriorEmpresa: {
      type: 'string',
    },
    coloniaEmpresa: {
      type: 'string',
    },
    cpEmpresa: {
      type: 'string',
    },
    ciudadEmpresa: {
      type: 'string',
    },
    telefonoEmpresa: {
      type: 'string',
    },
    nombreTitularEmpresa: {
      type: 'string',
    },
    puestoTitularEmpresa: {
      type: 'string',
    },
    nombrePersonaAQuienVaPresentacion: {
      type: 'string',
    },
    puestoPersonaAQuienVaPresentacion: {
      type: 'string',
    }
  },
  required: ['nombre', 'email', 'opcionElegida', 'giroRamoSector'],
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
