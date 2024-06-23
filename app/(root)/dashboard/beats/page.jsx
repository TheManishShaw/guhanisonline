import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BeatsListTable from "@/components/view/BeatsListTable";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Beats | Guhanis Official",
  description: "Artist | Music Producer",
};

const page = () => {
  return (
    <>
      <Card>
        <CardHeader className="">
          <div className="flex items-center justify-between">
            <div className="">
              <CardTitle>Beats</CardTitle>
              <CardDescription>
                Manage your beats and view their sales performance.
              </CardDescription>
            </div>
            <div className=" ">
              <Link
                className="bg-primary text-black px-5 py-3 text-xl rounded-lg"
                href="/dashboard/beats/add"
              >
                Add Beats
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <BeatsListTable />
        </CardContent>
      </Card>
    </>
  );
};

export default page;
