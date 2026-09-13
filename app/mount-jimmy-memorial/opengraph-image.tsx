import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const alt =
  'In Loving Memory — The September 1977 Mount Gimie raid on the Rastafari community, Saint Lucia';
export const size = { width: 1080, height: 1350 };
export const contentType = 'image/png';

const GOLD = '#D4AF37';
const RED = '#C1121F';
const GREEN = '#1E7A3C';

const NAMES = [
  'Ras Ibo',
  'Ras Olongo',
  'Ras Choco',
  'Ras Flamba',
  'Sista Iva',
  'Sista Love',
];

function TricolorBar() {
  return (
    <div style={{ display: 'flex', width: '100%', height: 14 }}>
      <div style={{ display: 'flex', flex: 1, backgroundColor: RED }} />
      <div style={{ display: 'flex', flex: 1, backgroundColor: GOLD }} />
      <div style={{ display: 'flex', flex: 1, backgroundColor: GREEN }} />
    </div>
  );
}

export default function MountJimmyMemorial() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          backgroundColor: '#0A0A0A',
          color: '#F5F5F0',
          fontFamily: 'serif',
        }}
      >
        <TricolorBar />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '54px 70px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', fontSize: 24, letterSpacing: 6, color: GOLD, textTransform: 'uppercase' }}>
              Blessed Love · Voice of Africa
            </div>
            <div style={{ display: 'flex', marginTop: 34, fontSize: 30, letterSpacing: 10, color: '#CFCFC7', textTransform: 'uppercase' }}>
              In Loving Memory
            </div>
            <div style={{ display: 'flex', marginTop: 10, fontSize: 118, fontWeight: 700, lineHeight: 1.02, color: '#FFFFFF', textAlign: 'center' }}>
              MOUNT GIMIE
            </div>
            <div style={{ display: 'flex', marginTop: 14, fontSize: 27, color: GOLD, letterSpacing: 2 }}>
              September 1977 · Saint Lucia
            </div>
            <div style={{ display: 'flex', marginTop: 18, maxWidth: 760, fontSize: 25, lineHeight: 1.4, color: '#C8C8C0', textAlign: 'center' }}>
              For the Rastafari elders who endured the raid on the community — and for all who kept the faith through persecution.
            </div>
          </div>
          <div style={{ display: 'flex', width: 120, height: 3, backgroundColor: GOLD }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {NAMES.map((n) => (
              <div key={n} style={{ display: 'flex', fontSize: 46, fontWeight: 700, color: '#FFFFFF', marginBottom: 12, letterSpacing: 1 }}>
                {n}
              </div>
            ))}
            <div style={{ display: 'flex', fontSize: 28, fontStyle: 'italic', color: GOLD, marginTop: 6 }}>
              &amp; many others
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', maxWidth: 820, fontSize: 38, fontWeight: 700, lineHeight: 1.25, color: GOLD, textAlign: 'center' }}>
              They raided the mountain. They could not raid the faith.
            </div>
            <div style={{ display: 'flex', marginTop: 26, fontSize: 22, letterSpacing: 3, color: '#9A9A92', textTransform: 'uppercase' }}>
              Blazing 99.3 FM · We Remember
            </div>
          </div>
        </div>
        <TricolorBar />
      </div>
    ),
    { ...size },
  );
}
