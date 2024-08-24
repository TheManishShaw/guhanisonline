import { z } from "zod";

export const contactFormSchema = z.object({
  first_name: z.string().min(3),
  last_name: z.string().min(3),
  email: z.string().email().min({ message: "Enter a valid Email" }),
  phone: z.string().min(10, { message: "Enter a valid Phone number" }),
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
  title: z.string().min(4),
  description: z.string().optional(),
  cover_image: z.string(),
  file: z.string(),
  price: z.string().min(1, { message: "Enter a price for the beat" }),
  beats: z.any().optional(),
});

export const clientFormSchema = z.object({
  name: z.string().min(4),
  design: z.string().min(4),
  testimonial: z.string().min(1, { message: "Please enter something!" }),
  photo: z.any().optional(),
});
