import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TestimonialsPage from "@/components/view/TestimonialsPage";

import React from "react";
export const metadata = {
  title: "Testimonials Management | Guhanis Official",
  description: "Manage client testimonials",
};
const page = () => {
  return (
    <Card>
      <CardHeader className="">
        <CardTitle>Testimonials Management</CardTitle>
        <CardDescription>
          Manage client testimonials and showcase their feedback.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TestimonialsPage />
      </CardContent>
    </Card>
  );
};

export default page;
