import { useEffect, useRef, useState, ReactNode } from "react";

interface Props {
  children: ReactNode;
  frameNumber?: number;
  direction?: "left" | "right" | "up" | "center";
  delay?: number;
  label?: string;
}

type Phase = "waiting" | "frame-in" | "content-in" | "done";

export default function FilmFrame({
  children,
  frameNumber,
  direction = "up",
  delay = 0,
  label,
}: Props) {
  const ref           = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("waiting");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || phase !== "waiting") return;
        observer.disconnect();

        setTimeout(() => {
          setPhase("frame-in");
          setTimeout(() => setPhase("content-in"), 500);
          setTimeout(() => setPhase("done"), 1100);
        }, delay);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, phase]);

  const contentStyle = (): React.CSSProperties => {
    if (phase === "waiting") {
      return { opacity: 0, transform: slideOffset(direction) };
    }
    if (phase === "frame-in") {
      return { opacity: 0, transform: slideOffset(direction) };
    }
    return {
      opacity: 1,
      transform: "translate(0,0)",
      transition: "opacity 0.55s ease, transform 0.65s cubic-bezier(.22,1,.36,1)",
    };
  };

  const showFrame = phase === "frame-in" || phase === "content-in";
  const frameOpacity =
    phase === "frame-in" ? 1 : phase === "content-in" ? 0 : 0;

  return (
    <div ref={ref} className="relative">
      {/* Film projector frame overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: -4,
          pointerEvents: "none",
          opacity: frameOpacity,
          transition: "opacity 0.4s ease",
          zIndex: 20,
          borderRadius: 24,
          border: "2px solid rgba(244,114,182,0.9)",
          boxShadow:
            "0 0 0 1px rgba(244,114,182,0.3), inset 0 0 30px rgba(244,114,182,0.08)",
          animation: showFrame ? "frame-flicker 0.45s steps(2,end)" : undefined,
        }}
      >
        {/* Corner brackets */}
        {([
          ["top-0 left-0", "border-t-2 border-l-2 rounded-tl-lg"],
          ["top-0 right-0", "border-t-2 border-r-2 rounded-tr-lg"],
          ["bottom-0 left-0", "border-b-2 border-l-2 rounded-bl-lg"],
          ["bottom-0 right-0", "border-b-2 border-r-2 rounded-br-lg"],
        ] as const).map(([pos, cls], i) => (
          <div
            key={i}
            className={`absolute ${pos} w-5 h-5 border-pink-400 ${cls}`}
            style={{ margin: -1 }}
          />
        ))}

        {/* Frame number badge */}
        {frameNumber !== undefined && (
          <div
            className="absolute -top-5 left-4 text-[10px] font-mono font-bold tracking-widest"
            style={{
              color: "rgba(244,114,182,0.9)",
              letterSpacing: "0.25em",
              textShadow: "0 0 8px rgba(244,114,182,0.6)",
            }}
          >
            ◉ FRAME {String(frameNumber).padStart(2, "0")}
          </div>
        )}

        {/* Scene label */}
        {label && (
          <div
            className="absolute -bottom-5 right-4 text-[10px] font-mono tracking-widest"
            style={{
              color: "rgba(244,114,182,0.7)",
              textShadow: "0 0 6px rgba(244,114,182,0.5)",
            }}
          >
            {label} ◈
          </div>
        )}

        {/* Scan line sweep */}
        {showFrame && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, transparent 0%, rgba(244,114,182,0.15) 50%, transparent 100%)",
              backgroundSize: "100% 60px",
              animation: "scanline 0.5s linear",
              borderRadius: 22,
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      {/* Actual content */}
      <div style={contentStyle()}>{children}</div>
    </div>
  );
}

function slideOffset(dir: string): string {
  switch (dir) {
    case "left":   return "translateX(-60px)";
    case "right":  return "translateX(60px)";
    case "center": return "scale(0.92)";
    default:       return "translateY(50px)";
  }
}
