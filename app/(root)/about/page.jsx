import AnimationWrapper from "@/components/animation/AnimationWrapper";
import HeadingSection from "@/components/ui/common/HeadingSection";
import { MusicIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
export const metadata = {
  title: "About | Guhanis Official",
  description: "Artist | Music Producer",
};
const page = () => {
  return (
    <section className="container mx-auto px-6">
      <HeadingSection
        title="About-us"
        description="Elevate your rhythm: Unleash your beats with our premium soundscapes, tailored for every artist's groove"
        image="/assets/svg/about_us.svg"
      />
      <div className="flex flex-col min-h-[100dvh]">
        <div className="flex-1">
          {/* <AnimationWrapper
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 2 } }}
            transition={{ duration: 1 }}
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
          >
            <section className="w-full pt-12 md:pt-24 lg:pt-32 border-y">
              <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
                <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
                  <div>
                    <h1 className=" text-3xl font-bold sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                      High-Quality Beats for Your Next Hit
                    </h1>
                    <p className="mx-auto max-w-[700px] text-gray-500 subtext dark:text-gray-400">
                      Discover our library of expertly crafted beats, perfect
                      for elevating your music production to new heights.
                    </p>
                  </div>
                  <div className="flex flex-col items-start space-y-4">
                    <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-black text-lg dark:bg-gray-800">
                      Beat Maker
                    </div>
                    <div className="space-x-4">
                      <Link
                        className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-md font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                        href="#"
                      >
                        Browse Beats
                      </Link>
                      <Link
                        className="inline-flex h-9 items-center justify-center rounded-md border  bg-white px-4 py-2 text-md font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                        href="#"
                      >
                        Contact Us
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </AnimationWrapper> */}
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
                <AnimationWrapper
                  // initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0, transition: { duration: 2 } }}
                  transition={{ duration: 1 }}
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true, amount: 0.8 }}
                >
                  <div className="flex flex-col justify-center space-y-4">
                    <div className="space-y-2">
                      <div className="inline-block rounded-lg bg-background  py-1 text-xl dark:bg-gray-800">
                        Producers Experience
                      </div>
                      <h2 className="text-3xl font-bold sm:text-5xl">
                        Crafting Beats for Over a Decade
                      </h2>
                      <p className="max-w-[600px] text-gray-500 subtext dark:text-gray-400">
                        Guhan is a 26 year old producer and composer. After he
                        started producing in the Hip Hop world in 2017, he later
                        found himself combining multiple genres. His sound
                        shifted beyond Hip Hop, as he started working with a
                        client base of artists from varying genres. From R&B to
                        Pop, his versatility and experimentation keeps him on
                        the cutting edge of music. Inspired by the likes of
                        Trent Reznor, Thom Yorke, Kanye West, his thirst for
                        pushing the boundaries is unquenchable. Each artist he
                        works with brings their unique perspective to the table.
                        His goal is to develop their sound, and to differentiate
                        their music from the noise. Along with working with his
                        client base, he found himself creating Sample Packs for
                        other producers/artists. Each Sample Pack is made with
                        the utmost care and experimentation, in order to push
                        the boundaries of what modern music will be.
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                      <Link
                        className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                        href="#"
                      >
                        Learn More
                      </Link>
                      <Link
                        className="inline-flex h-10 items-center justify-center rounded-md border  px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                        href="#"
                      >
                        Buy Beats
                      </Link>
                    </div>
                  </div>
                </AnimationWrapper>
                <AnimationWrapper
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0, transition: { duration: 1 } }}
                  transition={{ duration: 1 }}
                >
                  <Image
                    alt="Producer"
                    className="mx-auto overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                    height="800"
                    src="/assets/images/login/placeholder.jpg"
                    width="550"
                  />
                </AnimationWrapper>
              </div>
            </div>
          </section>
          {/* <section className="w-full py-12 md:py-24 lg:py-32 bg-background dark:bg-gray-800">
            <div className="container px-4 md:px-6">
              <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
                <Image
                  alt="Beat Making"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                  height="310"
                  src="/assets/images/login/placeholder.svg"
                  width="550"
                />
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <div className="inline-block rounded-lg border px-3 py-1 text-xl dark:bg-gray-800">
                      Beat Making Process
                    </div>
                    <h2 className="text-3xl font-bold  sm:text-5xl">
                      Crafting Beats with Care and Precision
                    </h2>
                    <p className="max-w-[600px] text-gray-500 subtext dark:text-gray-400">
                      Our producer uses a combination of cutting-edge software,
                      analog gear, and a deep understanding of music theory to
                      create beats that are both technically impressive and
                      emotionally resonant. From sound design to arrangement,
                      every element is carefully considered to ensure a polished
                      and professional final product.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Link
                      className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                      href="#"
                    >
                      Explore Beats
                    </Link>
                    <Link
                      className="inline-flex h-10 items-center justify-center rounded-md border  px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                      href="#"
                    >
                      Contact Producer
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section> */}
          {/* <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  What Our Customers Say
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Hear from some of the artists and producers who have used our
                  beats to create their next hit.
                </p>
              </div>
              <div className="divide-y rounded-lg border">
                <div className="grid w-full grid-cols-1 items-stretch justify-center divide-x md:grid-cols-2">
                  <div className="mx-auto flex w-full flex-col items-start justify-center p-4 sm:p-8 space-y-4">
                    <blockquote className="text-lg font-semibold leading-snug lg:text-xl lg:leading-normal xl:text-2xl">
                      “The beats from this producer are top-notch. They have a
                      unique sound that really helps my tracks stand out.“
                    </blockquote>
                    <div>
                      <div className="font-semibold">Kendrick Lamar</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Grammy-winning Artist
                      </div>
                    </div>
                  </div>
                  <div className="mx-auto flex w-full flex-col items-start justify-center p-4 sm:p-8 space-y-4">
                    <blockquote className="text-lg font-semibold leading-snug lg:text-xl lg:leading-normal xl:text-2xl">
                      Ive been using these beats for years and they never
                      disappoint. The producer is a true master of their craft.“
                    </blockquote>
                    <div>
                      <div className="font-semibold">Ariana Grande</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Multi-Platinum Artist
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid w-full grid-cols-1 items-stretch justify-center divide-x md:grid-cols-2">
                  <div className="mx-auto flex w-full flex-col items-start justify-center p-4 sm:p-8 space-y-4">
                    <blockquote className="text-lg font-semibold leading-snug lg:text-xl lg:leading-normal xl:text-2xl">
                      “These beats have helped me take my production to the next
                      level. The attention to detail is truly impressive.“
                    </blockquote>
                    <div>
                      <div className="font-semibold">J. Cole</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Multi-Platinum Producer
                      </div>
                    </div>
                  </div>
                  <div className="mx-auto flex w-full flex-col items-start justify-center p-4 sm:p-8 space-y-4">
                    <blockquote className="text-xl font-semibold leading-snug lg:text-xl lg:leading-normal xl:text-2xl">
                      Im constantly amazed by the creativity and innovation in
                      these beats. They ve helped me take my sound to new
                      heights.“
                    </blockquote>
                    <div>
                      <div className="font-semibold">Rihanna</div>
                      <div className="text-lg text-gray-500 dark:text-gray-400">
                        Multi-Platinum Artist
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section> */}
        </div>
      </div>
    </section>
  );
};

export default page;
