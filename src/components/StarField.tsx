import { useMemo, useState, useEffect } from "react";

interface Star {
  id: number;
  top: string;
  left: string;
  size: number;
  delay: string;
  duration: string;
  opacity: number;
  tx: number;
  ty: number;
}

interface ShootingStar {
  id: number;
  top: string;
  left: string;
  delay: number;
  duration: number;
}

interface NebulaClouds {
  id: number;
  top: string;
  left: string;
  width: number;
  height: number;
  color: string;
  opacity: number;
  delay: string;
  duration: string;
}

export function StarField({ count = 250 }: { count?: number }) {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2.5 + 0.5,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 3 + 2}s`,
      opacity: Math.random() * 0.6 + 0.2,
      tx: (Math.random() - 0.5) * 80,
      ty: (Math.random() - 0.5) * 80,
    }));
  }, [count]);

  // Shooting stars — random position + timing
  const shootingStars = useMemo<ShootingStar[]>(() => {
    return Array.from({ length: 4 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 40}%`,
      left: `${Math.random() * 60 + 10}%`,
      delay: i * 7 + Math.random() * 5,
      duration: 1.5 + Math.random(),
    }));
  }, []);

  // Nebula clouds — subtle colorful blurs
  const nebulaClouds = useMemo<NebulaClouds[]>(() => [
    {
      id: 0,
      top: "15%",
      left: "60%",
      width: 400,
      height: 300,
      color: "rgba(100, 80, 200, 0.06)",
      opacity: 0.06,
      delay: "0s",
      duration: "30s",
    },
    {
      id: 1,
      top: "50%",
      left: "10%",
      width: 350,
      height: 250,
      color: "rgba(50, 150, 200, 0.05)",
      opacity: 0.05,
      delay: "5s",
      duration: "35s",
    },
    {
      id: 2,
      top: "75%",
      left: "70%",
      width: 300,
      height: 350,
      color: "rgba(200, 50, 120, 0.04)",
      opacity: 0.04,
      delay: "10s",
      duration: "28s",
    },
  ], []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* 🌟 Cursor meteor highlight */}
      <div
        className="absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.15), transparent 40%)`,
        }}
      />

      {/* Aurora glows */}
      <div className="absolute -top-40 -left-40 h-125 w-125 rounded-full bg-cyan-glow/10 blur-[120px]" />
      <div className="absolute top-1/3 -right-40 h-125 w-125 rounded-full bg-violet-glow/10 blur-[120px]" />
      <div className="absolute bottom-0 left-1/3 h-100 w-100 rounded-full bg-cyan-glow/5 blur-[120px]" />

      {/* 🌫️ Nebula clouds */}
      {nebulaClouds.map((n) => (
        <div
          key={`nebula-${n.id}`}
          className="absolute rounded-full"
          style={{
            top: n.top,
            left: n.left,
            width: n.width,
            height: n.height,
            background: `radial-gradient(ellipse, ${n.color}, transparent 70%)`,
            filter: "blur(60px)",
            "--nebula-opacity": n.opacity,
            animation: `nebula-drift ${n.duration} ease-in-out ${n.delay} infinite`,
          } as React.CSSProperties}
        />
      ))}

      {/* ⭐ Stars */}
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-foreground"
          style={{
            top: s.top,
            left: s.left,
            width: `${s.size}px`,
            height: `${s.size}px`,
            boxShadow: s.size > 1.5 ? `0 0 ${s.size * 2}px currentColor` : undefined,
            "--base-opacity": s.opacity,
            "--tx": `${s.tx}px`,
            "--ty": `${s.ty}px`,
            animation: `twinkle ${s.duration} ease-in-out ${s.delay} infinite, drift 40s linear ${s.delay} infinite alternate`,
          } as React.CSSProperties}
        />
      ))}

      {/* 💫 Shooting stars */}
      {shootingStars.map((ss) => (
        <div
          key={`shoot-${ss.id}`}
          className="absolute"
          style={{
            top: ss.top,
            left: ss.left,
            width: 0,
            height: "2px",
            background: "linear-gradient(90deg, rgba(255,255,255,0.9), rgba(100,200,255,0.6), transparent)",
            borderRadius: "2px",
            boxShadow: "0 0 6px 2px rgba(100, 200, 255, 0.3)",
            animation: `shooting-star ${ss.duration}s ease-out ${ss.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}