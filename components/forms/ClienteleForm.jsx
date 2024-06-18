"use client";
import React, { useCallback, useRef, useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  addClientele,
  updateClientele,
} from "@/lib/hooks/services/universalFetch"; // Assuming updateClientele is available
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

const ClienteleForm = ({ initialData, clienteleId }) => {
  const form = useForm({
    defaultValues: {
      name: initialData?.name || "",
      design: initialData?.design || "",
      testimonial: initialData?.testimonial || "",
    },
  });

  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    initialData?.photoUrl || null
  ); // Use existing photo URL if available
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData?.photoUrl) {
      setImagePreview(initialData.photoUrl);
    }
  }, [initialData]);

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
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("name", data.name);
    if (image) {
      formData.append("photo", image);
    }
    formData.append("design", data.design);
    formData.append("testimonial", data.testimonial);

    try {
      let response;
      if (clienteleId) {
        response = await updateClientele(clienteleId, formData);
      } else {
        response = await addClientele(formData);
      }

      if (response.status === 201 || response.status === 200) {
        toast.success(
          `Clientele ${clienteleId ? "Updated" : "Created"} Successfully`
        );
        form.reset();
        setImage(null);
        setImagePreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    } catch (error) {
      console.error("Error uploading the image", error);
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
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
              <FormLabel className="text-primary">Client Image</FormLabel>
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
          {isSubmitting ? "Submitting..." : clienteleId ? "Update" : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default ClienteleForm;
