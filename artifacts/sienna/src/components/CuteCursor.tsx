import { useEffect, useRef, useState } from "react";

interface Trail {
  id: number;
  x: number;
  y: number;
  symbol: string;
  color: string;
}

const SYMBOLS = ["♥", "✦", "🌸", "✿", "★", "♡", "✧", "·"];
const COLORS  = ["#f9a8d4", "#e879f9", "#fb7185", "#fde68a", "#c084fc", "#f472b6"];

let trailId = 0;

export default function CuteCursor() {
  const posRef   = useRef({ x: -200, y: -200 });
  const cursorEl = useRef<HTMLDivElement>(null);
  const rafRef   = useRef<number>(0);
  const [trails, setTrails]   = useState<Trail[]>([]);
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);

  // Smooth cursor follow
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      setVisible(true);

      // Spawn trail particle occasionally
      if (Math.random() > 0.55) {
        const particle: Trail = {
          id: ++trailId,
          x: e.clientX + (Math.random() - 0.5) * 16,
          y: e.clientY + (Math.random() - 0.5) * 16,
          symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        };
        setTrails(prev => [...prev.slice(-14), particle]);
        setTimeout(() => {
          setTrails(prev => prev.filter(t => t.id !== particle.id));
        }, 650);
      }
    };

    const onLeave = () => setVisible(false);
    const onClick = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 350);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onClick);

    // RAF loop for smooth cursor
    const tick = () => {
      if (cursorEl.current) {
        cursorEl.current.style.transform =
          `translate(${posRef.current.x}px, ${posRef.current.y}px) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onClick);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Hide native cursor globally
  useEffect(() => {
    document.documentElement.style.cursor = "none";
    return () => { document.documentElement.style.cursor = ""; };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden" aria-hidden="true">
      {/* Trail particles */}
      {trails.map(t => (
        <span
          key={t.id}
          className="absolute text-sm"
          style={{
            left: t.x,
            top: t.y,
            color: t.color,
            transform: "translate(-50%, -50%)",
            animation: "cursor-trail 0.65s ease forwards",
            textShadow: `0 0 6px ${t.color}`,
            fontSize: `${9 + Math.random() * 8}px`,
          }}
        >
          {t.symbol}
        </span>
      ))}

      {/* Main cursor */}
      <div
        ref={cursorEl}
        className="absolute"
        style={{
          willChange: "transform",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      >
        {/* Outer ring */}
        <div
          style={{
            position: "absolute",
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "1.5px solid rgba(244,114,182,0.5)",
            transform: "translate(-50%, -50%)",
            animation: clicked
              ? "cursor-click-ring 0.35s ease forwards"
              : "cursor-ring-breathe 2s ease-in-out infinite",
          }}
        />

        {/* Heart dot */}
        <div
          style={{
            position: "absolute",
            transform: "translate(-50%, -50%)",
            fontSize: clicked ? "22px" : "18px",
            filter: "drop-shadow(0 0 8px #f472b6)",
            animation: clicked
              ? "cursor-click-heart 0.35s cubic-bezier(.34,1.56,.64,1) forwards"
              : "cursor-bob 1.8s ease-in-out infinite",
            transition: "font-size 0.15s ease",
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          🌸
        </div>
      </div>
    </div>
  );
}
