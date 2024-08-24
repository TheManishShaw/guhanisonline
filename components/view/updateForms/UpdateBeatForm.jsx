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
import Spinner from "@/components/ui/Spinner";

const UpdateBeatForm = ({ existingData }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    title: "",
    description: "",
    cover_image: "",
    file: "",
    price: "",
    beats: [],
  };

  const form = useForm({
    defaultValues: initialValues,
  });

  const [mainCoverImage, setMainCoverImage] = useState(null);
  const [zipFile, setZipFile] = useState(null);
  const [beats, setBeats] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState({
    cover_image: "",
    file: "",
    beats: [],
  });

  useEffect(() => {
    if (existingData) {
      const updatedValues = {
        title: existingData?.title || "",
        description: existingData?.description || "",
        cover_image: existingData?.cover_image_path || "",
        file: existingData?.file_path || "",
        price: existingData?.price || "",
        beats:
          existingData?.beats?.map((beat) => ({
            audio: beat?.file_path || "",
            cover: beat?.cover_image_path || "",
            title: beat?.title || "",
            description: beat?.description || beat?.title || "",
            price: beat?.price || "",
          })) || [],
      };

      form.reset(updatedValues);
      // form.setValue(updatedValues);
      setBeats(
        existingData?.beats?.map((beat) => ({
          audio: null,
          cover: null,
          ...beat,
        })) || []
      );

      setUploadedFiles({
        cover_image: existingData?.cover_image_path || "",
        file: existingData?.file_path || "",
        beats:
          existingData?.beats?.map((beat) => ({
            audio: beat?.file_path || "",
            cover: beat?.cover_image_path || "",
          })) || [],
      });
    }
  }, [existingData, form]);

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
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
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
            description: beats[index]?.description || "",
            price: beats[index]?.price || "",
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

      if (res.status === 200) {
        toast.success("Beats updated successfully");
        form.reset();
        setBeats([]);
        setZipFile(null);
        setUploadedFiles({
          cover_image: "",
          file: "",
          beats: [],
        });
        router.push("/dashboard/beats");
      }
    } catch (error) {
      setIsLoading(false);
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
        <div className="grid grid-cols-2 gap-4">
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
                  <Input placeholder="price" {...field} />
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
                <Textarea placeholder="description" {...field} />
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
              <FormLabel className="text-primary">Zip File</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  placeholder="zip file"
                  accept=".zip"
                  onChange={(e) => {
                    field.onChange(e);
                    handleZipFileChange(e);
                  }}
                />
              </FormControl>
              {zipFile ? (
                <div className="mt-2 flex items-center">
                  <p className="mr-2">{zipFile.name}</p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="bg-white"
                    onClick={handleRemoveFile}
                  >
                    <TrashIcon className="w-4 h-4 text-red-600 hover:text-white" />
                  </Button>
                </div>
              ) : uploadedFiles.file ? (
                <div className="mt-2 flex justify-between items-center">
                  <p className="mr-2">{uploadedFiles.file}</p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="bg-white hover:bg-red-500 text-red-600  hover:text-white"
                    onClick={handleRemoveFile}
                  >
                    <TrashIcon className="w-4 h-4 " />
                  </Button>
                </div>
              ) : null}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-8">
          <div className="flex items-center justify-between ">
            <h2 className="text-2xl font-bold mb-4">Beats</h2>
            <Button
              type="button"
              variant="outline"
              className="mt-4 text-black"
              onClick={handleAddBeat}
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Beat
            </Button>
          </div>
          {beats?.map((beat, index) => (
            <div key={index} className="mb-6 border-b pb-6">
              <FormItem>
                <FormLabel className="text-primary">Beat {index + 1}</FormLabel>
                <div className="flex items-center justify-between gap-2">
                  <div className="grid w-full grid-cols-2 gap-4 mb-2">
                    <div>
                      <FormLabel className="text-primary">Audio File</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="audio/*"
                          onChange={(e) => handleBeatChange(e, index, "audio")}
                        />
                      </FormControl>
                      {beat.audio ? (
                        <audio
                          controls
                          src={URL.createObjectURL(beat.audio)}
                          className="mt-4 w-full"
                        >
                          Your browser does not support the audio element.
                        </audio>
                      ) : uploadedFiles.beats[index]?.audio ? (
                        <audio
                          controls
                          src={uploadedFiles.beats[index].audio}
                          className="mt-4 w-full"
                        >
                          Your browser does not support the audio element.
                        </audio>
                      ) : null}
                    </div>
                    <div>
                      <FormLabel className="text-primary">
                        Cover Image
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleBeatChange(e, index, "cover")}
                        />
                      </FormControl>
                      {beat.cover ? (
                        <img
                          src={URL.createObjectURL(beat.cover)}
                          alt="Cover Preview"
                          className="mt-4 w-32 h-32 object-cover"
                        />
                      ) : uploadedFiles.beats[index]?.cover ? (
                        <img
                          src={uploadedFiles.beats[index].cover}
                          alt="Cover Preview"
                          className="mt-4 w-32 h-32 object-cover"
                        />
                      ) : null}
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="mt-4 bg-white hover:bg-red-500 hover:text-white"
                    onClick={() => handleRemoveBeat(index)}
                  >
                    <TrashIcon className="w-4 h-4 text-red-600 hover:text-white" />
                  </Button>
                </div>
                <div className=" hidden grid-cols-2 items-center gap-4">
                  <FormControl>
                    <Input
                      placeholder="title"
                      value={beat.title || ""}
                      onChange={(e) =>
                        setBeats((prev) =>
                          prev.map((b, i) =>
                            i === index ? { ...b, title: e.target.value } : b
                          )
                        )
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <Input
                      placeholder="price"
                      value={beat.price || ""}
                      onChange={(e) =>
                        setBeats((prev) =>
                          prev.map((b, i) =>
                            i === index ? { ...b, price: e.target.value } : b
                          )
                        )
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <Textarea
                      placeholder="description"
                      value={beat.description || ""}
                      onChange={(e) =>
                        setBeats((prev) =>
                          prev.map((b, i) =>
                            i === index
                              ? { ...b, description: e.target.value }
                              : b
                          )
                        )
                      }
                    />
                  </FormControl>
                </div>
              </FormItem>
            </div>
          ))}
        </div>
        <Button disabled={isLoading} type="submit">
          {isLoading ? <Spinner /> : "Update Beat"}
        </Button>
      </form>
    </Form>
  );
};

export default UpdateBeatForm;
