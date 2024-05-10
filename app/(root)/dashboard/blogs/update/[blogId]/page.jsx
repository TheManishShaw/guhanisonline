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
        <CardTitle>Update Blogs</CardTitle>
        <CardDescription>Manage your blogs details.</CardDescription>
      </CardHeader>
      <CardContent>
        <BlogForm type="update" />
      </CardContent>
    </Card>
  );
};

export default page;
