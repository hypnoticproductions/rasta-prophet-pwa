import { ImageResponse } from 'next/og';
import { getAllGuests, getGuestBySlug } from '@/data/guests';

export const dynamic = 'force-static';
export const alt = 'Guest — Blessed Love Voice of Africa';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return getAllGuests().map((g) => ({ slug: g.slug }));
}

const GOLD = '#D4AF37';
const RED = '#FF0000';
const GREEN = '#006400';

export default async function GuestOgImage({ params }: { params: { slug: string } }) {
  const guest = getGuestBySlug(params.slug);
  const fullName = guest
    ? `${guest.honorific ? guest.honorific + ' ' : ''}${guest.name}`.trim()
    : 'Blessed Love Voice of Africa';
  const title = guest?.title ?? 'The Vibration of Truth';
  const lead = guest?.lead ?? '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#050505',
          backgroundImage:
            'radial-gradient(circle at 15% 0%, rgba(255,0,0,0.25), transparent 55%), radial-gradient(circle at 90% 100%, rgba(0,100,0,0.3), transparent 55%)',
          padding: '70px 80px',
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 10, height: 56, backgroundColor: RED, marginRight: 22 }} />
          <span
            style={{
              color: GOLD,
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 6,
              textTransform: 'uppercase',
            }}
          >
            The Rasta Prophet · Featured Guest
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ color: '#FFFFFF', fontSize: 64, fontWeight: 700, lineHeight: 1.05 }}>
            {fullName}
          </span>
          <span style={{ marginTop: 20, color: GOLD, fontSize: 30, fontStyle: 'italic', lineHeight: 1.25 }}>
            {title}
          </span>
          {lead ? (
            <span style={{ marginTop: 24, color: '#CFCFCF', fontSize: 24, lineHeight: 1.35 }}>
              {lead.length > 150 ? lead.slice(0, 147) + '…' : lead}
            </span>
          ) : null}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            borderTop: '1px solid rgba(212,175,55,0.4)',
            paddingTop: 24,
          }}
        >
          <span style={{ color: '#E5E5E5', fontSize: 22, letterSpacing: 3, textTransform: 'uppercase' }}>
            Blessed Love · Voice of Africa · Blazin 99.3
          </span>
          <div style={{ display: 'flex', marginLeft: 'auto' }}>
            <div style={{ width: 24, height: 24, backgroundColor: RED }} />
            <div style={{ width: 24, height: 24, backgroundColor: GOLD, marginLeft: 8 }} />
            <div style={{ width: 24, height: 24, backgroundColor: GREEN, marginLeft: 8 }} />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
