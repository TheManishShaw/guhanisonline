"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  forgotPassword,
  resetPassword,
} from "@/lib/hooks/services/universalFetch";
import { toast } from "sonner";

const FormSchema = z
  .object({
    email: z.string(),
    otp: z.string().length(6),
    password: z.string().min(5, { message: "Enter a password" }),
    password_confirmation: z
      .string()
      .min(5, { message: "Password is not match" }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords must match",
    path: ["password_confirmation"], // this will show the error at the field
  });

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resendOtpTime, setResendOtpTime] = useState(120);
  const [isResendBtnLoading, setIsResendBtnLoading] = useState(false);
  const [show, hide] = useState(false);
  const router = useRouter();

  if (typeof window !== "undefined") {
    const email = localStorage.getItem("email");
  }
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: email,
      otp: "",
      password: "",
      password_confirmation: "",
    },
  });

  useEffect(() => {
    let timer;
    if (resendOtpTime > 0) {
      timer = setInterval(() => {
        setResendOtpTime((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendOtpTime]);

  const handleResendOtp = async (data) => {
    setIsResendBtnLoading(true);
    try {
      console.log("inside try");
      const res = await forgotPassword({ email: data });
      if (res.status === 200) {
        toast.success(res?.data?.message || "OTP sent to your email");
        setResendOtpTime(120); // Set timer to 2 minutes
      }
    } catch (error) {
      setIsResendBtnLoading(false);
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    setIsLoading(true);
    try {
      const res = await resetPassword(data);
      if (res.status === 200) {
        toast.success(res?.data?.message || "password reset successfully");
        localStorage.removeItem("email");
        router.push("/sign-in");
      }
      console.log("res", res);
    } catch (error) {
      toast.error(error);
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
              Enter your one-time password (OTP) that you received on your email
              to reset your password.
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
                          value={email}
                          disabled
                          placeholder="example@domain.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="otp"
                    className="w-full"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter One-Time Password</FormLabel>
                        <FormControl>
                          <InputOTP
                            maxLength={6}
                            {...field}
                            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                          >
                            <InputOTPGroup>
                              <InputOTPSlot className=" text-2xl" index={0} />
                              <InputOTPSlot className=" text-2xl" index={1} />
                              <InputOTPSlot className=" text-2xl" index={2} />
                              <InputOTPSlot className=" text-2xl" index={3} />
                              <InputOTPSlot className=" text-2xl" index={4} />
                              <InputOTPSlot className=" text-2xl" index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    className="mt-8 text-black"
                    variant="outline"
                    disabled={isResendBtnLoading || resendOtpTime > 0}
                    size="sm"
                    type="button"
                    onClick={() => handleResendOtp(email)}
                  >
                    {resendOtpTime > 0
                      ? `Resend OTP in ${resendOtpTime}s`
                      : "Resend OTP"}
                  </Button>
                </div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>

                      <FormControl>
                        <div className="flex items-center border rounded-md focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2">
                          <Input
                            placeholder="Password"
                            className="border-0 focus:ring-0 focus:outline-none focus-visible:ring-0 focus:border-0 focus-visible:ring-offset-0"
                            type={show ? "text" : "password"}
                            {...field}
                          />
                          <span
                            onClick={() => hide(!show)}
                            className="px-2 text-xl cursor-pointer"
                          >
                            {!show ? "Show" : "Hide"}
                          </span>
                        </div>
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
                          type={show ? "text" : "password"}
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
                  Reset password
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

export default ResetPassword;
