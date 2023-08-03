import { createReviewData, reviewListSchema, reviewSchema } from "./schema";
import { z } from "zod";

export type ReviewList = z.infer<typeof reviewListSchema>;
export type CreateReviewData = z.infer<typeof createReviewData>;
export interface EditReviewData extends CreateReviewData {
  id: string;
}

export type Review = z.infer<typeof reviewSchema>;
