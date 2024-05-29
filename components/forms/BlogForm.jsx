"use client";
import React, { useState } from "react";
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
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { PlusIcon } from "lucide-react";
import { Label } from "../ui/label";
import { addBlog } from "@/lib/hooks/services/universalFetch";
const FormSchema = z.object({
  title: z.string().min(2, { message: "Enter a title" }),
  tags: z.string(),
});
const BlogForm = ({ type }) => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      tags: "",
    },
  });

  const [image, setImage] = useState(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(data) {
    const fromData = {
      ...data,
      content: editorState,
      image_url: image || "",
    };
    try {
      const res = await addBlog(fromData);
      console.log("res===>", res);
    } catch (error) {
      console.log("error", error);
    }
  }
  return (
    <>
      {" "}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="w-full space-y-6"
        >
          <div className=" flex justify-center items-center">
            <label
              className="relative w-full h-52 border-2 border-gray-300 border-dashed rounded-lg flex justify-center items-center cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileInput}
              />
              {image ? (
                <img
                  src={image}
                  alt="Uploaded"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center space-y-2">
                  <PlusIcon className="h-10 w-10 text-gray-400" />
                  <span className="text-sm text-gray-400">Drop image here</span>
                </div>
              )}
            </label>
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
            <div className="text-black border mt-1 rounded-md">
              <Editor
                editorState={editorState}
                toolbarClassName="text-black"
                wrapperClassName="bg-white"
                editorClassName=" text-black px-2 "
                onEditorStateChange={onEditorStateChange}
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

export default BlogForm;
