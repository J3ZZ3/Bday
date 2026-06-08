import { useState, useRef, useEffect } from "react";

const PLAYLIST_ID = "4gprUU6LyEh2cK3FyhRJYS";

export default function AutoplayMusic() {
  const [dismissed, setDismissed] = useState(false);
  const [visible, setVisible]     = useState(false);
  const [muted, setMuted]         = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Show the pill after a short delay so it doesn't compete with confetti
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1800);
    return () => clearTimeout(t);
  }, []);

  const toggleMute = () => {
    setMuted(m => !m);
    // Reload iframe with/without autoplay to simulate mute (Spotify embed has no JS API)
    if (iframeRef.current) {
      const base = `https://open.spotify.com/embed/playlist/${PLAYLIST_ID}?utm_source=generator`;
      iframeRef.current.src = muted ? `${base}&autoplay=1` : base;
    }
  };

  return (
    <>
      {/* Hidden autoplay iframe — 1px so browser doesn't fully suppress it */}
      <iframe
        ref={iframeRef}
        src={`https://open.spotify.com/embed/playlist/${PLAYLIST_ID}?utm_source=generator&autoplay=1`}
        width="1"
        height="1"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        style={{ position: "fixed", bottom: 0, left: 0, opacity: 0, pointerEvents: "none", zIndex: -1 }}
        title="background music"
      />

      {/* Floating now-playing pill */}
      {!dismissed && (
        <div
          className="fixed top-4 left-1/2 z-[9990] flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-xl"
          style={{
            transform: `translateX(-50%) translateY(${visible ? "0" : "-60px"})`,
            opacity: visible ? 1 : 0,
            transition: "transform 0.5s cubic-bezier(.34,1.28,.64,1), opacity 0.4s ease",
            background: "linear-gradient(90deg, rgba(253,242,248,0.95), rgba(245,243,255,0.95))",
            border: "1.5px solid rgba(244,114,182,0.35)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          {/* Animated music bars */}
          <div className="flex items-end gap-0.5 h-4" aria-hidden="true">
            {[1, 0.6, 0.9, 0.4, 0.8].map((h, i) => (
              <div
                key={i}
                className="w-0.5 rounded-full bg-pink-400"
                style={{
                  height: muted ? "4px" : `${h * 14}px`,
                  animation: muted ? undefined : `music-bar 0.8s ease-in-out infinite alternate`,
                  animationDelay: `${i * 0.12}s`,
                  transition: "height 0.3s ease",
                }}
              />
            ))}
          </div>

          <span className="text-xs font-semibold text-pink-600 tracking-wide">
            {muted ? "Music paused" : "Playing our playlist ♥"}
          </span>

          {/* Mute / unmute */}
          <button
            onClick={toggleMute}
            className="text-pink-400 hover:text-pink-600 transition-colors text-base leading-none"
            title={muted ? "Resume" : "Pause"}
            style={{ cursor: "none" }}
          >
            {muted ? "▶" : "⏸"}
          </button>

          {/* Dismiss */}
          <button
            onClick={() => setDismissed(true)}
            className="text-pink-300 hover:text-pink-500 transition-colors text-xs leading-none ml-0.5"
            title="Dismiss"
            style={{ cursor: "none" }}
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
