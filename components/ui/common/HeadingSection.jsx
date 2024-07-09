import AnimationWrapper from "@/components/animation/AnimationWrapper";
import FadeInBottomAnimation from "@/components/animation/FadeInBottomAnimation";
import FadeInRightAnimation from "@/components/animation/FadeInRightAnimation";
import FadeLeftInAnimation from "@/components/animation/FadeLeftInAnimation";
import Image from "next/image";
import React from "react";

const HeadingSection = ({ image, title, description }) => {
  return (
    <section className="w-full overflow-hidden py-10 md:py-10 lg:py-12">
      <div className=" grid gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px]">
        <AnimationWrapper
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
          transition={{ duration: 1 }}
        >
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="heading font-bold  tracking-wide sm:text-5xl md:text-6xl xl:text-7xl">
                {title}
              </h1>
              <p className="max-w-[600px] text-gray-500 subtext dark:text-gray-400">
                {description}
              </p>
            </div>
          </div>
        </AnimationWrapper>
        <FadeInRightAnimation>
          <Image
            alt="Hero Image"
            className="mx-auto md:w-[500px] w-full overflow-hidden rounded-xl md:h-[450px] h-auto object-fit"
            height="550"
            src={image}
            width="550"
          />
        </FadeInRightAnimation>
      </div>
    </section>
  );
};

export default HeadingSection;
