"use client";

import React from "react";
import RegisterForm from "@/app/components/forms/register/RegisterForm";
import { Field } from "@/types/login";

const name: Field = {
  label: "Nombre",
  name: "name",
  placeholder: "Ingrese su nombre(s)",
};

const fatherName: Field = {
  label: "Apellido Paterno",
  name: "fatherName",
  placeholder: "Ingrese su apellido paterno",
};

const motherName: Field = {
  label: "Apellido Materno",
  name: "motherName",
  placeholder: "Ingrese su apellido materno",
};

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

const confirmPassword: Field = {
  label: "Confirme contraseña",
  name: "confirmPassword",
  placeholder: "Debe ser identica al campo anterior",
};

export default function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
            Registrarse
          </h3>
          <p>Crea una cuenta para iniciar.</p>
        </div>
        <div className="p-6">
          <RegisterForm
            name={name}
            fatherName={fatherName}
            motherName={motherName}
            email={email}
            password={password}
            confirmPassword={confirmPassword}
          />
        </div>
      </div>
    </div>
  );
}
