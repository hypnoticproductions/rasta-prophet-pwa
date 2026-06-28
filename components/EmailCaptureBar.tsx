'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

/**
 * EmailCaptureBar — Sticky bottom banner that captures emails
 *
 * Dismissible, localStorage-backed so it doesn't nag returning visitors.
 * Shows after user scrolls or after 10 seconds.
 *
 * INTEGRATION: Add <EmailCaptureBar /> to app/layout.tsx
 *
 * TODO: Wire up to your email service (Mailchimp, ConvertKit, etc)
 */

export default function EmailCaptureBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  // Show after 10s or on scroll
  useState(() => {
    if (typeof window === 'undefined') return;
    const dismissed = localStorage.getItem('email-capture-dismissed');
    if (dismissed) return;

    const timer = setTimeout(() => setIsVisible(true), 10000);
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('email-capture-dismissed', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // TODO: Replace with your actual email service API endpoint
    // Example: Mailchimp, ConvertKit, Beehiiv, Substack, etc.
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setTimeout(() => {
          setIsVisible(false);
          localStorage.setItem('email-capture-dismissed', 'true');
        }, 3000);
      } else {
        alert('Error subscribing. Please try again.');
        setStatus('idle');
      }
    } catch (err) {
      console.error(err);
      alert('Error subscribing. Please try again.');
      setStatus('idle');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-red via-black to-green border-t-2 border-gold/60 shadow-[0_-4px_40px_rgba(212,175,55,0.3)]">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        {/* Copy */}
        <div className="flex-1">
          <p className="text-gold font-bold uppercase tracking-[0.2em] text-xs md:text-sm">
            {status === 'success'
              ? '🔥 BLESSED LOVE — You\'re on the list!'
              : '📡 Don\'t Miss the Next Bombshell'}
          </p>
          <p className="text-stone-300 text-xs md:text-sm mt-1">
            {status === 'success'
              ? 'Prophet Alem will reach you when the next truth drops.'
              : 'Get weekly reasoning drops, exclusive clips, and the call to move.'}
          </p>
        </div>

        {/* Form */}
        {status !== 'success' && (
          <form onSubmit={handleSubmit} className="flex gap-2 items-center">
            <input
              type="email"
              placeholder="youremail@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-2 bg-black/60 border border-gold/40 rounded text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-gold w-60"
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="px-6 py-2 bg-gold text-black font-bold uppercase tracking-[0.15em] text-xs hover:bg-gold/90 transition-colors disabled:opacity-50 rounded"
            >
              {status === 'submitting' ? 'Joining...' : 'Join'}
            </button>
          </form>
        )}

        {/* Dismiss */}
        <button
          onClick={handleDismiss}
          className="text-stone-400 hover:text-gold transition-colors p-1"
          aria-label="Dismiss"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
