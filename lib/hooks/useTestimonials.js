import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getAllTestimonialList, 
  getTestimonialById, 
  addTestimonial, 
  updateTestimonialById, 
  deleteTestimonialById 
} from "./services/universalFetch";
import { toast } from "sonner";

// Query Keys
export const testimonialKeys = {
  all: ['testimonials'],
  lists: () => [...testimonialKeys.all, 'list'],
  list: (filters) => [...testimonialKeys.lists(), { filters }],
  details: () => [...testimonialKeys.all, 'detail'],
  detail: (id) => [...testimonialKeys.details(), id],
};

// Get all testimonials
export const useTestimonials = () => {
  return useQuery({
    queryKey: testimonialKeys.lists(),
    queryFn: getAllTestimonialList,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get single testimonial
export const useTestimonial = (id) => {
  return useQuery({
    queryKey: testimonialKeys.detail(id),
    queryFn: () => getTestimonialById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Create testimonial mutation
export const useCreateTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTestimonial,
    onSuccess: (data) => {
      // Invalidate and refetch testimonials list
      queryClient.invalidateQueries({ queryKey: testimonialKeys.lists() });
      toast.success("Testimonial created successfully!");
    },
    onError: (error) => {
      console.error("Error creating testimonial:", error);
      toast.error("Failed to create testimonial. Please try again.");
    },
  });
};

// Update testimonial mutation
export const useUpdateTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateTestimonialById(id, data),
    onSuccess: (data, variables) => {
      // Invalidate and refetch testimonials list
      queryClient.invalidateQueries({ queryKey: testimonialKeys.lists() });
      // Invalidate specific testimonial detail
      queryClient.invalidateQueries({ queryKey: testimonialKeys.detail(variables.id) });
      toast.success("Testimonial updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating testimonial:", error);
      toast.error("Failed to update testimonial. Please try again.");
    },
  });
};

// Delete testimonial mutation
export const useDeleteTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTestimonialById,
    onSuccess: (data, testimonialId) => {
      // Invalidate and refetch testimonials list
      queryClient.invalidateQueries({ queryKey: testimonialKeys.lists() });
      // Remove specific testimonial from cache
      queryClient.removeQueries({ queryKey: testimonialKeys.detail(testimonialId) });
      toast.success("Testimonial deleted successfully!");
    },
    onError: (error) => {
      console.error("Error deleting testimonial:", error);
      toast.error("Failed to delete testimonial. Please try again.");
    },
  });
};

// Toggle testimonial status mutation
export const useToggleTestimonialStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isActive }) => updateTestimonialById(id, { isActive }),
    onSuccess: (data, variables) => {
      // Invalidate and refetch testimonials list
      queryClient.invalidateQueries({ queryKey: testimonialKeys.lists() });
      // Invalidate specific testimonial detail
      queryClient.invalidateQueries({ queryKey: testimonialKeys.detail(variables.id) });
      toast.success(`Testimonial ${variables.isActive ? 'activated' : 'deactivated'} successfully!`);
    },
    onError: (error) => {
      console.error("Error toggling testimonial status:", error);
      toast.error("Failed to update testimonial status. Please try again.");
    },
  });
};
