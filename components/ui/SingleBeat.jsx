"use client";
import React, { useState, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import { PauseIcon, PlayIcon } from "lucide-react";
import { Badge } from "./badge";
import { usePlayback } from "@/app/PlaybackContext";

const SingleBeat = ({ audioUrl, name, image, singer, audioBpm }) => {
  const [bpm, setBpm] = useState(null);
  return (
    <>
      <div className="flex items-center px-2 py-0 bg-[#F1F3F4] hover:shadow-white/25 hover:shadow-md  hover:scale-[1.002] rounded-xl">
        <div className="relative w-14 h-10 ">
          <div
            className="absolute rounded-md inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${image})`,
            }}
          ></div>
        </div>

        <div className="w-full">
          <div className="flex items-center gap-2 justify-between w-full">
            <div className="">
              <h3 className="lg:text-xl text-black line-clamp-1 mx-4 lg:font-normal w-full font-light text-sm">
                {name ?? "--"}
              </h3>
            </div>

            <audio controls className="w-full max-w-xl">
              <source src={audioUrl} type="audio/ogg" />
            </audio>
          </div>
        </div>
        <div className=" flex items-center justify-center px-3 w-full max-w-20">
          <span className="bg-gray-700 rounded-lg px-1 py-1 ml-1 self-center w-full">
            {"  "} BPM {audioBpm ? audioBpm : bpm || "--"}
          </span>
        </div>
      </div>
    </>
  );
};

export default SingleBeat;
