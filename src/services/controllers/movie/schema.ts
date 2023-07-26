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
    poster_path: z.string().nullable(),
  })
  .transform((movieDetails) => {
    const { release_date, poster_path, credits, ...rest } = movieDetails;

    return {
      ...rest,
      releaseYear: getYear(release_date),
      poster: { src: poster_path, base64: "" },
      cast: credits.cast.slice(0, 10),
      crew: credits.crew.slice(0, 5),
    };
  });

export const movieListSchema = z.array(
  z
    .object({
      id: z.number(),
      title: z.string(),
      release_date: z.string(),
      poster_path: z.string().nullable(),
    })
    .transform((movie) => {
      const { poster_path, release_date, ...rest } = movie;

      return {
        ...rest,
        releaseYear: getYear(release_date),
        poster: { src: poster_path, base64: "" },
      };
    })
);
