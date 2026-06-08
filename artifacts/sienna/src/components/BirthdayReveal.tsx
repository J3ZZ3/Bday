import { useState, useEffect } from "react";
import FloatingPetals from "@/components/FloatingPetals";
import ConfettiBlast from "@/components/ConfettiBlast";
import StarField from "@/components/StarField";
import GlowOrbs from "@/components/GlowOrbs";
import LoveNoteModal from "@/components/LoveNoteModal";

const FAVORITES = [
  { icon: "📖", label: "Twisted Hate Series", color: "#fce7f3" },
  { icon: "💜", label: "BTS",                  color: "#f5f3ff" },
  { icon: "😊", label: "Horimiya",              color: "#fdf4ff" },
  { icon: "🐾", label: "Adorable Cats",         color: "#fff1f2" },
  { icon: "✈️", label: "Traveling & Exploring", color: "#f0fdf4" },
];

const MESSAGES = [
  { text: "Happy Birthday, Sienna! Hope you have a fantastic day filled with joy and laughter!", from: "From a dear friend" },
  { text: "To the sweetest girl, happy birthday! May your year be as amazing as you are.", from: "With love" },
  { text: "Wishing you all the happiness in the world on your special day, Sienna!", from: "Thinking of you" },
];

// Animated shimmer title letter-by-letter
function BirthdayTitle() {
  const line1 = "Happy Birthday,".split("");
  const line2 = "Sienna!".split("");

  return (
    <h1
      className="font-serif font-bold leading-tight"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      <span className="block shimmer-text text-4xl sm:text-6xl">
        {line1.map((ch, i) => (
          <span key={i} style={{ display:"inline-block", animation:`letter-pop 0.5s cubic-bezier(.34,1.56,.64,1) ${i*0.06}s both` }}>
            {ch === " " ? "\u00a0" : ch}
          </span>
        ))}
      </span>
      <span className="block shimmer-text text-5xl sm:text-8xl mt-1">
        {line2.map((ch, i) => (
          <span key={i} style={{ display:"inline-block", animation:`letter-pop 0.6s cubic-bezier(.34,1.56,.64,1) ${0.7 + i*0.08}s both`, opacity: 0 }}>
            {ch}
          </span>
        ))}
      </span>
    </h1>
  );
}

