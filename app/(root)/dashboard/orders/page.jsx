import SingleBlogCard from "@/components/ui/SingleBlogCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import OrderListTable from "@/components/view/OrderListTable";
import React from "react";
export const metadata = {
  title: "Orders List | Guhanis Official",
  description: "Artist | Music Producer",
};
const page = () => {
  return (
    <Card>
      <CardHeader className="">
        <CardTitle>Orders Details</CardTitle>
        <CardDescription>
          Manage your beats and view their sales performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <OrderListTable />
      </CardContent>
    </Card>
  );
};

export default page;
