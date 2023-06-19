import { render, screen } from "@testing-library/react";
import Navbar from "../components/Navbar";
import { resolveComponent } from "@/__tests__/utils/async-component";
import { session } from "@/__mocks__/session";

describe("<Navbar />", () => {
  it("should render", async () => {
    const ResolvedNavbar = await resolveComponent(Navbar, { session: null });
    render(<ResolvedNavbar />);

    const logoText = screen.getByText("MovieMe");
    const searchInput = screen.getByPlaceholderText(
      "Find by title or category"
    );
    const signinButton = screen.getByRole("button", { name: "Sign in" });

    expect(logoText).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(signinButton).toBeInTheDocument();
  });

  it("should render with session", async () => {
    const ResolvedNavbar = await resolveComponent(Navbar, { session });
    render(<ResolvedNavbar />);

    const userImage = screen.getByRole("img", { name: "User avatar" });
    expect(userImage).toBeInTheDocument();
  });
});
