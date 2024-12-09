import { render, screen, fireEvent } from "@testing-library/react";
import Table from "./Table";
import { useRouter } from "next/navigation";

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();
(useRouter as jest.Mock).mockReturnValue({ push: mockPush });

describe("Table Component", () => {
  const mockList = [
    {
      id: 1,
      numeroControl: "12345",
      nombre: "John",
      apellidoPaterno: "Doe",
      apellidoMaterno: "Smith",
      carreraResidente: "Engineering",
      periodo: "2023-1",
      telefono: "1234567890",
      nombreEmpresa: "ABC Corp",
    },
    {
      id: 2,
      numeroControl: "67890",
      nombre: "Jane",
      apellidoPaterno: "Brown",
      apellidoMaterno: "Davis",
      carreraResidente: "Business",
      periodo: "2023-2",
      telefono: "0987654321",
      nombreEmpresa: "XYZ Ltd",
    },
  ];

  it("renders the table with data", () => {
    render(<Table list={mockList} />);

    expect(screen.getByText("12345")).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
    expect(screen.getByText("ABC Corp")).toBeInTheDocument();
  });

  it("displays a message when no data is available", () => {
    render(<Table list={[]} />);

    const noDataMessage = screen.getByText(
      /No se encontraron solicitudes en la base de datos/i
    );
    expect(noDataMessage).toBeInTheDocument();
  });

  it("navigates to the correct route on row click", () => {
    render(<Table list={mockList} />);

    const firstRow = screen.getByText("12345");
    fireEvent.click(firstRow);

    expect(mockPush).toHaveBeenCalledWith(
      "/private/queries/studentDetail/12345?id=1"
    );
  });

  it("toggles sorting when a column header is clicked", () => {
    render(<Table list={mockList} />);

    const columnHeader = screen.getByText("Num. de Control");
    fireEvent.click(columnHeader);

    const firstRowAfterSort = screen.getAllByText("67890");
    expect(firstRowAfterSort[0]).toBeInTheDocument();
  });

  it("disables the previous button on the first page", () => {
    render(<Table list={mockList} rowsPerPage={1} />);

    const prevButton = screen.getByLabelText("Pagina previa");
    expect(prevButton).toBeDisabled();
  });

  it("disables the next button on the last page", () => {
    render(<Table list={mockList} rowsPerPage={1} />);

    const nextButton = screen.getByLabelText("Siguiente pagina");
    fireEvent.click(nextButton); // Move to the second page
    const nextButtonAfterClick = screen.getByLabelText("Siguiente pagina");
    expect(nextButtonAfterClick).toBeDisabled();
  });

  it("renders the pagination controls correctly", () => {
    render(<Table list={mockList} rowsPerPage={1} />);

    const pageInfo = screen.getByText(/Página 1 de 2/i);
    expect(pageInfo).toBeInTheDocument();
  });
});
