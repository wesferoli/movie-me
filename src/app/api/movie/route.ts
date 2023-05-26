import { movieDBApi } from "@/lib/api";
import { posterURL } from "@/utils/constant";
import { NextResponse } from "next/server";
import { IPopularMDB, MovieList } from "./types";
import { movieDBListSchema } from "./schema";

export async function GET() {
  const { data: popularMovies } = await movieDBApi.get<IPopularMDB>(
    "/movie/popular"
  );
  const filterMovies: MovieList = movieDBListSchema.parse(
    popularMovies.results
  );

  // Add valid poster url
  filterMovies.map((movie) => {
    Object.assign(movie, {
      poster: `${posterURL}${movie.poster}`,
    });

    return movie;
  });

  return NextResponse.json(filterMovies);
}
