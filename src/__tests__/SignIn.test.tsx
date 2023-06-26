import SignIn from "@/components/User/SignIn";
import { render, screen } from "@testing-library/react";

describe("<SignIn />", () => {
  it("should render component", () => {
    render(<SignIn />);

    const signinButton = screen.getByRole("button");
    const signinText = screen.getByText("Sign in");

    expect(signinButton).toBeInTheDocument();
    expect(signinText).toBeInTheDocument();
  });
});
