import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";

const mockHandleLogout = jest.fn();

// Mock the handleLogout function
jest.mock("@/security/logout", () => ({
  handleLogout: () => mockHandleLogout(),
}));

describe("Header Component", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("does not render header when user is not logged in", () => {
    render(<Header />);
    expect(
      screen.queryByText("Sistema de gestión de residencias")
    ).not.toBeInTheDocument();
  });

  it("renders header with user info when logged in", () => {
    localStorage.setItem(
      "userInfo",
      JSON.stringify({ name: "John", lastName: "Doe" })
    );

    render(<Header />);

    expect(
      screen.getByText("Sistema de gestión de residencias")
    ).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("shows menu items when user clicks on the menu button", () => {
    localStorage.setItem(
      "userInfo",
      JSON.stringify({ name: "John", lastName: "Doe" })
    );

    render(<Header />);

    const menuButton = screen.getByRole("button", { name: /John Doe/i });
    fireEvent.click(menuButton);

    expect(screen.getByText("Mi Cuenta")).toBeInTheDocument();
    expect(screen.getByText("Licencia")).toBeInTheDocument();
    expect(screen.getByText("Salir")).toBeInTheDocument();
  });

  it("calls handleLogout when the 'Salir' button is clicked", () => {
    localStorage.setItem(
      "userInfo",
      JSON.stringify({ name: "John", lastName: "Doe" })
    );

    render(<Header />);

    const menuButton = screen.getByRole("button", { name: /John Doe/i });
    fireEvent.click(menuButton);

    const logoutButton = screen.getByText("Salir");
    fireEvent.click(logoutButton);

    expect(mockHandleLogout).toHaveBeenCalled();
  });
});
