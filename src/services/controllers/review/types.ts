import { createReviewData, reviewListSchema, reviewSchema } from "./schema";
import { z } from "zod";

export type ReviewList = z.infer<typeof reviewListSchema>;
export type CreateReviewData = z.infer<typeof createReviewData>;

export type Review = z.infer<typeof reviewSchema>;
