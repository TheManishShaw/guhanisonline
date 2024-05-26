"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { signIn } from "@/auth";
import { login } from "@/lib/hooks/services/loginAction";

const FormSchema = z.object({
  email: z.string().email({ message: "Enter a valid email." }),
  password: z.string().min(5, { message: "Enter a password" }),
});

const loginInitialState = {
  message: "",
  errors: {
    email: "",
    password: "",
    credentials: "",
    unknown: "",
  },
};

const LoginPage = () => {
  const [formState, formAction] = useFormState(login, loginInitialState);

  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (formData) => {
    // try {
    //   const res = await signIn("Credentials", formData);
    //   console.log("res====>", res);
    //   if (res.status === 200) {
    //     setCookie(null, "token", res.data.access_token, {
    //       maxAge: res.data.expires_in,
    //       path: "/sign-in",
    //     });
    //     toast.success("Login successfully");
    //     router.push("/dashboard");
    //   }
    // } catch (error) {
    //   toast.error(error?.message);
    //   console.log(error);
    // }
  };

  return (
    <div className="w-full lg:grid   lg:grid-cols-2 h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[550px] bg-background text-white border  gap-6 p-10 rounded-xl">
          <div className="grid gap-2 text-center ">
            <h1 className="text-5xl font-bold">Login</h1>
            <p className="text-balance text-xl text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <Form {...form}>
              <form
                action={formAction}
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
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
                          className="text-primary"
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
                      <div className="flex items-center justify-evenly">
                        <FormLabel>Password</FormLabel>
                        <Link
                          href="/forgot-password"
                          className="ml-auto inline-block text-md underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input
                          placeholder="Password"
                          type="password"
                          className="text-primary"
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
                <Button
                  // disabled={postMutation.status === "pending"}
                  type="submit"
                  className="w-full"
                >
                  login
                  {/* {postMutation.status === "pending" ? <Spinner /> : "Login"} */}
                </Button>
              </form>
            </Form>

            {/* <Button variant="outline" className="w-full">
              Login with Google
            </Button> */}
          </div>
          <div className="mt-4 text-center text-xl">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline">
              Sign up
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

export default LoginPage;
