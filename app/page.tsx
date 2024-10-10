import React from "react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="h-5/6 bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            Sistema de Solicitud de Residencias Profesionales
          </h1>
          <p className="mt-2 text-xl text-muted-foreground">
            Bienvenido al sistema de administración de residencias profesionales
          </p>
        </div>
        <div className="mt-8 flex-col">
          <div className="py-6">
            <Link href="/students" className="b-home-button__primary ">
              Formulario Estudiantes
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/login" className="b-home-button__secondary">
              Admin Ingreso
            </Link>
            <Link href="/register" className="b-home-button__secondary">
              Admin Registro
            </Link>
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Para estudiantes: Use el botón "Formulario Estudiantes" para llenar y
          enviar su aplicación para residencias.
          <br />
          Para administrador: Use el botón "Admin Ingreso" o "Admin Registro"
          para acceder al sistema.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
