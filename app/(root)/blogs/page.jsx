import SingleBlogCard from "@/components/ui/SingleBlogCard";
import HeadingSection from "@/components/ui/common/HeadingSection";
import React from "react";

export const metadata = {
  title: "Blog | Guhanis Official",
  description: "Artist | Music Producer",
};

const page = () => {
  return (
    <section className="container mx-auto px-6">
      <HeadingSection
        title="Blogs"
        description="Dive into the groove: Explore our collection of beats curated to inspire and elevate your music journey"
        image="/assets/images/login/placeholder.svg"
      />

      <div className="grid grid-cols-3 gap-8 mb-20 mx-auto w-full flex-wrap">
        <SingleBlogCard />
        <SingleBlogCard />
        <SingleBlogCard />
        <SingleBlogCard />
      </div>
    </section>
  );
};

export default page;
