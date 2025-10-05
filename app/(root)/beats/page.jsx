import HeadingSection from "@/components/ui/common/HeadingSection";
import PublicBeatsPage from "@/components/view/PublicBeatsPage";
import React from "react";

export const metadata = {
  title: "Sample Packs | Guhanis Official",
  description: "Premium sample packs for music producers and artists",
};

const page = () => {
  return (
    <div className="min-h-screen bg-gray-950">
      <section className="container mx-auto px-6 py-16">
        <HeadingSection
          title="Sample Packs"
          description="Premium sample packs for music producers and artists"
          image="/assets/svg/sample.svg"
        />
        <PublicBeatsPage />
      </section>
    </div>
  );
};

export default page;
