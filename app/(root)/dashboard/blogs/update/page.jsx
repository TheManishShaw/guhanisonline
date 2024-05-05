import BlogForm from "@/components/forms/BlogForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const page = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Beats</CardTitle>
        <CardDescription>Manage your beats details.</CardDescription>
      </CardHeader>
      <CardContent>
        <BlogForm />
      </CardContent>
    </Card>
  );
};

export default page;
