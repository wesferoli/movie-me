import { userReviewsListSchema } from "./schema";
import { z } from "zod";

export type UserReviewList = z.infer<typeof userReviewsListSchema>;
