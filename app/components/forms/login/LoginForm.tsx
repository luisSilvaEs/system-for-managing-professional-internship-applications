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
        const data = await response.json();
        const userInfo = { name: data.name, lastName: data.lastName };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        console.log("Redirect to /private/queries");
        router.push("/private/queries");
      } else {
        console.error("Login failed. Check the response for more details.");
        alert("Failed to login. Please try again.");
      }
    } catch (error) {
      throw new Error("Error during login.");
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
        className="ui button b-button-primary w-full"
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
        <div className="sm:mt-4 md:mt-10 ">
          <SubmitFieldCustom />
        </div>
      </AutoForm>
    </div>
  );
};

export default LoginForm;
