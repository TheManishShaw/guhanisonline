"use client";
import React, { useState, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import { PauseIcon, PlayIcon } from "lucide-react";
import { Badge } from "./badge";

const SingleBeat = ({ audioUrl, name, singer, price }) => {
  const [waveform, setWaveform] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bpm, setBpm] = useState(null);

  const togglePlayPause = () => {
    if (!waveform) return;
    if (isPlaying) {
      waveform.pause();
    } else {
      waveform.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  return (
    <>
      <div className="flex items-center px-4 py0.5 bg-muted hover:shadow-white/25 hover:shadow-md hover:scale-[1.002] rounded-lg">
        <div className="relative w-10 h-10 ">
          <div
            className="absolute rounded-md inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/assets/images/background.jpg')",
            }}
          ></div>
          <button
            onClick={togglePlayPause}
            className="absolute  inset-0 flex items-center justify-center transition duration-300 opacity-100 hover:opacity-100 focus:outline-none"
          >
            <span className="bg-black bg-opacity-80 p-1  rounded-full">
              {isPlaying ? (
                <PauseIcon className="pl-1 w-6 h-6" />
              ) : (
                <PlayIcon className="pl-1 w-6 h-6" />
              )}
            </span>
          </button>
        </div>
        <div className="relative h-14 w-14"></div>

        <div className="flex-grow">
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-semibold ">{name ?? "--"}</h3>
              {/* <p className="text-sm text-gray-500">By {singer ?? "--"}</p> */}
            </div>

            <div className="text-right">
              <span className="block text-sm mt-1">{formatTime(duration)}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center ml-4">
          <Badge className="mr-2" variant="default">
            BPM {bpm || "--"}
          </Badge>
        </div>
      </div>
    </>
  );
};

export default SingleBeat;
