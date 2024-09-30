"use client";

import React, { useState } from "react";
import { AutoField, AutoForm, ErrorField, TextField } from "uniforms-semantic";
import { useForm } from "uniforms";
import { bridge } from "./loginSchema";
import { Field } from "@/types/login";
import { useRouter } from "next/navigation";

interface LoginFields {
  email: Field;
  password: Field;
  username?: Field;
}

const LoginForm = ({ email, password }: LoginFields) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handelSubmit = async (data: any) => {
    console.log(`Handler submit function: ${JSON.stringify(data, null, 2)}`);
    setIsLoading(true);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data, null, 2),
      });
      if (response.ok) {
        router.push("/private/queries");
      } else {
        console.error(
          "Check Amplify Hosting compute logs, there was an error with the email recipient. Probably email recipient is not registered or verified in Amazon SES Sandbox"
        );
        alert("Failed to to login. Please try again.");
      }
    } catch (error) {
      throw new Error("Failed to submit application. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const SubmitFieldCustom = () => {
    const { error } = useForm(); //The useForm() hook from uniforms provides access to the current state of the form.

    const searchMissingFields = () => {
      console.log("Hello world!!", typeof error);
      if (!!error && (error as any).details) {
        const errorList = (error as any).details.map((err: any) => {
          return err.params.missingProperty;
        });
        if (errorList.lenght > 1) {
          alert(
            `Olvidaste llenar los siguientes campos: ${errorList.join(", ")}`
          );
        } else {
          alert(`Olvidaste el siguiente campo : ${errorList.join(", ")}`);
        }
      }
    };

    return (
      <input
        type="submit"
        className="ui button inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
        value="Login"
        onClick={() => {
          searchMissingFields();
        }}
      />
    );
  };

  return (
    <div className="space-y-8">
      <AutoForm schema={bridge} onSubmit={(data) => handelSubmit(data)}>
        {isLoading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
          </div>
        )}
        <div className={`${isLoading ? "loading" : ""}`}>
          {email && (
            <AutoField
              name={email.name}
              label={email.label}
              placeholder={email.placeholder && email.placeholder}
              className="space-y-2"
            />
          )}
          {password && (
            <AutoField
              name={password.name}
              label={password.label}
              placeholder={password.placeholder && password.placeholder}
              className="space-y-2"
            />
          )}
        </div>
        <div className="mt-3">
          <SubmitFieldCustom />
        </div>
      </AutoForm>
    </div>
  );
};

export default LoginForm;
