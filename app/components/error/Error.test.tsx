import { render, screen, fireEvent } from "@testing-library/react";
import ErrorPage from "./Error";
import "@testing-library/jest-dom";

// Mock the `next/link` component to simplify testing
jest.mock("next/link", () => {
  return ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

describe("ErrorPage Component", () => {
  it("renders with default props", () => {
    render(<ErrorPage />);

    const errorCode = screen.getByText("Oops!");
    const errorMessage = screen.getByText(
      "Something went wrong. Please try again."
    );
    const returnLink = screen.getByRole("link", { name: /return to home/i });

    expect(errorCode).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
    expect(returnLink).toBeInTheDocument();
    expect(returnLink).toHaveAttribute("href", "/");
  });

  it("renders with custom error code and message", () => {
    const customCode = "500";
    const customMessage = "Internal Server Error";
    render(<ErrorPage errorCode={customCode} errorMessage={customMessage} />);

    const errorCode = screen.getByText(customCode);
    const errorMessage = screen.getByText(customMessage);

    expect(errorCode).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
  });

  it("renders the AlertCircle icon", () => {
    render(<ErrorPage />);

    const alertCircleIcon = screen.getByTestId("alert-circle-icon");
    expect(alertCircleIcon).toBeInTheDocument();
  });

  it("renders the retry button and triggers onRetry callback", () => {
    const mockRetry = jest.fn();
    render(<ErrorPage onRetry={mockRetry} />);

    const retryButton = screen.getByRole("button", { name: /try again/i });
    expect(retryButton).toBeInTheDocument();

    fireEvent.click(retryButton);
    expect(mockRetry).toHaveBeenCalledTimes(1);
  });

  it("does not render the retry button if onRetry is not provided", () => {
    render(<ErrorPage />);

    const retryButton = screen.queryByRole("button", { name: /try again/i });
    expect(retryButton).not.toBeInTheDocument();
  });

  it("links back to the home page", () => {
    render(<ErrorPage />);

    const returnLink = screen.getByRole("link", { name: /return to home/i });
    expect(returnLink).toHaveAttribute("href", "/");
  });
});
