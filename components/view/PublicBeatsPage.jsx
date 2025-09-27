"use client";
import React, { useState, useRef, useEffect } from "react";
import SingleBeat from "../ui/SingleBeat";
import { ShoppingCart, Play, Pause, Volume2, Heart, Download, Share2, Music, Clock, Star, Search, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getOpenBeatsList } from "@/lib/hooks/services/universalFetch";
import { useRouter } from "next/navigation";
import {
  addToCart,
  clearCart,
  removeFromCart,
} from "@/lib/store/features/cart/Cart";

const PublicBeatsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.items);
  const [playingBeat, setPlayingBeat] = useState(null);
  const [likedBeats, setLikedBeats] = useState(new Set());
  const [expandedPacks, setExpandedPacks] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const audioRefs = useRef({});

  const {
    isPending,
    isError,
    data: collection,
    error,
  } = useQuery({
    queryKey: ["getOpenBeatsList"],
    queryFn: getOpenBeatsList,
  });

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const isInCart = (itemId) => {
    return cartItems.some((item) => item.collection_id === itemId);
  };

  const handleGoToCart = () => {
    router.push("/cart");
  };

  const handlePlayBeat = (beatId, audioUrl) => {
    // Stop all other audio
    Object.values(audioRefs.current).forEach(audio => {
      if (audio && !audio.paused) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    if (playingBeat === beatId) {
      // If clicking the same beat, stop it
      setPlayingBeat(null);
    } else {
      // Play the new beat
      setPlayingBeat(beatId);
      const audio = audioRefs.current[beatId];
      if (audio) {
        audio.play().catch(error => {
          console.error('Error playing audio:', error);
        });
      }
    }
  };

  const handleLikeBeat = (beatId) => {
    const newLikedBeats = new Set(likedBeats);
    if (newLikedBeats.has(beatId)) {
      newLikedBeats.delete(beatId);
    } else {
      newLikedBeats.add(beatId);
    }
    setLikedBeats(newLikedBeats);
  };

  const handleShareBeat = (beat) => {
    if (navigator.share) {
      navigator.share({
        title: beat.title,
        text: `Check out this amazing beat: ${beat.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const togglePackExpansion = (packId) => {
    const newExpandedPacks = new Set(expandedPacks);
    if (newExpandedPacks.has(packId)) {
      newExpandedPacks.delete(packId);
    } else {
      newExpandedPacks.add(packId);
    }
    setExpandedPacks(newExpandedPacks);
  };

  const filteredCollection = collection?.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.beats?.some(beat => beat.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Handle audio events
  useEffect(() => {
    const handleAudioEnded = (beatId) => {
      setPlayingBeat(null);
    };

    // Add event listeners to all audio elements
    Object.keys(audioRefs.current).forEach(beatId => {
      const audio = audioRefs.current[beatId];
      if (audio) {
        audio.addEventListener('ended', () => handleAudioEnded(beatId));
      }
    });

    return () => {
      // Cleanup event listeners
      Object.values(audioRefs.current).forEach(audio => {
        if (audio) {
          audio.removeEventListener('ended', handleAudioEnded);
        }
      });
    };
  }, [filteredCollection]);
  return (
    <div className="w-full max-w-7xl mx-auto space-y-12">
      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search songs, tracks, or artists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
          />
        </div>
        {searchTerm && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-sm border border-gray-600/50 rounded-xl p-4 z-10">
            <p className="text-gray-300 text-sm">
              Found {filteredCollection?.length || 0} song collection(s) matching "{searchTerm}"
            </p>
          </div>
        )}
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
          <div className="text-3xl font-bold text-primary mb-2">{filteredCollection?.length || 0}</div>
          <div className="text-gray-400 text-sm">Song Collections</div>
        </div>
        <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
          <div className="text-3xl font-bold text-green-500 mb-2">
            {filteredCollection?.reduce((total, pack) => total + (pack.beats?.length || 0), 0) || 0}
          </div>
          <div className="text-gray-400 text-sm">Total Songs</div>
        </div>
        <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20">
          <div className="text-3xl font-bold text-purple-500 mb-2">4.9</div>
          <div className="text-gray-400 text-sm">Average Rating</div>
        </div>
        <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20">
          <div className="text-3xl font-bold text-orange-500 mb-2">100%</div>
          <div className="text-gray-400 text-sm">Satisfaction</div>
        </div>
      </div>

      {/* Song Collections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredCollection?.map((item, index) => (
          <Card
            key={index}
            className="group bg-gray-900/50 border border-gray-700/50 rounded-3xl overflow-hidden hover:border-primary/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10"
          >
            {/* Hero Section */}
            <div className="relative h-80 overflow-hidden">
              <Image
                src={item?.cover_image_path}
                alt={item?.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-end justify-between">
                  <div className="flex-1">
                    <Badge className="mb-3 bg-primary/20 text-primary border-primary/30">
                      <Music className="w-3 h-3 mr-1" />
                      {item?.beats?.length} Tracks
                    </Badge>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                      {item?.title}
                    </h3>
                    <p className="text-gray-300 text-sm line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white mb-2">
                      ${item.price}
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                      <span className="text-gray-400 text-sm ml-1">4.9</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="bg-black/50 hover:bg-black/70 text-white border-0"
                  onClick={() => handleLikeBeat(item.collection_id)}
                >
                  <Heart 
                    className={`w-4 h-4 ${likedBeats.has(item.collection_id) ? 'fill-red-500 text-red-500' : ''}`} 
                  />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="bg-black/50 hover:bg-black/70 text-white border-0"
                  onClick={() => handleShareBeat(item)}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
              {/* Song List */}
              <div className="space-y-3 mb-6">
                {(expandedPacks.has(item.collection_id) ? item?.beats : item?.beats?.slice(0, 3))?.map((beat, beatIndex) => (
                  <div
                    key={beatIndex}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/50 hover:bg-gray-800/70 transition-colors group/song"
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                      <Image
                        src={beat.cover_image_path}
                        alt={beat.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium truncate">{beat.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>{beat.bpm} BPM</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <audio
                        ref={(el) => {
                          const beatId = `${item.collection_id}-${beatIndex}`;
                          if (el) {
                            audioRefs.current[beatId] = el;
                          }
                        }}
                        preload="metadata"
                        className="hidden"
                      >
                        <source src={beat.file_path} type="audio/mpeg" />
                        <source src={beat.file_path} type="audio/ogg" />
                        <source src={beat.file_path} type="audio/wav" />
                      </audio>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-gray-300 hover:text-white hover:bg-gray-700/50 p-2 rounded-lg transition-all duration-300"
                        onClick={() => handlePlayBeat(`${item.collection_id}-${beatIndex}`, beat.file_path)}
                      >
                        {playingBeat === `${item.collection_id}-${beatIndex}` ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
                {item?.beats?.length > 3 && (
                  <Button
                    onClick={() => togglePackExpansion(item.collection_id)}
                    variant="ghost"
                    className="w-full text-gray-300 hover:text-white hover:bg-gray-700/50 py-3 rounded-xl transition-all duration-300 border border-gray-600/30 hover:border-primary/30"
                  >
                    {expandedPacks.has(item.collection_id) ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-2" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-2" />
                        Show {item.beats.length - 3} More Tracks
                      </>
                    )}
                  </Button>
                )}
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={() => isInCart(item.collection_id) ? handleGoToCart() : handleAddToCart(item)}
                className="w-full bg-primary hover:bg-primary/90 text-black font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {isInCart(item.collection_id) ? "Go to Cart" : "Add to Cart"}
              </Button>
            </div>
          </Card>
        ))}
      </div>

   
    </div>
  );
};

export default PublicBeatsPage;
