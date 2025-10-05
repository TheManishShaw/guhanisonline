"use client";
import { Star, Quote, Play, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useRef } from "react";

const TestimonialCard = ({ testimonial, index }) => {
  const imageUrl = testimonial.photo || "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80";
  // Handle both 'video' and 'content' fields for video testimonials
  const videoUrl = testimonial.content_type === 'video' ? testimonial.content : testimonial.video;
  const testimonialText = testimonial.content_type === 'video' ? testimonial.testimonial : testimonial.content;

  return (
    <div className="flex-shrink-0 w-80 sm:w-96 bg-gray-900 border border-gray-700 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      {/* Media Section - Much Bigger */}
      <div className="relative h-64 sm:h-80 md:h-96 lg:h-[37rem] bg-gray-800 rounded-t-3xl">
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
      <div className="p-4 sm:p-6 bg-gray-900 rounded-b-3xl">
        {/* Testimonial Text */}
        {testimonialText && (
          <div className="mb-3 sm:mb-4">
            <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-primary mb-2" />
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed italic">
              "{testimonialText}"
            </p>
          </div>
        )}
        
        {/* Rating */}
        {testimonial.rating && (
          <div className="flex items-center gap-1 mb-3 sm:mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 sm:w-4 sm:h-4 ${
                  i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                }`}
              />
            ))}
          </div>
        )}
        
        <div className="flex items-center gap-2 sm:gap-3">
          <img
            src={imageUrl}
            alt={testimonial.name}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-gray-700"
          />
          <div>
            <h4 className="font-semibold text-white text-xs sm:text-sm">
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
      const scrollAmount = window.innerWidth < 640 ? -320 : -384; // w-80 vs w-96
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth < 640 ? 320 : 384; // w-80 vs w-96
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
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
      {/* Navigation Buttons - Positioned outside, hidden on mobile */}
      <div className="absolute -left-16 top-1/2 -translate-y-1/2 z-10 hidden md:block">
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

      <div className="absolute -right-16 top-1/2 -translate-y-1/2 z-10 hidden md:block">
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
        className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide py-8 justify-center md:justify-start px-4 sm:px-0"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          scrollBehavior: 'smooth'
        }}
      >
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} index={index} />
        ))}
        {/* Add padding for the last item on mobile */}
        <div className="w-4 sm:w-0 flex-shrink-0"></div>
      </div>
    </div>
  );
};


const PublicTestimonialPage = () => {
  // Hardcoded testimonial data
  const testimonialList = [
    {
      id: 1,
      name: "Giselle",
      testimonial: "Working with Guhanis was an absolute game-changer for my music career. The production quality is outstanding, and the attention to detail is incredible. Every beat feels professionally crafted and perfectly mixed.",
      rating: 5,
      designation: "Pop Artist",
      company: "Giselle Music",
      photo: "/assets/images/avatar/avatar.png",
      video: "/assets/videos/Giselle testimonials_caption.mp4",
      content_type: "video",
      content: "/assets/videos/Giselle testimonials_caption.mp4"
    },
    {
      id: 2,
      name: "Giselle",
      testimonial: "Working with Guhanis was an absolute game-changer for my music career. The production quality is outstanding, and the attention to detail is incredible. Every beat feels professionally crafted and perfectly mixed.",
      rating: 5,
      designation: "Pop Artist",
      company: "Giselle Music",
      photo: "/assets/images/avatar/avatar.png",
      video: "/assets/videos/Giselle testimonials_caption.mp4",
      content_type: "video",
      content: "/assets/videos/Giselle testimonials_caption.mp4"
    },
    {
      id: 3,
      name: "Giselle",
      testimonial: "Working with Guhanis was an absolute game-changer for my music career. The production quality is outstanding, and the attention to detail is incredible. Every beat feels professionally crafted and perfectly mixed.",
      rating: 5,
      designation: "Pop Artist",
      company: "Giselle Music",
      photo: "/assets/images/avatar/avatar.png",
      video: "/assets/videos/Giselle testimonials_caption.mp4",
      content_type: "video",
      content: "/assets/videos/Giselle testimonials_caption.mp4"
    },
    {
      id: 4,
      name: "Giselle",
      testimonial: "Working with Guhanis was an absolute game-changer for my music career. The production quality is outstanding, and the attention to detail is incredible. Every beat feels professionally crafted and perfectly mixed.",
      rating: 5,
      designation: "Pop Artist",
      company: "Giselle Music",
      photo: "/assets/images/avatar/avatar.png",
      video: "/assets/videos/Giselle testimonials_caption.mp4",
      content_type: "video",
      content: "/assets/videos/Giselle testimonials_caption.mp4"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto bg-gray-950 min-h-screen py-8 sm:py-16">
      {/* Section Header */}
      <div className="text-center mb-8 sm:mb-16 px-4 sm:px-6">
        <p className="text-primary font-medium text-xs sm:text-sm mb-2 sm:mb-4">
          Curious how people are using Guhanis
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
          Hear what our customers are saying
        </h2>
      </div>

      {/* Testimonials Grid */}
      <div className="px-0 sm:px-6 overflow-hidden">
        <TestimonialGrid testimonials={testimonialList} />
      </div>
    </div>
  );
};

export default PublicTestimonialPage;
