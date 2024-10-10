"use client";

import React, { Children, ReactElement, useState, useRef } from "react";
import { AutoField, AutoForm, ErrorField } from "uniforms-semantic";
import { useForm, Context, UnknownObject } from "uniforms";
import { bridge } from "./registerSchema";
import { Field } from "@/types/login";
import { useRouter } from "next/navigation";
import { formatUserForServices } from "@/lib/utils";

type DisplayIfProps<Model extends UnknownObject> = {
  children: ReactElement;
  condition: (context: Context<Model>) => boolean;
};

// Custom DisplayIf component
function DisplayIf<Model extends UnknownObject>({
  children,
  condition,
}: DisplayIfProps<Model>) {
  const uniforms = useForm<Model>();
  return condition(uniforms) ? Children.only(children) : null;
}

interface RegisterFields {
  name: Field;
  fatherName: Field;
  motherName: Field;
  email: Field;
  password: Field;
  confirmPassword: Field;
}

const RegisterForm = ({
  name,
  fatherName,
  motherName,
  email,
  password,
  confirmPassword,
}: RegisterFields) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const formRef = useRef<any>(null);
  const handelSubmit = async (data: any) => {
    if (data.password !== data.confirmPassword) {
      setPasswordError("Passwords do not match. Please try again.");
      return;
    } else {
      setPasswordError(null);

      try {
        /*
        console.log(
          `Handler submit function: ${JSON.stringify(data, null, 2)}`
        );
        */
        const dataFormattedForServices = formatUserForServices(data);
        console.log(
          `Data formated: ${JSON.stringify(dataFormattedForServices, null, 2)}`
        );
        setIsLoading(true);
        const response = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataFormattedForServices, null, 2),
        });

        if (response.ok) {
          router.push("/login");
        } else {
          console.error("Error, could not connect to backed");
          alert("Failed to create user. Please try again.");
        }
      } catch (error) {
        throw new Error("Failed to submit application. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const SubmitFieldCustom = () => {
    const { error } = useForm(); //The useForm() hook from uniforms provides access to the current state of the form.

    const searchMissingFields = () => {
      console.log("Hello world!!", error);
      if (!!error && (error as any).details) {
        const errorList = (error as any).details.map((err: any) => {
          return err.params.missingProperty;
        });
        if (errorList.lenght > 1) {
          alert(
            `Olvidaste llenar los siguientes campos: ${errorList.join(", ")}`
          );
        } else {
          alert((error as any).details[0].message);
        }
      }
    };

    return (
      <input
        type="submit"
        className="ui button b-button-primary"
        value="Registrarse"
        onClick={() => {
          searchMissingFields();
        }}
      />
    );
  };

  const ClearFieldsButton = () => {
    const handleReset = () => {
      if (formRef.current) {
        formRef.current.reset(); // Reset form fields using ref
      }
    };

    return (
      <button
        type="button"
        className="ui button b-button-secondary"
        onClick={handleReset}
        disabled={isLoading}
      >
        Limpiar Campos
      </button>
    );
  };

  return (
    <div className="space-y-8">
      <AutoForm
        schema={bridge}
        onSubmit={(data) => handelSubmit(data)}
        ref={formRef}
      >
        {isLoading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
          </div>
        )}
        <div className={`${isLoading ? "loading" : ""}`}>
          {name && (
            <AutoField
              name={name.name}
              label={name.label}
              placeholder={name.placeholder && name.placeholder}
              className="space-y-2"
            />
          )}
          {fatherName && (
            <AutoField
              name={fatherName.name}
              label={fatherName.label}
              placeholder={fatherName.placeholder && fatherName.placeholder}
              className="space-y-2"
            />
          )}
          {motherName && (
            <AutoField
              name={motherName.name}
              label={motherName.label}
              placeholder={motherName.placeholder && motherName.placeholder}
              className="space-y-2"
            />
          )}
          {email && (
            <AutoField
              name={email.name}
              label={email.label}
              placeholder={email.placeholder && email.placeholder}
              className="space-y-2"
            />
          )}
          {password && (
            <>
              <AutoField
                name={password.name}
                label={password.label}
                placeholder={password.placeholder && password.placeholder}
                className="space-y-2"
              />
              <ErrorField name={password.name} />
            </>
          )}
          {confirmPassword && (
            <DisplayIf condition={(context) => !!context.model.password}>
              <>
                <AutoField
                  name={confirmPassword.name}
                  label={confirmPassword.label}
                  placeholder={
                    confirmPassword.placeholder && confirmPassword.placeholder
                  }
                  className="space-y-2"
                />
                <ErrorField name={confirmPassword.name} />
              </>
            </DisplayIf>
          )}
          {passwordError && (
            <div className="text-red-500 text-sm">{passwordError}</div>
          )}
        </div>
        <div className="sm:mt-4 md:mt-10 b-form__buttons justify-center">
          <ClearFieldsButton />
          <SubmitFieldCustom />
        </div>
      </AutoForm>
    </div>
  );
};

export default RegisterForm;
