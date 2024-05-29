import AccountSettingForm from "@/components/forms/AccountSettingForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Profile Setting</CardTitle>
        </CardHeader>
        <CardContent>
          <AccountSettingForm />
        </CardContent>
      </Card>
    </>
  );
};

export default page;
