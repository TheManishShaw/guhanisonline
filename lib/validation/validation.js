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

export const blogFormSchema = z.object({
  title: z.string().min(2, { message: "Title is required" }).max(250),
  tags: z.string().min(2, { message: "At lest one tag is required" }).max(500),
  content: z.string().min(2, { message: "content is required " }).max(500),
  image: z.any(),
});

export const beatsFormSchema = z.object({
  title: z.string(),
  regular_price: z.string(),
  tags: z.string(),
  description: z.string().optional(),
  downloadable_file: z.any().optional(),
  preview_audio: z.any().optional(),
});
