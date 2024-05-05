"use client";
import React, { useState, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import { Button } from "./button";
import {
  DownloadIcon,
  HeartIcon,
  PauseIcon,
  PlayIcon,
  PlusIcon,
} from "lucide-react";
import Image from "next/image";
import { Badge } from "./badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

const SingleBeat = ({ audioUrl, name, singer, price }) => {
  const [waveform, setWaveform] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bpm, setBpm] = useState(null);
  const waveformRef = useRef(null);

  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#fff",
      progressColor: "#000",
      cursorWidth: 0,
      barWidth: 3,
      height: 50,
      normalize: true,
    });

    wavesurfer.load(audioUrl);

    setWaveform(wavesurfer);

    return () => wavesurfer?.destroy();
  }, [audioUrl]);

  useEffect(() => {
    if (!waveform) return;

    waveform.on("audioprocess", () => {
      setCurrentTime(waveform.getCurrentTime());
      setDuration(waveform.getDuration());
    });

    waveform.on("ready", () => {
      const peaks = waveform.backend?.getPeaks(10000);
      console.log(peaks); // Use some algorithm to calculate BPM
      // For demo purposes, just setting a random BPM
      setBpm(Math.floor(Math.random() * 100) + 60);
    });
  }, [waveform]);

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
      <div className="flex items-center p-4 bg-muted hover:shadow-white/25 hover:shadow-md hover:scale-[1.002] rounded-lg">
        <Button
          className="p-2 mr-4 rounded-full bg-black  ring-gray-900 border border-spacing-3"
          variant="ghost"
          onClick={togglePlayPause}
        >
          {isPlaying ? (
            <PauseIcon className="h-6 w-6" />
          ) : (
            <PlayIcon className="h-6 w-6" />
          )}
        </Button>
        <div className="flex-grow">
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-semibold">{name ?? "--"}</h3>
              <p className="text-sm text-gray-500">By {singer ?? "--"}</p>
            </div>
            <div ref={waveformRef} className=" max-w-2xl w-full h-[50px]"></div>

            <div className="text-right">
              <span className="block text-sm">
                {formatTime(duration)} {formatTime(currentTime)}
              </span>
              <span className="block text-sm text-gray-500">5 Tracks</span>
            </div>
          </div>
        </div>
        <div className="flex items-center ml-4">
          <Badge className="mr-2" variant="default">
            BPM {bpm || "--"}
          </Badge>
          ${price}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className="p-2" variant="ghost">
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to cart</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className="p-2" variant="ghost">
                  <DownloadIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download preview song</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </>
  );
};

export default SingleBeat;
