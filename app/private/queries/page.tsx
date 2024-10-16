"use client";

import React from "react";
import Filter from "@/app/components/filter/Filter";
import Header from "@/app/components/header/Header";
const QueriesPage = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto p-4 space-y-4 py-4">
        <h1>Buscador</h1>
        <p>
          Busca por nombre, apellidos de alumno, número de control o utilice
          alguno de los dropdowns
        </p>
        <Filter />
      </div>
    </>
  );
};

export default QueriesPage;
