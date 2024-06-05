import HeadingSection from "@/components/ui/common/HeadingSection";
import PublicBeatsPage from "@/components/view/PublicBeatsPage";
import React from "react";

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
      <PublicBeatsPage />
    </section>
  );
};

export default page;
