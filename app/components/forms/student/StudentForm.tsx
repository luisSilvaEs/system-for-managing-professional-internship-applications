"use client";

import React, { Children, ReactElement } from "react";
import {
  AutoField,
  AutoForm,
  SubmitField,
  ErrorsField,
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
  return (
    <AutoForm schema={schema} onSubmit={console.log}>
      <div className="b-form-wrapper">
        <div className="b-form-group b-form-group--borderless b-form__radio-buttons--horizontal">
          <AutoField name="opcionElegida" />
        </div>
        <div className="b-form-group b-form-group--horizontal">
          <AutoField name="periodoProyectado" />
          <AutoField name="numeroResidentes" />
        </div>
        <div className="b-form-group b-form-group--vertical">
          <h3>Datos del(a) residente</h3>
          <div className="b-form-group b-form-group--horizontal b-form-group--borderless">
            <h4>Nombre completo:</h4>
            <AutoField name="nombre" />
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
            <AutoField name="email" />
          </div>
        </div>
        <div className="b-form-group">
          <h3>Datos de la empresa</h3>
          <AutoField name="nombreEmpresa" />
          <div className="b-form-group b-form-group--borderless b-form__radio-buttons--horizontal">
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
            <DisplayIf<FormData>
              condition={(context) => context.model.giroRamoSector === "Otro"}
            >
              <TextField name="otroRamoSector" placeholder="Especifique" />
            </DisplayIf>
          </div>
        </div>
        <ErrorsField />
        <SubmitField />
      </div>
    </AutoForm>
  );
};

export default StudentForm;
