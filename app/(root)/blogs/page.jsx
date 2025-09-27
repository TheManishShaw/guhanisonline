import HeadingSection from "@/components/ui/common/HeadingSection";
import PublicBlogPage from "@/components/view/PublicBlogPage";
import React from "react";

export const metadata = {
  title: "Blog | Guhanis Official",
  description: "Artist | Music Producer",
};

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-950">
      <section className="container mx-auto px-6 py-16">
        <HeadingSection
          title="Blogs"
          description="Dive into the groove: Explore our collection of songs curated to inspire and elevate your music journey"
          image="/assets/svg/blog.svg"
        />
        <PublicBlogPage />
      </section>
    </div>
  );
};

export default Page;
