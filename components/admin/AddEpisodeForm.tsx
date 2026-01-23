'use client';

import { useState } from 'react';
import { Loader2, Upload, Link as LinkIcon, Type, FileText } from 'lucide-react';

interface FormData {
  title: string;
  archive_url: string;
  description: string;
  duration: string;
}

interface AddEpisodeFormProps {
  onAdd: (episode: Omit<FormData, 'id' | 'episode_number'>) => void;
  onCancel: () => void;
}

export function AddEpisodeForm({ onAdd, onCancel }: AddEpisodeFormProps) {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    archive_url: '',
    description: '',
    duration: '45:00',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Simulate a small delay for UX
      await new Promise(resolve => setTimeout(resolve, 500));

      onAdd(formData);
      setSuccess(true);
      setFormData({ title: '', archive_url: '', description: '', duration: '45:00' });
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to add episode');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Success Message */}
      {success && (
        <div className="p-4 rounded-lg bg-green-500/20 border border-green-500/50 text-green-400">
          Episode added successfully! Check the episodes list below.
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400">
          {error}
        </div>
      )}

      {/* Title Field */}
      <div>
        <label className="block font-body text-sm text-gray-300 mb-2">
          <Type className="w-4 h-4 inline-block mr-2" />
          Episode Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-surface border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
          placeholder="Enter episode title"
          required
        />
      </div>

      {/* Archive URL Field */}
      <div>
        <label className="block font-body text-sm text-gray-300 mb-2">
          <LinkIcon className="w-4 h-4 inline-block mr-2" />
          Archive.org URL
        </label>
        <input
          type="url"
          name="archive_url"
          value={formData.archive_url}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-surface border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
          placeholder="https://archive.org/details/..."
          required
        />
        <p className="mt-2 font-body text-xs text-gray-500">
          Paste the Archive.org episode page URL or direct audio link.
        </p>
      </div>

      {/* Duration Field */}
      <div>
        <label className="block font-body text-sm text-gray-300 mb-2">
          <Type className="w-4 h-4 inline-block mr-2" />
          Duration (optional)
        </label>
        <input
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-surface border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
          placeholder="45:00"
        />
      </div>

      {/* Description Field */}
      <div>
        <label className="block font-body text-sm text-gray-300 mb-2">
          <FileText className="w-4 h-4 inline-block mr-2" />
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 rounded-lg bg-surface border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors resize-none"
          placeholder="Enter episode description"
          required
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 px-4 rounded-lg bg-surface border border-gray-700 text-gray-300 font-body font-medium hover:text-gold-400 hover:border-gold-500/50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 text-black font-body font-medium hover:from-gold-400 hover:to-gold-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              Add Episode
            </>
          )}
        </button>
      </div>
    </form>
  );
}
