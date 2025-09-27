"use client";
import React, { useState } from "react";
import ContactForm from "../forms/ContactForm";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Headphones } from "lucide-react";

const ContactPage = () => {
  const [hoveredContact, setHoveredContact] = useState(null);

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      subtitle: "Send us an email",
      value: "guhan@guhanisonline.com",
      href: "mailto:guhan@guhanisonline.com",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      subtitle: "Mon - Fri from 9am to 6pm",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      subtitle: "Come say hello",
      value: "Music Studio, City Center",
      href: "#",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Response Time",
      subtitle: "We're quick to respond",
      value: "Within 24 hours",
      href: "#",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/50 to-transparent"></div>
      
      <div className="relative z-10">
        <div className="container mx-auto py-20 px-4 md:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-[#5eead4]/10 backdrop-blur-sm border border-[#5eead4]/20 rounded-full px-6 py-3 mb-8">
              <MessageCircle className="w-5 h-5 text-[#5eead4]" />
              <span className="text-[#5eead4] font-medium">Let's Create Something Amazing</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 bg-gradient-to-r from-white via-[#5eead4] to-white bg-clip-text text-transparent">
              Let's Talk
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Ready to bring your musical vision to life? Whether you need custom songs, 
              production services, or creative collaboration, we're here to make it happen.
            </p>
          </div>

          {/* Contact Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.href}
                className={`group relative overflow-hidden bg-black/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-[#5eead4]/50 transition-all duration-300 cursor-pointer ${
                  hoveredContact === index ? 'scale-105 shadow-2xl shadow-[#5eead4]/20' : ''
                }`}
                onMouseEnter={() => setHoveredContact(index)}
                onMouseLeave={() => setHoveredContact(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">{method.icon}</div>
                  </div>
                  
                  <h3 className="text-white font-semibold text-lg mb-2">{method.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{method.subtitle}</p>
                  <p className="text-[#5eead4] font-medium">{method.value}</p>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 border border-[#5eead4]/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Enhanced Info */}
            <div className="space-y-8">
              <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#5eead4] to-cyan-400 rounded-xl flex items-center justify-center">
                    <Headphones className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Why Choose Us?</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#5eead4] rounded-full mt-2"></div>
                    <p className="text-gray-300">Professional music production with 5+ years of experience</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#5eead4] rounded-full mt-2"></div>
                    <p className="text-gray-300">Custom songs tailored to your unique style and vision</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#5eead4] rounded-full mt-2"></div>
                    <p className="text-gray-300">Fast turnaround times without compromising quality</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#5eead4] rounded-full mt-2"></div>
                    <p className="text-gray-300">Collaborative approach - your input matters</p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-[#5eead4] mb-2">24h</div>
                  <div className="text-gray-400 text-sm">Response Time</div>
                </div>
                <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-[#5eead4] mb-2">150+</div>
                  <div className="text-gray-400 text-sm">Happy Clients</div>
                </div>
              </div>
            </div>

            {/* Right Side - Enhanced Form */}
            <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#5eead4] to-cyan-400 rounded-xl flex items-center justify-center">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Send us a Message</h2>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
