import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BeatsPage from "@/components/view/PublicBeatsPage";
import React from "react";
import Link from "next/link";
import BlogsListTable from "@/components/view/BlogsListTable";

export const metadata = {
  title: "Blog List | Guhanis Official",
  description: "Artist | Music Producer",
};
const page = () => {
  return (
    <>
      <Card>
        <CardHeader className="">
          <div className="flex items-center justify-between">
            <div className="">
              <CardTitle>Blogs</CardTitle>
              <CardDescription>
                Manage your blogs and view their details.
              </CardDescription>
            </div>
            <div className=" ">
              <Link
                className="bg-primary text-2xl text-black px-5 py-3 rounded-lg"
                href="/dashboard/blogs/add"
              >
                Add Blog
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <BlogsListTable />
        </CardContent>
      </Card>
    </>
  );
};

export default page;
