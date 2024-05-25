"use client";
import DashboardLayout from "@/components/ui/common/DashboardLayout";
import Footer from "@/components/ui/common/Footer";
import Navbar from "@/components/ui/common/Navbar";
import { usePathname } from "next/navigation";
import React from "react";

export default function RootLayout({ children }) {
  const path = usePathname();

  return (
    <main className=" h-full w-full">
      {path.startsWith("/dashboard") ? (
        <DashboardLayout>{children}</DashboardLayout>
      ) : (
        <>
          <Navbar />
          {children}
          <Footer />
        </>
      )}
    </main>
  );
}
