import React from "react";
import Filter from "@/app/components/filter/Filter";

const QueriesPage = () => {
  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1>Buscador</h1>
      <p>
        Busca por nombre, apellidos de alumno, número de control o utilice
        alguno de los dropdowns
      </p>
      <Filter />
    </div>
  );
};

export default QueriesPage;
