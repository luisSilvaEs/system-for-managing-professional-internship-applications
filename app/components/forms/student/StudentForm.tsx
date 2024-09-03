"use client";

import React from "react";
import {
  AutoField,
  AutoForm,
  SubmitField,
  ErrorsField,
} from "uniforms-semantic";
import { bridge as schema } from "./studentSchema";

const StudentForm = () => {
  return (
    <AutoForm schema={schema} onSubmit={console.log}>
      <div className="b-form-wrapper">
        <div className="b-form-group b-form-group--horizontal">
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
          <AutoField name="giroRamoSector" />
        </div>
        <ErrorsField />
        <SubmitField />
      </div>
    </AutoForm>
  );
};

export default StudentForm;
