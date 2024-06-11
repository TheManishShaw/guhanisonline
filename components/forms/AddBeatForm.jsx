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
import { addBeats, updateBeatsById } from "@/lib/hooks/services/universalFetch";

const AddBeatForm = ({ type }) => {
  const existingData = {
    collection_id: 10,
    title: "Yimmy Yimmy",
    description:
      "Tayc | Shreya Ghoshal | Jacqueline Fernandez | Rajat N | Rana",
    price: 212,
    cover_image_path:
      "http://guhanapi.ivdata.in/storage/uploads/QjOs28Cm6JAkzg8fOOs0K8B3dBbuiInsgA8PfJIu.jpg",
    created_at: "2024-06-09T17:16:21.000000Z",
    updated_at: "2024-06-09T17:16:21.000000Z",
    beats: [
      {
        beat_id: 12,
        title: "Yimmy Yimmy(PagalWorld.com.sb)",
        description: null,
        price: 212,
        bpm: null,
        file_path: "",
        cover_image_path:
          "http://guhanapi.ivdata.in/storage/uploads/ThYKbtY8wfKrL2U2V9CWi3UnaMsoC2viIdPWzkjw.jpg",
        collection_id: 10,
        created_at: "2024-06-09T17:16:21.000000Z",
        updated_at: "2024-06-09T17:16:21.000000Z",
      },
    ],
  };
  const isUpdate = type === "edit";

  const defaultValues = isUpdate
    ? {
        title: existingData.title,
        description: existingData.description,
        cover_image: existingData.cover_image_path,
        file: existingData.file,
        price: existingData.price,
        beats: existingData.beats.map((beat) => ({
          audio: beat.file_path,
          cover: beat.cover_image_path,
          title: beat.title,
          description: beat.description || beat.title || "",
          price: beat.price,
        })),
      }
    : {
        title: "",
        description: "",
        cover_image: "",
        file: "",
        price: "",
        beats: [
          { audio: "", cover: "", title: "", description: "", price: "" },
        ],
      };

  const form = useForm({
    defaultValues,
  });

  const [mainCoverImage, setMainCoverImage] = useState(null);
  const [zipFile, setZipFile] = useState(null);
  const [beats, setBeats] = useState(
    isUpdate
      ? existingData.beats.map((beat) => ({
          audio: null,
          cover: null,
          ...beat,
        }))
      : [{ audio: null, cover: null }]
  );
  const [uploadedFiles, setUploadedFiles] = useState({
    cover_image: existingData ? existingData.cover_image_path : "",
    file: existingData ? existingData.file : "",
    beats: existingData
      ? existingData.beats.map((beat) => ({
          audio: beat.file_path,
          cover: beat.cover_image_path,
        }))
      : [],
  });

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

  const handleBeatChange = (event, index, type) => {
    const file = event.target.files[0];
    const newBeats = [...beats];

    if (type === "audio") {
      // Extract the title and BPM from the file name
      const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");
      const bpmMatch = fileNameWithoutExtension.match(/_bpm(\d+)/);
      const bpm = bpmMatch ? bpmMatch[1] : "";

      newBeats[index] = {
        ...newBeats[index],
        audio: file,
        title: fileNameWithoutExtension,
        bpm: bpm,
      };

      uploadFile(file, `beats[${index}].audio`);
    } else if (type === "cover") {
      newBeats[index] = {
        ...newBeats[index],
        cover: file,
      };

      uploadFile(file, `beats[${index}].cover`);
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

  const uploadFile = (file, type) => {
    const formData = new FormData();
    formData.append("file", file);

    return axiosInstance
      .post("/fileupload?file", formData)
      .then((response) => {
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
        return response.data;
      })
      .catch((error) => {
        toast.error(`Failed to upload file: ${file.name}`);
        console.error(`${type} upload error:`, error);
        throw error;
      });
  };

  const onSubmit = async (data) => {
    const formData = {
      title: data.title,
      description: data.description,
      price: data.price,
      file: uploadedFiles.file,
      cover_image: uploadedFiles.cover_image,
      beats: data.beats.map((beat, index) => ({
        title: beats[index]?.title || "",
        description: beat.description,
        price: data.price,
        file_path: uploadedFiles.beats[index]?.audio || "",
        cover_image: uploadedFiles.beats[index]?.cover || "",
        bpm: beats[index]?.bpm || "",
      })),
    };

    try {
      const res = isUpdate
        ? await updateBeatsById(existingData.collection_id, formData)
        : await addBeats(formData);
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
              ) : isUpdate && uploadedFiles.cover_image ? (
                <img
                  src={uploadedFiles.cover_image}
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
              <div className="w-full flex items-center justify-between">
                <FormLabel className="text-primary">
                  Preview Audio Files
                </FormLabel>
                <Button
                  type="button"
                  onClick={handleAddBeat}
                  className="bg-white text-black"
                  variant="ghost"
                >
                  <PlusIcon className="w-6 h-6 mr-2" />
                  Add Another Beat
                </Button>
              </div>
              {beats.map((beat, index) => (
                <div
                  key={index}
                  className="beat-item px-4 mb-2 pt-4 pb-6 border gap-4 rounded-lg flex items-center justify-between"
                >
                  <FormField
                    control={form.control}
                    name={`beats[${index}].audio`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-primary">
                          Audio File {index + 1}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="audio/*"
                            onChange={(e) => {
                              field.onChange(e);
                              handleBeatChange(e, index, "audio");
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`beats[${index}].cover`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-primary">
                          Cover Image {index + 1}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            className="w-full mb-4"
                            onChange={(e) => {
                              field.onChange(e);
                              handleBeatChange(e, index, "cover");
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <span
                    onClick={() => handleRemoveBeat(index)}
                    size="icon"
                    type="button"
                    className="text-black mt-8  p-2.5 rounded-lg bg-white hover:bg-red-500 hover:text-white"
                    variant="ghost"
                  >
                    <TrashIcon className="w-6 h-6 " />
                  </span>
                </div>
              ))}

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AddBeatForm;
