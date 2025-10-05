"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Upload, X, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { useCreateTestimonial, useUpdateTestimonial, useToggleTestimonialStatus } from "@/lib/hooks/useTestimonials";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";

const TestimonialForm = ({ testimonial, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: testimonial?.name || "",
    testimonial: testimonial?.testimonial || "",
    rating: testimonial?.rating || 5,
    designation: testimonial?.designation || testimonial?.design || "",
    company: testimonial?.company || "",
    photo: testimonial?.photo || "",
    content_type: testimonial?.content_type || (testimonial?.video ? "video" : "text"),
    content: testimonial?.content || testimonial?.video || "",
    isActive: testimonial?.isActive ?? true,
  });

  const [imagePreview, setImagePreview] = useState(testimonial?.photo || "");
  const [videoPreview, setVideoPreview] = useState(testimonial?.content || testimonial?.video || "");
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploading, setUploading] = useState(false);

  // Refs for file inputs
  const videoInputRef = useRef(null);
  const imageInputRef = useRef(null);

  // TanStack Query mutations
  const createTestimonialMutation = useCreateTestimonial();
  const updateTestimonialMutation = useUpdateTestimonial();
  const toggleStatusMutation = useToggleTestimonialStatus();

  // File upload handler following the working pattern from AddBeatForm
  const handleFileUpload = async (file, type) => {
    console.log(`Starting ${type} upload for file:`, file.name, 'Size:', file.size);
    const formData = new FormData();
    formData.append("file", file);
    try {
      setUploading(true);
      const response = await axiosInstance.post("/fileupload?file", formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`Upload progress for ${type}:`, percentCompleted + '%');
          setUploadProgress((prev) => ({
            ...prev,
            [type]: percentCompleted,
          }));
        },
      });
      console.log('Upload response:', response);
      console.log('Response data:', response.data);
      toast.success(`File uploaded successfully: ${file.name}`);
      return response.data.file_path;
    } catch (error) {
      toast.error(`Failed to upload file: ${file.name}`);
      console.error(`${type} upload error:`, error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText
      });
      return null;
    } finally {
      setUploading(false);
      setUploadProgress((prev) => ({
        ...prev,
        [type]: 0,
      }));
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStatusChange = async (value) => {
    const isActive = value === "active";
    
    // If this is an existing testimonial, use the update API with correct field name
    if (testimonial && testimonial.id) {
      updateTestimonialMutation.mutate(
        { 
          id: testimonial.id, 
          data: { is_active: isActive ? 1 : 0 } // Send in the format API expects
        },
        {
          onSuccess: () => {
            // Update local state to reflect the change
            setFormData(prev => ({
              ...prev,
              isActive
            }));
          }
        }
      );
    } else {
      // For new testimonials, just update the local state
      setFormData(prev => ({
        ...prev,
        isActive
      }));
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (e.g., max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        toast.error('Image file is too large. Please choose a file smaller than 10MB.');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file.');
        return;
      }

      // Create preview first
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);

      // Upload file using the working pattern
      const filePath = await handleFileUpload(file, 'image');
      if (filePath) {
        setFormData(prev => ({
          ...prev,
          photo: filePath
        }));
      } else {
        setImagePreview("");
      }
    }
  };

  const handleVideoUpload = async (e) => {
    console.log('handleVideoUpload called', e.target.files);
    const file = e.target.files[0];
    console.log('Selected file:', file);
    console.log('File details:', {
      name: file?.name,
      size: file?.size,
      type: file?.type,
      lastModified: file?.lastModified
    });
    if (file) {
      // Validate file size (e.g., max 200MB)
      const maxSize = 200 * 1024 * 1024; // 200MB
      if (file.size > maxSize) {
        toast.error('Video file is too large. Please choose a file smaller than 200MB.');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('video/')) {
        toast.error('Please select a valid video file.');
        return;
      }

      // Create preview first
      const reader = new FileReader();
      reader.onload = (e) => {
        setVideoPreview(e.target.result);
      };
      reader.readAsDataURL(file);

      // Upload file using the working pattern
      console.log('Starting video upload...');
      const filePath = await handleFileUpload(file, 'video');
      console.log('Video upload result:', filePath);
      if (filePath) {
        setFormData(prev => ({
          ...prev,
          content: filePath,
          content_type: "video"
        }));
        console.log('Video upload successful, updated form data');
      } else {
        console.log('Video upload failed, clearing preview');
        setVideoPreview("");
      }
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
      content: "",
      content_type: "text"
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name.trim()) {
      toast.error('Client name is required');
      return;
    }

    if (!formData.rating || formData.rating < 1 || formData.rating > 5) {
      toast.error('Please select a valid rating');
      return;
    }

    if (formData.content_type === "video" && !formData.content) {
      toast.error('Video content is required when content type is video');
      return;
    }

    if (formData.content_type === "text" && !formData.testimonial.trim()) {
      toast.error('Testimonial text is required when content type is text');
      return;
    }

    // Prepare data for API
    const apiData = {
      name: formData.name.trim(),
      designation: formData.designation || "",
      company: formData.company || "",
      content_type: formData.content_type || "text",
      content: formData.content_type === "video" ? formData.content : formData.testimonial,
      rating: parseInt(formData.rating),
      photo: formData.photo || "",
      is_active: formData.isActive ? 1 : 0 // Use the format API expects
    };

    console.log('Submitting testimonial data:', apiData);

    if (testimonial) {
      // Update existing testimonial
      updateTestimonialMutation.mutate(
        { id: testimonial.id, data: apiData },
        {
          onSuccess: () => {
            toast.success('Testimonial updated successfully');
            onSuccess();
          },
          onError: (error) => {
            console.error('Update error:', error);
            toast.error(`Failed to update testimonial: ${error.response?.data?.message || error.message}`);
          }
        }
      );
    } else {
      // Create new testimonial
      createTestimonialMutation.mutate(apiData, {
        onSuccess: () => {
          toast.success('Testimonial created successfully');
          onSuccess();
        },
        onError: (error) => {
          console.error('Create error:', error);
          toast.error(`Failed to create testimonial: ${error.response?.data?.message || error.message}`);
        }
      });
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-6 h-6 cursor-pointer transition-colors ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400 dark:text-gray-500'
        }`}
        onClick={() => handleInputChange('rating', i + 1)}
      />
    ));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-full dark:text-white dark:bg-gray-900 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card className="dark:bg-gray-900">
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
              <Label htmlFor="designation">Position/Title</Label>
              <Input
                id="designation"
                value={formData.designation}
                onChange={(e) => handleInputChange('designation', e.target.value)}
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
          <CardContent className="space-y-4">
            {/* Video Upload */}
            <div>
              <Label className="text-base font-medium">Video Testimonial</Label>
              {videoPreview ? (
                <div className="relative mt-2">
                  <video
                    src={videoPreview}
                    className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-lg"
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
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 sm:p-6 md:p-8 text-center mt-2">
                  <Upload className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-400 dark:text-gray-500 mx-auto mb-2 sm:mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 mb-2 sm:mb-4 text-sm sm:text-base">Upload video testimonial</p>
                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                    id="video-upload"
                  />
                  <div className="w-full">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      className="sm:size-default text-black cursor-pointer w-full"
                      onClick={() => videoInputRef.current?.click()}
                      disabled={uploading}
                    >
                      {uploading && uploadProgress.video > 0 ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Uploading... {uploadProgress.video}%
                        </>
                      ) : (
                        'Choose Video'
                      )}
                    </Button>
                    {uploadProgress.video > 0 && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-blue-700">
                            Video Upload Progress
                          </span>
                          <span className="text-sm text-blue-600">
                            {uploadProgress.video}%
                          </span>
                        </div>
                        <progress
                          value={uploadProgress.video}
                          max="100"
                          className="w-full h-3 rounded-full"
                        ></progress>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-4">
                <Label htmlFor="video-url">Or enter video URL</Label>
                <Input
                  id="video-url"
                  value={formData.content}
                  onChange={(e) => {
                    setVideoPreview(e.target.value);
                    handleInputChange('content', e.target.value);
                    handleInputChange('content_type', 'video');
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
                    className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-lg"
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
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 sm:p-6 md:p-8 text-center mt-2">
                  <Upload className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-400 dark:text-gray-500 mx-auto mb-2 sm:mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 mb-2 sm:mb-4 text-sm sm:text-base">Upload client photo</p>
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <div className="w-full">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      className="sm:size-default text-black cursor-pointer w-full"
                      onClick={() => imageInputRef.current?.click()}
                      disabled={uploading}
                    >
                      {uploading && uploadProgress.image > 0 ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Uploading... {uploadProgress.image}%
                        </>
                      ) : (
                        'Choose Photo'
                      )}
                    </Button>
                    {uploadProgress.image > 0 && (
                      <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-green-700">
                            Image Upload Progress
                          </span>
                          <span className="text-sm text-green-600">
                            {uploadProgress.image}%
                          </span>
                        </div>
                        <progress
                          value={uploadProgress.image}
                          max="100"
                          className="w-full h-3 rounded-full"
                        ></progress>
                      </div>
                    )}
                  </div>
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
              Testimonial Text {formData.content_type !== "video" ? "*" : "(Optional - Video will be used if provided)"}
            </Label>
            <Textarea
              id="testimonial"
              value={formData.testimonial}
              onChange={(e) => handleInputChange('testimonial', e.target.value)}
              placeholder="Enter the client's testimonial text (optional if video is provided)..."
              rows={6}
              required={formData.content_type !== "video"}
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {formData.testimonial.length} characters
            </p>
            {formData.content_type === "video" && (
              <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
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
              onValueChange={handleStatusChange}
              disabled={toggleStatusMutation.isPending}
            >
              <SelectTrigger>
                <SelectValue />
                {toggleStatusMutation.isPending && (
                  <Loader2 className="w-4 h-4 animate-spin ml-2" />
                )}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active (Visible on website)</SelectItem>
                <SelectItem value="inactive">Inactive (Hidden from website)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Upload Status */}
      {uploading && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2">
              <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
              <span className="text-blue-700 font-medium">
                Uploading files... Please wait
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Form Actions */}
      <div className="flex flex-col sm:flex-row justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel} className="w-full sm:w-auto text-black">
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={createTestimonialMutation.isPending || updateTestimonialMutation.isPending || uploading || toggleStatusMutation.isPending}
          className="w-full sm:w-auto"
        >
          {uploading 
            ? "Uploading files..." 
            : createTestimonialMutation.isPending || updateTestimonialMutation.isPending 
              ? "Saving..." 
              : testimonial 
                ? "Update Testimonial" 
                : "Add Testimonial"
          }
        </Button>
      </div>
    </form>
  );
};

export default TestimonialForm;
