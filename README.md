# The Rasta Prophet Podcast PWA

A full-stack Next.js PWA for The Rasta Prophet podcast with scrollytelling animations and Archive.org integration.

## Features

- 🎙️ **Scrollytelling Experience** - Golden microphone rotates as you scroll
- 📻 **Episode Vault** - Browse and play all podcast episodes
- 🎵 **Custom Audio Player** - Persistent player with progress tracking
- 🔐 **Admin Dashboard** - Protected route for adding new episodes
- 📱 **PWA Ready** - Install on mobile devices
- 🎨 **Glassmorphism Design** - Modern, dark theme with gold accents

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
cd rasta-prophet-pwa
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your Supabase credentials in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## Supabase Setup

### Database Schema

Run the following SQL in your Supabase SQL Editor:

```sql
-- Create episodes table
CREATE TABLE IF NOT EXISTS episodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  archive_url TEXT NOT NULL,
  published_date DATE
);

-- Enable RLS
ALTER TABLE episodes ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Public episodes are viewable by everyone"
  ON episodes FOR SELECT
  USING (true);

-- Create policy for authenticated insert (admin only)
CREATE POLICY "Authenticated users can insert episodes"
  ON episodes FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');
```

### Authentication

1. Go to Supabase Authentication settings
2. Enable the auth providers you want (Email/Password, Magic Link)
3. Configure redirect URLs for your domain

## Adding Episodes

1. Navigate to `/admin`
2. Log in with your credentials
3. Fill in the episode details:
   - **Title**: Episode title
   - **Archive.org URL**: Link to the episode on Archive.org
   - **Description**: Episode description

## PWA Features

The app includes:
- Web App Manifest for installability
- Service Worker for offline support
- Mobile-optimized viewport settings
- Touch-friendly controls

## Customization

### Colors

Edit `tailwind.config.ts` to customize the color palette:

```ts
colors: {
  gold: {
    400: '#FFD700',
    500: '#FFC000',
    // ...
  },
  rasta: {
    green: '#009B3A',
    red: '#CE1126',
    gold: '#FFD700',
  },
  // ...
}
```

### Microphone Animation

Modify `components/visuals/RotatingMic.tsx` to adjust:
- Rotation speed and range
- Scale effects
- Glow intensity

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

Deploy to Vercel or any Next.js-compatible platform:

```bash
npm run build
# Deploy the build output
```

## License

MIT License
