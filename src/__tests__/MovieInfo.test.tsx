import MovieInfo from "@/components/MovieDetails/MovieInfo";
import { render, screen } from "@testing-library/react";

const movieInfo = {
  cast: [
    { id: 1, name: "Actor 1", character: "Char 1" },
    { id: 2, name: "Actress 2", character: "Char 2" },
    { id: 3, name: "Actor 3", character: "Char 3" },
  ],
  crew: [
    { id: 1, name: "Crew 1" },
    { id: 2, name: "Crew 2" },
    { id: 3, name: "Crew 3" },
  ],
  title: "Movie Test",
  releaseYear: "2023",
  genres: [
    { id: 1, name: "Animation" },
    { id: 2, name: "Drama" },
    { id: 3, name: "Comedy" },
  ],
  overview: "Simple movie overview for test purposes",
};

describe("<MovieInfo />", () => {
  it("should render movie info", () => {
    render(<MovieInfo {...movieInfo} />);

    const title = screen.getByText(movieInfo.title);
    const releaseYear = screen.getByText(movieInfo.releaseYear);
    const genres = screen.getByText(
      `${movieInfo.genres[0].name}, ${movieInfo.genres[1].name}, ${movieInfo.genres[2].name}`
    );
    const overview = screen.getByText(movieInfo.overview);
    const cast = screen.getByText(
      `${movieInfo.cast[0].name}, ${movieInfo.cast[1].name}, ${movieInfo.cast[2].name}`
    );
    const crew = screen.getByText(
      `${movieInfo.crew[0].name}, ${movieInfo.crew[1].name}, ${movieInfo.crew[2].name}`
    );

    expect(title).toBeInTheDocument();
    expect(releaseYear).toBeInTheDocument();
    expect(genres).toBeInTheDocument();
    expect(overview).toBeInTheDocument();
    expect(cast).toBeInTheDocument();
    expect(crew).toBeInTheDocument();
  });
});
