import { useMemo } from "react";

interface Star {
  id: number;
  top: string;
  left: string;
  size: number;
  delay: string;
  duration: string;
  opacity: number;
}

export function StarField({ count = 120 }: { count?: number }) {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 0.5,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 4 + 3}s`,
      opacity: Math.random() * 0.6 + 0.2,
    }));
  }, [count]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Aurora glows */}
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-cyan-glow/10 blur-[120px]" />
      <div className="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-violet-glow/10 blur-[120px]" />
      <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-cyan-glow/5 blur-[120px]" />

      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-foreground"
          style={{
            top: s.top,
            left: s.left,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animation: `twinkle ${s.duration} ease-in-out ${s.delay} infinite`,
            boxShadow: s.size > 1.5 ? "0 0 4px currentColor" : undefined,
          }}
        />
      ))}
    </div>
  );
}
