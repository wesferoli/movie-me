import { z } from "zod";

export const reviewListSchema = z.array(
  z.object({
    id: z.string(),
    movieId: z.number(),
    title: z.string(),
    description: z.string(),
    rating: z.number(),
    user: z.object({
      id: z.string(),
      name: z.string(),
      avatarUrl: z.string(),
    }),
  })
);

export const createReviewData = z.object({
  title: z.string(),
  description: z.string(),
  rating: z.string(),
  userId: z.string(),
  movieId: z.string(),
});
