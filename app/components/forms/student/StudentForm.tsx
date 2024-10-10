"use client";

import React, { Children, ReactElement, useState, useRef } from "react";
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
import { currentFormattedDate, getCustomDateRange } from "@/lib/utils";

interface PropsForm {
  title: string;
  summary?: React.ReactNode;
  instructions?: React.ReactNode;
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

const StudentForm = ({ title, summary, instructions }: PropsForm) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<any>(null);

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
        alert("Formulario enviado exitosamente!");
        router.push("/students/success"); // Redirect to success page
      } else {
        console.error(
          "Check Amplify Hosting compute logs, there was an error with the email recipient. Probably email recipient is not registered or verified in Amazon SES Sandbox"
        );
        alert(
          "Falla al intentar enviar el formulario, favor de intentar mas tarde."
        );
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
      console.log("Hello world!!", error);
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
          alert((error as any).details[0].message);
        }
      }
    };

    return (
      <input
        type="submit"
        className="ui button b-button-primary xs:w-full md:w-1/12"
        value="Enviar"
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
    <AutoForm
      schema={schema}
      onSubmit={(data) => handlerSubmit(data)}
      ref={formRef}
    >
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <div className={`b-form-wrapper ${isLoading ? "loading" : ""}`}>
        <div className="b-form-group b-form-group--borderless flex flex-col items-center justify-center">
          <h2 className="text-lg uppercase font-bold">{title}</h2>
          {summary && <p>{summary}</p>}
          {instructions && instructions}
        </div>
        <div className="b-form-group b-form-group--borderless b-form-group--horizontal">
          <AutoField name="lugar" className="w-80" />
          <AutoField
            name="fecha"
            value={currentFormattedDate(new Date())}
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
          <AutoField name="periodoProyectado" value={getCustomDateRange()} />
          <AutoField name="numeroResidentes" />
        </div>
        <h3>Datos del (a) residente</h3>
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
            <AutoField name="domicilioCalle" className="w-full" />
          </div>
          <div className="b-form-group b-form-group--horizontal b-form-group--borderless">
            <AutoField name="domicilioNumeroExterior" />
            <AutoField name="domicilioNumeroInterior" />
          </div>
          <div className="b-form-group b-form-group--horizontal b-form-group--borderless">
            <AutoField name="domicilioColonia" />
            <AutoField name="domicilioCP" />
            <ErrorField name="domicilioCP" />
            <AutoField name="ciudad" />
          </div>
          <hr />
          <div className="b-form-group b-form-group--horizontal b-form-group--borderless">
            <AutoField name="telefonoOcelular" />
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
            <ErrorField name="cpEmpresa" />
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
        <div className="sm:mt-4 md:mt-10 b-form__buttons">
          <ClearFieldsButton />
          <SubmitFieldCustom />
        </div>
      </div>
    </AutoForm>
  );
};

export default StudentForm;
