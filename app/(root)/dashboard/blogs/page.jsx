import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DashboardLayout from "@/components/ui/common/DashboardLayout";
import BeatsPage from "@/components/view/BeatsPage";
import Link from "next/link";
import React from "react";

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
                className="bg-primary text-black px-5 py-3 rounded-lg"
                href="/dashboard/blogs/add"
              >
                Add Blog
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <BeatsPage />
        </CardContent>
      </Card>
    </>
  );
};

export default page;
