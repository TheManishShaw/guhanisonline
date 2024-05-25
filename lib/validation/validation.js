import { z } from "zod";

export const contactFormSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  message: z.string(),
});
