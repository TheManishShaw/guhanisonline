"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const testimonialColumns = (onEdit, onDelete, onToggleStatus) => [
  {
    accessorKey: "photo",
    header: "Photo",
    cell: ({ row }) => {
      const testimonial = row.original;
      return (
        <Avatar className="h-12 w-12">
          <AvatarImage src={testimonial.photo} alt={testimonial.name} />
          <AvatarFallback>
            {testimonial.name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const testimonial = row.original;
      return (
        <div>
          <div className="font-medium">{testimonial.name}</div>
          {(testimonial.designation || testimonial.design) && (
            <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.designation || testimonial.design}</div>
          )}
          {testimonial.company && (
            <div className="text-sm text-primary">{testimonial.company}</div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "testimonial",
    header: "Content",
    cell: ({ row }) => {
      const testimonial = row.original;
      const content = testimonial.content || testimonial.testimonial;
      const isVideo = testimonial.content_type === "video" || testimonial.video;
      const truncatedText = content && content.length > 100 
        ? content.substring(0, 100) + "..." 
        : content;
      
      return (
        <div className="max-w-xs">
          {isVideo ? (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm text-red-600 dark:text-red-400 font-medium">Video</span>
            </div>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-300 italic">"{truncatedText}"</p>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      const rating = row.original.rating;
      return (
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'
              }`}
            />
          ))}
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">({rating})</span>
        </div>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.original.isActive;
      return (
        <Badge variant={isActive ? "default" : "secondary"}>
          {isActive ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return (
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {date.toLocaleDateString()}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const testimonial = row.original;
      return (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleStatus(testimonial.id)}
            title={testimonial.isActive ? "Hide testimonial" : "Show testimonial"}
          >
            {testimonial.isActive ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(testimonial)}
            title="Edit testimonial"
          >
            <Edit className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(testimonial.id)}
            title="Delete testimonial"
            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
