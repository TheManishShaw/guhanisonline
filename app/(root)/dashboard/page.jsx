import DashboardContent from "@/components/view/Dashbaord";
import React from "react";
export const metadata = {
  title: "Dashboard | Guhanis Official",
  description: "Artist | Music Producer",
};
const page = async () => {
  return (
    <>
      <DashboardContent />
    </>
  );
};

export default page;
