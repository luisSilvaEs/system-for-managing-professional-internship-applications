"use client";

import React, { Children, ReactElement, useState, useEffect } from "react";
import {
  AutoField,
  AutoForm,
  ErrorField,
  TextField,
  RadioField,
} from "uniforms-semantic";
import { Context, UnknownObject, useForm } from "uniforms";
import { bridge as schema } from "./studentSchema";
import { useRouter } from "next/navigation";
import { formatDataForServices } from "@/lib/utils";

interface PropsForm {
  title: string;
  summary: string;
}

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

type FormData = {
  giroRamoSector: "Industrial" | "Servicios" | "Público" | "Privado" | "Otro";
  otroRamoSector?: string;
};

const StudentForm = ({ title, summary }: PropsForm) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handlerSubmit = async (data: any) => {
    //e.preventDefault();
    const dataToSend = formatDataForServices(data);
    console.log(
      `Handler submit function: ${JSON.stringify(dataToSend, null, 2)}`
    );
    setIsLoading(true);

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend, null, 2),
      });

      if (response.ok) {
        alert("Application submitted successfully!");
        router.push("/students/success"); // Redirect to success page
      } else {
        console.error(
          "Check Amplify Hosting compute logs, there was an error with the email recipient. Probably email recipient is not registered or verified in Amazon SES Sandbox"
        );
        alert("Failed to submit application. Please try again.");
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
            `Dejaste los siguientes campos sin llenar o marcar: ${errorList.join(
              ", "
            )}`
          );
        } else {
          alert(
            `Dejaste el siguiente campo sin llenar o marcar: ${errorList.join(
              ", "
            )}`
          );
        }
      }
    };

    return (
      <input
        type="submit"
        className="ui button"
        onClick={() => {
          searchMissingFields();
        }}
      />
    );
  };

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("es-ES", { month: "long" }); // e.g., 'Sep'
    const year = String(date.getFullYear()); // e.g., '24'
    return `${day} de ${month} de ${year}`;
  };

  const currentFormattedDate = formatDate(new Date());

  return (
    <AutoForm schema={schema} onSubmit={(data) => handlerSubmit(data)}>
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <div className={`b-form-wrapper ${isLoading ? "loading" : ""}`}>
        <div className="b-form-group b-form-group--borderless flex flex-col items-center justify-center">
          <h2 className="text-lg uppercase font-bold">{title}</h2>
          <p>{summary}</p>
        </div>
        <div className="b-form-group b-form-group--borderless b-form-group--horizontal">
          <AutoField name="lugar" className="w-80" />
          <AutoField
            name="fecha"
            value={currentFormattedDate}
            className="w-80"
          />
        </div>
        <div className="b-form-group  b-form-group--borderless">
          <AutoField name="jefeDivision" />
        </div>
        <div className="b-form-group b-form-group--borderless b-form__radio-buttons b-form__radio-buttons--horizontal">
          <div className="b-form__error-wrapper">
            <AutoField name="opcionElegida" />
            <ErrorField name="opcionElegida" />
          </div>
        </div>
        <div className="b-form-group b-form-group--horizontal">
          <AutoField name="periodoProyectado" />
          <AutoField name="numeroResidentes" />
        </div>
        <h3>Datos del(a) residente</h3>
        <div className="b-form-group b-form-group--vertical">
          <div className="b-form-group b-form-group--horizontal b-form-group--borderless">
            <div className="b-form__error-wrapper">
              <AutoField name="nombre" className="w-80" />
              <ErrorField name="nombre" />
            </div>
            <AutoField name="apellidoPaterno" />
            <AutoField name="apellidoMaterno" />
          </div>
          <div className="b-form-group b-form-group--horizontal b-form-group--borderless">
            <AutoField name="carrera" />
            <AutoField name="numeroControl" className="w-1/6" />
          </div>
          <hr />
          <h4 className="text-center uppercase">Domicilio</h4>
          <div className="b-form-group b-form-group--horizontal b-form-group--borderless">
            <AutoField name="domicilioCalle" label="Calle" className="w-full" />
          </div>
          <div className="b-form-group b-form-group--horizontal b-form-group--borderless">
            <AutoField name="domicilioNumeroExterior" />
            <AutoField name="domicilioNumeroInterior" />
          </div>
          <div className="b-form-group b-form-group--horizontal b-form-group--borderless">
            <AutoField name="domicilioColonia" />
            <AutoField name="domicilioCP" />
            <AutoField name="ciudad" />
          </div>
          <hr />
          <div className="b-form-group b-form-group--horizontal b-form-group--borderless">
            <AutoField name="telefonoOcelular" label="Teléfono o celular" />
            <div className="b-form__error-wrapper">
              <AutoField name="email" />
              <ErrorField name="email" />
            </div>
          </div>
        </div>
        <h3>Datos de la empresa</h3>
        <div className="b-form-group">
          <AutoField name="nombreEmpresa" />
          <div className="b-form-group b-form-group--borderless b-form__radio-buttons b-form__radio-buttons--horizontal">
            <div className="b-form__error-wrapper">
              <RadioField
                name="giroRamoSector"
                options={[
                  { label: "Industrial", value: "Industrial" },
                  { label: "Servicios", value: "Servicios" },
                  { label: "Público", value: "Público" },
                  { label: "Privado", value: "Privado" },
                  { label: "Otro", value: "Otro" },
                ]}
              />
              <ErrorField name="giroRamoSector" />
            </div>
            <DisplayIf<FormData>
              condition={(context) => context.model.giroRamoSector === "Otro"}
            >
              <TextField name="otroRamoSector" />
            </DisplayIf>
          </div>
          <hr />
          <h4 className="text-center uppercase">Domicilio</h4>
          <div className="b-form-group b-form-group--horizontal b-form-group--borderless">
            <AutoField name="calleEmpresa" className="w-full" />
          </div>
          <div className="b-form-group b-form-group--horizontal b-form-group--borderless">
            <AutoField name="numeroExteriorEmpresa" />
            <AutoField name="numeroInteriorEmpresa" />
          </div>
          <div className="b-form-group b-form-group--horizontal b-form-group--borderless">
            <AutoField name="coloniaEmpresa" />
            <AutoField name="cpEmpresa" />
            <AutoField name="ciudadEmpresa" />
            <AutoField name="telefonoEmpresa" />
          </div>
          <hr />
          <div className="b-form-group b-form-group--horizontal b-form-group--borderless">
            <AutoField name="nombreTitularEmpresa" className="w-1/2" />
            <AutoField name="puestoTitularEmpresa" className="w-1/3" />
          </div>
          <div className="b-form-group b-form-group--horizontal b-form-group--borderless">
            <AutoField
              name="nombrePersonaAQuienVaPresentacion"
              className="w-1/2"
            />
            <AutoField
              name="puestoPersonaAQuienVaPresentacion"
              className="w-1/3"
            />
          </div>
        </div>
        <SubmitFieldCustom />
      </div>
    </AutoForm>
  );
};

export default StudentForm;
