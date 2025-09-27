"use client";
import React, { useState, useEffect } from "react";
import AnimationWrapper from "@/components/animation/AnimationWrapper";
import { 
  Music, 
  Play, 
  Volume2, 
  Award, 
  Users, 
  TrendingUp, 
  Calendar,
  Star,
  ArrowRight,
  Headphones,
  Mic,
  Piano,
  Zap,
  Heart,
  Share2,
  MessageCircle
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AboutPageClient = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTimelineItem, setActiveTimelineItem] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Interactive stats with animation
  const [stats, setStats] = useState({
    years: 0,
    songs: 0,
    clients: 0,
    awards: 0
  });

  const targetStats = {
    years: 7,
    songs: 1000,
    clients: 150,
    awards: 5
  };

  useEffect(() => {
    const animateStats = () => {
      Object.keys(targetStats).forEach(key => {
        const target = targetStats[key];
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setStats(prev => ({ ...prev, [key]: Math.floor(current) }));
        }, 30);
      });
    };

    const timeout = setTimeout(animateStats, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const timelineData = [
    {
      year: "2017",
      title: "Started Hip Hop Production",
      description: "Began journey in the Hip Hop world, developing foundational skills",
      icon: Music
    },
    {
      year: "2019",
      title: "Genre Expansion",
      description: "Started combining multiple genres, expanding beyond Hip Hop",
      icon: TrendingUp
    },
    {
      year: "2021",
      title: "Client Base Growth",
      description: "Built diverse client base across R&B, Pop, and other genres",
      icon: Users
    },
    {
      year: "2023",
      title: "Sample Pack Creation",
      description: "Started creating professional sample packs for producers",
      icon: Award
    }
  ];

  const skillsData = [
    { name: "Music Production", level: 95, icon: Headphones },
    { name: "Sound Design", level: 90, icon: Zap },
    { name: "Mixing & Mastering", level: 88, icon: Volume2 },
    { name: "Genre Versatility", level: 92, icon: Music },
    { name: "Artist Collaboration", level: 94, icon: Mic },
    { name: "Creative Direction", level: 89, icon: Piano }
  ];

  const testimonials = [
    {
      quote: "Guhan's production skills are incredible. He helped me find my unique sound and took my music to the next level.",
      author: "Sarah Johnson",
      role: "R&B Artist",
      rating: 5
    },
    {
      quote: "Working with Guhan was a game-changer. His beats are fresh, innovative, and perfectly crafted for my style.",
      author: "Marcus Rodriguez",
      role: "Hip Hop Artist",
      rating: 5
    },
    {
      quote: "The attention to detail and creativity in his work is unmatched. Highly recommend for any serious artist.",
      author: "Emily Chen",
      role: "Pop Artist",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/30 to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.05),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.02),transparent_50%)]"></div>
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <AnimationWrapper
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8">
                <Music className="w-5 h-5 text-white" />
                <span className="text-white font-medium">Producer & Composer</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
                Meet Guhan
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
                A 26-year-old producer and composer pushing the boundaries of modern music. 
                From Hip Hop to R&B, Pop to experimental sounds - crafting unique experiences 
                for artists worldwide.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5" />
                  Start Collaboration
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/beats"
                  className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  <Play className="w-5 h-5" />
                  Explore Songs
                </Link>
              </div>
            </AnimationWrapper>
          </div>

          {/* Interactive Stats */}
          <AnimationWrapper
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
              {[
                { label: "Years Experience", value: stats.years, icon: Calendar, suffix: "+" },
                { label: "Songs Produced", value: stats.songs, icon: Music, suffix: "+" },
                { label: "Happy Clients", value: stats.clients, icon: Users, suffix: "+" },
                { label: "Awards Won", value: stats.awards, icon: Award, suffix: "+" }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:border-white/30 transition-all duration-300 group"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </AnimationWrapper>
        </section>

        {/* Story Section */}
        <section className="container mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimationWrapper
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3">
                  <Heart className="w-5 h-5 text-white" />
                  <span className="text-white font-medium">My Story</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  Crafting Soundscapes That Move Souls
                </h2>
                
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    After starting in the Hip Hop world in 2017, I found myself naturally 
                    evolving beyond genre boundaries. My sound shifted as I began working 
                    with artists from varying genres - from R&B to Pop, electronic to experimental.
                  </p>
                  <p>
                    Inspired by visionaries like Trent Reznor, Thom Yorke, and Kanye West, 
                    my thirst for pushing boundaries is unquenchable. Each artist I work with 
                    brings their unique perspective, and my goal is to develop their sound 
                    and differentiate their music from the noise.
                  </p>
                  <p>
                    Along with working with my client base, I found myself creating Sample Packs 
                    for other producers and artists. Each Sample Pack is made with the utmost 
                    care and experimentation, pushing the boundaries of what modern music will be.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Let's Collaborate
                  </Link>
                  <Link
                    href="/blogs"
                    className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
                  >
                    <Share2 className="w-4 h-4" />
                    Read My Blog
                  </Link>
                </div>
              </div>
            </AnimationWrapper>

            <AnimationWrapper
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-2">
                  <Image
                    src="/assets/images/login/placeholder.jpg"
                    alt="Guhan - Music Producer"
                    width={600}
                    height={600}
                    className="rounded-2xl object-cover w-full h-[400px] md:h-[500px]"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">Currently Working On</div>
                      <div className="text-gray-300 text-sm">New Album Project</div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimationWrapper>
          </div>
        </section>

        {/* Interactive Timeline */}
        <section className="container mx-auto px-6 py-16">
          <AnimationWrapper
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8">
                <Calendar className="w-5 h-5 text-white" />
                <span className="text-white font-medium">Journey</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                My Musical Evolution
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                A timeline of key moments that shaped my career and sound
              </p>
            </div>
          </AnimationWrapper>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-white to-gray-400"></div>
            
            {timelineData.map((item, index) => (
              <AnimationWrapper
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div
                      className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/30 transition-all duration-300 cursor-pointer ${
                        activeTimelineItem === index ? 'border-white/30 shadow-lg shadow-white/10' : ''
                      }`}
                      onClick={() => setActiveTimelineItem(activeTimelineItem === index ? -1 : index)}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <item.icon className="w-5 h-5 text-white" />
                        <span className="text-white font-semibold text-sm">{item.year}</span>
                      </div>
                      <h3 className="text-white font-bold text-xl mb-2">{item.title}</h3>
                      <p className="text-gray-300">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="relative z-10 w-4 h-4 bg-white rounded-full border-4 border-black"></div>
                  
                  <div className="flex-1"></div>
                </div>
              </AnimationWrapper>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="container mx-auto px-6 py-16">
          <AnimationWrapper
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8">
                <Zap className="w-5 h-5 text-white" />
                <span className="text-white font-medium">Skills</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Production Expertise
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Mastery across multiple aspects of music production
              </p>
            </div>
          </AnimationWrapper>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillsData.map((skill, index) => (
              <AnimationWrapper
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div
                  className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/30 transition-all duration-300 cursor-pointer group ${
                    hoveredSkill === index ? 'border-white/30 shadow-lg shadow-white/10' : ''
                  }`}
                  onMouseEnter={() => setHoveredSkill(index)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <skill.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">{skill.name}</h3>
                      <div className="text-white font-bold">{skill.level}%</div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
                    <div
                      className="bg-white h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  
                  <div className="text-gray-400 text-sm">
                    {skill.level >= 90 ? 'Expert Level' : 
                     skill.level >= 80 ? 'Advanced Level' : 
                     skill.level >= 70 ? 'Intermediate Level' : 'Beginner Level'}
                  </div>
                </div>
              </AnimationWrapper>
            ))}
          </div>
        </section>

       

        {/* Call to Action */}
        <section className="container mx-auto px-6 py-20">
          <AnimationWrapper
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-12 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Create Something Amazing?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Let's collaborate and bring your musical vision to life. Whether you need 
                custom production, mixing, or creative direction, I'm here to help you 
                stand out in the music world.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5" />
                  Start Your Project
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/beats"
                  className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  <Play className="w-5 h-5" />
                  Browse My Songs
                </Link>
              </div>
            </div>
          </AnimationWrapper>
        </section>
      </div>
    </div>
  );
};

export default AboutPageClient;
