# Instructions for Adding Episodes from Archive.org

This guide explains how to add episodes from the Archive.org collection to your podcast.

## Finding Episodes

1. Visit the Archive.org collection: https://archive.org/details/@richard876/uploads
2. Browse through the uploaded files
3. Click on an episode to view its details page
4. Copy the URL from your browser's address bar

## Adding an Episode via Admin Dashboard

1. Navigate to `/admin` and log in
2. Fill in the episode form:
   - **Title**: Use the episode title from Archive.org
   - **Archive.org URL**: Paste the full URL (e.g., `https://archive.org/details/some-episode-id`)
   - **Description**: Add a description or copy from the Archive.org page

## Finding Direct Audio URLs

Archive.org has a specific URL structure:

1. **Details Page**: `https://archive.org/details/episode-id`
   - This page contains metadata and playback options

2. **Direct Audio**: `https://archive.org/download/episode-id/filename.mp3`
   - You can extract this from the details page's HTML or API

3. **Using the API**:
   ```bash
   curl https://archive.org/metadata/episode-id
   ```
   This returns JSON with file information including direct download URLs.

## API Endpoint

You can also add episodes programmatically:

```bash
curl -X POST 'https://your-project.supabase.co/rest/v1/episodes' \
  -H 'apikey: YOUR-ANON-KEY' \
  -H 'Authorization: Bearer YOUR-ANON-KEY' \
  -H 'Content-Type: application/json' \
  -H 'Prefer: return=minimal' \
  -d '{
    "title": "Episode Title",
    "description": "Episode description",
    "archive_url": "https://archive.org/details/episode-id"
  }'
```

## Troubleshooting

### Episode won't play
- Ensure the Archive.org URL is valid
- Some files may require specific formats
- Check browser console for CORS errors

### Episode not showing
- Verify database insert was successful
- Check RLS policies in Supabase
- Ensure you're not in preview mode (try hard refresh)
