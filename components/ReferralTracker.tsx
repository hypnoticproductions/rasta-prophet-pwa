'use client';

import { useEffect } from 'react';

/**
 * ReferralTracker — invisible component, mounts once in the root layout.
 *
 * When a visitor arrives via a shared link carrying ?ref=<code>, we:
 *   1. Persist the referrer's code so their share is "credited".
 *   2. Record a lightweight attribution event in localStorage (a growth-loop
 *      breadcrumb you can later POST to an analytics endpoint or read for a
 *      sharer leaderboard).
 *
 * Static-export safe: no server dependency. Swap the console/localStorage
 * sink for a real beacon (e.g. fetch to /api/track or a GA4 event) when you
 * add an analytics backend.
 */

export default function ReferralTracker() {
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get('ref');
      if (!ref) return;

      // Credit the referrer (only the first one wins for this visitor).
      if (!localStorage.getItem('rp_referred_by')) {
        localStorage.setItem('rp_referred_by', ref);
      }

      // Append to an attribution log (cap length so it can't grow unbounded).
      const key = 'rp_ref_events';
      const log: Array<{ ref: string; path: string; t: number }> = JSON.parse(
        localStorage.getItem(key) || '[]'
      );
      log.push({ ref, path: window.location.pathname, t: Date.now() });
      localStorage.setItem(key, JSON.stringify(log.slice(-50)));

      // TODO: forward to a real endpoint when analytics backend exists:
      // navigator.sendBeacon('/api/track', JSON.stringify({ ref, path: location.pathname }));
    } catch {
      /* no-op: never break the page over tracking */
    }
  }, []);

  return null;
}
