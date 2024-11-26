import { render, screen, fireEvent } from "@testing-library/react";
import Select from "./Select";

describe("Select Component", () => {
  const mockOnSelect = jest.fn();
  const items = ["Option 1", "Option 2", "Option 3"];

  it("renders with placeholder", () => {
    render(
      <Select
        onSelect={mockOnSelect}
        items={items}
        placeholder="Select an option"
      />
    );
    const menuButton = screen.getByRole("button", {
      name: /select an option/i,
    });
    expect(menuButton).toBeInTheDocument();
  });

  it("renders menu items when clicked", () => {
    render(
      <Select
        onSelect={mockOnSelect}
        items={items}
        placeholder="Select an option"
      />
    );
    const menuButton = screen.getByRole("button", {
      name: /select an option/i,
    });

    fireEvent.click(menuButton);

    const firstItem = screen.getByRole("menuitem", { name: /option 1/i });
    const secondItem = screen.getByRole("menuitem", { name: /option 2/i });
    const thirdItem = screen.getByRole("menuitem", { name: /option 3/i });

    expect(firstItem).toBeInTheDocument();
    expect(secondItem).toBeInTheDocument();
    expect(thirdItem).toBeInTheDocument();
  });

  it("calls onSelect with correct value when an item is clicked", () => {
    render(
      <Select
        onSelect={mockOnSelect}
        items={items}
        placeholder="Select an option"
      />
    );
    const menuButton = screen.getByRole("button", {
      name: /select an option/i,
    });

    fireEvent.click(menuButton);

    const firstItem = screen.getByRole("menuitem", { name: /option 1/i });
    fireEvent.click(firstItem);

    expect(mockOnSelect).toHaveBeenCalledWith("Option 1");
  });

  it("updates selected item after selecting an option", () => {
    render(
      <Select
        onSelect={mockOnSelect}
        items={items}
        placeholder="Select an option"
      />
    );
    const menuButton = screen.getByRole("button", {
      name: /select an option/i,
    });

    fireEvent.click(menuButton);

    const secondItem = screen.getByRole("menuitem", { name: /option 2/i });
    fireEvent.click(secondItem);

    const updatedMenuButton = screen.getByRole("button", { name: /option 2/i });
    expect(updatedMenuButton).toBeInTheDocument();
  });

  it("does not render menu items when not clicked", () => {
    render(
      <Select
        onSelect={mockOnSelect}
        items={items}
        placeholder="Select an option"
      />
    );
    expect(screen.queryByRole("menuitem")).not.toBeInTheDocument();
  });
});
