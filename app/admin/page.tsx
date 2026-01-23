'use client';

import { useState, useEffect } from 'react';
import { episodes as initialEpisodes, Episode } from '@/data/episodes';
import { AddEpisodeForm } from '@/components/admin/AddEpisodeForm';
import { LogOut, Music, Plus, Trash2, Edit2, Eye } from 'lucide-react';

export default function AdminPage() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEpisode, setEditingEpisode] = useState<Episode | null>(null);

  useEffect(() => {
    // Load episodes from localStorage or use initial data
    const saved = localStorage.getItem('rasta-prophet-episodes');
    if (saved) {
      try {
        setEpisodes(JSON.parse(saved));
      } catch {
        setEpisodes(initialEpisodes);
      }
    } else {
      setEpisodes(initialEpisodes);
      localStorage.setItem('rasta-prophet-episodes', JSON.stringify(initialEpisodes));
    }

    // Check login status
    const loggedIn = localStorage.getItem('rasta-prophet-admin');
    setIsLoggedIn(!!loggedIn);
  }, []);

  const handleLogin = (password: string) => {
    // Simple password check (in production, use proper auth)
    if (password === 'rasta2024') {
      localStorage.setItem('rasta-prophet-admin', 'true');
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    localStorage.removeItem('rasta-prophet-admin');
    setIsLoggedIn(false);
  };

  const handleAddEpisode = (episode: Omit<Episode, 'id' | 'episode_number' | 'published_date'>) => {
    const newEpisode: Episode = {
      ...episode,
      id: Date.now().toString(),
      episode_number: episodes.length + 1,
      published_date: new Date().toISOString().split('T')[0],
    };
    const updated = [...episodes, newEpisode];
    setEpisodes(updated);
    localStorage.setItem('rasta-prophet-episodes', JSON.stringify(updated));
    setShowAddForm(false);
  };

  const handleDeleteEpisode = (id: string) => {
    if (confirm('Are you sure you want to delete this episode?')) {
      const updated = episodes.filter(ep => ep.id !== id);
      setEpisodes(updated);
      localStorage.setItem('rasta-prophet-episodes', JSON.stringify(updated));
    }
  };

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass border-b border-gold-500/20 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                <Music className="w-5 h-5 text-black" />
              </div>
              <div>
                <h1 className="font-heading text-xl text-white">
                  Admin Dashboard
                </h1>
                <p className="font-body text-xs text-gray-400">
                  The Rasta Prophet Podcast
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gold-500 text-black font-body text-sm hover:bg-gold-400 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Episode
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-gray-700 text-gray-300 hover:text-gold-400 hover:border-gold-500/50 transition-colors font-body text-sm"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gold-500/20 flex items-center justify-center">
                <Music className="w-6 h-6 text-gold-400" />
              </div>
              <div>
                <p className="font-body text-sm text-gray-400">Total Episodes</p>
                <p className="font-heading text-3xl text-white">{episodes.length}</p>
              </div>
            </div>
          </div>
          
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-rasta-green/20 flex items-center justify-center">
                <Plus className="w-6 h-6 text-rasta-green" />
              </div>
              <div>
                <p className="font-body text-sm text-gray-400">Add New</p>
                <p className="font-heading text-3xl text-white">Episode</p>
              </div>
            </div>
          </div>
          
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-rasta-red/20 flex items-center justify-center">
                <Eye className="w-6 h-6 text-rasta-red" />
              </div>
              <div>
                <p className="font-body text-sm text-gray-400">Status</p>
                <p className="font-heading text-3xl text-rasta-green">Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Episode Form */}
        {showAddForm && (
          <div className="glass-card rounded-xl p-8 mb-8">
            <h2 className="font-heading text-3xl text-gold-400 mb-2">
              Add New Episode
            </h2>
            <p className="font-body text-gray-400 mb-6">
              Add a new episode. It will be saved to your browser's local storage.
            </p>
            <AddEpisodeForm onAdd={handleAddEpisode} onCancel={() => setShowAddForm(false)} />
          </div>
        )}

        {/* Episodes List */}
        <div className="glass-card rounded-xl p-8">
          <h2 className="font-heading text-3xl text-white mb-6">
            All Episodes
          </h2>
          
          {episodes.length === 0 ? (
            <div className="text-center py-12">
              <Music className="w-16 h-16 mx-auto text-gray-600 mb-4" />
              <p className="font-body text-gray-400">No episodes yet. Add your first episode above!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {episodes.map((episode, index) => (
                <div
                  key={episode.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-surface border border-gray-700 hover:border-gold-500/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gold-500/20 flex items-center justify-center">
                      <span className="font-heading text-gold-400">#{episode.episode_number}</span>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg text-white">{episode.title}</h3>
                      <p className="font-body text-sm text-gray-400 truncate max-w-md">
                        {episode.description.substring(0, 80)}...
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-body text-sm text-gray-500">{episode.duration}</span>
                    <button
                      onClick={() => handleDeleteEpisode(episode.id)}
                      className="p-2 rounded-lg bg-rasta-red/20 text-rasta-red hover:bg-rasta-red hover:text-white transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <a
            href="https://archive.org/details/@richard876/uploads"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card rounded-xl p-6 hover:border-gold-500/50 transition-colors group"
          >
            <h3 className="font-heading text-xl text-white mb-2 group-hover:text-gold-400 transition-colors">
              Archive.org Uploads
            </h3>
            <p className="font-body text-sm text-gray-400">
              Browse and find episodes to add to the podcast.
            </p>
          </a>
          
          <a
            href="/"
            className="glass-card rounded-xl p-6 hover:border-gold-500/50 transition-colors group"
          >
            <h3 className="font-heading text-xl text-white mb-2 group-hover:text-gold-400 transition-colors">
              View Live Site
            </h3>
            <p className="font-body text-sm text-gray-400">
              See how episodes appear on the public site.
            </p>
          </a>
        </div>
      </main>
    </div>
  );
}

function AdminLogin({ onLogin }: { onLogin: (password: string) => boolean }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onLogin(password)) {
      setError('Invalid password. Try: rasta2024');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center glow-gold">
            <Music className="w-10 h-10 text-black" />
          </div>
          <h1 className="font-heading text-4xl text-gold-400 mb-2">
            ADMIN ACCESS
          </h1>
          <p className="font-body text-gray-400">
            The Rasta Prophet Podcast
          </p>
        </div>

        {/* Login Form */}
        <div className="glass-card rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block font-body text-sm text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-surface border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                placeholder="Enter admin password"
                required
              />
              <p className="mt-2 font-body text-xs text-gray-500">
                Default password: rasta2024
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 text-black font-body font-medium hover:from-gold-400 hover:to-gold-500 transition-all flex items-center justify-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              Sign In
            </button>
          </form>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="font-body text-sm text-gray-500 hover:text-gold-400 transition-colors"
          >
            ← Back to Podcast
          </a>
        </div>
      </div>
    </div>
  );
}
