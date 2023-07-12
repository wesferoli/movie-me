import { movieDBApi } from "@/lib/api";
import { NextResponse } from "next/server";
import { IMDBMovieList, MovieList } from "./types";
import { movieDBListSchema } from "./schema";
import { errorHandler } from "@/middleware/api/errorHandler";
import { getPlaceholderImage } from "@/utils/transformImage";

export async function GET() {
  try {
    const popularMovies = await movieDBApi.get<IMDBMovieList>("/movie/popular");
    if (!popularMovies) {
      throw new Error("Unable to list movies.");
    }

    const filterMovies: MovieList = movieDBListSchema.parse(
      popularMovies.data.results
    );

    // Add valid poster url and blur data
    await Promise.all(
      filterMovies.map(async (movie) => {
        const poster = await getPlaceholderImage(movie.poster);

        Object.assign(movie, {
          poster,
        });
      })
    ).then((value) => value);

    return NextResponse.json({ data: filterMovies });
  } catch (error) {
    return errorHandler(error);
  }
}
