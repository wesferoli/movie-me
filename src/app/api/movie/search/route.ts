import { movieDBApi } from "@/lib/api";
import { errorHandler } from "@/middleware/api/errorHandler";
import { NextResponse } from "next/server";
import { IMDBMovieList, MovieList } from "../types";
import { movieDBListSchema } from "../schema";
import { posterURL } from "@/utils/constant";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    if (!query) {
      throw new Error("Search not provided.");
    }
    const movieList = await movieDBApi
      .get<IMDBMovieList>("/search/movie", {
        params: { query },
      })
      .then((resp) => resp.data);

    const filterMovies: MovieList = movieDBListSchema.parse(movieList.results);

    filterMovies.map((movie) => {
      if (movie.poster) {
        Object.assign(movie, {
          poster: `${posterURL}${movie.poster}`,
        });
      }

      return movie;
    });

    return NextResponse.json({ data: filterMovies });
  } catch (err) {
    return errorHandler(err);
  }
}
