import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { PinContainer } from "./3d-pin";

const SingleBlogCard = () => {
  return (
    <div className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]">
      <PinContainer title="Blog details" href="/blogs/blog-details">
        <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
          <div
            className="relative w-full h-full overflow-hidden lg:rounded-3xl"
            style={{ backgroundColor: "#13162D" }}
          >
            <img src="/assets/images/bg.png" alt="bgimg" />
          </div>
          <Image
            src="/assets/images/blog.jpg"
            alt="cover"
            width={300}
            height={340}
            className=" rounded-md absolute bottom-0"
          />
        </div>

        <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
          UI/UX Review Check
        </h1>

        <p
          className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
          style={{
            color: "#BEC1DD",
            margin: "1vh 0",
          }}
        >
          The place is close to Barceloneta Beach and bus stop just 2 min by
          walk and near to where you can enjoy the main night life in Barcelona.
        </p>

        <div className="flex items-center justify-between mt-7 mb-3">
          <div className="flex items-center">
            {/* {item.iconLists.map((icon, index) => (
              <div
                key={index}
                className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                style={{
                  transform: `translateX(-${5 * index + 2}px)`,
                }}
              >
                <img src={icon} alt="icon5" className="p-2" />
              </div>
            ))} */}
          </div>

          <Link
            className="flex justify-center items-center"
            href="/blogs/blog-details"
          >
            <p className="flex lg:text-xl md:text-xs text-sm text-purple">
              More details
            </p>
            <FaLocationArrow className="ms-3" color="#CBACF9" />
          </Link>
        </div>
      </PinContainer>
    </div>
  );
};

export default SingleBlogCard;
