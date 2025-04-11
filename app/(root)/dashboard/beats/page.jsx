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
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-semibold">Beats</CardTitle>
              <CardDescription className="text-base">
                Manage your beats and view their sales performance.
              </CardDescription>
            </div>
            <div>
              <Link
                className="bg-primary text-black px-5 py-2.5 text-base font-medium rounded-lg hover:bg-primary/90 transition-colors"
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
