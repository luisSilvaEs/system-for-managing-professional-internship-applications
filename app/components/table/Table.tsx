import { useState } from "react";
import { useRouter } from "next/navigation";
import { CleanedItem } from "@/types/student";
import { FaSortUp, FaSortDown } from "react-icons/fa"; // Import sort icons

interface TableProps {
  list: CleanedItem[];
  rowsPerPage?: number;
}

const Table = ({ list, rowsPerPage = 2 }: TableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const totalPages = Math.ceil(list.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const router = useRouter();

  const handleRowClick = (numeroControl: string, id: number) => {
    router.push(`/private/queries/studentDetail/${numeroControl}?id=${id}`);
  };

  const sortData = (data: CleanedItem[]) => {
    if (!sortColumn) return data;

    const sortedData = [...data].sort((a, b) => {
      const valueA = a[sortColumn as keyof CleanedItem]
        ?.toString()
        .toLowerCase();
      const valueB = b[sortColumn as keyof CleanedItem]
        ?.toString()
        .toLowerCase();

      if (sortDirection === "asc") {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });

    return sortedData;
  };

  const toggleSortDirection = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedData = sortData(list);
  const currentData = sortedData.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div className="container mx-auto b-table-container">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            {[
              { label: "Num. de Control", key: "numeroControl" },
              { label: "Nombre(s)", key: "nombre" },
              { label: "Apellido Paterno", key: "apellidoPaterno" },
              { label: "Apellido Materno", key: "apellidoMaterno" },
              { label: "Carrera", key: "carreraResidente" },
              { label: "Periodo", key: "periodo" },
              { label: "Telefono", key: "telefono" },
              { label: "Empresa", key: "nombreEmpresa" },
            ].map(({ label, key }) => (
              <th
                key={key}
                className="py-3 px-6 text-left cursor-pointer"
                onClick={() => toggleSortDirection(key)}
                title={`Presione aquí para ordenar por ${label}`}
              >
                <div className="flex items-center">
                  {label}
                  {sortColumn === key &&
                    (sortDirection === "asc" ? (
                      <FaSortUp className="ml-2" />
                    ) : (
                      <FaSortDown className="ml-2" />
                    ))}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {currentData.length > 0 ? (
            currentData.map((item: CleanedItem) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                onClick={() =>
                  handleRowClick(
                    item.numeroControl as string,
                    item.id as number
                  )
                }
              >
                <td className="py-3 px-6 text-left">{item.numeroControl}</td>
                <td className="py-3 px-6 text-left">{item.nombre}</td>
                <td className="py-3 px-6 text-left">{item.apellidoPaterno}</td>
                <td className="py-3 px-6 text-left">{item.apellidoMaterno}</td>
                <td className="py-3 px-6 text-left">{item.carreraResidente}</td>
                <td className="py-3 px-6 text-left">{item.periodo}</td>
                <td className="py-3 px-6 text-left">{item.telefono}</td>
                <td className="py-3 px-6 text-left">{item.nombreEmpresa}</td>
              </tr>
            ))
          ) : (
            <tr className="w-full">
              <td
                className="w-full"
                colSpan={8}
                style={{ textAlign: "center", height: "100px" }}
              >
                <div className="grid place-items-center">
                  No se encontraron solicitudes en la base de datos
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-between items-center my-4">
        <button
          aria-label="Pagina previa"
          className={`px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 ${
            currentPage === 1 && "opacity-50 cursor-not-allowed"
          }`}
          onClick={() => setCurrentPage(currentPage - 1)}
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
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Table;
