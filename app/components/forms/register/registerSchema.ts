import Ajv, { type KeywordDefinition, JSONSchemaType } from "ajv";
import addFormats from "ajv-formats";
import { JSONSchemaBridge } from "uniforms-bridge-json-schema";

// Initialize Ajv with options
const ajv = new Ajv({ allErrors: true, useDefaults: true, $data: true, strictSchema: false });
addFormats(ajv);

// Add "uniforms" keyword with correct definition
const noopKeywordDefinition: KeywordDefinition = {
  keyword: "uniforms",
  type: ["object", "boolean", "string", "number", "array", "null"],
  schemaType: "object",
  code() {
    // No-op code; it doesn’t modify validation results
  },
};
ajv.addKeyword(noopKeywordDefinition);

// Custom validation to ensure password and confirmPassword match
function validatePasswordsMatch(schema: any, data: FormData) {
  if (data.password !== data.confirmPassword) {
    return [{ message: "Passwords do not match", params: { keyword: "passwordMatch" } }];
  }
  return null;
}

// Define your form data schema
type FormData = {
  password: string;
  confirmPassword: string;
  email: string;
  name: string;
  fatherName: string;
  motherName: string;
};

const schema: JSONSchemaType<FormData> & {
  properties: {
    [key in keyof FormData]: JSONSchemaType<FormData[key]> & { uniforms?: any };
  };
} = {
  title: "Register Schema",
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    fatherName: {
      type: "string",
    },
    motherName: {
      type: "string",
    },
    email: {
      type: "string",
      format: "email",
      pattern:
        "^[a-zA-Z0-9._-]+@(hotmail\\.com|gmail\\.com|yahoo\\.com|me\\.com|icloud\\.com|outlook\\.com|huauchinango\\.tecnm\\.mx)$",
    },
    password: {
      type: "string",
      pattern: "^(?=.*[A-Z])(?=.*\\d)(?=.*[&*()%$#!])[A-Za-z\\d&*()%$#!]{6,}$",
      uniforms: {
        type: "password",
        errorMessage:
          "Contraseña debe empezar con mayúscula, debe ser de min 6 caracteres, contener al menos un número y al menos uno de los siguientes simbolos: &*()%$#! ",
      },
    },
    confirmPassword: {
      type: "string",
      pattern: "^(?=.*[A-Z])(?=.*\\d)(?=.*[&*()%$#!])[A-Za-z\\d&*()%$#!]{6,}$",
      uniforms: {
        type: "password",
        errorMessage:
          "Contraseña debe empezar con mayúscula, debe ser de min 6 caracteres, contener al menos un número y al menos uno de los siguientes simbolos: &*()%$#! ",
      },
    },
  },
  required: ["email", "password", "confirmPassword"],
};

// Corrected validator function with a proper type signature
function createValidator(schema: object) {
  const validator = ajv.compile(schema);

  return (model: Record<string, unknown>) => {
    validator(model);

    // Add custom validation for password matching
    const errors = validatePasswordsMatch(schema, model as FormData);
    if (errors) {
      return { details: errors };
    }

    return validator.errors?.length ? { details: validator.errors } : null;
  };
}

// Create validator function
const schemaValidator = createValidator(schema);

// Create JSONSchemaBridge
export const bridge = new JSONSchemaBridge({schema, validator: schemaValidator});
