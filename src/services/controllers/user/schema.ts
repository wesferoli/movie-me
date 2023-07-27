import { z } from "zod";

export const userReviewsListSchema = z.array(
  z.object({
    id: z.string(),
    movieId: z.number(),
    title: z.string(),
    description: z.string(),
    rating: z.number(),
    movieTitle: z.string(),
  })
);
