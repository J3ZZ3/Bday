import { useEffect } from "react";

interface Props {
  onClose: () => void;
}

export default function LoveNoteModal({ onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pink-900/40 backdrop-blur-sm animate-fade-in"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="glass-card rounded-3xl w-full max-w-lg p-8 shadow-2xl border border-pink-200 animate-modal-in overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl animate-heartbeat inline-block">♥</span>
              <span className="text-sm font-medium tracking-widest uppercase text-pink-400">
                Just for you
              </span>
            </div>
            <h2
              className="font-serif text-2xl font-bold text-pink-700"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              My Dearest Sienna,
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-pink-100 hover:bg-pink-200 flex items-center justify-center text-pink-500 hover:text-pink-700 transition-colors duration-200 flex-shrink-0 mt-1"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-pink-800 text-sm leading-relaxed">
          <p className="font-medium text-base text-pink-600">
            Happy Birthday, Sienna ♥
          </p>
          <p>
            From the moment we started talking back in March, you've become so much more
            than just my girlfriend — you've become my safe place, my peace, and my daily
            reason to smile.
          </p>
          <p>
            I love you for so many reasons, Sienna. Your awkwardly cute smile lights up even
            my darkest days. The way you support me, the way you're always honest and deeply
            caring — it's everything I could ever hope for. And your faith in me? It pushes
            me to be better every single day.
          </p>
          <p>
            Even though we're miles apart, our connection is real and deep. Talking to you
            every day, sharing laughs, stories, and dreams — those moments have become the
            most special part of my life. I wouldn't trade them for anything.
          </p>
          <p>
            Thank you for being you — for loving me, trusting me, and choosing me. I'm so
            grateful to walk through life with you, even if it's long-distance for now. One
            day, I'll be holding your hand while saying these words in person.
          </p>
          <p className="font-medium text-pink-700">
            I love you, and I always will.
            <br />
            Happy Birthday, my beautiful Sienna ♥
          </p>
        </div>

        {/* Footer decoration */}
        <div className="mt-6 flex justify-center gap-2">
          {["🌸", "♥", "✨", "♥", "🌸"].map((e, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                animation: "wave-text 1.5s ease-in-out infinite",
                animationDelay: `${i * 0.15}s`,
              }}
            >
              {e}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
