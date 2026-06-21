import { ImageResponse } from 'next/og';
import { getAllQuotes, getQuoteById } from '@/data/quotes';

export const dynamic = 'force-static';
export const alt = 'Quote — Blessed Love Voice of Africa';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const OG_SIZE = { width: 1200, height: 630 };

export function generateStaticParams() {
  return getAllQuotes().map((q) => ({ id: q.id }));
}

const GOLD = '#D4AF37';
const RED = '#FF0000';
const GREEN = '#006400';

// Scale the quote font down as the text gets longer so it always fits the card.
function fontSizeFor(len: number): number {
  if (len < 80) return 56;
  if (len < 140) return 46;
  if (len < 200) return 38;
  return 32;
}

export default async function QuoteOgImage({ params }: { params: { id: string } }) {
  const quote = getQuoteById(params.id);
  const text = quote?.text ?? 'The Vibration of Truth';
  const attribution = quote?.attribution ?? 'Blessed Love Voice of Africa';
  const quoteFontSize = fontSizeFor(text.length);

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
            'radial-gradient(circle at 0% 0%, rgba(255,0,0,0.3), transparent 45%), radial-gradient(circle at 100% 100%, rgba(0,100,0,0.35), transparent 45%)',
          padding: '64px 80px',
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 10, height: 50, backgroundColor: RED, marginRight: 20 }} />
          <span style={{ color: GOLD, fontSize: 24, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>
            The Rasta Prophet
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
          <span style={{ color: GOLD, fontSize: 90, lineHeight: 0.6, height: 50 }}>“</span>
          <span style={{ color: '#FFFFFF', fontSize: quoteFontSize, fontStyle: 'italic', lineHeight: 1.25, fontWeight: 600 }}>
            {text}
          </span>
          <span style={{ marginTop: 28, color: GOLD, fontSize: 24, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>
            — {attribution}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            borderTop: '1px solid rgba(212,175,55,0.4)',
            paddingTop: 22,
          }}
        >
          <span style={{ color: '#E5E5E5', fontSize: 20, letterSpacing: 3, textTransform: 'uppercase' }}>
            Blessed Love · Voice of Africa · Blazin 99.3
          </span>
          <div style={{ display: 'flex', marginLeft: 'auto' }}>
            <div style={{ width: 22, height: 22, backgroundColor: RED }} />
            <div style={{ width: 22, height: 22, backgroundColor: GOLD, marginLeft: 8 }} />
            <div style={{ width: 22, height: 22, backgroundColor: GREEN, marginLeft: 8 }} />
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
