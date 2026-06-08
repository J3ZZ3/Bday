import { useEffect, useRef, useState, ReactNode } from "react";

interface Props {
  children: ReactNode;
  frameNumber?: number;
  direction?: "left" | "right";
  delay?: number;
  label?: string;
}

type Phase = "waiting" | "border-in" | "content-in" | "done";

export default function FilmFrame({
  children,
  frameNumber,
  direction = "left",
  delay = 0,
  label,
}: Props) {
  const ref             = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("waiting");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || phase !== "waiting") return;
        observer.disconnect();
        setTimeout(() => {
          setPhase("border-in");
          setTimeout(() => setPhase("content-in"), 380);
          setTimeout(() => setPhase("done"), 980);
        }, delay);
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, phase]);

  const showBorder   = phase === "border-in" || phase === "content-in";
  const borderOpacity = phase === "border-in" ? 1 : phase === "content-in" ? 0.5 : 0;

  const contentStyle = (): React.CSSProperties => {
    if (phase === "waiting" || phase === "border-in") {
      return {
        opacity: 0,
        transform: direction === "left" ? "translateX(-70px)" : "translateX(70px)",
      };
    }
    return {
      opacity: 1,
      transform: "translateX(0)",
      transition: "opacity 0.55s ease, transform 0.65s cubic-bezier(.34,1.28,.64,1)",
    };
  };

  return (
    <div ref={ref} className="relative">
      {/* Cute frame border */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: -6,
          pointerEvents: "none",
          opacity: borderOpacity,
          transition: "opacity 0.4s ease",
          zIndex: 20,
          borderRadius: 28,
          border: "2px dashed rgba(244,114,182,0.7)",
          boxShadow: "0 0 0 4px rgba(253,242,248,0.6), 0 0 20px rgba(244,114,182,0.15)",
          animation: showBorder ? "cute-frame-pop 0.4s cubic-bezier(.34,1.56,.64,1)" : undefined,
        }}
      >
        {/* Heart corners */}
        {[
          "absolute -top-3 -left-3",
          "absolute -top-3 -right-3",
          "absolute -bottom-3 -left-3",
          "absolute -bottom-3 -right-3",
        ].map((cls, i) => (
          <div key={i} className={`${cls} w-6 h-6 flex items-center justify-center`}>
            <span
              style={{
                fontSize: "14px",
                filter: "drop-shadow(0 0 4px rgba(244,114,182,0.8))",
                animation: showBorder ? `heartbeat 1.6s ease-in-out ${i * 0.15}s infinite` : undefined,
              }}
            >
              ♥
            </span>
          </div>
        ))}

        {/* Scene label top-center */}
        {(frameNumber !== undefined || label) && (
          <div
            className="absolute -top-5 left-0 right-0 flex justify-center"
            style={{
              animation: showBorder ? "fade-in-up 0.35s ease 0.1s both" : undefined,
              opacity: showBorder ? 1 : 0,
            }}
          >
            <div
              className="flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-bold tracking-widest"
              style={{
                background: "rgba(253,242,248,0.95)",
                border: "1px solid rgba(244,114,182,0.4)",
                color: "#f472b6",
                boxShadow: "0 2px 8px rgba(244,114,182,0.2)",
              }}
            >
              <span style={{ fontSize: "8px" }}>✦</span>
              {frameNumber !== undefined && <span>SCENE {String(frameNumber).padStart(2, "0")}</span>}
              {label && <><span style={{ opacity: 0.4 }}>·</span><span style={{ fontWeight: 500, opacity: 0.8 }}>{label}</span></>}
              <span style={{ fontSize: "8px" }}>✦</span>
            </div>
          </div>
        )}

        {/* Shimmer sweep — cute soft version */}
        {showBorder && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 26,
              background: "linear-gradient(90deg, transparent 0%, rgba(249,168,212,0.18) 50%, transparent 100%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 0.6s ease forwards",
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      {/* Content */}
      <div style={contentStyle()}>{children}</div>
    </div>
  );
}
