import { useEffect, useState } from "react";

interface Props {
  onDone: () => void;
}

interface Burst {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  delay: number;
}

const COLORS = [
  "#f9a8d4", "#e879f9", "#c084fc", "#fde68a",
  "#fb7185", "#ffffff", "#a5b4fc", "#fdba74",
];

export default function MagicTransition({ onDone }: Props) {
  const [phase, setPhase] = useState<"burst" | "reveal" | "done">("burst");

  const bursts: Burst[] = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: 30 + Math.random() * 40,
    y: 30 + Math.random() * 40,
    color: COLORS[i % COLORS.length],
    size: 6 + Math.random() * 18,
    delay: Math.random() * 0.4,
  }));

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("reveal"), 500);
    const t2 = setTimeout(() => { setPhase("done"); onDone(); }, 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[9000] flex items-center justify-center"
      style={{ pointerEvents: "none" }}
    >
      {/* Full screen color burst */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, #fdf4ff 0%, #fce7f3 40%, transparent 70%)",
          animation: phase === "burst" ? "portal-expand 0.6s cubic-bezier(.2,.8,.4,1) forwards" : undefined,
          opacity: phase === "reveal" ? 0 : 1,
          transition: phase === "reveal" ? "opacity 0.5s ease" : undefined,
        }}
      />

      {/* Expanding rings */}
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className="absolute rounded-full border-2"
          style={{
            width: 80 + i * 60,
            height: 80 + i * 60,
            borderColor: COLORS[i * 3],
            animation: `portal-ring ${0.6 + i * 0.15}s cubic-bezier(.2,.8,.4,1) forwards`,
            animationDelay: `${i * 0.08}s`,
            boxShadow: `0 0 20px ${COLORS[i * 3]}`,
          }}
        />
      ))}

      {/* Exploding sparkles */}
      {bursts.map(b => (
        <div
          key={b.id}
          className="absolute rounded-full"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: b.size,
            height: b.size,
            backgroundColor: b.color,
            boxShadow: `0 0 ${b.size * 2}px ${b.color}`,
            animation: `sparkle-pop 0.8s ease forwards`,
            animationDelay: `${b.delay}s`,
            transform: "translate(-50%,-50%)",
          }}
        />
      ))}

      {/* Central heart */}
      <div
        className="relative text-5xl"
        style={{
          animation: "scale-in 0.3s cubic-bezier(.34,1.56,.64,1) forwards, page-out 0.4s ease 0.5s forwards",
          filter: "drop-shadow(0 0 20px #ec4899)",
        }}
      >
        ♥
      </div>
    </div>
  );
}
