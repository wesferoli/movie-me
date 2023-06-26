import { createReviewData, reviewListSchema } from "./schema";
import { z } from "zod";

export type ReviewList = z.infer<typeof reviewListSchema>;

export type CreateReviewData = z.infer<typeof createReviewData>;
