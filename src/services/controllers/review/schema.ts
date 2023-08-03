import { z } from "zod";
import { getYear } from "@/utils/getYear";
import DOMPurify from "isomorphic-dompurify";

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

export const createReviewData = z
  .object({
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
  })
  .transform((review) => {
    const cleanDescription = DOMPurify.sanitize(review.description);

    return { ...review, description: cleanDescription };
  });

export const reviewSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    rating: z.number(),
    user: z.object({
      id: z.string().uuid(),
      name: z.string(),
      avatarUrl: z.string(),
    }),
    movie: z.object({
      poster: z.object({
        src: z.string().nullable(),
        base64: z.string(),
      }),
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
