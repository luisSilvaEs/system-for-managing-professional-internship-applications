import { render, screen } from "@testing-library/react";
import Card from "./Card";

describe("Card Component", () => {
  it("renders the Header text", () => {
    render(<Card header={"Header sample"} data={null} />);
    const headerElement = screen.getByText(/Header sample/i);
    expect(headerElement).toBeInTheDocument();
  });
});
