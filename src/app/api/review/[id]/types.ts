import { z } from "zod";
import { reviewSchema } from "./schema";

export type Review = z.infer<typeof reviewSchema>;
