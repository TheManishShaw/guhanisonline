import SingleBeat from "@/components/ui/SingleBeat";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import HeadingSection from "@/components/ui/common/HeadingSection";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import BeatsPage from "@/components/view/BeatsPage";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import React from "react";

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
