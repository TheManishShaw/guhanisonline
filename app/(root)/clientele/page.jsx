import HeadingSection from "@/components/ui/common/HeadingSection";
import PublicClientelePage from "@/components/view/PublicClientelePage";
import React from "react";

export const metadata = {
  title: "Clientele | Guhanis Official",
  description: "Artist | Music Producer",
};

const page = () => {
  return (
    <div>
      <HeadingSection
        title="Clientele"
        description="Let's sync up: Reach out and let's create the perfect harmony together. Your message matters."
        image="/assets/images/login/placeholder.svg"
      />

      <PublicClientelePage />
    </div>
  );
};

export default page;
