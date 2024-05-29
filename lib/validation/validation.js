import { z } from "zod";

export const contactFormSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  message: z.string(),
});

export const signUpFormSchema = z
  .object({
    first_name: z.string().min(2).max(50),
    last_name: z.string().min(2).max(50),
    name: z.string().min(2).max(50),
    email: z.string().email({ message: "Enter a valid email." }),
    password: z.string().min(5, { message: "Enter a password" }),
    password_confirmation: z
      .string()
      .min(5, { message: "Password is not match" }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords must match",
    path: ["password_confirmation"], // this will show the error at the field
  });
