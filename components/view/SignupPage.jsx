"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";
import { signUp } from "@/lib/hooks/services/universalFetch";
import { setCookie } from "nookies";
import { signUpFormSchema } from "@/lib/validation/validation";
import Spinner from "../ui/Spinner";

const SignupPage = () => {
  const [isLoading, setIsLoading] = useState();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const response = await signUp(formData);

      if (response.status === 201) {
        toast.success("Signup Successfully ");
        router.push("/sign-in");
        localStorage.setItem("isSignupPage", true);
      } else {
        toast.error("Something went wrong!", error);
        console.log("Failed to register");
      }
    } catch (error) {
      toast.error(
        `${error?.response?.data?.email} ${
          error?.response?.data?.password ? error?.response?.data?.password : ""
        }` || error?.message
      );

      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full  lg:grid  lg:grid-cols-2 h-screen">
      <div className="flex  items-center justify-center py-12">
        <div className="mx-auto  grid w-[550px] bg-background backdrop-blur-lg border text-white p-10 rounded-xl gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-5xl font-bold">Sign up</h1>
            <p className="text-balance text-xl text-muted-foreground">
              Enter your details below to sign-up to create your account
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 text-primary"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@domain.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password_confirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Confirm Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid gap-2">
                <div className="flex items-center"></div>
              </div>
              <Button disabled={isLoading} type="submit" className="w-full">
                {isLoading ? <Spinner /> : " Sign up"}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-xl">
            Do you have an account?{" "}
            <Link href="/sign-in" className="underline">
              Sign-in
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/assets/images/login/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default SignupPage;
