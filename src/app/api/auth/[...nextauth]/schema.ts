import { z } from "zod";

export const signInSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  image: z.string().url().nullish(),
  name: z.string().nullish(),
});
