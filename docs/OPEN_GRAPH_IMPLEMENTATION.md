# Open Graph Implementation for Next.js 14 App Router

Best practices for implementing Open Graph meta tags for optimal Facebook link sharing in podcast applications.

## 1. Dynamic Open Graph Images per Episode

### Option A: File-based (Static)
Place `opengraph-image.jpg` (1200x630px) in episode route segments. Next.js auto-generates meta tags.

### Option B: Code-generated (Dynamic)
```tsx
// app/episodes/[id]/opengraph-image.tsx
import { ImageResponse } from 'next/og'
import { episodes } from '@/data/episodes'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const episode = episodes.find(e => e.id === id)

  return new ImageResponse(
    (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#121212',
        padding: '60px',
        color: 'white'
      }}>
        <h1 style={{ fontSize: 64 }}>{episode?.title}</h1>
        <p style={{ fontSize: 32, color: '#FFD700' }}>Episode {episode?.episode_number}</p>
        <p style={{ fontSize: 24, marginTop: 'auto' }}>The Rasta Prophet Podcast</p>
      </div>
    ),
    { ...size }
  )
}
```

## 2. Next.js Metadata API for Dynamic Routes

```tsx
// app/episodes/[id]/page.tsx
import type { Metadata } from 'next'
import { episodes } from '@/data/episodes'

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}): Promise<Metadata> {
  const { id } = await params
  const episode = episodes.find(e => e.id === id)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rastaprophet.com'

  return {
    title: episode?.title,
    description: episode?.description,
    openGraph: {
      type: 'music.song',
      title: episode?.title,
      description: episode?.description,
      url: `${baseUrl}/episodes/${id}`,
      siteName: 'The Rasta Prophet Podcast',
      images: [{
        url: `${baseUrl}/episodes/${id}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: episode?.title
      }],
      audio: [{
        url: episode?.archive_url,
        type: 'audio/mpeg'
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: episode?.title,
      description: episode?.description,
      images: [`${baseUrl}/episodes/${id}/opengraph-image`]
    }
  }
}
```

## 3. Facebook Debugger & Validation Tools

- **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
  - Validates OG tags, shows preview, refreshes cached data
- **Alternative validators**: OpenGraph.xyz, Microlink.io tools
- Use after deployment to verify social previews

## 4. Image Requirements for Facebook

- **Recommended size**: 1200x630px (1.91:1 ratio)
- **Formats**: JPG or PNG (under 1MB ideal, 5MB max for Twitter, 8MB max for Facebook)
- **Minimum**: 200x200px (smaller images ignored by Facebook)
- **Safe zone**: Keep text/faces within center 1080x600px area
- **Always include width/height** in meta tags for instant rendering

## 5. Audio Player in Social Previews

Facebook doesn't support embedded audio players in link previews. However:

```tsx
// Include og:audio for metadata completeness
openGraph: {
  audio: [{
    url: 'https://archive.org/download/episode.mp3',
    type: 'audio/mpeg'
  }],
  type: 'music.song' // Use music type for podcasts
}
```

Users must click through to your site to access the audio player. Focus on compelling images and descriptions to drive clicks.

## 6. Complete Example Meta Tag Structure

```tsx
// app/layout.tsx - Root metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://rastaprophet.com'),
  title: {
    template: '%s | The Rasta Prophet',
    default: 'The Rasta Prophet Podcast'
  },
  openGraph: {
    siteName: 'The Rasta Prophet Podcast',
    locale: 'en_US',
    type: 'website'
  }
}

// app/episodes/[id]/page.tsx - Episode metadata
export async function generateMetadata({ params }): Promise<Metadata> {
  const episode = await getEpisode(params.id)
  
  return {
    title: episode.title,
    description: episode.description,
    openGraph: {
      type: 'music.song',
      title: episode.title,
      description: episode.description,
      url: `/episodes/${params.id}`,
      images: [{
        url: `/episodes/${params.id}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: episode.title
      }],
      audio: [{
        url: episode.archive_url,
        type: 'audio/mpeg'
      }]
    }
  }
}
```

## Quick Implementation Checklist

- [ ] Set `metadataBase` in root layout
- [ ] Create `generateMetadata` for episode routes
- [ ] Generate dynamic OG images (1200x630px)
- [ ] Include `og:audio` with episode MP3 URL
- [ ] Use `type: 'music.song'` for podcast episodes
- [ ] Validate with Facebook Sharing Debugger
- [ ] Test on multiple social platforms

## References

- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Open Graph Image Convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)
- [Facebook OG Image Guide](https://www.screenshotengine.com/blog/facebook-open-graph-image-size)
- [OG Image Sizes 2026](https://www.krumzi.com/blog/open-graph-image-sizes-for-social-media-the-complete-2026-guide)
