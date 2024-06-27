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
import { TrashIcon, PlusIcon } from "lucide-react";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import { addBeats } from "@/lib/hooks/services/universalFetch";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { beatsFormSchema } from "@/lib/validation/validation";

const AddBeatForm = () => {
  const router = useRouter();
  const defaultValues = {
    title: "",
    description: "",
    cover_image: "",
    file: "",
    price: "",
    beats: [{ audio: "", cover: "", title: "", description: "", price: "" }],
  };

  const form = useForm({
    resolver: zodResolver(beatsFormSchema),
    defaultValues,
  });

  const [mainCoverImage, setMainCoverImage] = useState(null);
  const [zipFile, setZipFile] = useState(null);
  const [beats, setBeats] = useState([{ audio: null, cover: null }]);
  const [uploadedFiles, setUploadedFiles] = useState({
    cover_image: "",
    file: "",
    beats: [],
  });
  const [uploadProgress, setUploadProgress] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (mainCoverImage) {
      uploadFile(mainCoverImage, "cover_image");
    }
  }, [mainCoverImage]);

  useEffect(() => {
    if (zipFile) {
      uploadFile(zipFile, "file");
    }
  }, [zipFile]);

  const handleMainCoverImageChange = (event) => {
    const file = event.target.files[0];
    setMainCoverImage(file);
  };

  const handleZipFileChange = (event) => {
    const file = event.target.files[0];
    setZipFile(file);
  };

  const handleBeatChange = async (event, index, type) => {
    const file = event.target.files[0];
    const newBeats = [...beats];

    if (type === "audio") {
      const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");
      const bpmMatch = fileNameWithoutExtension.match(/_bpm(\d+)/);
      const bpm = bpmMatch ? bpmMatch[1] : "";

      newBeats[index] = {
        ...newBeats[index],
        audio: file,
        title: fileNameWithoutExtension,
        bpm: bpm,
      };

      const fileUrl = await uploadFile(file, `beats[${index}].audio`);
      setUploadedFiles((prev) => {
        const newUploadedFiles = { ...prev };
        newUploadedFiles.beats[index] = {
          ...newUploadedFiles.beats[index],
          audio: fileUrl,
        };
        return newUploadedFiles;
      });
    } else if (type === "cover") {
      newBeats[index] = {
        ...newBeats[index],
        cover: file,
      };

      const fileUrl = await uploadFile(file, `beats[${index}].cover`);
      setUploadedFiles((prev) => {
        const newUploadedFiles = { ...prev };
        newUploadedFiles.beats[index] = {
          ...newUploadedFiles.beats[index],
          cover: fileUrl,
        };
        return newUploadedFiles;
      });
    }

    setBeats(newBeats);
  };

  const handleRemoveBeat = (index) => {
    const newBeats = beats.filter((_, i) => i !== index);
    const newUploadedFiles = { ...uploadedFiles };
    newUploadedFiles.beats.splice(index, 1);
    setBeats(newBeats);
    setUploadedFiles(newUploadedFiles);
  };

  const handleAddBeat = () => {
    setBeats([...beats, { audio: null, cover: null }]);
    setUploadedFiles({
      ...uploadedFiles,
      beats: [...uploadedFiles.beats, { audio: "", cover: "" }],
    });
  };

  const uploadFile = async (file, type) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      setUploading(true);
      const response = await axiosInstance.post("/fileupload?file", formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress((prev) => ({
            ...prev,
            [type]: progress,
          }));
        },
      });
      toast.success(`File uploaded successfully: ${file.name}`);
      const fileUrl = response.data.file_path;

      setUploadedFiles((prev) => {
        const newUploadedFiles = { ...prev };
        if (type === "cover_image") {
          newUploadedFiles.cover_image = fileUrl;
        } else if (type === "file") {
          newUploadedFiles.file = fileUrl;
        } else if (type.startsWith("beats")) {
          const index = parseInt(type.match(/\d+/)[0], 10);
          const field = type.includes("audio") ? "audio" : "cover";
          newUploadedFiles.beats[index] = {
            ...newUploadedFiles.beats[index],
            [field]: fileUrl,
          };
        }
        return newUploadedFiles;
      });
      return fileUrl;
    } catch (error) {
      toast.error(`Failed to upload file: ${file.name}`);
      console.error(`${type} upload error:`, error);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    const formData = {
      title: data.title,
      description: data.description,
      price: data.price,
      file: uploadedFiles.file,
      cover_image: uploadedFiles.cover_image,
      beats: await Promise.all(
        data.beats.map(async (beat, index) => {
          const beatData = {
            title: beats[index]?.title || "",
            description: beats[index]?.title || "",
            price: data.price,
            file_path: uploadedFiles.beats[index]?.audio || "",
            cover_image: uploadedFiles.beats[index]?.cover || "",
            bpm: beats[index]?.bpm || "",
          };
          if (!beatData.file_path && beats[index].audio) {
            beatData.file_path = await uploadFile(
              beats[index].audio,
              `beats[${index}].audio`
            );
          }
          if (!beatData.cover_image && beats[index].cover) {
            beatData.cover_image = await uploadFile(
              beats[index].cover,
              `beats[${index}].cover`
            );
          }
          return beatData;
        })
      ),
    };

    try {
      const res = await addBeats(formData);
      if (res.status === 201 || res.status === 200) {
        form.reset(defaultValues);
        setMainCoverImage(null);
        setZipFile(null);
        setBeats([{ audio: null, cover: null }]);
        setUploadedFiles({
          cover_image: "",
          file: "",
          beats: [],
        });
        setUploadProgress({});
        toast.success("Form submitted successfully!");
        router.push("/dashboard/beats");
      }
    } catch (error) {
      toast.error("Failed to submit the form.");
      console.log(error);
    } finally {
      setSubmitting(false);
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
                  accept="image/*"
                  onChange={(e) => {
                    field.onChange(e);
                    handleMainCoverImageChange(e);
                  }}
                />
              </FormControl>
              {mainCoverImage ? (
                <img
                  src={URL.createObjectURL(mainCoverImage)}
                  alt="Cover Preview"
                  className="mt-4 w-32 h-32 object-cover"
                />
              ) : null}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 items-center gap-4 w-full">
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
          <FormField
            control={form.control}
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
              <FormLabel className="text-primary">Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="description"
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
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Files For Download</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  placeholder="Files for download"
                  accept=".zip"
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
        <div>
          <div className="flex items-center justify-between gap-2 ">
            <h2 className="text-primary">Preview Audio Files</h2>
            <Button
              type="button"
              variant="outline"
              onClick={handleAddBeat}
              className="mt-4 text-black"
            >
              <PlusIcon className="mr-2 h-4 w-4" /> Add Another Beat
            </Button>
          </div>
          {beats.map((beat, index) => (
            <div key={index} className="flex gap-2 items-center ">
              <div className="grid grid-cols-2 items-center gap-2 w-full my-4">
                <FormItem>
                  <FormLabel className="text-primary">
                    Audio File {index + 1}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => handleBeatChange(e, index, "audio")}
                    />
                  </FormControl>
                  {beat.audio && <p className="mt-2">{beat.audio.name}</p>}
                </FormItem>
                <FormItem>
                  <FormLabel className="text-primary">
                    Cover Image {index + 1}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleBeatChange(e, index, "cover")}
                    />
                  </FormControl>
                  {beat.cover && <p className="mt-2">{beat.cover.name}</p>}
                </FormItem>
              </div>
              {index > 0 && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => handleRemoveBeat(index)}
                  className="col-span-2 mt-8"
                >
                  <TrashIcon className="mr-2 h-4 w-4" /> Remove
                </Button>
              )}
            </div>
          ))}
        </div>
        <Button type="submit" disabled={uploading || submitting}>
          {submitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default AddBeatForm;