export default function BirthdayReveal() {
  const [showModal, setShowModal] = useState(false);
  const [visible, setVisible]     = useState<Set<number>>(new Set());
  const [confetti, setConfetti]   = useState(true);

  useEffect(() => {
    [0, 350, 700, 1050, 1400].forEach((delay, i) => {
      setTimeout(() => setVisible(prev => new Set([...prev, i])), delay);
    });
    const t = setTimeout(() => setConfetti(false), 5500);
    return () => clearTimeout(t);
  }, []);

  const v = (i: number) => visible.has(i);
  const sectionCls = (i: number) =>
    `transition-all duration-700 ${v(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`;

  return (
    <div className="aurora-bg min-h-screen relative overflow-x-hidden">
      <StarField />
      <GlowOrbs />
      <FloatingPetals count={30} />
      {confetti && <ConfettiBlast />}

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-16 flex flex-col gap-10">

        {/* Hero */}
        <section className={`text-center ${sectionCls(0)}`}>
          <div
            className="mb-5 text-7xl"
            style={{ animation: "scale-in 0.5s cubic-bezier(.34,1.56,.64,1) 0.1s both, heartbeat 1.6s ease-in-out 0.6s infinite", filter: "drop-shadow(0 0 20px #ec4899)" }}
          >
            ♥
          </div>

          <BirthdayTitle />

          <p
            className="text-pink-400 text-lg font-medium tracking-wide mt-4"
            style={{ animation: "fade-in-up 0.6s ease 1.4s both" }}
          >
            Today is your day — made just for you
          </p>

          <div
            className="flex items-center justify-center gap-3 mt-5"
            style={{ animation: "fade-in 0.5s ease 1.6s both" }}
          >
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-pink-300 to-pink-400" />
            <span className="text-2xl" style={{ filter: "drop-shadow(0 0 6px #e879f9)" }}>🌸</span>
            <div className="h-px w-24 bg-gradient-to-l from-transparent via-pink-300 to-pink-400" />
          </div>
        </section>

        {/* Favourites */}
        <section className={sectionCls(1)}>
          <div className="glass-card rounded-3xl p-7 shadow-xl animate-card-float">
            <h2
              className="font-serif text-2xl font-bold text-pink-600 mb-5 text-center"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Sienna's Favourite Things ✨
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FAVORITES.map((fav, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 border border-pink-100 hover:border-pink-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] cursor-default"
                  style={{
                    background: fav.color,
                    animation: `scale-in 0.4s cubic-bezier(.34,1.56,.64,1) ${0.1 + i * 0.1}s both`,
                  }}
                >
                  <span className="text-2xl" style={{ filter: "drop-shadow(0 0 4px rgba(0,0,0,0.15))" }}>{fav.icon}</span>
                  <span className="text-pink-700 font-semibold text-sm">{fav.label}</span>
                  <span className="ml-auto text-pink-300 text-xs">✦</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Messages */}
        <section className={sectionCls(2)}>
          <h2
            className="font-serif text-2xl font-bold text-pink-600 mb-5 text-center"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Messages for Sienna 💌
          </h2>
          <div className="flex flex-col gap-4">
            {MESSAGES.map((msg, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl px-6 py-5 shadow-md border border-pink-100 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 animate-card-float"
                style={{
                  animationDelay: `${i * 1.5}s`,
                  animation: `scale-in 0.4s cubic-bezier(.34,1.56,.64,1) ${i * 0.15}s both, card-float ${4 + i}s ease-in-out ${i * 1.2}s infinite`,
                }}
              >
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-pink-300 text-lg mt-0.5">❝</span>
                  <p className="text-pink-800 text-sm leading-relaxed italic flex-1">{msg.text}</p>
                  <span className="text-pink-300 text-lg mt-0.5 self-end">❞</span>
                </div>
                <span className="text-pink-400 text-xs font-semibold tracking-wide">— {msg.from}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Love note button */}
        <section className={`text-center ${sectionCls(3)}`}>
          <button
            onClick={() => setShowModal(true)}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold text-base shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 active:scale-95 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #db2777, #a855f7, #ec4899)",
              backgroundSize: "200% 200%",
              animation: "aurora 4s ease infinite, pulse-glow 2.4s ease-in-out infinite",
              boxShadow: "0 10px 40px rgba(219,39,119,0.4)",
            }}
          >
            {/* shine sweep */}
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.5s linear infinite",
              }}
            />
            <span className="text-xl relative z-10 animate-heartbeat">♥</span>
            <span className="relative z-10">A Special Note For You, Sienna</span>
            <span className="text-xl relative z-10">✉️</span>
          </button>
        </section>

        {/* Footer */}
        <section className={`text-center ${sectionCls(4)}`}>
          <div className="flex items-center justify-center gap-2 text-pink-400 text-sm font-medium">
            <span>Made with</span>
            <span className="text-red-400 text-base animate-heartbeat inline-block" style={{ filter: "drop-shadow(0 0 6px #fb7185)" }}>♥</span>
            <span>for Sienna</span>
          </div>
          <div className="mt-3 flex justify-center gap-3">
            {["🌸", "✨", "💜", "✨", "🌸"].map((e, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  animation: `wave-text 1.5s ease-in-out infinite`,
                  animationDelay: `${i * 0.18}s`,
                  fontSize: "1.3rem",
                  filter: "drop-shadow(0 0 4px rgba(236,72,153,0.5))",
                }}
              >
                {e}
              </span>
            ))}
          </div>
        </section>
      </div>

      {showModal && <LoveNoteModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
