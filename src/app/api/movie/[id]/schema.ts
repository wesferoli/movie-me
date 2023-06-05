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
  .transform((movie) => {
    return movie;
  });
