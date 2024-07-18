"use client";
import React, { useEffect } from "react";
import SingleBlogCard from "../ui/SingleBlogCard";
import { useQuery } from "@tanstack/react-query";
import { getOpenBlogsList } from "@/lib/hooks/services/universalFetch";

const PublicBlogPage = () => {
  const {
    status,
    data: blogsList,
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["blogsList"],
    queryFn: getOpenBlogsList,
  });
  console.log("isLoading==>", isLoading, "blogsList==>", blogsList?.data);
  useEffect(() => {
    localStorage.setItem("blog", JSON.stringify(blogsList?.data));
  }, [blogsList?.data]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 mx-auto w-full">
      {blogsList?.data.map((blog, index) => (
        <SingleBlogCard {...blog} key={index} />
      ))}
    </div>
  );
};

export default PublicBlogPage;
