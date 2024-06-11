"use client";
import React from "react";
import SingleBeat from "../ui/SingleBeat";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Card } from "../ui/card";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/lib/store/features/cart/Cart";
import { useQuery } from "@tanstack/react-query";
import { getOpenBeatsList } from "@/lib/hooks/services/universalFetch";
import { useRouter } from "next/navigation";

const PublicBeatsPage = () => {
  const data = [
    {
      id: 1,
      price: "23.23",
      title: "Blurred Vision",
      image: "/assets/images/login/placeholder.svg",
    },
    // ...other data items
  ];

  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    isPending,
    isError,
    data: collection,
    error,
  } = useQuery({
    queryKey: ["getOpenBeatsList"],
    queryFn: getOpenBeatsList,
  });

  const isItemInCart = (itemId) => {
    return cartItems.some((cartItem) => cartItem.id === itemId);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {collection?.map((item, index) => (
        <Card
          key={index}
          className=" mx-auto my-8 flex max-w-container flex-col items-center gap-3 p-4 rounded-xl shadow-lg "
        >
          <div className="relative w-full h-36 bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="absolute inset-0 rounded-lg overflow-hidden bg-gray-400">
              <Image
                src={`/${item?.cover_image_path}`}
                layout="fill"
                objectFit="cover"
                alt="nothing"
              />
              <div className="absolute inset-0 backdrop backdrop-blur-10 bg-gradient-to-b from-transparent to-black"></div>
            </div>
            <div className="px-4 w-full flex space-x-4 transform translate-x-6 translate-y-4 md:translate-y-8">
              <div className="w-36 h-38 rounded-lg shadow-lg overflow-hidden">
                <Image
                  width={200}
                  height={200}
                  className="rounded-lg"
                  src={`${item?.cover_image_path}&auto=format&fit=crop&w=200&h=200&q=80`}
                  alt="test"
                />
              </div>
              <div className="text-white w-full">
                <div className=" md:flex block items-center justify-between w-full">
                  <div className="">
                    <h3 className="lg:text-3xl lg:font-normal font-light text-xl ">
                      {item?.title}
                    </h3>
                    <div className="text-sm opacity-60 hidden md:block">
                      {item.description}
                    </div>
                    <span className=" text-sm text-gray-500 hidden md:block">
                      {item?.beats?.length} Tracks
                    </span>
                  </div>
                  <div className="-translate-x-0 sm:-translate-x-6">
                    <p className="mb-3 font-extrabold text-2xl">
                      {" "}
                      $ {item.price}
                    </p>
                    {isItemInCart(item.id) ? (
                      <Button
                        onClick={() => router.push("/cart")}
                        className=" bg-primary px-3 text-black py-0.5"
                        variant="ghost"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        <span className="mx-2 text-lg font-bold">
                          Go to Cart
                        </span>
                      </Button>
                    ) : (
                      <Button
                        onClick={() => dispatch(addItem(item))}
                        className=" bg-primary px-3 text-black py-0.5"
                        variant="ghost"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        <span className="mx-2 text-lg font-bold">
                          Add to cart
                        </span>
                      </Button>
                    )}
                  </div>
                </div>

                <div className=" text-gray-400 hidden md:block">
                  <div className="flex items-center space-x-2 text-xs">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                    </svg>
                    <span>Easy listening</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full space-y-4">
            {item?.beats?.map((beat, index) => (
              <SingleBeat
                key={index}
                image={beat.cover_image_path}
                audioUrl={beat.file_path}
                name={beat.title}
                audioBpm={beat.bpm}
                singer=""
              />
            ))}
            {/* <SingleBeat
              audioUrl="/assets/audio/Yimmy.mp3"
              name="yimmy yimmy fkdfkfkfsfks"
              singer=" Manish Shaw"
              price="$23.34"
            /> */}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default PublicBeatsPage;
