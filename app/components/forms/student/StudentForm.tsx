"use client";

import React from "react";
import { AutoForm } from "uniforms-semantic";
import { bridge as schema } from "./studentSchema";

const StudentForm = () => {
  return <AutoForm schema={schema} onSubmit={console.log} />;
};

export default StudentForm;
