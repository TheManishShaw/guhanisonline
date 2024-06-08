import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ClienteleListTable from "@/components/view/ClienteleListTable";
import Link from "next/link";
import React from "react";
export const metadata = {
  title: "Clientele List | Guhanis Official",
  description: "Artist | Music Producer",
};
const page = () => {
  return (
    <Card>
      <CardHeader className="">
        <div className="flex items-center justify-between">
          <div className="">
            <CardTitle>Clientele</CardTitle>
            <CardDescription>
              Manage your clientele and view their details.
            </CardDescription>
          </div>
          <div className=" ">
            <Link
              className="bg-primary text-2xl text-black px-5 py-3 rounded-lg"
              href="/dashboard/clientele/add"
            >
              Add Client
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ClienteleListTable />
      </CardContent>
    </Card>
  );
};

export default page;
