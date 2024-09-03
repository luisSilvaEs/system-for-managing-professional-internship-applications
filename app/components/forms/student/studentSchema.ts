import Ajv, { type ErrorObject, KeywordDefinition, JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats'; // Import ajv-formats
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';
import { RadioField } from 'uniforms-unstyled';

// Initialize Ajv with options
const ajv = new Ajv({ allErrors: true, useDefaults: true, $data: true });

// Add formats to Ajv instance
addFormats(ajv); // Add ajv-formats to handle formats like "email"

// Add 'uniforms' keyword with correct definition
const noopKeywordDefinition: KeywordDefinition = {
  keyword: 'uniforms',
  type: 'object',
  schemaType: 'object',
  code() {
    // No-op code; it doesn't modify validation results
  },
};

ajv.addKeyword(noopKeywordDefinition);

type FormData = {
  opcionElegida: 'Banco de Proyectos' | 'Propuesta propia' | 'Trabajador';
  periodoProyectado: string;
  numeroResidentes: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
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
};

// Define JSON schema
const schema: JSONSchemaType<FormData> = {
  title: 'Student Schema',
  type: 'object',
  properties: {
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
      type: 'integer'
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
    email: { type: 'string', format: 'email' },
    nombreEmpresa: {
      type: 'string'
    },
    giroRamoSector: {
      type: 'string',
      enum: ['Industrial', 'Servicios', 'Público','Privado', 'Otro'],
      uniforms: {
        component: RadioField,
        options: [
          { label: 'Industrial', value: 'Industrial' },
          { label: 'Servicios', value: 'Servicios' },
          { label: 'Público', value: 'Público' },
          { label: 'Privado', value: 'Privado' },
          { label: 'Otro', value: 'Otro' },
        ],
      },
    } 
  },
  required: ['nombre', 'email', 'opcionElegida'],
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
