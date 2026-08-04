import { useEffect, useRef, useState } from "react";

// ─── Planet data ────────────────────────────────────────────────────
interface Planet {
  name: string;
  size: number;
  top: string;
  left?: string;
  right?: string;
  gradient: string;
  glow: string;
  glowSize: number;
  animDelay: string;
  animDuration: string;
  ring?: {
    width: number;
    height: number;
    borderColor: string;
  };
  opacity: number;
}

const planets: Planet[] = [
  {
    name: "mars",
    size: 80,
    top: "12%",
    right: "8%",
    gradient: "radial-gradient(circle at 35% 35%, #e8a87c 0%, #c0392b 40%, #922b21 70%, #641e16 100%)",
    glow: "rgba(231, 76, 60, 0.15)",
    glowSize: 40,
    animDelay: "0s",
    animDuration: "18s",
    opacity: 0.45,
  },
  {
    name: "jupiter",
    size: 140,
    top: "32%",
    left: "3%",
    gradient: "radial-gradient(circle at 40% 30%, #f5cba7 0%, #e59866 20%, #d4775b 40%, #c0392b 55%, #e59866 70%, #f0b27a 85%, #d4a574 100%)",
    glow: "rgba(243, 156, 18, 0.12)",
    glowSize: 60,
    animDelay: "3s",
    animDuration: "24s",
    opacity: 0.3,
  },
  {
    name: "saturn",
    size: 110,
    top: "55%",
    right: "5%",
    gradient: "radial-gradient(circle at 38% 35%, #fdebd0 0%, #f0c27a 30%, #d4a556 55%, #b8860b 80%, #8b6914 100%)",
    glow: "rgba(241, 196, 15, 0.12)",
    glowSize: 50,
    animDelay: "6s",
    animDuration: "22s",
    ring: {
      width: 180,
      height: 40,
      borderColor: "rgba(218, 179, 100, 0.35)",
    },
    opacity: 0.35,
  },
  {
    name: "neptune",
    size: 70,
    top: "75%",
    left: "7%",
    gradient: "radial-gradient(circle at 35% 30%, #85c1e9 0%, #3498db 35%, #1a5276 65%, #0e2f44 100%)",
    glow: "rgba(52, 152, 219, 0.15)",
    glowSize: 35,
    animDelay: "9s",
    animDuration: "20s",
    opacity: 0.4,
  },
  {
    name: "earth",
    size: 50,
    top: "90%",
    right: "15%",
    gradient: "radial-gradient(circle at 40% 35%, #82e0aa 0%, #3498db 35%, #2471a3 60%, #1a5276 85%, #0e2f44 100%)",
    glow: "rgba(46, 204, 113, 0.12)",
    glowSize: 25,
    animDelay: "2s",
    animDuration: "16s",
    opacity: 0.4,
  },
];

export function CosmicBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
    >
      {planets.map((p) => {
        const parallaxFactor = p.size > 100 ? 0.02 : 0.04;
        const translateY = scrollY * parallaxFactor;

        return (
          <div
            key={p.name}
            className="absolute"
            style={{
              top: p.top,
              left: p.left,
              right: p.right,
              transform: `translateY(${translateY}px)`,
              zIndex: 0,
            }}
          >
            {/* Planet body */}
            <div
              className="cosmic-float"
              style={{
                width: p.size,
                height: p.size,
                borderRadius: "50%",
                background: p.gradient,
                opacity: p.opacity,
                boxShadow: `
                  0 0 ${p.glowSize}px ${p.glowSize / 2}px ${p.glow},
                  0 0 ${p.glowSize * 2}px ${p.glowSize}px ${p.glow},
                  inset -${p.size * 0.15}px -${p.size * 0.1}px ${p.size * 0.3}px rgba(0,0,0,0.5)
                `,
                animationDelay: p.animDelay,
                animationDuration: p.animDuration,
              }}
            >
              {/* Atmospheric shine */}
              <div
                style={{
                  position: "absolute",
                  top: "8%",
                  left: "15%",
                  width: "35%",
                  height: "25%",
                  borderRadius: "50%",
                  background: "radial-gradient(ellipse, rgba(255,255,255,0.25) 0%, transparent 70%)",
                }}
              />
            </div>

            {/* Saturn ring */}
            {p.ring && (
              <div
                className="cosmic-float"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: p.ring.width,
                  height: p.ring.height,
                  marginTop: -(p.ring.height / 2),
                  marginLeft: -(p.ring.width / 2),
                  borderRadius: "50%",
                  border: `2px solid ${p.ring.borderColor}`,
                  opacity: p.opacity * 0.8,
                  transform: "rotateX(75deg)",
                  boxShadow: `
                    0 0 15px 2px ${p.ring.borderColor},
                    inset 0 0 15px 2px ${p.ring.borderColor}
                  `,
                  animationDelay: p.animDelay,
                  animationDuration: p.animDuration,
                }}
              />
            )}
          </div>
        );
      })}

      {/* Decorative orbital rings */}
      <div
        className="absolute cosmic-orbit"
        style={{
          top: "20%",
          left: "50%",
          width: 600,
          height: 600,
          marginLeft: -300,
          marginTop: -300,
          borderRadius: "50%",
          border: "1px solid rgba(100, 180, 255, 0.04)",
          opacity: 0.5,
        }}
      />
      <div
        className="absolute cosmic-orbit"
        style={{
          top: "60%",
          left: "50%",
          width: 900,
          height: 900,
          marginLeft: -450,
          marginTop: -450,
          borderRadius: "50%",
          border: "1px solid rgba(180, 100, 255, 0.03)",
          opacity: 0.4,
          animationDirection: "reverse",
          animationDuration: "180s",
        }}
      />
    </div>
  );
}
