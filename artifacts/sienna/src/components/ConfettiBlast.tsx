import { useEffect, useState } from "react";

interface Piece {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
  shape: "rect" | "circle";
  size: number;
  rotation: number;
}

const COLORS = [
  "#f9a8d4", "#e879f9", "#a78bfa", "#fb7185",
  "#fbbf24", "#34d399", "#60a5fa", "#f472b6",
];

function makePiece(id: number): Piece {
  return {
    id,
    x: Math.random() * 100,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2,
    shape: Math.random() > 0.5 ? "rect" : "circle",
    size: 6 + Math.random() * 10,
    rotation: Math.random() * 360,
  };
}

export default function ConfettiBlast() {
  const [pieces] = useState<Piece[]>(() =>
    Array.from({ length: 60 }, (_, i) => makePiece(i))
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-50" aria-hidden="true">
      {pieces.map(p => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.x}%`,
            top: "-10px",
            width: p.size,
            height: p.shape === "rect" ? p.size * 0.5 : p.size,
            backgroundColor: p.color,
            borderRadius: p.shape === "circle" ? "50%" : "2px",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}
