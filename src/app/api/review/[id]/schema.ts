import { getYear } from "@/utils/getYear";
import { z } from "zod";

export const reviewSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    rating: z.number(),
    user: z.object({
      name: z.string(),
      avatarUrl: z.string(),
    }),
    movie: z.object({
      poster: z.string(),
      title: z.string(),
      releaseDate: z.string(),
      genres: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
        })
      ),
    }),
  })
  .transform((review) => {
    const {
      movie: { releaseDate, ...movieRest },
      ...rest
    } = review;

    return {
      ...rest,
      movie: {
        ...movieRest,
        releaseYear: getYear(releaseDate),
      },
    };
  });
