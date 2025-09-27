import React from "react";
import AboutPageClient from "./AboutPageClient";

export const metadata = {
  title: "About | Guhanis Official",
  description: "Artist | Music Producer",
};

const page = () => {
  return (
    <section className="w-full">
      <AboutPageClient />
    </section>
  );
};

export default page;