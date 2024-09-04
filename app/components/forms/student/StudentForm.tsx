"use client";

import React, { Children, ReactElement, useState, FormEvent } from "react";
import {
  AutoField,
  AutoForm,
  SubmitField,
  ErrorField,
  TextField,
  RadioField,
} from "uniforms-semantic";
import { Context, UnknownObject, useForm } from "uniforms";
import { bridge as schema } from "./studentSchema";

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

const StudentForm = () => {
  /*
  const [formData, setFormData] = useState({
    opcionElegida: "",
    periodoProyectado: "",
    numeroResidentes: "",
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    carrera: "",
    numeroControl: "",
    domicilioCalle: "",
    domicilioNumeroExterior: "",
    domicilioNumeroInterior: "",
    domicilioColonia: "",
    domicilioCP: "",
    ciudad: "",
    telefonoOcelular: "",
    email: "",
    nombreEmpresa: "",
    giroRamoSector: "",
    otroRamoSector: "",
  });
  */
  const handlerSubmit = async (data: any) => {
    //e.preventDefault();
    console.log(`Handler submit function: ${JSON.stringify(data, null, 2)}`);
    const response = await fetch("/api/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data, null, 2),
    });

    if (response.ok) {
      alert("Application submitted successfully!");
      //setFormData({ name: "", email: "", message: "" }); // Reset form
      //window.location.href = "/students/success"; // Redirect to success page
    } else {
      alert("Failed to submit application. Please try again.");
    }
  };

  return (
    <AutoForm
      schema={schema}
      onSubmit={(data) => handlerSubmit(data)}
      validate="onChange"
    >
      <div className="b-form-wrapper">
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
        <div className="b-form-group b-form-group--vertical">
          <h3>Datos del(a) residente</h3>
          <div className="b-form-group b-form-group--horizontal b-form-group--borderless">
            <h4>Nombre completo:</h4>
            <div className="b-form__error-wrapper">
              <AutoField name="nombre" />
              <ErrorField name="nombre" />
            </div>
            <AutoField name="apellidoPaterno" />
            <AutoField name="apellidoMaterno" />
          </div>
          <div className="b-form-group b-form-group--horizontal b-form-group--borderless">
            <AutoField name="carrera" />
            <AutoField name="numeroControl" />
          </div>

          <div className="b-form-group b-form-group--horizontal b-form-group--borderless">
            <h4>Domicilio:</h4>
            <AutoField name="domicilioCalle" />
            <AutoField name="domicilioNumeroExterior" />
            <AutoField name="domicilioNumeroInterior" />
          </div>
          <div className="b-form-group b-form-group--horizontal b-form-group--borderless">
            <AutoField name="domicilioColonia" />
            <AutoField name="domicilioCP" />
            <AutoField name="ciudad" />
          </div>
          <div className="b-form-group b-form-group--horizontal b-form-group--borderless">
            <AutoField name="telefonoOcelular" />
            <div className="b-form__error-wrapper">
              <AutoField name="email" />
              <ErrorField name="email" />
            </div>
          </div>
        </div>
        <div className="b-form-group">
          <h3>Datos de la empresa</h3>
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
              <TextField name="otroRamoSector" placeholder="Especifique" />
            </DisplayIf>
          </div>
        </div>
        <SubmitField />
      </div>
    </AutoForm>
  );
};

export default StudentForm;
