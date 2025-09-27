"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Upload, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const TestimonialForm = ({ testimonial, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: testimonial?.name || "",
    testimonial: testimonial?.testimonial || "",
    rating: testimonial?.rating || 5,
    design: testimonial?.design || "",
    company: testimonial?.company || "",
    photo: testimonial?.photo || "",
    video: testimonial?.video || "",
    isActive: testimonial?.isActive ?? true,
  });

  const [imagePreview, setImagePreview] = useState(testimonial?.photo || "");
  const [videoPreview, setVideoPreview] = useState(testimonial?.video || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setFormData(prev => ({
          ...prev,
          photo: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setVideoPreview(e.target.result);
        setFormData(prev => ({
          ...prev,
          video: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview("");
    setFormData(prev => ({
      ...prev,
      photo: ""
    }));
  };

  const removeVideo = () => {
    setVideoPreview("");
    setFormData(prev => ({
      ...prev,
      video: ""
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(testimonial ? "Testimonial updated successfully!" : "Testimonial added successfully!");
      onSuccess();
    } catch (error) {
      toast.error("Failed to save testimonial. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-6 h-6 cursor-pointer transition-colors ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'
        }`}
        onClick={() => handleInputChange('rating', i + 1)}
      />
    ));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Client Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter client name"
                required
              />
            </div>

            <div>
              <Label htmlFor="design">Position/Title</Label>
              <Input
                id="design"
                value={formData.design}
                onChange={(e) => handleInputChange('design', e.target.value)}
                placeholder="e.g., Music Producer, Artist"
              />
            </div>

            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="Company name (optional)"
              />
            </div>

            <div>
              <Label>Rating *</Label>
              <div className="flex items-center gap-2 mt-2">
                {renderStars(formData.rating)}
                <span className="text-sm text-gray-500 ml-2">
                  ({formData.rating}/5)
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Media Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Client Media</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Video Upload */}
            <div>
              <Label className="text-base font-medium">Video Testimonial</Label>
              {videoPreview ? (
                <div className="relative mt-2">
                  <video
                    src={videoPreview}
                    className="w-full h-48 object-cover rounded-lg"
                    controls
                    preload="metadata"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={removeVideo}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mt-2">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Upload video testimonial</p>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                    id="video-upload"
                  />
                  <Label htmlFor="video-upload" className="cursor-pointer">
                    <Button type="button" variant="outline">
                      Choose Video
                    </Button>
                  </Label>
                </div>
              )}

              <div className="mt-4">
                <Label htmlFor="video-url">Or enter video URL</Label>
                <Input
                  id="video-url"
                  value={formData.video}
                  onChange={(e) => {
                    setVideoPreview(e.target.value);
                    handleInputChange('video', e.target.value);
                  }}
                  placeholder="https://example.com/video.mp4"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <Label className="text-base font-medium">Client Photo (Optional)</Label>
              {imagePreview ? (
                <div className="relative mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={removeImage}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mt-2">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Upload client photo</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <Label htmlFor="photo-upload" className="cursor-pointer">
                    <Button type="button" variant="outline">
                      Choose Photo
                    </Button>
                  </Label>
                </div>
              )}

              <div className="mt-4">
                <Label htmlFor="photo-url">Or enter image URL</Label>
                <Input
                  id="photo-url"
                  value={formData.photo}
                  onChange={(e) => {
                    setImagePreview(e.target.value);
                    handleInputChange('photo', e.target.value);
                  }}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Testimonial Content */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Testimonial Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="testimonial">
              Testimonial Text {!formData.video ? "*" : "(Optional - Video will be used if provided)"}
            </Label>
            <Textarea
              id="testimonial"
              value={formData.testimonial}
              onChange={(e) => handleInputChange('testimonial', e.target.value)}
              placeholder="Enter the client's testimonial text (optional if video is provided)..."
              rows={6}
              required={!formData.video}
            />
            <p className="text-sm text-gray-500 mt-2">
              {formData.testimonial.length} characters
            </p>
            {formData.video && (
              <p className="text-sm text-blue-600 mt-2">
                ✓ Video testimonial will be displayed instead of text
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="status">Visibility</Label>
            <Select
              value={formData.isActive ? "active" : "inactive"}
              onValueChange={(value) => handleInputChange('isActive', value === "active")}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active (Visible on website)</SelectItem>
                <SelectItem value="inactive">Inactive (Hidden from website)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : testimonial ? "Update Testimonial" : "Add Testimonial"}
        </Button>
      </div>
    </form>
  );
};

export default TestimonialForm;
