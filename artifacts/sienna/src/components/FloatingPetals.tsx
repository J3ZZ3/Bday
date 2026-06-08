import { useMemo } from "react";

interface Petal {
  id: number;
  symbol: string;
  left: string;
  duration: string;
  delay: string;
  size: string;
  opacity: number;
  color: string;
}

const PETALS  = ["🌸", "✿", "❀", "♥", "✦", "✧", "★", "·", "◆", "✺", "❋"];
const COLORS  = ["#f9a8d4", "#e879f9", "#c084fc", "#fb7185", "#f472b6", "#fde68a", "#a78bfa"];

export default function FloatingPetals({ count = 22 }: { count?: number }) {
  const petals = useMemo<Petal[]>(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      symbol: PETALS[i % PETALS.length],
      left: `${Math.random() * 100}%`,
      duration: `${7 + Math.random() * 14}s`,
      delay: `${Math.random() * 12}s`,
      size: `${0.7 + Math.random() * 1.4}rem`,
      opacity: 0.25 + Math.random() * 0.6,
      color: COLORS[i % COLORS.length],
    })), [count]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      {petals.map(p => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            bottom: "-2rem",
            fontSize: p.size,
            opacity: p.opacity,
            animationDuration: p.duration,
            animationDelay: p.delay,
            color: p.color,
            filter: `drop-shadow(0 0 4px ${p.color})`,
          }}
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
}
