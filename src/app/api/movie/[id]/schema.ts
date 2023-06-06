import { getYear } from "@/utils/getYear";
import { z } from "zod";

export const movieDetailsSchema = z
  .object({
    id: z.number(),
    title: z.string(),
    release_date: z.string(),
    genres: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
      })
    ),
    overview: z.string(),
    credits: z.object({
      cast: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
          character: z.string(),
        })
      ),
      crew: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
        })
      ),
    }),
    poster_path: z.string(),
  })
  .transform((movieDetails) => {
    const { release_date, poster_path, credits, ...rest } = movieDetails;

    return {
      ...rest,
      releaseYear: getYear(release_date),
      poster: poster_path,
      cast: credits.cast.slice(0, 10),
      crew: credits.crew.slice(0, 5),
    };
  });
