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
        <CardTitle>Add Blogs</CardTitle>
        <CardDescription>Manage your blogs details.</CardDescription>
      </CardHeader>
      <CardContent>
        <BlogForm type="add" />
      </CardContent>
    </Card>
  );
};

export default page;
