"use client";
import React, { useCallback, useRef, useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  addBlog,
  updateBlogById,
  uploadFiles,
} from "@/lib/hooks/services/universalFetch";
import "react-quill/dist/quill.snow.css";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import { toast } from "sonner";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogFormSchema } from "@/lib/validation/validation";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

Quill.register("modules/imageResize", ImageResize);

const BlogForm = ({ type, existingData }) => {
  const params = useParams();
  const router = useRouter();
  const isUpdate = type === "update";

  const form = useForm({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: "",
      content: "",
      summary: "",
      tags: "",
    },
  });

  const { reset } = form;
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [editorHtml, setEditorHtml] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (existingData) {
      reset({
        title: existingData.title || "",
        content: existingData.content || "",
        summary: existingData.summary || "",
        tags: existingData.tags || "",
      });
      setImage(existingData.image);
      setEditorHtml(existingData.summary);
      setImagePreview(existingData.image);
    }
  }, [existingData, reset]);
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));

      try {
        const formData = new FormData();
        formData.append("file", file);
        const imageUrl = await uploadFiles(formData);
        setImage(imageUrl); // Set the image URL from the response
      } catch (error) {
        console.error("Error uploading the image", error);
        toast.error(
          `Image upload failed ${
            error?.response?.data?.message ?? error?.message
          }`
        );
      }
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };
  const handleEditorChange = useCallback((html) => {
    setEditorHtml(html);
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const payload = {
        title: data.title,
        image: image.file_path, // Image URL is already set by handleImageChange
        content: data.content,
        summary: editorHtml,
        tags: data.tags,
      };

      const response = isUpdate
        ? await updateBlogById(params.blog_id, payload)
        : await addBlog(payload);

      console.log("response", response);

      if (response?.status === 201 || response?.status === 200) {
        toast.success(
          response?.data?.message ??
            (isUpdate
              ? "Blog Updated Successfully"
              : "Blog Created Successfully")
        );
        form.reset();
        setImage(null);
        setImagePreview(null);
        setEditorHtml("");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        if (isUpdate) {
          router.push("/dashboard/blogs");
        }
      }
    } catch (error) {
      console.error("Error submitting the form", error);
      toast.error(`Something went wrong on our end: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  console.log("image=========>", image);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="image"
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
                    handleImageChange(e);
                  }}
                  ref={fileInputRef}
                />
              </FormControl>
              {imagePreview && (
                <Image
                  src={imagePreview}
                  alt="Cover Preview"
                  width={128}
                  height={128}
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
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Content (optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="content"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Label className="text-primary mt-2 pb-1">Summary (optional)</Label>
          <div className="text-white border mt-1 rounded-md">
            <ReactQuill
              theme="snow"
              onChange={handleEditorChange}
              value={editorHtml}
              modules={modules}
              formats={formats}
              bounds={"#root"}
              placeholder="Write something..."
            />
          </div>
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
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default BlogForm;

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
  imageResize: {
    parchment: Quill.import("parchment"),
    modules: ["Resize", "DisplaySize"],
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];
