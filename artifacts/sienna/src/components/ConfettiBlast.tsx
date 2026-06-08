import { useState } from "react";

interface Piece {
  id: number; x: number; color: string; delay: number;
  duration: number; shape: "rect" | "circle" | "star";
  size: number; rotation: number;
}

const COLORS = [
  "#f9a8d4","#e879f9","#a78bfa","#fb7185",
  "#fbbf24","#34d399","#60a5fa","#f472b6","#fde68a",
];

function makePiece(id: number): Piece {
  return {
    id,
    x: Math.random() * 100,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    delay: Math.random() * 2.5,
    duration: 2.5 + Math.random() * 2.5,
    shape: (["rect","circle","star"] as const)[Math.floor(Math.random() * 3)],
    size: 6 + Math.random() * 12,
    rotation: Math.random() * 360,
  };
}

export default function ConfettiBlast() {
  const [pieces] = useState<Piece[]>(() =>
    Array.from({ length: 80 }, (_, i) => makePiece(i))
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
            width:  p.shape === "star" ? 0 : p.size,
            height: p.shape === "rect" ? p.size * 0.45 : p.shape === "star" ? 0 : p.size,
            backgroundColor: p.shape === "star" ? "transparent" : p.color,
            color: p.color,
            borderRadius: p.shape === "circle" ? "50%" : p.shape === "rect" ? "2px" : undefined,
            fontSize: p.shape === "star" ? p.size : undefined,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            transform: `rotate(${p.rotation}deg)`,
            boxShadow: p.shape !== "star" ? `0 0 ${p.size}px ${p.color}60` : undefined,
          }}
        >
          {p.shape === "star" ? "✦" : null}
        </div>
      ))}
    </div>
  );
}
