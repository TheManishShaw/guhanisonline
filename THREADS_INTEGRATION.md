# Threads Integration Guide

This guide explains how to set up dynamic Threads posts integration for your website.

## 🚀 Features Implemented

### ✅ Real-time Updates
- **Automatic Polling**: Checks for new posts every 30 seconds when enabled
- **Manual Refresh**: Users can manually refresh to get latest posts
- **New Post Notifications**: Shows badge with count of new posts
- **Live Status Indicator**: Visual indicator showing if auto-updates are active

### ✅ Dynamic Content
- **API Endpoint**: `/api/threads/posts` for fetching posts
- **Webhook Support**: `/api/threads/webhook` for triggering updates
- **Cache Management**: Prevents duplicate posts and manages updates
- **Error Handling**: Graceful error handling and fallbacks

### ✅ User Experience
- **Toggle Controls**: Enable/disable auto-updates
- **Loading States**: Visual feedback during data fetching
- **Status Information**: Shows last update time and polling status
- **Responsive Design**: Works on all device sizes

## 🔧 Setup Instructions

### 1. Environment Variables

Add these to your `.env.local` file:

```env
# Threads Webhook Secret (for security)
THREADS_WEBHOOK_SECRET=your-secret-key-here

# Optional: Third-party service API keys
EMBEDSOCIAL_API_KEY=your-embedsocial-key
SOCIABLEKIT_API_KEY=your-sociablekit-key
TAGGBOX_API_KEY=your-taggbox-key
```

### 2. Third-party Service Integration

Choose one of these services for real Threads data:

#### Option A: EmbedSocial
1. Sign up at [EmbedSocial](https://embedsocial.com)
2. Connect your @guhan_is_online Threads account
3. Get your API key
4. Update the API endpoint in `/app/api/threads/posts/route.js`

#### Option B: SociableKIT
1. Sign up at [SociableKIT](https://sociablekit.com)
2. Create a Threads feed widget
3. Get your API credentials
4. Update the integration code

#### Option C: Taggbox
1. Sign up at [Taggbox](https://taggbox.com)
2. Create a Threads social wall
3. Get your API key
4. Configure the integration

### 3. Manual Setup (Current Implementation)

The current setup uses mock data that simulates your Threads posts. To make it fully dynamic:

1. Replace the mock data in `/app/api/threads/posts/route.js`
2. Implement real API calls to your chosen service
3. Update the data formatting to match your needs

## 📡 API Endpoints

### GET `/api/threads/posts`
Fetches Threads posts with optional refresh.

**Query Parameters:**
- `refresh=true` - Forces fresh data fetch

**Response:**
```json
{
  "success": true,
  "data": [...],
  "timestamp": "2024-01-01T12:00:00Z",
  "refresh": true
}
```

### POST `/api/threads/webhook`
Webhook endpoint for triggering updates.

**Body:**
```json
{
  "secret": "your-webhook-secret",
  "action": "new_post|post_update|manual_refresh",
  "postData": {...}
}
```

## 🔄 Real-time Update Methods

### Method 1: Automatic Polling (Current)
- Polls every 30 seconds when enabled
- Shows new post count badges
- Visual status indicators

### Method 2: Webhook Integration
- Trigger updates when you post on Threads
- Use automation tools like Zapier
- Manual triggers via API calls

### Method 3: Server-Sent Events (Future)
- Real-time updates without polling
- Lower server load
- Instant notifications

## 🎛️ User Controls

### Auto-Update Toggle
- **ON**: Automatically checks for new posts every 30 seconds
- **OFF**: Static mode, manual refresh only
- Visual indicator shows current status

### Manual Refresh
- Click "Refresh" button to get latest posts
- Loading spinner during fetch
- Updates timestamp display

### New Post Notifications
- Red badge shows count of new posts
- Clears when user views the posts
- Console notifications for development

## 🔧 Customization Options

### Polling Interval
Change the polling frequency in `PublicBlogPage.jsx`:

```javascript
cleanup = fetchThreadsPostsWithPolling(handleThreadsUpdate, 30000); // 30 seconds
```

### Post Display Limit
Limit the number of posts shown:

```javascript
const limitedPosts = threadsPosts.slice(0, 5); // Show only 5 posts
```

### Styling Customization
Update colors and styling in the component:

```javascript
className="bg-[#5eead4]/10 hover:bg-[#5eead4]/20" // Brand colors
```

## 🚨 Troubleshooting

### Posts Not Updating
1. Check if polling is enabled (green indicator)
2. Verify API endpoint is working
3. Check browser console for errors
4. Ensure third-party service is connected

### Performance Issues
1. Increase polling interval
2. Implement post pagination
3. Add request debouncing
4. Use WebSocket instead of polling

### API Errors
1. Check environment variables
2. Verify API keys are correct
3. Check rate limits on third-party services
4. Review error logs in console

## 📈 Future Enhancements

### Planned Features
- [ ] WebSocket real-time updates
- [ ] Post analytics and metrics
- [ ] Content moderation tools
- [ ] Multi-account support
- [ ] Post scheduling integration

### Integration Possibilities
- [ ] Zapier automation
- [ ] IFTTT triggers
- [ ] Custom mobile app notifications
- [ ] Email notifications for new posts

## 🔒 Security Considerations

### Webhook Security
- Always use HTTPS for webhooks
- Implement secret key validation
- Rate limit webhook endpoints
- Validate incoming data

### API Security
- Use environment variables for secrets
- Implement proper error handling
- Add request logging
- Consider CORS policies

## 📞 Support

For issues or questions:
1. Check the browser console for errors
2. Review the API endpoint responses
3. Test with manual refresh first
4. Verify third-party service connections

---

**Note**: This integration is currently using mock data. To connect to your actual Threads account, integrate with one of the recommended third-party services or implement a custom solution.
