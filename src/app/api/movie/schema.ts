import { z } from "zod";
import { DateTime } from "luxon";

export const movieDBListSchema = z.array(
  z
    .object({
      id: z.number(),
      title: z.string(),
      release_date: z.string(),
      poster_path: z.string(),
    })
    .transform((movie) => {
      const { poster_path, release_date, ...rest } = movie;

      return {
        ...rest,
        releaseYear: DateTime.fromISO(release_date).year.toString(),
        poster: poster_path,
      };
    })
);
