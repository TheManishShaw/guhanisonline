import { NextResponse } from 'next/server';

// Webhook endpoint to trigger Threads post updates
// You can use this with automation tools or manual triggers

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate the webhook request
    if (!body.secret || body.secret !== process.env.THREADS_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Process the webhook data
    const { action, postData } = body;
    
    switch (action) {
      case 'new_post':
        // Handle new post notification
        console.log('New Threads post detected:', postData);
        
        // You can trigger cache invalidation or send real-time updates here
        // For example, using WebSockets, Server-Sent Events, or cache busting
        
        return NextResponse.json({
          success: true,
          message: 'Post update processed',
          action: 'new_post',
          timestamp: new Date().toISOString()
        });
        
      case 'post_update':
        // Handle post update (likes, comments, etc.)
        console.log('Threads post updated:', postData);
        
        return NextResponse.json({
          success: true,
          message: 'Post update processed',
          action: 'post_update',
          timestamp: new Date().toISOString()
        });
        
      case 'manual_refresh':
        // Manual refresh trigger
        console.log('Manual refresh triggered');
        
        return NextResponse.json({
          success: true,
          message: 'Manual refresh processed',
          action: 'manual_refresh',
          timestamp: new Date().toISOString()
        });
        
      default:
        return NextResponse.json({
          error: 'Unknown action',
          validActions: ['new_post', 'post_update', 'manual_refresh']
        }, { status: 400 });
    }
    
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({
      error: 'Internal server error',
      message: error.message
    }, { status: 500 });
  }
}

// GET endpoint for webhook verification
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const challenge = searchParams.get('hub.challenge');
  
  if (challenge) {
    // This is for webhook verification (like with Facebook/Meta webhooks)
    return new NextResponse(challenge);
  }
  
  return NextResponse.json({
    message: 'Threads webhook endpoint',
    status: 'active',
    timestamp: new Date().toISOString()
  });
}

// Example usage:
/*
// Manual trigger for new post
curl -X POST http://localhost:3000/api/threads/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "secret": "your-webhook-secret",
    "action": "new_post",
    "postData": {
      "id": "123456789",
      "content": "New post content",
      "author": "guhan_is_online",
      "timestamp": "2024-01-01T12:00:00Z"
    }
  }'

// Manual refresh trigger
curl -X POST http://localhost:3000/api/threads/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "secret": "your-webhook-secret",
    "action": "manual_refresh"
  }'
*/
