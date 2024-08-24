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
import { useFieldArray, useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { TrashIcon, PlusIcon } from "lucide-react";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import { addBeats } from "@/lib/hooks/services/universalFetch";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { beatsFormSchema } from "@/lib/validation/validation";
import Image from "next/image";

const AddBeatForm = () => {
  const router = useRouter();
  const defaultValues = {
    title: "",
    description: "",
    cover_image: "",
    file: "",
    price: "",
    beats: [
      {
        file_path: "",
        cover_image: "",
        title: "",
        description: "",
        price: null,
        bpm: "",
      },
    ],
  };

  const form = useForm({
    resolver: zodResolver(beatsFormSchema),
    defaultValues,
  });

  const [mainCoverImage, setMainCoverImage] = useState(null);
  const [mainCoverImagePreview, setMainCoverImagePreview] = useState(null);
  const [zipFile, setZipFile] = useState(null);

  const [beats, setBeats] = useState([...defaultValues.beats]);
  const [uploadedFiles, setUploadedFiles] = useState({
    cover_image: "",
    file: "",
    beats: [],
  });
  const [uploadProgress, setUploadProgress] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (file, type) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      setUploading(true);
      const response = await axiosInstance.post("/fileupload?file", formData);
      toast.success(`File uploaded successfully: ${file.name}`);
      return response.data.file_path;
    } catch (error) {
      toast.error(`Failed to upload file: ${file.name}`);
      console.error(`${type} upload error:`, error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleMainCoverImageChange = async (event) => {
    const file = event.target.files[0];
    const fileUrl = await handleFileUpload(file, "cover_image");
    console.log("cover_image response===>", fileUrl);
    if (fileUrl) {
      setMainCoverImagePreview(file);
      setMainCoverImage(fileUrl);
      // setUploadedFiles((prev) => ({ ...prev, cover_image: fileUrl }));
    }
  };

  const handleZipFileChange = async (event) => {
    const file = event.target.files[0];
    const fileUrl = await handleFileUpload(file, "file");
    console.log("zip file response===>", fileUrl);
    if (fileUrl) {
      setZipFile(fileUrl);
      // setUploadedFiles((prev) => ({ ...prev, file: fileUrl }));
    }
  };

  const handleBeatChange = async (event, index, type) => {
    try {
      const file = event.target.files[0];
      if (!file) {
        console.error("No file selected");
        return;
      }

      console.log("file", file);

      // Upload the file and get the URL
      const fileUrl = await handleFileUpload(file, `beats[${index}].${type}`);
      if (!fileUrl) {
        console.error("File upload failed");
        return;
      }

      console.log(`${type} file upload ======>`, fileUrl);

      // Update the state using a callback
      setBeats((prevBeats) => {
        const updatedBeats = [...prevBeats];

        if (type === "audio") {
          const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");
          const bpmMatch = fileNameWithoutExtension.match(/_bpm(\d+)/);
          const bpm = bpmMatch ? bpmMatch[1] : "";

          updatedBeats[index] = {
            ...updatedBeats[index],
            file_path: fileUrl,
            bpm: bpm,
            title: fileNameWithoutExtension,
            description: fileNameWithoutExtension,
          };
        } else if (type === "cover") {
          updatedBeats[index] = {
            ...updatedBeats[index],
            cover_image: fileUrl,
          };
        }

        console.log("Updated Beats:", updatedBeats);
        return updatedBeats;
      });
    } catch (error) {
      console.error("Error handling beat change:", error);
    }
  };

  const {
    fields: beatsFields,
    append: appendBeats,
    remove: removeBeats,
  } = useFieldArray({
    control: form.control,
    name: "beats",
  });
  console.log("beats", beats);
  const onSubmit = async (data) => {
    setSubmitting(true);
    const formData = {
      ...data,
      file: zipFile,
      cover_image: mainCoverImage,
      beats: beats.map((beat, index) => ({
        ...beat,
        price: data.price,
      })),
    };
    console.log("formData", formData);
    try {
      const res = await addBeats(formData);
      if (res.status === 201 || res.status === 200) {
        form.reset(defaultValues);
        setMainCoverImage(null);
        setZipFile(null);
        setBeats([...defaultValues.beats]);
        setUploadedFiles({ cover_image: "", file: "", beats: [] });
        setUploadProgress({});
        toast.success("Form submitted successfully!");
        router.push("/dashboard/beats");
      }
    } catch (error) {
      console.error("Failed to submit the form.", error);
      toast.error(
        error?.response?.data.message || "Failed to submit the form."
      );
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
                  placeholder="Cover image"
                  accept="image/*"
                  onChange={(e) => {
                    field.onChange(e);
                    handleMainCoverImageChange(e);
                  }}
                />
              </FormControl>
              {mainCoverImage && (
                <img
                  src={URL.createObjectURL(mainCoverImagePreview)}
                  alt="Cover Preview"
                  className="mt-4 w-32 h-32 object-cover"
                />
              )}
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
                  <Input placeholder="Title" {...field} />
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

        <div className="flex items-center justify-between gap-2 ">
          <h2 className="text-primary text-2xl">Preview Audio Files</h2>
          <Button
            type="button"
            variant="outline"
            onClick={() => appendBeats({ audio: "", cover: "" })}
            className="mt-4 text-black"
          >
            <PlusIcon className="h-6 w-6 mr-2" /> Add Beat
          </Button>
        </div>

        {beatsFields.map((beat, index) => (
          <div key={beat.id} className="flex items-center gap-4 mb-2">
            <FormField
              className="w-full"
              control={form.control}
              name={`beats[${index}].audio`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-primary">Audio File</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      placeholder="Audio File"
                      accept="audio/*"
                      onChange={(e) => {
                        field.onChange(e);
                        handleBeatChange(e, index, "audio");
                      }}
                    />
                  </FormControl>
                  {beats[index]?.audio && (
                    <audio controls src={beats[index].audio} className="mt-4" />
                  )}
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
                    Beat Cover Image
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      placeholder="Cover Image"
                      accept="image/*"
                      onChange={(e) => {
                        field.onChange(e);
                        handleBeatChange(e, index, "cover");
                      }}
                    />
                  </FormControl>
                  {beats[index]?.cover && (
                    <img
                      src={beats[index].cover}
                      alt={`Cover Preview ${index}`}
                      className="mt-4 w-16 h-16 object-cover"
                    />
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name={`beats[${index}].title`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Beat Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Beat Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            {/* <FormField
              control={form.control}
              name={`beats[${index}].price`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Price" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <Button
              type="button"
              variant="ghost"
              className="mt-8 border-gray-50 bg-slate-50 hover:text-red-600 text-black"
              onClick={() => removeBeats(index)}
            >
              <TrashIcon className="h-6 w-6" />
            </Button>
          </div>
        ))}

        <Button
          type="submit"
          className="text-white"
          disabled={uploading || submitting}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AddBeatForm;
