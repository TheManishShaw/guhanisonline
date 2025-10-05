"use client";
import React, { useEffect, useState, useCallback } from "react";
import SingleBlogCard from "../ui/SingleBlogCard";
import { useQuery } from "@tanstack/react-query";
import { getOpenBlogsList } from "@/lib/hooks/services/universalFetch";
import { fetchThreadsPosts, fetchThreadsPostsWithPolling } from "@/lib/services/threadsService";
import { MessageCircle, Reply, Heart, Share2, Clock, User, ChevronDown, ChevronUp } from "lucide-react";

const PublicBlogPage = () => {
  const [showThreadedPosts, setShowThreadedPosts] = useState(false);
  const [expandedThreads, setExpandedThreads] = useState(new Set());
  const [likedPosts, setLikedPosts] = useState(new Set());
  
  const {
    status,
    data: blogsList,
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["blogsList"],
    queryFn: getOpenBlogsList,
  });
  
  console.log("isLoading==>", isLoading, "blogsList==>", blogsList?.data);
  
  useEffect(() => {
    localStorage.setItem("blog", JSON.stringify(blogsList?.data));
  }, [blogsList?.data]);

  // Threads posts data with dynamic updates
  const [threadsPosts, setThreadsPosts] = useState([]);
  const [loadingThreads, setLoadingThreads] = useState(false);
  const [isPolling, setIsPolling] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [newPostsCount, setNewPostsCount] = useState(0);

  // Function to fetch threads posts using the service
  const loadThreadsPosts = useCallback(async (refresh = false) => {
    setLoadingThreads(true);
    try {
      const result = await fetchThreadsPosts(refresh);
      if (result.success) {
        const newPosts = result.data;
        
        setThreadsPosts(prevPosts => {
          // Check for new posts
          if (refresh && prevPosts.length > 0) {
            const newPostIds = newPosts.map(post => post.id);
            const existingPostIds = prevPosts.map(post => post.id);
            const actuallyNewPosts = newPosts.filter(post => !existingPostIds.includes(post.id));
            
            if (actuallyNewPosts.length > 0) {
              setNewPostsCount(prev => prev + actuallyNewPosts.length);
              // Show notification or highlight new posts
              console.log(`Found ${actuallyNewPosts.length} new posts!`);
            }
          }
          
          return newPosts;
        });
        
        setLastUpdate(new Date());
      } else {
        console.error('Error fetching threads posts:', result.error);
      }
    } catch (error) {
      console.error('Error fetching threads posts:', error);
    } finally {
      setLoadingThreads(false);
    }
  }, []);

  // Function to start/stop real-time polling
  const togglePolling = () => {
    if (isPolling) {
      setIsPolling(false);
    } else {
      setIsPolling(true);
    }
  };

  // Handle dynamic updates
  const handleThreadsUpdate = useCallback((newPosts) => {
    setThreadsPosts(newPosts);
    setLastUpdate(new Date());
  }, []);

  // Fetch threads posts when component mounts or when polling is enabled
  useEffect(() => {
    if (showThreadedPosts) {
      loadThreadsPosts();
    }
  }, [showThreadedPosts, loadThreadsPosts]);

  // Set up real-time polling when enabled
  useEffect(() => {
    let cleanup = null;
    
    if (isPolling && showThreadedPosts) {
      cleanup = fetchThreadsPostsWithPolling(handleThreadsUpdate, 30000); // Poll every 30 seconds
    }
    
    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, [isPolling, showThreadedPosts, handleThreadsUpdate]);

  // Clear new posts count when user views the posts
  const clearNewPostsCount = () => {
    setNewPostsCount(0);
  };

  // Show notification for new posts
  const showNewPostNotification = (count) => {
    if (count > 0 && !showThreadedPosts) {
      // You can integrate with a toast notification library here
      console.log(`🎉 ${count} new post${count > 1 ? 's' : ''} from @guhan_is_online!`);
    }
  };

  // Effect to show notifications for new posts
  useEffect(() => {
    if (newPostsCount > 0) {
      showNewPostNotification(newPostsCount);
    }
  }, [newPostsCount, showThreadedPosts]);

  const handleLikePost = (postId) => {
    const newLikedPosts = new Set(likedPosts);
    if (newLikedPosts.has(postId)) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);
  };

  const toggleThreadExpansion = (threadId) => {
    const newExpandedThreads = new Set(expandedThreads);
    if (newExpandedThreads.has(threadId)) {
      newExpandedThreads.delete(threadId);
    } else {
      newExpandedThreads.add(threadId);
    }
    setExpandedThreads(newExpandedThreads);
  };

  const ThreadedPost = ({ post, level = 0 }) => (
    <div className={`${level > 0 ? 'ml-2 sm:ml-8 border-l-2 border-gray-600/30 pl-2 sm:pl-4' : ''} mb-4`}>
      <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 sm:p-6 hover:border-[#5eead4]/30 transition-all duration-300">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden flex-shrink-0">
            <img
              src={post.avatar}
              alt={post.author}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
              <h4 className="text-white font-semibold text-sm sm:text-base">
                {post.author === 'guhan_is_online' ? 'Guhan' : post.author}
              </h4>
              <div className="flex items-center gap-2 sm:gap-3">
                {post.author === 'guhan_is_online' && (
                  <div className="flex items-center gap-1 bg-[#5eead4]/20 text-[#5eead4] px-2 py-1 rounded-full text-xs">
                    <MessageCircle className="w-3 h-3" />
                    <span>Threads</span>
                  </div>
                )}
                <div className="flex items-center gap-1 text-gray-400 text-xs sm:text-sm">
                  <Clock className="w-3 h-3" />
                  <span>{post.timestamp}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed text-sm sm:text-base">{post.content}</p>
            
            {/* Post image if available */}
            {post.image && level === 0 && (
              <div className="mb-4 rounded-xl overflow-hidden">
                <img
                  src={post.image}
                  alt="Post content"
                  className="w-full h-32 sm:h-48 object-cover"
                />
              </div>
            )}
            
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
              <button
                onClick={() => handleLikePost(post.id)}
                className={`flex items-center gap-1 sm:gap-2 text-xs sm:text-sm transition-colors ${
                  likedPosts.has(post.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                }`}
              >
                <Heart className={`w-3 h-3 sm:w-4 sm:h-4 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                <span>{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
              </button>
              <button className="flex items-center gap-1 sm:gap-2 text-gray-400 hover:text-[#5eead4] text-xs sm:text-sm transition-colors">
                <Reply className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{post.replies?.length || 0}</span>
              </button>
              {post.threadsUrl && level === 0 && (
                <a
                  href={post.threadsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 sm:gap-2 text-gray-400 hover:text-[#5eead4] text-xs sm:text-sm transition-colors"
                >
                  <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">View on Threads</span>
                  <span className="sm:hidden">Threads</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Render replies */}
      {post.replies && post.replies.length > 0 && (
        <div className="mt-4">
          {post.replies.map((reply) => (
            <ThreadedPost key={reply.id} post={reply} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
      {/* Toggle Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Latest Blog Posts</h2>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#5eead4] rounded-full"></div>
            <span className="text-gray-400 text-sm sm:text-base">{blogsList?.data?.length || 0} posts</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <button
            onClick={() => {
              setShowThreadedPosts(!showThreadedPosts);
              if (!showThreadedPosts) {
                clearNewPostsCount();
              }
            }}
            className="flex items-center gap-2 bg-[#5eead4]/10 hover:bg-[#5eead4]/20 border border-[#5eead4]/30 hover:border-[#5eead4]/50 rounded-xl px-3 sm:px-4 py-2 text-[#5eead4] transition-all duration-300 text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">{showThreadedPosts ? 'Hide' : 'Show'} Threads Posts</span>
            <span className="sm:hidden">{showThreadedPosts ? 'Hide' : 'Show'} Threads</span>
            {newPostsCount > 0 && (
              <div className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {newPostsCount}
              </div>
            )}
          </button>
          
          {showThreadedPosts && (
            <button
              onClick={() => loadThreadsPosts(true)}
              disabled={loadingThreads}
              className="flex items-center gap-2 bg-gray-700/50 hover:bg-gray-700/70 border border-gray-600/50 rounded-xl px-2 sm:px-3 py-2 text-gray-300 hover:text-white transition-all duration-300 disabled:opacity-50 text-sm"
            >
              <div className={`w-4 h-4 ${loadingThreads ? 'animate-spin' : ''}`}>
                {loadingThreads ? (
                  <div className="w-4 h-4 border-2 border-gray-300/30 border-t-gray-300 rounded-full"></div>
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
              </div>
              <span className="hidden sm:inline">Refresh</span>
            </button>
          )}
        </div>
      </div>

      {/* Threaded Posts Section */}
      {showThreadedPosts && (
        <div className="mb-12">
          <div className="bg-gradient-to-r from-[#5eead4]/5 to-transparent border border-[#5eead4]/20 rounded-2xl p-4 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-[#5eead4] to-cyan-400 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">Latest from @guhan_is_online</h3>
                <div className="flex items-center gap-1 text-gray-400 text-xs sm:text-sm">
                  <div className={`w-1.5 h-1.5 rounded-full ${isPolling ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
                  <span>{isPolling ? 'Live' : 'Static'}</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <button
                  onClick={togglePolling}
                  className={`flex items-center gap-2 px-2 sm:px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 ${
                    isPolling 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-gray-500/20 text-gray-400 border border-gray-500/30 hover:bg-gray-500/30'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${isPolling ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
                  <span className="hidden sm:inline">{isPolling ? 'Auto-Update ON' : 'Auto-Update OFF'}</span>
                  <span className="sm:hidden">{isPolling ? 'Auto ON' : 'Auto OFF'}</span>
                </button>
                
                {lastUpdate && (
                  <div className="text-gray-400 text-xs">
                    Updated: {lastUpdate.toLocaleTimeString()}
                  </div>
                )}
              </div>
            </div>
            
            {loadingThreads ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-3 text-gray-400">
                  <div className="w-6 h-6 border-2 border-[#5eead4]/30 border-t-[#5eead4] rounded-full animate-spin"></div>
                  <span>Loading latest posts...</span>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {threadsPosts.map((post) => (
                  <ThreadedPost key={post.id} post={post} />
                ))}
              </div>
            )}
            
            <div className="mt-6 sm:mt-8 text-center space-y-3 sm:space-y-4">
              <a
                href="https://www.threads.com/@guhan_is_online"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-[#5eead4] to-cyan-400 hover:from-[#5eead4]/90 hover:to-cyan-400/90 text-black font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
              >
                Follow on Threads
              </a>
              <p className="text-gray-400 text-xs sm:text-sm px-4">
                Stay updated with the latest music production tips and behind-the-scenes content
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-20">
        {blogsList?.data.map((blog, index) => (
          <SingleBlogCard {...blog} key={index} />
        ))}
      </div>
    </div>
  );
};

export default PublicBlogPage;
