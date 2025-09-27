import HeadingSection from "@/components/ui/common/HeadingSection";
import PublicTestimonialPage from "@/components/view/PublicTestimonialPage";
import React from "react";

export const metadata = {
  title: "Testimonials | Guhanis Official",
  description: "What our clients say about our music production services",
};

const page = () => {
  return (
    <div className="container mx-auto px-6">
      <HeadingSection
        title="Testimonials"
        description="Hear what our amazing clients have to say about working with us. Real stories, real results."
        image="/assets/svg/testimonials.svg"
      />

      <PublicTestimonialPage />
    </div>
  );
};

export default page;
