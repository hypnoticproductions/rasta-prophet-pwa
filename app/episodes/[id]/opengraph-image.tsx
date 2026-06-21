import { ImageResponse } from "next/og";
import { getEpisodeById } from "@/data/episodes";
import { getPostById } from "@/data/posts/index";
import { isBlackStarPromo, BLACK_STAR_OG_STRIP } from "@/data/blackStarRoots";

// Route segment config for the dynamic OG image.
export const runtime = "edge";
export const alt = "Blessed Love Voice of Africa — The Rasta Prophet";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand colors (match the site palette).
const GOLD = "#D4AF37";
const RED = "#FF0000";
const GREEN = "#006400";

export default async function OpengraphImage({
  params,
}: {
  params: { id: string };
}) {
  const episode = getEpisodeById(params.id);
  const post = getPostById(params.id);

  const title = episode?.title ?? "Blessed Love Voice of Africa";
  const epNumber = episode?.episode_number;
  const hook =
    post?.hook ??
    episode?.description ??
    "The Vibration of Truth — Voice of Africa";

  // Promo-hour shows brand the bottom strip with Black Star Roots.
  const promo = episode ? isBlackStarPromo(episode.id) : false;
  const bottomStrip = promo
    ? BLACK_STAR_OG_STRIP
    : "Blessed Love · Voice of Africa · Blazin 99.3";

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
        {/* Top bar: brand + episode number */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
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
          {typeof epNumber === "number" ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: `2px solid ${GOLD}`,
                borderRadius: 999,
                padding: "10px 28px",
                color: GOLD,
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              Episode {epNumber}
            </div>
          ) : null}
        </div>

        {/* Center: title + hook */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              color: "#FFFFFF",
              fontSize: 60,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -1,
            }}
          >
            {title}
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
            {hook}
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
              color: promo ? GOLD : "#E5E5E5",
              fontSize: 24,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            {bottomStrip}
          </span>
          <div style={{ display: "flex", marginLeft: "auto" }}>
            <div
              style={{ width: 26, height: 26, backgroundColor: RED }}
            />
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
    {
      ...size,
    }
  );
}
