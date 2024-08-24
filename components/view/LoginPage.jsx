"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
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
import { signIn, useSession } from "next-auth/react";
import { useParams, usePathname, useRouter } from "next/navigation";
import Spinner from "../ui/Spinner";
import { toast } from "sonner";
import { EyeIcon } from "lucide-react";

const FormSchema = z.object({
  email: z.string().email({ message: "Enter a valid email." }),
  password: z.string().min(5, { message: "Enter a password" }),
});
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
        callbackUrl: "http://localhost:3000/profile",
      });

      if (result.error) {
        console.error("Login failed: ", result.error);
        toast.error("Login failed: " + result.error);
      } else if (result.ok && result.status === 200) {
        toast.success("Sign-in Successfully");
        const location = localStorage?.getItem(
          "isSignupPage" || "isResetPasswordPage"
        );
        location ? router.push("/dashboard") : router.back();
      } else {
        console.error("Unexpected result: ", result);
        toast.error("Unexpected result during sign-in");
      }
    } catch (error) {
      console.error("An error occurred during login: ", error);
      toast.error("An error occurred during login: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full lg:grid lg:grid-cols-2 h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[550px] bg-background text-white border gap-6 p-10 rounded-xl">
          <div className="grid gap-2 text-center">
            <h1 className="text-5xl font-bold">Login</h1>
            <p className="text-balance text-xl text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <Form {...form}>
              <form
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
                        <div className="relative">
                          <Input
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                            className="text-primary pr-10"
                            {...field}
                          />

                          <Button
                            variant="ghost"
                            type="button"
                            size="icon"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-1/2 right-2 -translate-y-1/2 hover:bg-transparent hover:text-white"
                          >
                            {showPassword ? "Hide" : "Show"}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid gap-2">
                  <div className="flex items-center"></div>
                </div>
                <Button disabled={isLoading} type="submit" className="w-full">
                  {isLoading ? <Spinner /> : "Login"}
                </Button>
              </form>
            </Form>
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
          priority={true}
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default LoginPage;
