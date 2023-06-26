import Button, { variants } from "@/components/Button";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("<Button />", () => {
  const onClick = jest.fn();

  it("should render with primary variant styles", () => {
    render(
      <Button onClick={onClick} variant="primary">
        Children text
      </Button>
    );
    const button = screen.getByRole("button", { name: "Children text" });

    expect(button).toHaveClass(variants["primary"]);
  });

  it("should click button", async () => {
    render(
      <Button onClick={onClick} variant="primary">
        Children text
      </Button>
    );
    const button = screen.getByRole("button", { name: "Children text" });
    await userEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
