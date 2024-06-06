"use client";
import React, { useState, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import { PauseIcon, PlayIcon } from "lucide-react";
import { Badge } from "./badge";
import { usePlayback } from "@/app/PlaybackContext";

const SingleBeat = ({ audioUrl, name, singer, price }) => {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bpm, setBpm] = useState(null);

  const { currentPlaying, setCurrentPlaying } = usePlayback();

  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#ddd",
      progressColor: "#ff5500",
      cursorColor: "#ff5500",
      height: 20,
    });
    wavesurfer.load(audioUrl);
    wavesurferRef.current = wavesurfer;

    wavesurfer.on("ready", () => {
      setDuration(wavesurfer.getDuration());
      // Example BPM, you can calculate or set as per your need
      setBpm(120);
    });

    wavesurfer.on("audioprocess", () => {
      setCurrentTime(wavesurfer.getCurrentTime());
    });

    wavesurfer.on("finish", () => {
      setIsPlaying(false);
      setCurrentPlaying(null);
    });

    return () => {
      wavesurfer.destroy();
    };
  }, [audioUrl]);

  useEffect(() => {
    if (currentPlaying && currentPlaying !== wavesurferRef.current) {
      wavesurferRef.current.pause();
      setIsPlaying(false);
    }
  }, [currentPlaying]);

  const togglePlayPause = () => {
    if (!wavesurferRef.current) return;
    if (isPlaying) {
      wavesurferRef.current.pause();
      setCurrentPlaying(null);
    } else {
      if (currentPlaying && currentPlaying !== wavesurferRef.current) {
        currentPlaying.pause();
      }
      wavesurferRef.current.play();
      setCurrentPlaying(wavesurferRef.current);
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
      <div className="flex items-center px-4 py-2  bg-muted hover:shadow-white/25 hover:shadow-md hover:scale-[1.002] rounded-lg">
        <div className="relative w-14 h-10 ">
          <div
            className="absolute rounded-md inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/assets/images/background.jpg')",
            }}
          ></div>
          <button
            onClick={togglePlayPause}
            className="absolute inset-0 flex items-center justify-center transition duration-300 opacity-100 hover:opacity-100 focus:outline-none"
          >
            <span className="bg-black bg-opacity-80 p-1 rounded-full">
              {isPlaying ? (
                <PauseIcon className="pl-1 w-6 h-6" />
              ) : (
                <PlayIcon className="pl-1 w-6 h-6" />
              )}
            </span>
          </button>
        </div>

        <div className="w-full">
          <div className="flex items-center gap-2 justify-between w-full">
            <div className="">
              <h3 className="lg:text-xl mx-4 lg:font-normal w-full font-light text-sm">
                {name ?? "--"}
              </h3>
              {/* <p className="text-sm text-gray-500">By {singer ?? "--"}</p> */}
            </div>
            <div
              className="relative  max-w-xl w-full mx-4"
              ref={waveformRef}
            ></div>

            <div className="text-right">
              <span className="block text-md mt-1">{formatTime(duration)}</span>
            </div>
          </div>
        </div>
        <div className=" flex items-center justify-center px-3 w-full max-w-20">
          <span className="bg-gray-700 rounded-lg px-1 py-1 ml-1 self-center w-full">
            {"  "} BPM {bpm || "--"}
          </span>
        </div>
      </div>
    </>
  );
};

export default SingleBeat;
