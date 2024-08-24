"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ScrollAnimationWrapper from "../animation/ScrollAnimationWrapper";
import getScrollAnimation from "@/lib/getScrollAnimation";
import ContactForm from "../forms/ContactForm";

const ContactPage = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  return (
    <ScrollAnimationWrapper className=" ">
      <motion.div
        variants={scrollAnimation}
        className="container mx-auto my-12 px-4 md:px-6 lg:px-8"
      >
        <div className="my-6">
          <div className="grid sm:grid-cols-2 items-center gap-16 p-8 mx-auto max-w-7xl bg-black shadow-[0_2px_10px_-3px_rgba(114,114,114,0.20)] rounded-lg text-[#333] ">
            <div>
              <h1 className="text-7xl font-bold text-white">Lets Talk</h1>
              <p className="text-2xl text-gray-300 mt-3">
                Have some big idea or brand to develop and need help? Then reach
                out we&apos;d love to hear about your project and provide help.
              </p>
              <div className="mt-12">
                <h2 className="text-lg text-white font-extrabold">Email</h2>
                <ul className="mt-2">
                  <li className="flex items-center">
                    <div className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        fill="#fff"
                        viewBox="0 0 479.058 479.058"
                      >
                        <path
                          d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"
                          data-original="#000000"
                        />
                      </svg>
                    </div>
                    <a
                      target="blank"
                      href="mailto:guhan@guhanisonline.com"
                      className="text-[#fff] text-2xl ml-3 flex gap-2"
                    >
                      <small className="block">Mail</small>
                      {" : "}
                      <strong>guhan@guhanisonline.com</strong>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </motion.div>
    </ScrollAnimationWrapper>
  );
};

export default ContactPage;
