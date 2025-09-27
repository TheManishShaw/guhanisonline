import HeadingSection from "@/components/ui/common/HeadingSection";
import ContactPage from "@/components/view/ContactPage";
import React from "react";

export const metadata = {
  title: "Contact | Guhanis Official",
  description: "Artist | Music Producer",
};

const page = () => {
  return (
    <section className="w-full">
      <ContactPage />
    </section>
  );
};

export default page;
