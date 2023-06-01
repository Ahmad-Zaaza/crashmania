import { z } from "zod";

export const onboardingFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  bots: z
    .number()
    .min(1)
    .max(5, { message: "Only 5 maximum bots are allowed" }),
});
