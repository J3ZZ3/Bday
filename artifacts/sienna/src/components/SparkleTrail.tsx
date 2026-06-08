import { useEffect, useRef } from "react";

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  symbol: string;
  color: string;
  size: number;
}

const SYMBOLS = ["✦", "✧", "★", "✿", "♥", "·", "◆", "✺"];
const COLORS  = ["#f9a8d4", "#e879f9", "#c084fc", "#fde68a", "#fb7185", "#ffffff"];

let _id = 0;

export default function SparkleTrail() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastX = -999, lastY = -999;

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      if (Math.hypot(dx, dy) < 18) return;
      lastX = e.clientX;
      lastY = e.clientY;

      if (!containerRef.current) return;

      const el = document.createElement("span");
      const symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      const color  = COLORS[Math.floor(Math.random() * COLORS.length)];
      const size   = 10 + Math.random() * 14;

      el.textContent = symbol;
      el.className = "sparkle-cursor";
      el.style.cssText = `
        left: ${e.clientX + (Math.random() - 0.5) * 20}px;
        top:  ${e.clientY + (Math.random() - 0.5) * 20}px;
        color: ${color};
        font-size: ${size}px;
        text-shadow: 0 0 8px ${color};
        transform: translate(-50%, -50%);
      `;

      containerRef.current.appendChild(el);
      setTimeout(() => el.remove(), 700);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 9999 }}
      aria-hidden="true"
    />
  );
}
