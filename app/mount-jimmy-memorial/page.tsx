import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'In Loving Memory — Mount Gimie 1977 | Blessed Love: Voice of Africa',
  description:
    'A memorial to the Rastafari elders who endured the September 1977 raid on the community at Mount Gimie, Saint Lucia. They raided the mountain. They could not raid the faith.',
};

export default function MountJimmyMemorialPage() {
  return (
    <main style={{ background: '#0A0A0A', color: '#F5F5F0', minHeight: '100vh', padding: 40, fontFamily: 'Georgia, serif' }}>
      <h1 style={{ color: '#D4AF37', letterSpacing: 4 }}>In Loving Memory — Mount Gimie, September 1977</h1>
      <p style={{ maxWidth: 640, lineHeight: 1.6, color: '#C8C8C0' }}>
        A tribute to the Rastafari elders who endured the raid on the community at Mount Gimie, Saint Lucia — Ras Ibo, Ras Olongo, Ras Choco, Ras Flamba, Sista Iva, Sista Love, and many others.
      </p>
      <p style={{ color: '#D4AF37', fontStyle: 'italic' }}>They raided the mountain. They could not raid the faith.</p>
    </main>
  );
}
