import HeadingSection from "@/components/ui/common/HeadingSection";
import ContactPage from "@/components/view/ContactPage";
import React from "react";

export const metadata = {
  title: "Contact | Guhanis Official",
  description: "Artist | Music Producer",
};

const page = () => {
  return (
    <section className="container mx-auto px-6">
      <HeadingSection
        title="Contact-us"
        description="Let's sync up: Reach out and let's create the perfect harmony together. Your message matters."
        image="/assets/images/login/placeholder.svg"
      />

      <ContactPage />
    </section>
  );
};

export default page;
