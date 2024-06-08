"use client";
import React, { useCallback, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { addClientele } from "@/lib/hooks/services/universalFetch";
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
import ImageResize from "quill-image-resize-module-react";
import { toast } from "sonner";
import Image from "next/image";

const ClienteleForm = () => {
  const form = useForm({
    // resolver: zodResolver(beatsFormSchema),
    defaultValues: {
      name: "",
      design: "",
      testimonial: "",
    },
  });

  const fileInputRef = useRef(null); // Add useRef for file input
  const [image, setImage] = useState(null);
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

  const onSubmit = async (data) => {
    setIsSubmitting(true); // Set submitting state to true
    console.log("data", data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("photo", image);
    formData.append("design", data.design);
    formData.append("testimonial", data.testimonial);
    try {
      const response = await addClientele(formData);
      if (response.status === 201) {
        toast.success("Clientele Created Successfully");
        form.reset();
        setImage(null); // Clear image state
        setImagePreview(null); // Clear image preview
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Clear file input value
        }
      }
    } catch (error) {
      console.error("Error uploading the image", error);
      setIsSubmitting(false); // Set submitting state to false
    } finally {
      setIsSubmitting(false); // Set submitting state to false
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary"> Client Image</FormLabel>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="design"
            className="w-full"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">Designation</FormLabel>
                <FormControl>
                  <Input placeholder="Founder" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="testimonial"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Testimonial</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="testimonial"
                  className="resize-none"
                  {...field}
                />
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

export default ClienteleForm;
