/**
 * Threads Service for fetching posts from @guhan_is_online
 * 
 * This service can be integrated with third-party services like:
 * - EmbedSocial
 * - SociableKIT
 * - Taggbox
 * - Or custom scraping solutions
 */

// Fetch threads posts from our API endpoint
export const fetchThreadsPosts = async (refresh = false) => {
  try {
    const response = await fetch(`/api/threads/posts?refresh=${refresh}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Add cache control for dynamic updates
      cache: refresh ? 'no-store' : 'default'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
    
  } catch (error) {
    console.error('Error fetching threads posts:', error);
    return {
      success: false,
      error: error.message,
      data: []
    };
  }
};

// Fetch threads posts with real-time updates
export const fetchThreadsPostsWithPolling = async (onUpdate, interval = 30000) => {
  let isPolling = false;
  
  const poll = async () => {
    if (isPolling) return;
    
    isPolling = true;
    try {
      const result = await fetchThreadsPosts(true); // Always refresh when polling
      if (result.success && onUpdate) {
        onUpdate(result.data);
      }
    } catch (error) {
      console.error('Error in polling:', error);
    } finally {
      isPolling = false;
    }
  };
  
  // Initial fetch
  await poll();
  
  // Set up interval polling
  const intervalId = setInterval(poll, interval);
  
  // Return cleanup function
  return () => {
    clearInterval(intervalId);
  };
};

// Function to format threads data for display
export const formatThreadsPost = (post) => {
  return {
    id: post.id,
    author: post.author,
    avatar: post.avatar || "/assets/images/login/placeholder.svg",
    content: post.content,
    timestamp: post.timestamp,
    likes: post.likes || 0,
    replies: post.replies || [],
    threadsUrl: post.threadsUrl,
    image: post.image
  };
};

// Function to create a new post (for future use)
export const createThreadsPost = async (postData) => {
  try {
    // This would integrate with your backend to create a new post
    // For now, just return success
    return {
      success: true,
      data: {
        id: Date.now(),
        ...postData,
        timestamp: new Date().toLocaleString()
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};
