import Image from "next/image";
import Link from "next/link";
import React from "react";

const RelatedPost = ({ image, title, slug, date }) => {
  return (
    <div className="flex items-center lg:block xl:flex">
      <div className="mr-5 lg:mb-3 xl:mb-0">
        <div className="relative h-[60px] w-[70px] overflow-hidden rounded-md sm:h-[75px] sm:w-[85px]">
          <Image
            src={image ? image : "/assets/images/login/placeholder.svg"}
            alt={title}
            fill
          />
        </div>
      </div>
      <div className="w-full">
        <h5>
          <Link
            href={slug}
            className="mb-[6px] block text-xl font-medium leading-snug text-white  dark:text-white "
          >
            {title}
          </Link>
        </h5>
        <p className="text-xs font-medium text-body-color">{date}</p>
      </div>
    </div>
  );
};

export default RelatedPost;
