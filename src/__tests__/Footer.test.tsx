import Footer from "@/components/Footer";
import { render, screen } from "@testing-library/react";

describe("<Footer />", () => {
  it("should render the component", () => {
    render(<Footer />);
    const githubImg = screen.getByAltText("My github");
    const linkedinImg = screen.getByAltText("My linkedin");
    const iconsCredits = screen.getByTestId("icons-credits");
    const projectGithub = screen.getByTestId("see-on-github");

    expect(githubImg).toBeInTheDocument();
    expect(linkedinImg).toBeInTheDocument();
    expect(iconsCredits).toHaveTextContent(
      "Icons created by Freepik - Flaticon"
    );
    expect(projectGithub).toHaveTextContent("See this project on Github");
  });
});
