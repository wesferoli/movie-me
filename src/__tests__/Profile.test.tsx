import Profile from "@/components/User/Profile";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("<Profile />", () => {
  it("should open user options", async () => {
    render(<Profile avatarUrl="https://www.github.com/wesferoli.png" />);

    const userImage = screen.getByRole("button", { name: "User avatar" });
    userEvent.click(userImage);
    const optionsList = await waitFor(() => screen.getAllByRole("listitem"));

    expect(optionsList).toHaveLength(2);
  });
});
