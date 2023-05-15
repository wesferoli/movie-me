import { render, screen } from "@testing-library/react";
import Navbar from ".";

describe("Navbar", () => {
    it("should render the children passed", () => {
        render(
            <Navbar>
                <p>Render test</p>
            </Navbar>
        );

        const renderText = screen.getByText("Render test");

        expect(renderText).toBeInTheDocument();
    });
});
