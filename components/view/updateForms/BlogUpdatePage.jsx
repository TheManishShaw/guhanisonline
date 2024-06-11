"use client";
import BlogForm from "@/components/forms/BlogForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getBlogById } from "@/lib/hooks/services/universalFetch";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

const BlogUpdatePage = () => {
  const params = useParams();
  console.log("params", params);
  const {
    isPending,
    isError,
    data: blogByIdData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getBlogById", params],
    queryFn: () => getBlogById(params),
    enabled: params !== null,
  });
  console.log("data", blogByIdData);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Blogs</CardTitle>
        <CardDescription>Manage your blogs details.</CardDescription>
      </CardHeader>
      <CardContent>
        <BlogForm type="update" existingData={blogByIdData} />
      </CardContent>
    </Card>
  );
};

export default BlogUpdatePage;
