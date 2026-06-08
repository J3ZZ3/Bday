import { useMemo } from "react";

interface Orb {
  id: number;
  size: number;
  x: number;
  y: number;
  color: string;
  duration: number;
  delay: number;
}

const ORBS = [
  { color: "rgba(244,114,182,0.25)", size: 400 },
  { color: "rgba(192,132,252,0.2)",  size: 300 },
  { color: "rgba(251,146,60,0.15)",  size: 250 },
  { color: "rgba(167,139,250,0.2)",  size: 350 },
  { color: "rgba(236,72,153,0.18)", size: 200 },
];

export default function GlowOrbs() {
  const orbs = useMemo<Orb[]>(() =>
    ORBS.map((o, i) => ({
      id: i,
      size: o.size,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      color: o.color,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 5,
    })), []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      {orbs.map(orb => (
        <div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            animation: `glow-orb ${orb.duration}s ease-in-out infinite`,
            animationDelay: `${orb.delay}s`,
            filter: "blur(2px)",
          }}
        />
      ))}
    </div>
  );
}
