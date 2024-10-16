"use client"; // Ensure the component is client-side

import { useRouter } from "next/navigation"; // Directly import useRouter
import { useState } from "react";
import { CleanedItem } from "@/types/student";

interface TableProps {
  list: CleanedItem[];
  rowsPerPage?: number;
}

const Table = ({ list, rowsPerPage = 2 }: TableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(list.length / rowsPerPage);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = list.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const router = useRouter();
  const handleRowClick = (numeroControl: string, id: number) => {
    router.push(`/private/queries/studentDetail/${numeroControl}?id=${id}`); // Navigate to the dynamic page
  };

  return (
    <div className="container mx-auto b-table-container">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Num. de Control</th>
            <th className="py-3 px-6 text-left">Nombre(s)</th>
            <th className="py-3 px-6 text-left">Apellido Paterno</th>
            <th className="py-3 px-6 text-left">Apellido Materno</th>
            <th className="py-3 px-6 text-left">Carrera</th>
            <th className="py-3 px-6 text-left">Periodo</th>
            <th className="py-3 px-6 text-left">Telefono</th>
            <th className="py-3 px-6 text-left">Empresa</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {currentData.map((item: CleanedItem) => (
            <tr
              key={item.id}
              className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
              onClick={() =>
                handleRowClick(item.numeroControl as string, item.id as number)
              }
            >
              <td className="border-b border-gray-200 hover:bg-gray-100">
                {item.numeroControl}
              </td>
              <td className="py-3 px-6 text-left">{item.nombre}</td>
              <td className="py-3 px-6 text-left">{item.apellidoPaterno}</td>
              <td className="py-3 px-6 text-left">{item.apellidoMaterno}</td>
              <td className="py-3 px-6 text-left">{item.carreraResidente}</td>
              <td className="py-3 px-6 text-left">{item.periodo}</td>
              <td className="py-3 px-6 text-left">{item.telefono}</td>
              <td className="py-3 px-6 text-left">{item.nombreEmpresa}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center my-4">
        <button
          aria-label="Pagina previa"
          className={`px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 ${
            currentPage === 1 && "opacity-50 cursor-not-allowed"
          }`}
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Pag. previa
        </button>
        <div>
          Página {currentPage} de {totalPages}
        </div>
        <button
          aria-label="Siguiente pagina"
          className={`px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 ${
            currentPage === totalPages && "opacity-50 cursor-not-allowed"
          }`}
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Table;
