"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { TrashIcon, PlusIcon } from "lucide-react";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import { updateBeatsById } from "@/lib/hooks/services/universalFetch";
import { useRouter } from "next/navigation";

const UpdateBeatForm = ({ existingData }) => {
  const router = useRouter();

  const defaultValues = {
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
  };

  const form = useForm({
    defaultValues,
  });

  const [mainCoverImage, setMainCoverImage] = useState(null);
  const [zipFile, setZipFile] = useState(null);
  const [beats, setBeats] = useState(
    existingData.beats.map((beat) => ({
      audio: null,
      cover: null,
      ...beat,
    }))
  );
  const [uploadedFiles, setUploadedFiles] = useState({
    cover_image: existingData.cover_image_path,
    file: existingData.file,
    beats: existingData.beats.map((beat) => ({
      audio: beat.file_path,
      cover: beat.cover_image_path,
    })),
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

  useEffect(() => {
    form.reset(defaultValues);
  }, [existingData]);

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

  const handleRemoveFile = () => {
    setZipFile(null);
    setUploadedFiles((prev) => ({
      ...prev,
      file: null,
    }));
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
      const response = await axiosInstance.post("/fileupload?file", formData);
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
      // throw error;
    }
  };

  const onSubmit = async (data) => {
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
      const res = await updateBeatsById(existingData.collection_id, formData);
      console.log("res", res);
      if (res.status === 200) {
        form.reset();
        setBeats(null);
        setZipFile(null);
        router.push("/dashboard/beats");
      }
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
              ) : uploadedFiles.cover_image ? (
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
              {zipFile ? (
                <div className="mt-4">
                  <a
                    href={URL.createObjectURL(zipFile)}
                    download={zipFile.name}
                    className="text-primary"
                  >
                    Download {zipFile.name}
                  </a>
                  <Button
                    type="button"
                    onClick={handleRemoveFile}
                    className="ml-4"
                    variant="ghost"
                  >
                    <TrashIcon className="w-6 h-6" />
                  </Button>
                </div>
              ) : uploadedFiles.file ? (
                <div className="mt-4">
                  <a
                    href={uploadedFiles.file}
                    download
                    className="text-primary"
                  >
                    Download Existing File
                  </a>
                  <Button
                    type="button"
                    onClick={handleRemoveFile}
                    className="ml-4"
                    variant="ghost"
                  >
                    <TrashIcon className="w-6 h-6" />
                  </Button>
                </div>
              ) : null}
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
              {beats?.map((beat, index) => (
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
                        {beat.audio ? (
                          <audio
                            controls
                            src={URL.createObjectURL(beat.audio)}
                            className="mt-2 w-full"
                          />
                        ) : uploadedFiles.beats[index]?.audio ? (
                          <audio
                            controls
                            src={uploadedFiles.beats[index].audio}
                            className="mt-2 w-full"
                          />
                        ) : null}
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
                        {beat.cover ? (
                          <img
                            src={URL.createObjectURL(beat.cover)}
                            alt={`Cover Preview ${index + 1}`}
                            className="mt-4 w-32 h-32 object-cover"
                          />
                        ) : uploadedFiles.beats[index]?.cover ? (
                          <img
                            src={uploadedFiles.beats[index].cover}
                            alt={`Cover Preview ${index + 1}`}
                            className="mt-4 w-32 h-32 object-cover"
                          />
                        ) : null}
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
        <Button type="submit">Update</Button>
      </form>
    </Form>
  );
};

export default UpdateBeatForm;
