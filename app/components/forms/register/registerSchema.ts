import Ajv, { type KeywordDefinition, JSONSchemaType } from "ajv";
import addFormats from "ajv-formats"; // Import ajv-formats
import { JSONSchemaBridge } from "uniforms-bridge-json-schema";

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
    username?: string,
    password: string,
    confirmPassword: string,
    email: string,
    name: string,
    fatherName: string,
    motherName: string
};

const schema: JSONSchemaTypeWithUniforms<FormData> = {
    title: "Register Schema",
    type: "object",
    properties: {
        username: {
            type: "string",
            nullable: true
        },
        email: {
            type: "string",
            format: "email",
            pattern: "^[a-zA-Z0-9._-]+@(hotmail\\.com|gmail\\.com|yahoo\\.com|me\\.com|icloud\\.com|outlook\\.com|huauchinango\\.tecnm\\.mx)$",
        },
        password: {
          type: "string",
          pattern: "^(?=.*[A-Z])(?=.*\d)(?=.*[&*()%$#!])[A-Za-z\d&*()%$#!]{6,}$",
          uniforms: { type: 'password',
            errorMessage: "Contraseña debe empezar con mayúscula, debe ser de min 6 caracteres, contener al menos un número y al menos uno de los siguientes simbolos: &*()%$#! ",
           }
        },
        confirmPassword: {
            type: "string",
            pattern: "^(?=.*[A-Z])(?=.*\d)(?=.*[&*()%$#!])[A-Za-z\d&*()%$#!]{6,}$",
            const: { $data: '1/password' },
            uniforms: { type: 'password',
              errorMessage: "Contraseña debe empezar con mayúscula, debe ser de min 6 caracteres, contener al menos un número y al menos uno de los siguientes simbolos: &*()%$#! ",
             },
        },
        name: {
            type: "string"
        },
        fatherName: {
            type: "string"
        },
        motherName: {
            type: "string"
        },
    },
    required: ["email", "password", "confirmPassword"]
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