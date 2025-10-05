"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Star, Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import TestimonialForm from "@/components/forms/TestimonialForm";
import { DataTable } from "@/components/ui/datatable/data-table";
import { testimonialColumns } from "@/constants/table-columns/testimonial-table-column";
import { 
  useTestimonials, 
  useDeleteTestimonial, 
  useToggleTestimonialStatus 
} from "@/lib/hooks/useTestimonials";

const TestimonialsPage = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  // TanStack Query hooks
  const { 
    data: testimonials = [], 
    isLoading, 
    isError, 
    error 
  } = useTestimonials();

  const deleteTestimonialMutation = useDeleteTestimonial();
  const toggleStatusMutation = useToggleTestimonialStatus();

  const handleEdit = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id) => {
    deleteTestimonialMutation.mutate(id);
  };

  const handleToggleStatus = (id) => {
    const testimonial = testimonials.find(t => t.id === id);
    if (testimonial) {
      toggleStatusMutation.mutate({ 
        id, 
        isActive: !testimonial.isActive 
      });
    }
  };

  const handleFormSuccess = () => {
    // TanStack Query will automatically refetch data after mutations
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
    setSelectedTestimonial(null);
  };

  const columns = testimonialColumns(handleEdit, handleDelete, handleToggleStatus);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Testimonials</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{testimonials.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {testimonials.filter(t => t.isActive).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently visible
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.0</div>
            <p className="text-xs text-muted-foreground">
              Perfect score
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Plus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              New testimonials
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Testimonials</h3>
          <p className="text-sm text-muted-foreground">
            Manage and organize client testimonials
          </p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-black border-gray-500">
            <DialogHeader>
              <DialogTitle>Add New Testimonial</DialogTitle>
            </DialogHeader>
            <TestimonialForm 
              onSuccess={handleFormSuccess}
              onCancel={() => setIsAddDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Data Table */}
      <Card>
        <CardContent className="p-0">
          <DataTable 
            columns={columns} 
            data={testimonials}
            searchKey="name"
            searchPlaceholder="Search testimonials..."
            isLoading={isLoading}
          />
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-black border-gray-500">
          <DialogHeader>
            <DialogTitle>Edit Testimonial</DialogTitle>
          </DialogHeader>
          <TestimonialForm 
            testimonial={selectedTestimonial}
            onSuccess={handleFormSuccess}
            onCancel={() => {
              setIsEditDialogOpen(false);
              setSelectedTestimonial(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestimonialsPage;
