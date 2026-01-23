import { RotatingMic } from '@/components/visuals/RotatingMic';
import { EpisodeList } from '@/components/EpisodeList';
import { AudioPlayer } from '@/components/player/AudioPlayer';
import { getAllEpisodes } from '@/data/episodes';
import { Calendar, Clock, Headphones } from 'lucide-react';

export default function Home() {
  const episodes = getAllEpisodes();
  const latestEpisode = episodes[0];
  const otherEpisodes = episodes.slice(1);

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-24">
      {/* Fixed Central Microphone */}
      <RotatingMic />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD700] to-[#C9A800] flex items-center justify-center">
              <Headphones className="w-5 h-5 text-black" />
            </div>
            <span className="font-bold text-xl text-white">Blessed Love Podcast</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#episodes" className="text-[#B3B3B3] hover:text-white transition-colors font-medium">
              Episodes
            </a>
            <a href="/admin" className="text-[#B3B3B3] hover:text-white transition-colors font-medium">
              Admin
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Featured Episode */}
          {latestEpisode && (
            <div className="featured-card p-8 mb-16">
              <div className="flex gap-8 items-center">
                {/* Episode Art */}
                <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 rounded-lg overflow-hidden shadow-2xl">
                  <img
                    src="/gold-mic.png"
                    alt={latestEpisode.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Episode Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[#FFD700] text-sm font-bold uppercase tracking-wider">
                      Latest Episode
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    {latestEpisode.title}
                  </h1>
                  <p className="text-[#B3B3B3] text-lg mb-6 max-w-2xl">
                    {latestEpisode.description}
                  </p>
                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-2 text-[#B3B3B3]">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(latestEpisode.published_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#B3B3B3]">
                      <Clock className="w-4 h-4" />
                      <span>{latestEpisode.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button 
                      data-episode={JSON.stringify(latestEpisode)}
                      className="btn-primary flex items-center gap-2 play-episode-btn"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                      Play Episode
                    </button>
                    <button className="btn-secondary flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                      </svg>
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="relative z-10 py-16 px-6 bg-[#121212]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Voice of <span className="gradient-text">Africa</span>
              </h2>
              <p className="text-[#B3B3B3] text-lg leading-relaxed mb-6">
                Welcome to the Blessed Love: Voice of Africa Show with Rodniel Theodore. 
                A self-improvement show with an Afro Caribbean world view. Each episode 
                brings wisdom, inspiration, and powerful messages to transform your life.
              </p>
              <p className="text-[#B3B3B3] text-lg leading-relaxed">
                New episodes released weekly. Join thousands of listeners who have discovered 
                the path to enlightenment through our teachings.
              </p>
            </div>
            <div className="relative">
              <div className="w-full h-80 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#FFD700] to-[#C9A800] flex items-center justify-center">
                    <Headphones className="w-12 h-12 text-black" />
                  </div>
                  <p className="text-white font-bold text-xl">{episodes.length} Episodes</p>
                  <p className="text-[#B3B3B3]">Available Now</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Episodes Section */}
      <section id="episodes" className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-header mb-0">All Episodes</h2>
            <select className="bg-[#181818] text-white px-4 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-[#FFD700]">
              <option>Newest First</option>
              <option>Oldest First</option>
            </select>
          </div>
          <EpisodeList episodes={otherEpisodes} />
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD700] to-[#C9A800] flex items-center justify-center">
                <Headphones className="w-5 h-5 text-black" />
              </div>
              <span className="font-bold text-white">Blessed Love Podcast</span>
            </div>
            <p className="text-[#B3B3B3] text-sm">
              © {new Date().getFullYear()} Blessed Love: Voice of Africa. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-[#B3B3B3] hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="text-[#B3B3B3] hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Audio Player */}
      <AudioPlayer />
    </div>
  );
}
