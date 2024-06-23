import AddBeatForm from "@/components/forms/AddBeatForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
export const metadata = {
  title: "Add beat | Guhanis Official",
  description: "Artist | Music Producer",
};
const page = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Add Beats</CardTitle>
          <CardDescription>Manage your beats details.</CardDescription>
        </CardHeader>
        <CardContent>
          <AddBeatForm type="add" />
        </CardContent>
      </Card>
    </>
  );
};

export default page;
