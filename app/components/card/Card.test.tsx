import { render, screen } from "@testing-library/react";
import Card from "./Card";

describe("Card Component", () => {
  it("renders the Header text", () => {
    render(<Card header={"Header sample"} data={null} />);
    const headerElement = screen.getByText(/Header sample/i);
    expect(headerElement).toBeInTheDocument();
  });

  it("renders data", () => {
    const data = [
      {
        label: "Sample label",
        paragraph: "Paragraph sample text lorem ipsum",
      },
      { label: "Label 2", paragraph: "Paragraph 2" },
    ];
    render(<Card header="Header sample" data={data} />);

    const firstLabel = screen.getByText(/Sample label/i);
    const firstParagraph = screen.getByText(
      /Paragraph sample text lorem ipsum/i
    );
    const secondLabel = screen.getByText(/Label 2/i);
    const secondParagraph = screen.getByText(/Paragraph 2/i);

    expect(firstLabel).toBeInTheDocument();
    expect(firstParagraph).toBeInTheDocument();
    expect(secondLabel).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  it("shows loading state when data is null", () => {
    render(<Card header="Loading Card" data={null} />);
    const loadingElements = screen.getAllByTestId("loading");
    expect(loadingElements.length).toBeGreaterThan(0);
  });
});
