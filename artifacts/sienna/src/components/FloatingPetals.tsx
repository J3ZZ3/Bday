import { useEffect, useState } from "react";

const PETALS = ["🌸", "✿", "❀", "♥", "✦", "·", "°", "✿"];

interface Petal {
  id: number;
  symbol: string;
  left: string;
  duration: string;
  delay: string;
  size: string;
  opacity: number;
}

function makePetal(id: number): Petal {
  return {
    id,
    symbol: PETALS[Math.floor(Math.random() * PETALS.length)],
    left: `${Math.random() * 100}%`,
    duration: `${8 + Math.random() * 12}s`,
    delay: `${Math.random() * 10}s`,
    size: `${0.6 + Math.random() * 1.2}rem`,
    opacity: 0.2 + Math.random() * 0.5,
  };
}

export default function FloatingPetals() {
  const [petals] = useState<Petal[]>(() =>
    Array.from({ length: 18 }, (_, i) => makePetal(i))
  );

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
            color: ["#f9a8d4", "#e879f9", "#c084fc", "#fb7185", "#f472b6"][p.id % 5],
          }}
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
}
