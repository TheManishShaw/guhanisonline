"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
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
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { forgotPassword } from "@/lib/hooks/services/universalFetch";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const FormSchema = z.object({
  email: z.string().email({ message: "Enter a valid email." }),
});
const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await forgotPassword(data);
      if (res.status === 200) {
        toast.success(res?.data?.message || "OTP sent to your email");
        localStorage.setItem("email", data?.email);
        router.push("/reset-password");
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full lg:grid  lg:grid-cols-2 h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid  w-[550px] bg-background border text-white  gap-6 p-10 rounded-xl ">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Reset your password</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email address and we will send you a OTP to reset your
              password.
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
                <Button type="submit" disabled={isLoading} className="w-full">
                  Send otp
                </Button>
              </form>
            </Form>
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

export default ForgotPassword;
