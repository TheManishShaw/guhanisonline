import AddBeatForm from "@/components/forms/AddBeatForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DashboardLayout from "@/components/ui/common/DashboardLayout";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Add Beats</CardTitle>
          <CardDescription>Manage your beats details.</CardDescription>
        </CardHeader>
        <CardContent>
          <AddBeatForm />
        </CardContent>
      </Card>
    </>
  );
};

export default page;
