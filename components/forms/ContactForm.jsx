import React, { useEffect } from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";

import { useMutation } from "@tanstack/react-query";
import { contactForm } from "@/lib/hooks/services/universalFetch";
import { contactFormSchema } from "@/lib/validation/validation";
import { toast } from "sonner";
import { Send } from "lucide-react";

const ContactForm = () => {
  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      message: "",
    },
  });
  const { mutate, isLoading, isError, isSuccess, status, data } = useMutation({
    mutationFn: (formData) => contactForm(formData),
    onSuccess: async (res) => {
      toast.success(`${res?.data?.message}`);
      form.reset();
    },
    onError: async (error) => toast.error(error),
  });

  function onSubmit(formData) {
    mutate(formData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-medium">First Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="John" 
                    className="bg-black/40 border-gray-600 text-white placeholder-gray-400 focus:border-[#5eead4] focus:ring-[#5eead4]/20" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-medium">Last Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Doe" 
                    className="bg-black/40 border-gray-600 text-white placeholder-gray-400 focus:border-[#5eead4] focus:ring-[#5eead4]/20" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-medium">Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="john@example.com" 
                    type="email"
                    className="bg-black/40 border-gray-600 text-white placeholder-gray-400 focus:border-[#5eead4] focus:ring-[#5eead4]/20" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-medium">Phone</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="+1 (555) 123-4567" 
                    className="bg-black/40 border-gray-600 text-white placeholder-gray-400 focus:border-[#5eead4] focus:ring-[#5eead4]/20" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white font-medium">Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your project, ideas, or any questions you have..."
                  className="resize-none bg-black/40 border-gray-600 text-white placeholder-gray-400 focus:border-[#5eead4] focus:ring-[#5eead4]/20 min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        <Button 
          disabled={isLoading} 
          className="w-full bg-gradient-to-r from-[#5eead4] to-cyan-400 hover:from-[#5eead4]/90 hover:to-cyan-400/90 text-black font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed" 
          type="submit"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
              Sending...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Send Message
            </div>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
