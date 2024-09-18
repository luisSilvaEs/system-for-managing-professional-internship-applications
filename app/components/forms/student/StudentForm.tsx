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
        <div className="b-form-group b-form-group--horizontal b-form-group--borderless">
          <AutoField name="lugar" placeholder="Huauchinango, Puebla" />
          <AutoField name="fecha" value={currentFormattedDate} />
        </div>
        <div className="b-form-group b-form-group--horizontal b-form-group--borderless items-center">
          <p>
            <span>C. Leonel Silva González</span>
            <span>División de Estudios Profesionales</span>
          </p>
          <span>AT´N:C.</span>
          <AutoField name="jefeDivision" />
        </div>
        <div className="b-form-group b-form-group--borderless b-form__radio-buttons b-form__radio-buttons--horizontal">
          <div className="b-form__error-wrapper">
            <AutoField name="opcionElegida" label="Opción elegida:" />
            <ErrorField name="opcionElegida" />
          </div>
        </div>
        <div className="b-form-group b-form-group--horizontal">
          <AutoField
            name="periodoProyectado"
            label="Periodo proyectado para la realicación del proyecto"
          />
          <AutoField name="numeroResidentes" />
        </div>
        <h3>Datos del(a) residente</h3>
        <div className="b-form-group b-form-group--vertical">
          <div className="b-form-group b-form-group--horizontal b-form-group--borderless">
            <div className="b-form__error-wrapper">
              <AutoField name="nombre" label="Nombre(s)" />
              <ErrorField name="nombre" />
            </div>
            <AutoField name="apellidoPaterno" />
            <AutoField name="apellidoMaterno" />
          </div>
          <div className="b-form-group b-form-group--horizontal b-form-group--borderless">
            <AutoField name="carrera" />
            <AutoField name="numeroControl" />
          </div>
          <hr />
          <h4 className="text-center uppercase">Domicilio</h4>
          <div className="b-form-group b-form-group--horizontal b-form-group--borderless">
            <AutoField name="domicilioCalle" label="Calle" className="w-full" />
          </div>
          <div className="b-form-group b-form-group--horizontal b-form-group--borderless">
            <AutoField name="domicilioNumeroExterior" label="Num. exterior" />
            <AutoField
              name="domicilioNumeroInterior"
              label="Num. interior (opcional)"
            />
          </div>
          <div className="b-form-group b-form-group--horizontal b-form-group--borderless">
            <AutoField
              name="domicilioColonia"
              label="Colonia o Fraccionamiento"
            />
            <AutoField name="domicilioCP" label="C.P." />
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
                label="Giro, ramo o sector:"
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
              <TextField name="otroRamoSector" placeholder="Especifique" />
            </DisplayIf>
          </div>
          <hr />
          <h4 className="text-center uppercase">Domicilio</h4>
          <div className="b-form-group b-form-group--horizontal b-form-group--borderless">
            <AutoField name="calleEmpresa" label="Calle" />
            <AutoField name="numeroExteriorEmpresa" label="Num. exterior" />
            <AutoField
              name="numeroInteriorEmpresa"
              label="Num. interior (Opcional)"
            />
          </div>
          <div className="b-form-group b-form-group--horizontal b-form-group--borderless">
            <AutoField name="coloniaEmpresa" label="Colonia" />
            <AutoField name="cpEmpresa" label="C.P." />
            <AutoField name="ciudadEmpresa" label="Ciudad" />
            <AutoField name="telefonoEmpresa" label="Teléfono" />
          </div>
          <hr />
          <div className="b-form-group b-form-group--horizontal b-form-group--borderless">
            <AutoField
              name="nombreTitularEmpresa"
              label="Nombre del (a) titular de la empresa "
            />
            <AutoField name="puestoTitularEmpresa" label="Puesto" />
          </div>
          <div className="b-form-group b-form-group--horizontal b-form-group--borderless">
            <AutoField
              name="nombrePersonaAQuienVaPresentacion"
              label="Nombre de (la) persona a quien va dirigida la carta de presentación"
            />
            <AutoField
              name="puestoPersonaAQuienVaPresentacion"
              label="Puesto"
            />
          </div>
        </div>
        <SubmitFieldCustom />
      </div>
    </AutoForm>
  );
};

export default StudentForm;
