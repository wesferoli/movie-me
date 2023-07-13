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
  title: z
    .string({
      errorMap: () => ({ message: "Field required" }),
    })
    .min(1, "Field required"),
  description: z
    .string({
      errorMap: () => ({ message: "Field required" }),
    })
    .min(1, "Field required"),
  rating: z
    .string({ errorMap: () => ({ message: "Field required" }) })
    .min(1, "Field required"),
  userId: z
    .string({
      errorMap: () => ({ message: "Field required" }),
    })
    .min(1, "Field required"),
  movieId: z
    .number({
      errorMap: () => ({ message: "Field required" }),
    })
    .min(1, "Field required"),
});
