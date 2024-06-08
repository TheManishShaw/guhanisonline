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
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import { addBeats } from "@/lib/hooks/services/universalFetch";

const AddBeatForm = () => {
  const form = useForm({
    // resolver: zodResolver(beatsFormSchema),
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
  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [zipFile, setZipFile] = useState(null);

  useEffect(() => {
    if (coverImage) {
      setCoverImagePreview(URL.createObjectURL(coverImage));
      uploadFile(coverImage, "cover_image");
    }
  }, [coverImage]);

  useEffect(() => {
    if (zipFile) {
      uploadFile(zipFile, "zip_file");
    }
  }, [zipFile]);

  const handleCoverImageChange = (event) => {
    const file = event.target.files[0];
    setCoverImage(file);
  };

  const handleZipFileChange = (event) => {
    const file = event.target.files[0];
    setZipFile(file);
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
      const uploadPromises = newBeats.map((beat) =>
        uploadFile(beat.file, "beat")
      );
      Promise.all(uploadPromises).then((uploadResponses) => {
        console.log("Upload responses:", uploadResponses);
      });
      setBeats([...beats, ...newBeats]);
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

  const uploadFile = (file, type) => {
    const formData = new FormData();
    formData.append("file", file);

    return axiosInstance
      .post("/fileupload?file", formData)
      .then((response) => {
        toast.success(`File uploaded successfully: ${file.name}`);
        console.log(`${type} upload response data:`, response.data);
        return response.data;
      })
      .catch((error) => {
        toast.error(`Failed to upload file: ${file.name}`);
        console.error(`${type} upload error:`, error);
        throw error;
      });
  };

  const onSubmit = async (data) => {
    let formData = {
      title: data.title,
      description: data.description,
      price: data.price,
      file: data.url, // Initially empty for the collection.zip URL
      cover_image: data.url, // Initially empty for the cover image URL
      beats: data.beats.map((beat, index) => ({
        ...beat,
        cover_image: data.url, // Initially empty for each beat's cover image URL
      })),
    };

    try {
      // Send formData to the server
      const res = await addBeats(formData);
      console.log("res", res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="cover_image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Cover Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  placeholder="cover image"
                  onChange={(e) => {
                    field.onChange(e);
                    handleCoverImageChange(e);
                  }}
                />
              </FormControl>
              {coverImagePreview && (
                <img
                  src={coverImagePreview}
                  alt="Cover Preview"
                  className="mt-4 w-32 h-32 object-cover"
                />
              )}
              <FormMessage />
            </FormItem>
          )}
        />
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
          <FormField
            control={form.control}
            className="w-full"
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">Price</FormLabel>
                <FormControl>
                  <Input placeholder="Price" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
          name="file"
          className="w-full"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Files For Download</FormLabel>
              <FormControl>
                <Input
                  placeholder="Files For Download"
                  type="file"
                  accept=".zip,.rar,.7zip"
                  onChange={(e) => {
                    field.onChange(e);
                    handleZipFileChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="beats"
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
