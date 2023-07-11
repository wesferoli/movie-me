import { movieDBApi } from "@/lib/api";
import { posterURL } from "@/utils/constant";
import { NextResponse } from "next/server";
import { IMDBMovieList, MovieList } from "./types";
import { movieDBListSchema } from "./schema";
import { errorHandler } from "@/middleware/api/errorHandler";
import { getPlaiceholder } from "plaiceholder";
import axios from "axios";

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
        if (movie.poster.src) {
          const response = await axios.get(`${posterURL}${movie.poster.src}`, {
            responseType: "arraybuffer",
          });

          const buffer = Buffer.from(response.data, "utf-8");
          const { base64 } = await getPlaiceholder(buffer);

          Object.assign(movie, {
            poster: {
              src: `${posterURL}${movie.poster.src}`,
              base64: base64,
            },
          });

          return movie;
        }
      })
    ).then((value) => value);

    return NextResponse.json({ data: filterMovies });
  } catch (error) {
    return errorHandler(error);
  }
}
