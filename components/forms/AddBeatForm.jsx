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
import { CalendarIcon, PlusIcon, TrashIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { toast } from "sonner";
import { FileUploader } from "react-drag-drop-files";
import { beatsFormSchema } from "@/lib/validation/validation";

const fileTypes = ["JPG", "PNG", "GIF"];
const AddBeatForm = () => {
  const form = useForm({
    resolver: zodResolver(beatsFormSchema),
    defaultValues: {
      title: "",
      description: "",
      cover_image: "",
      file: "",
      price: "",
      beats: [
        { title: "", description: "", file: "", cover_image: "", price: "" },
      ],
    },
  });
  const [date, setDate] = useState();
  const [beats, setBeats] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
  useEffect(() => {
    return () => {
      if (currentAudio) {
        currentAudio.pause();
      }
    };
  }, [currentAudio]);

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

  const handlePlay = (audioElement) => {
    if (currentAudio && currentAudio !== audioElement) {
      currentAudio.pause();
    }
    if (audioElement.paused) {
      audioElement.play();
      setCurrentAudio(audioElement);
    } else {
      audioElement.pause();
      setCurrentAudio(null);
    }
  };

  const onSubmit = (data) => {
    const formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("description", data.description);
    formdata.append("price", data.price);
    formdata.append("cover_image", data.cover_image);
    formdata.append("file", data.file);

    data?.beats?.forEach((beat, index) => {
      formdata.append(`beats[${index}][title]`, beat.title);
      formdata.append(`beats[${index}][description]`, beat.description);
      formdata.append(`beats[${index}][price]`, beat.price);
      formdata.append(`beats[${index}][file]`, beat.file);
      formdata.append(`beats[${index}][cover_image]`, beat.cover_image);
    });

    // console.log("formdata", {
    //   title: data.title,
    //   regular_price: data.regular_price,
    //   tags: data.tags,
    //   description: data.description || "",
    //   released_date: date ? date.toISOString() : "",
    //   image: file ? "Image attached" : "No image",
    //   downloadable_file: downloadableFile ? downloadableFile.name : "No file",
    //   preview_audio_files: beats.map((beat) => beat.file.name),
    // });
    console.log("formData", formdata);

    // toast.message("You submitted the following values:", {
    //   description: JSON.stringify(
    //     {
    //       title: data.title,
    //       regular_price: data.regular_price,
    //       tags: data.tags,
    //       description: data.description || "",
    //       released_date: date ? date.toISOString() : "",
    //       image: image ? "Image attached" : "No image",
    //       downloadable_file: downloadableFile
    //         ? downloadableFile.name
    //         : "No file",
    //       preview_audio_files: beats.map((beat) => beat.file.name),
    //     },
    //     null,
    //     2
    //   ),
    // });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        // encType="multipart/form-data"
        className="w-full space-y-6"
      >
        <div className=" flex border-2 border-white rounded-md border-dotted justify-center items-center">
          <div>
            <FileUploader
              handleChange={handleChange}
              name="file"
              classes="!w-full !h-28 text-2xl !border-none text-[45px] !justify-center !items-center  !flex !text-white"
              label="Upload or drop a file right here"
              hoverTitle="Drop here"
              maxSize="2"
              className=""
              types={fileTypes}
            />
            <span className="text-2xl w-full text-center">{file?.name}</span>
          </div>
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
            <Popover className="bg-muted">
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
                  <Input placeholder="Regular Price" type="number" {...field} />
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
              <FormLabel className="text-primary">Files For Download</FormLabel>
              <FormControl>
                <Input
                  placeholder="Files For Download"
                  type="file"
                  accept=".zip,.rar,.7zip"
                  {...form.register("downloadable_file")}
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
                  {...form.register("preview_audio")}
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
              <p className="text-black max-w-md w-full text-xl">{beat.name}</p>
              <audio
                className="w-full max-w-lg rounded-lg"
                controls
                src={URL.createObjectURL(beat.file)}
                onPlay={(e) => handlePlay(e.target)}
              />
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
          ))}
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AddBeatForm;
