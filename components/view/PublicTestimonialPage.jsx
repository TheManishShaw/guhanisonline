"use client";
import { Star, Quote, Play, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useRef } from "react";
import { useTestimonials } from "@/lib/hooks/useTestimonials";

const TestimonialCard = ({ testimonial, index }) => {
  const imageUrl = testimonial.photo || "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80";
  // Handle both 'video' and 'content' fields for video testimonials
  const videoUrl = testimonial.content_type === 'video' ? testimonial.content : testimonial.video;
  const testimonialText = testimonial.content_type === 'video' ? testimonial.testimonial : testimonial.content;

  return (
    <div className="flex-shrink-0 w-96 bg-gray-900 border border-gray-700 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      {/* Media Section - Much Bigger */}
      <div className="relative h-[37rem] bg-gray-800 rounded-t-3xl">
        {videoUrl ? (
          <div className="relative w-full h-full">
            <video
              className="w-full h-full object-cover rounded-t-3xl"
              autoPlay
              muted
              loop
              playsInline
              poster={imageUrl}
            >
              <source src={videoUrl} type="video/mp4" />
              <source src={videoUrl} type="video/webm" />
              Your browser does not support the video tag.
            </video>
            {/* Subtle overlay for better text visibility */}
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={testimonial.name}
            className="w-full h-full object-cover rounded-t-3xl"
          />
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 bg-gray-900 rounded-b-3xl">
        {/* Testimonial Text */}
        {testimonialText && (
          <div className="mb-4">
            <Quote className="w-6 h-6 text-primary mb-2" />
            <p className="text-gray-300 text-sm leading-relaxed italic">
              "{testimonialText}"
            </p>
          </div>
        )}
        
        {/* Rating */}
        {testimonial.rating && (
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                }`}
              />
            ))}
          </div>
        )}
        
        <div className="flex items-center gap-3">
          <img
            src={imageUrl}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-700"
          />
          <div>
            <h4 className="font-semibold text-white text-sm">
              {testimonial.name}
            </h4>
            <p className="text-gray-400 text-xs">
              {testimonial.designation || testimonial.design || testimonial.position || "Client"}
            </p>
            {testimonial.company && (
              <p className="text-primary text-xs">
                {testimonial.company}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialGrid = ({ testimonials }) => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -384, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 384, behavior: 'smooth' });
    }
  };

  React.useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      return () => container.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  return (
    <div className="relative">
      {/* Navigation Buttons - Positioned outside */}
      <div className="absolute -left-16 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={scrollLeft}
          disabled={!canScrollLeft}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg ${
            canScrollLeft 
              ? 'bg-white text-gray-900 hover:bg-gray-100 hover:scale-110' 
              : 'bg-gray-800 text-gray-600 cursor-not-allowed opacity-50'
          }`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
      
      <div className="absolute -right-16 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={scrollRight}
          disabled={!canScrollRight}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg ${
            canScrollRight 
              ? 'bg-white text-gray-900 hover:bg-gray-100 hover:scale-110' 
              : 'bg-gray-800 text-gray-600 cursor-not-allowed opacity-50'
          }`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-hidden scrollbar-hide py-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} index={index} />
        ))}
      </div>
    </div>
  );
};


const PublicTestimonialPage = () => {
  // Fetch testimonials from API
  const { data: testimonialsData, isLoading, error } = useTestimonials();
  
  // Filter only active testimonials for public display
  const testimonialList = testimonialsData?.data?.filter(testimonial => testimonial.is_active === 1) || [];
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto bg-gray-950 min-h-screen py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-white">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto bg-gray-950 min-h-screen py-16">
        <div className="text-center">
          <p className="text-red-400 mb-4">Failed to load testimonials</p>
          <p className="text-gray-400">Please try again later</p>
        </div>
      </div>
    );
  }

  // Show empty state
  if (!testimonialList || testimonialList.length === 0) {
    return (
      <div className="max-w-7xl mx-auto bg-gray-950 min-h-screen py-16">
        <div className="text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Hear what our customers are saying
          </h2>
          <p className="text-gray-400">No testimonials available at the moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto bg-gray-950 min-h-screen py-16">
      {/* Section Header */}
      <div className="text-center mb-16 px-6">
        <p className="text-primary font-medium text-sm mb-4">
          Curious how people are using Guhanis
        </p>
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          Hear what our customers are saying
        </h2>
      </div>

      {/* Testimonials Grid */}
      <div className="px-6">
        <TestimonialGrid testimonials={testimonialList} />
      </div>
    </div>
  );
};

export default PublicTestimonialPage;
