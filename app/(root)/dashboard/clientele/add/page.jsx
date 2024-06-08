import ClienteleForm from "@/components/forms/ClienteleForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
export const metadata = {
  title: "Add Clientele | Guhanis Official",
  description: "Artist | Music Producer",
};
const page = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Clients</CardTitle>
        <CardDescription>Manage your clients details.</CardDescription>
      </CardHeader>
      <CardContent>
        <ClienteleForm type="add" />
      </CardContent>
    </Card>
  );
};

export default page;
