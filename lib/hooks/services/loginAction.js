"use server";
import { signIn } from "@/auth";

export const loginAction = async (formData) => {
  console.log("formData", formData);
  await signIn("credentials", {
    email: formData.email,
    password: formData.password,
    redirectTo: "/dashboard",
  });
};
