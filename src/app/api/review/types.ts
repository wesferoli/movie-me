import { reviewListSchema } from "./schema";
import { z } from "zod";

export type ReviewList = z.infer<typeof reviewListSchema>;
