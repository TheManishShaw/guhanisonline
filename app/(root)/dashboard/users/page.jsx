import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BeatsPage from "@/components/view/BeatsPage";
import UsersPage from "@/components/view/UsersPage";

import React from "react";

const page = () => {
  return (
    <Card>
      <CardHeader className="">
        <CardTitle>User List</CardTitle>
        <CardDescription>
          Manage your beats and view their sales performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UsersPage />
      </CardContent>
    </Card>
  );
};

export default page;
