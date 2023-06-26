import Poster, { IPosterProps } from "@/components/Poster";
import { render, screen } from "@testing-library/react";

const poster: IPosterProps = {
  movieId: 1,
  posterUrl: "https://www.github.com/wesferoli.png",
  releaseYear: "2023",
  title: "Test movie",
};

describe("<Poster />", () => {
  it("should", () => {
    render(<Poster {...poster} />);

    const moviePoster = screen.getByAltText(poster.title);
    const movieTitle = screen.getByText(poster.title);
    const releaseYear = screen.getByText(poster.releaseYear);

    expect(moviePoster).toBeInTheDocument();
    expect(movieTitle).toBeInTheDocument();
    expect(releaseYear).toBeInTheDocument();
  });
});
