import { useEffect, useState } from "react";
import BadgePill from "./BadgePill";
import { getPoster } from "../services/poster";
import type { MCUTitle } from "../types/movie";

export default function PosterCard({
  title,
  onToggle,
}: {
  title: MCUTitle;
  onToggle: (id: number) => void;
}) {
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [poster, setPoster] = useState("");

useEffect(() => {
  if (!title.tmdbId) return;

  getPoster(title.tmdbId, title.type)
    .then(setPoster)
    .catch(console.error);
}, [title.tmdbId, title.type]);

  return (
    <div
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onClick={() => onToggle(title.id)}
      style={{
        borderRadius: 16,
        overflow: "hidden",
        backgroundImage: poster
          ? `url(${poster})`
          : `linear-gradient(160deg, ${title.gradient[0]}, ${title.gradient[1]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        cursor: "pointer",
        transform: pressed
          ? "scale(0.96)"
          : hovered
          ? "scale(1.02)"
          : "scale(1)",
        transition: "transform 0.18s ease, box-shadow 0.18s ease",
        boxShadow: hovered
          ? "0 12px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)"
          : "0 4px 12px rgba(0,0,0,0.4)",
        display: "flex",
        flexDirection: "column",
        aspectRatio: "2 / 3",
        position: "relative",
        userSelect: "none",
      }}
    >
      {/* Noise */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
          opacity: 0.4,
          pointerEvents: "none",
        }}
      />

      {/* Watched */}
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 2,
        }}
      >
        {title.watched ? (
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "rgba(74,222,128,0.2)",
              border: "2px solid #4ade80",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(8px)",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 7l4 4 6-6"
                stroke="#4ade80"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        ) : (
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.3)",
              border: "2px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(8px)",
            }}
          />
        )}
      </div>

      {/* Phase */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 2,
          fontSize: 9,
          fontWeight: 700,
          color: "rgba(255,255,255,0.5)",
          textTransform: "uppercase",
        }}
      >
        Ph.{title.phase}
      </div>

      {/* Bottom */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          padding: "32px 10px 12px",
          background:
            "linear-gradient(to top, rgba(0,0,0,.88), rgba(0,0,0,0))",
        }}
      >
        <BadgePill type={title.type} />

        <div
          style={{
            marginTop: 6,
            color: "#fff",
            fontWeight: 700,
            fontSize: 14,
            lineHeight: 1.2,
          }}
        >
          {title.title}
        </div>

        <div
          style={{
            marginTop: 4,
            color: "rgba(255,255,255,.6)",
            fontSize: 11,
          }}
        >
          {title.year}
        </div>
      </div>
    </div>
  );
}