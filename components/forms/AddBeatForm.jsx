"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon, PlayIcon, PlusIcon, TrashIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { toast } from "sonner";
const FormSchema = z.object({
  title: z.string(),
  regular_price: z.string(),
  tags: z.string(),
  description: z.string(),
  downloadable_file: z.string(),
  preview_audio: z.string(),
});
const AddBeatForm = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      regular_price: "",
      tags: "",
      description: "",
      downloadable_file: "",
      preview_audio: "",
    },
  });
  const [date, setDate] = React.useState();
  const [audioFiles, setAudioFiles] = React.useState([]);
  const [beats, setBeats] = useState([]);

  const [previews, setPreviews] = React.useState([]);
  const [image, setImage] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleFileChange = (e) => {
    const files = e.target.files;
    setAudioFiles(files);

    const audioPreviews = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      audioPreviews.push(URL.createObjectURL(file));
    }
    setPreviews(audioPreviews);
  };
  const handleBeatChange = (event) => {
    const files = Array.from(event.target.files);
    const filePromises = files.map((file) => {
      return new Promise((resolve) => {
        const audio = new Audio(URL.createObjectURL(file));
        audio.addEventListener("loadedmetadata", () => {
          resolve({
            file,
            name: file.name,
            duration: audio.duration,
          });
        });
      });
    });

    Promise.all(filePromises).then((newBeats) => {
      setBeats(newBeats);
    });
  };

  const handleRemoveBeat = (index) => {
    const newBeats = beats.filter((_, i) => i !== index);
    setBeats(newBeats);
  };
  const [currentAudio, setCurrentAudio] = useState(null);

  useEffect(() => {
    return () => {
      if (currentAudio) {
        currentAudio.pause();
      }
    };
  }, [currentAudio]);

  const handlePlay = (audioElement) => {
    if (currentAudio && currentAudio !== audioElement) {
      currentAudio.pause();
    }
    setCurrentAudio(audioElement);
  };
  function onSubmit(data) {
    console.log("data==>", data, image);
    const formData = {
      image: image ? image : "",
      audios: audioFiles ? audioFiles : [],
    };
    console.log("fromData------", formData);
    toast.message("You submitted the following values:", {
      description: JSON.stringify(formData, null, 2),
    });
  }
  return (
    <>
      {" "}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="w-full space-y-6"
        >
          <div className=" flex justify-center items-center">
            <label
              className="relative w-full h-52 border-2 border-gray-300 border-dashed rounded-lg flex justify-center items-center cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileInput}
              />
              {image ? (
                <img
                  src={image}
                  alt="Uploaded"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center space-y-2">
                  <PlusIcon className="h-10 w-10 text-gray-400" />
                  <span className="text-sm text-gray-400">Drop image here</span>
                </div>
              )}
            </label>
          </div>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">Title</FormLabel>
                <FormControl>
                  <Input placeholder="title" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 items-center gap-4 w-full">
            <div className="">
              <FormLabel className="text-primary mb-2">Released Date</FormLabel>
              <Popover className="bg-muted ">
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full bg-background mt-2 hover:bg-transparent hover:text-muted-foreground hover:ring-1 ring-muted border-muted justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <FormField
              control={form.control}
              className="w-full"
              name="regular_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Regular Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Regular Price"
                      type="number"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="tags"
            className="w-full"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">Tags</FormLabel>
                <FormControl>
                  <Input placeholder="Tags" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">
                  Description (optional)
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="downloadable_file"
            className="w-full"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">
                  Files For Download
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Files For Download"
                    type="file"
                    accept=".zip,.rar,.7zip"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="preview_audio"
            className="w-full"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">
                  Preview Audio files
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    id="beats"
                    accept="audio/*"
                    multiple
                    onChange={handleBeatChange}
                    required
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div id="beatList" className="beat-preview space-y-5">
            {beats.map((beat, index) => (
              <div
                key={index}
                className="beat-item px-4 mb-2 bg-[#F1F3F4] rounded-lg flex items-center gap-2 justify-between"
              >
                <p className="text-black max-w-md w-full text-xl">
                  {beat.name} -{" "}
                  {/* {new Date(beat.duration * 1000).toISOString().substr(11, 8)} */}
                </p>
                <audio
                  className="w-full max-w-lg rounded-lg"
                  controls
                  src={URL.createObjectURL(beat.file)}
                  onPlay={(e) => handlePlay(e.target)}
                />
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => handleRemoveBeat(index)}
                      size="icon"
                      className="text-black hover:bg-red-500 hover:text-white"
                      variant="ghost"
                    >
                      <TrashIcon className="w-6 h-6" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};

export default AddBeatForm;
