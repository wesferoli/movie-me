import Poster from "@/components/Poster";
import { api } from "@/lib/api";
import { use } from "react";
import { MovieList } from "./api/movie/types";

async function getMoviesList() {
  const response = await api.get<{ data: MovieList }>("/movie");
  return response.data;
}

export default function Home() {
  const { data: movieList } = use(getMoviesList());

  return (
    <main className="mx-10 my-8 flex flex-wrap justify-center gap-x-8 gap-y-6 sm:my-14 sm:gap-x-14 md:mx-24 md:gap-y-10 lg:mx-40 lg:my-20">
      {movieList.map((movie) => (
        <Poster
          posterUrl={movie.poster}
          releaseYear={movie.releaseYear}
          title={movie.title}
          movieId={movie.id}
          key={movie.id}
        />
      ))}
    </main>
  );
}
