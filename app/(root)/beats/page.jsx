import { PinContainer } from "@/components/ui/3d-pin";
import HeadingSection from "@/components/ui/common/HeadingSection";
import BeatsPage from "@/components/view/BeatsPage";
import React from "react";
import { FaLocationArrow } from "react-icons/fa6";
export const metadata = {
  title: "Beats | Guhanis Official",
  description: "Artist | Music Producer",
};

const page = () => {
  return (
    <section className="container mx-auto px-6">
      <HeadingSection
        title="Beats"
        description="Dive into the groove: Explore our collection of beats curated to inspire and elevate your music journey"
        image="/assets/images/login/placeholder.svg"
      />
      <BeatsPage />
    </section>
  );
};

export default page;
