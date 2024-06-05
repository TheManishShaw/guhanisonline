"use client";
import React, { useState, useRef, useCallback } from "react";
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
Quill.register("modules/imageResize", ImageResize);

import { Label } from "../ui/label";
import { addBlog } from "@/lib/hooks/services/universalFetch";
import { FileUploader } from "react-drag-drop-files";
import { blogFormSchema } from "@/lib/validation/validation";

const fileTypes = ["JPG", "PNG", "GIF"];
const BlogForm = ({ type }) => {
  const form = useForm({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: "",
      tags: "",
    },
  });
  const [editorHtml, setEditorHtml] = useState("");
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
  async function onSubmit(data) {
    const formData = {
      ...data,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      summary: editorHtml,
      image: file?.name || "",
    };
    console.log("formData", formData);
    try {
      const res = await addBlog(formData);
      if (res.status === 201) {
        form.reset();
        setEditorHtml("");
        setFile(null);
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  const handleEditorChange = useCallback((html) => {
    setEditorHtml(html);
  }, []);

  console.log("from", form.formState.isLoading);
  return (
    <>
      {" "}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          encType="multipart/form-data"
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
          <div>
            <Label className="text-primary mt-2 pb-1">
              Description (optional)
            </Label>
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

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};

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

export default BlogForm;
