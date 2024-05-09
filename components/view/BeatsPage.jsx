import React from "react";
import { columns } from "../ui/datatable/coloums";
import { DataTable } from "../ui/datatable/data-table";
import { tasks } from "@/app/(root)/dashboard/beats/page";
import SingleBeat from "../ui/SingleBeat";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Card } from "../ui/card";

const BeatsPage = () => {
  const data = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 8 },
    { id: 8 },
  ];
  return (
    <div className="w-full mx-auto">
      {/* <DataTable data={tasks} columns={columns} /> */}
      {data.map((item, index) => (
        <Card
          key={index}
          className=" mx-auto my-8 flex max-w-container flex-col items-center gap-3 p-4 rounded-xl shadow-lg "
        >
          <div className="relative w-full h-36 bg-white rounded-lg shadow-lg overflow-hidde mb-8">
            <div className="absolute inset-0 rounded-lg overflow-hidden bg-gray-400">
              <Image
                src="/assets/images/login/placeholder.svg"
                layout="fill"
                objectFit="cover"
                alt=""
              />
              <div className="absolute inset-0 backdrop backdrop-blur-10 bg-gradient-to-b from-transparent to-black"></div>
            </div>
            <div className="px-4 w-full flex space-x-6 transform translate-x-6 translate-y-8">
              <div className="w-36 h-36 rounded-lg shadow-lg overflow-hidden">
                <Image
                  width={200}
                  height={200}
                  className="rounded-lg"
                  src="https://images.unsplash.com/photo-1543794327-59a91fb815d1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                  alt=""
                />
              </div>
              <div className="text-white pt-4 w-full">
                <div className=" flex items-center justify-between w-full">
                  <div className="">
                    <h3 className="font-bold text-3xl ">Album</h3>
                    <div className="text-sm opacity-60">Super Interpret</div>
                    <span className="block text-sm text-gray-500">
                      5 Tracks
                    </span>
                  </div>
                  <div className="-translate-x-6">
                    <p className="mb-3 font-extrabold"> $ 23.23</p>
                    <Button
                      className=" bg-primary px-3 text-black py-0.5"
                      variant="ghost"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span className="mx-2">Add to cart</span>
                    </Button>
                  </div>
                </div>

                <div className="mt-4 text-gray-400">
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
            <SingleBeat
              audioUrl="/assets/audio/Yimmy.mp3"
              name="yimmy yimmy fkdfkfkfsfks"
              singer=" Manish Shaw"
              price="$23.34"
            />
            <SingleBeat
              audioUrl="/assets/audio/Yimmy.mp3"
              name="yimmy yimmy fkdfkfkfsfks"
              singer=" Manish Shaw"
              price="$23.34"
            />
            <SingleBeat
              audioUrl="/assets/audio/Yimmy.mp3"
              name="yimmy yimmy fkdfkfkfsfks"
              singer=" Manish Shaw"
              price="$23.34"
            />
            <SingleBeat
              audioUrl="/assets/audio/Yimmy.mp3"
              name="yimmy yimmy fkdfkfkfsfks"
              singer=" Manish Shaw"
              price="$23.34"
            />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default BeatsPage;
