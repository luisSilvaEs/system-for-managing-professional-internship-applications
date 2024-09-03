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
          <AutoField name="nombre" />
          <AutoField name="email" />
        </div>
        <ErrorsField />
        <SubmitField />
      </div>
    </AutoForm>
  );
};

export default StudentForm;
