import { Card } from "@/components/ui/card";
import HeadingSection from "@/components/ui/common/HeadingSection";
import BeatsPage from "@/components/view/BeatsPage";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <section className="container mx-auto px-6">
      <HeadingSection
        title="Beats"
        description="Dive into the groove: Explore our collection of beats curated to inspire and elevate your music journey"
        image="/assets/images/login/placeholder.svg"
      />
      {/* <BeatsPage /> */}
      <Card className="border-0 mx-auto">
        <Image
          src="/assets/images/login/placeholder.svg"
          className="max-h-[250px] rounded-lg h-full bg-black"
          layout="contain"
          width={"1200"}
          height={300}
          alt="logo"
        />
      </Card>
    </section>
  );
};

export default page;
