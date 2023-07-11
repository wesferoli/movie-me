import { z } from "zod";
import { getYear } from "@/utils/getYear";

export const movieDBListSchema = z.array(
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
