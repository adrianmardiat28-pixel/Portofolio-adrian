import { useMemo, useState, useEffect } from "react";

interface Star {
  id: number;
  top: string;
  left: string;
  size: number;
  delay: string;
  duration: string;
  opacity: number;
  tx: number; // Arah pergerakan horizontal (Translate X)
  ty: number; // Arah pergerakan vertikal (Translate Y)
}

export function StarField({ count = 200 }: { count?: number }) {
  // State untuk menyimpan posisi mouse (mulai dari luar layar agar tidak muncul di pojok)
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
      size: Math.random() * 2 + 0.5,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 3 + 2}s`,
      opacity: Math.random() * 0.6 + 0.2,
      // Randomize jarak pergerakan dari -40px sampai 40px
      tx: (Math.random() - 0.5) * 80, 
      ty: (Math.random() - 0.5) * 80,
    }));
  }, [count]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* 🌟 EFEK METEOR HIGHLIGHT (Mengikuti Kursor) */}
      <div
        className="absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.15), transparent 40%)`,
        }}
      />

      {/* Aurora glows bawaan */}
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-cyan-glow/10 blur-[120px]" />
      <div className="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-violet-glow/10 blur-[120px]" />
      <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-cyan-glow/5 blur-[120px]" />

      {/* Render Bintang */}
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-foreground"
          style={{
            top: s.top,
            left: s.left,
            width: `${s.size}px`,
            height: `${s.size}px`,
            boxShadow: s.size > 1.5 ? "0 0 4px currentColor" : undefined,
            // Custom properti untuk dikirim ke CSS Keyframes
            "--base-opacity": s.opacity,
            "--tx": `${s.tx}px`,
            "--ty": `${s.ty}px`,
            // Gabungan animasi kedip (twinkle) dan melayang (drift)
            animation: `twinkle ${s.duration} ease-in-out ${s.delay} infinite, drift 40s linear ${s.delay} infinite alternate`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}