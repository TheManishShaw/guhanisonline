import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BeatsPage from "@/components/view/BeatsPage";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <Card>
      <CardHeader className="">
        <CardTitle>Orders Details</CardTitle>
        <CardDescription>
          Manage your beats and view their sales performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <BeatsPage />
      </CardContent>
    </Card>
  );
};

export default page;
