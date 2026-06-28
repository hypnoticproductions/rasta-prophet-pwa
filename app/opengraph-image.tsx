import { ImageResponse } from "next/og";

// Default share image for the homepage / any page without its own OG image.
// Static-export safe: no edge runtime, so it is prerendered to a real PNG and
// shipped in the export (an edge route would be dropped → 404 → no preview).
export const dynamic = "force-static";
export const alt = "The Rasta Prophet — Blessed Love Voice of Africa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GOLD = "#D4AF37";
const RED = "#FF0000";
const GREEN = "#006400";

export default function HomeOpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#050505",
          backgroundImage:
            "radial-gradient(circle at 20% 0%, rgba(212,175,55,0.25), transparent 55%), radial-gradient(circle at 90% 100%, rgba(0,100,0,0.25), transparent 55%)",
          padding: "70px 80px",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        {/* Top brand bar */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 10,
              height: 64,
              backgroundColor: RED,
              marginRight: 24,
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                color: GOLD,
                fontSize: 30,
                fontWeight: 700,
                letterSpacing: 6,
                textTransform: "uppercase",
              }}
            >
              The Rasta Prophet
            </span>
            <span
              style={{
                color: "#B3B3B3",
                fontSize: 18,
                letterSpacing: 4,
                textTransform: "uppercase",
              }}
            >
              Blessed Love · Voice of Africa
            </span>
          </div>
        </div>

        {/* Center headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              color: "#FFFFFF",
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -1,
            }}
          >
            The Vibration of Truth
          </span>
          <span
            style={{
              marginTop: 28,
              color: GOLD,
              fontSize: 30,
              fontStyle: "italic",
              lineHeight: 1.3,
            }}
          >
            Pan-African reasoning, roots & enlightenment — every broadcast.
          </span>
        </div>

        {/* Bottom branding strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderTop: "1px solid rgba(212,175,55,0.4)",
            paddingTop: 26,
          }}
        >
          <span
            style={{
              color: "#E5E5E5",
              fontSize: 24,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            Blessed Love · Voice of Africa · Blazin 99.3
          </span>
          <div style={{ display: "flex", marginLeft: "auto" }}>
            <div style={{ width: 26, height: 26, backgroundColor: RED }} />
            <div
              style={{
                width: 26,
                height: 26,
                backgroundColor: GOLD,
                marginLeft: 8,
              }}
            />
            <div
              style={{
                width: 26,
                height: 26,
                backgroundColor: GREEN,
                marginLeft: 8,
              }}
            />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
