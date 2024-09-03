import Ajv, { type ErrorObject, KeywordDefinition, JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats'; // Import ajv-formats
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';

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
  nombre: string;
  email: string;
  opcionElegida: 'Banco de Proyectos' | 'Propuesta propia' | 'Trabajador';
  periodoProyectado: string;
  numeroResidentes: number;
};

// Define JSON schema
const schema: JSONSchemaType<FormData> = {
  title: 'Student Schema',
  type: 'object',
  properties: {
    nombre: { type: 'string' },
    email: { type: 'string', format: 'email' },
    opcionElegida: {
      type: 'string',
      enum: ['Banco de Proyectos', 'Propuesta propia', 'Trabajador'],
      uniforms: {
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
