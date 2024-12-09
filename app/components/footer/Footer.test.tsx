import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer Component", () => {
  it("renders the footer with author name", () => {
    render(<Footer />);
    expect(screen.getByText("Luis Silva")).toBeInTheDocument();
  });

  it("renders GitHub and LinkedIn links", () => {
    render(<Footer />);

    const githubLink = screen.getByRole("link", { name: /github/i });
    const linkedinLink = screen.getByRole("link", { name: /linkedin/i });

    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/luisSilvaEs"
    );
    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/luis-silva-es/"
    );
  });

  it("renders the current year", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`© ${currentYear} All rights reserved`)
    ).toBeInTheDocument();
  });

  it("renders the privacy notice link", () => {
    render(<Footer />);

    const privacyLink = screen.getByRole("link", {
      name: /aviso de privacidad/i,
    });
    expect(privacyLink).toHaveAttribute("href", "/legal-notice");
    expect(privacyLink).toHaveAttribute("target", "_blank");
  });
});
