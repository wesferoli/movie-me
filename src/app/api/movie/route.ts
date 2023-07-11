import { movieDBApi } from "@/lib/api";
import { posterURL } from "@/utils/constant";
import { NextResponse } from "next/server";
import { IMDBMovieList, MovieList } from "./types";
import { movieDBListSchema } from "./schema";
import { errorHandler } from "@/middleware/api/errorHandler";

export async function GET() {
  try {
    const popularMovies = await movieDBApi.get<IMDBMovieList>("/movie/popular");
    if (!popularMovies) {
      throw new Error("Unable to list movies.");
    }

    const filterMovies: MovieList = movieDBListSchema.parse(
      popularMovies.data.results
    );

    // Add valid poster url
    filterMovies.map((movie) => {
      if (movie.poster) {
        Object.assign(movie, {
          poster: `${posterURL}${movie.poster}`,
        });
      }

      return movie;
    });

    return NextResponse.json({ data: filterMovies });
  } catch (error) {
    return errorHandler(error);
  }
}
