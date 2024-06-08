"use client";
import React, { useCallback, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { addBlog } from "@/lib/hooks/services/universalFetch";
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

Quill.register("modules/imageResize", ImageResize);

const BlogForm = () => {
  const form = useForm({
    // resolver: zodResolver(beatsFormSchema),
    defaultValues: {
      title: "",
      content: "",
      summary: "",
      tags: "",
    },
  });

  const fileInputRef = useRef(null); // Add useRef for file input
  const [image, setImage] = useState(null);
  const [editorHtml, setEditorHtml] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // State for submission status

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleEditorChange = useCallback((html) => {
    setEditorHtml(html);
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true); // Set submitting state to true
    console.log("data", data);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("image", image);
    formData.append("content", data.content);
    formData.append("summary", editorHtml);
    formData.append("tags", data.tags);

    try {
      const response = await addBlog(formData);
      if (response.status === 201) {
        toast.success(response?.data?.message ?? "Blog Created Successfully");
        form.reset();
        setImage(null); // Clear image state
        setImagePreview(null); // Clear image preview
        setEditorHtml(""); // Clear editor HTML
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Clear file input value
        }
      }
    } catch (error) {
      console.error("Error uploading the image", error);
    } finally {
      setIsSubmitting(false); // Set submitting state to false
    }
  };

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
                  ref={fileInputRef} // Attach ref to the input
                />
              </FormControl>
              {imagePreview && (
                <Image
                  src={imagePreview}
                  alt="Cover Preview"
                  width={32}
                  height={32}
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
    // toggle to add extra line breaks when pasting HTML:
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
