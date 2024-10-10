import React from "react";
import LoginForm from "@/app/components/forms/login/LoginForm";
import { Field } from "@/types/login";

const email: Field = {
  label: "Correo electrónico",
  name: "email",
  placeholder: "Ingrese su correo",
};

const password: Field = {
  label: "Contraseña",
  name: "password",
  placeholder: "Ingrese su contraseña",
};

export default function Login() {
  return (
    <div className="flex items-center justify-center h-5/6">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
            Login
          </h3>
          <p>Ingrese su correo y contraseña para acceder a la aplicación</p>
        </div>
        <div className="p-6">
          <LoginForm email={email} password={password} />
        </div>
      </div>
    </div>
  );
}
