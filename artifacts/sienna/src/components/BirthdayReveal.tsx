import { useState, useEffect } from "react";
import FloatingPetals from "@/components/FloatingPetals";
import ConfettiBlast from "@/components/ConfettiBlast";
import StarField from "@/components/StarField";
import GlowOrbs from "@/components/GlowOrbs";
import LoveNoteModal from "@/components/LoveNoteModal";
import FilmFrame from "@/components/FilmFrame";

/* ── Data ────────────────────────────────────────────────── */

const FAVORITES = [
  { icon: "📖", label: "Twisted Hate Series", sublabel: "Her current obsession",   gradient: "from-rose-200 via-pink-100 to-red-200",       accent: "#f43f5e", pattern: "◆ ◇ ◆ ◇" },
  { icon: "💜", label: "BTS",                  sublabel: "Army for life",            gradient: "from-violet-200 via-purple-100 to-fuchsia-200", accent: "#a855f7", pattern: "★ ✦ ★ ✦" },
  { icon: "😊", label: "Horimiya",              sublabel: "The best love story",     gradient: "from-sky-200 via-blue-100 to-indigo-200",       accent: "#6366f1", pattern: "✿ ❀ ✿ ❀" },
  { icon: "🐾", label: "Adorable Cats",         sublabel: "Softest creatures ever",  gradient: "from-amber-200 via-orange-100 to-yellow-200",   accent: "#f59e0b", pattern: "♡ ♥ ♡ ♥" },
  { icon: "✈️", label: "Traveling",             sublabel: "Exploring the world",     gradient: "from-emerald-200 via-teal-100 to-cyan-200",     accent: "#10b981", pattern: "· ✦ · ✦" },
];

const MESSAGES = [
  { from: "On your beauty",   emoji: "✨", gradient: "from-pink-50 to-rose-50",     accent: "#f43f5e",
    text: "I could write a thousand pages and still not do justice to how stunning you are. There's something about you — the way your eyes catch the light, the way you laugh at your own jokes first — that makes every room feel warmer the moment you walk in. Happy Birthday, gorgeous." },
  { from: "On the distance",  emoji: "🌙", gradient: "from-violet-50 to-purple-50", accent: "#a855f7",
    text: "Miles between us? Just a number. Every good morning text, every late-night call, every 'I miss you' has only made me want you closer. One day I'll celebrate your birthday in person — until then, just know I'm thinking about you every single second today." },
  { from: "On what you love", emoji: "💜", gradient: "from-fuchsia-50 to-pink-50",  accent: "#ec4899",
    text: "A girl who reads twisted romance novels, cries over anime couples, screams along to BTS concerts, and melts at the sight of a random cat? That's not just your personality — that's a whole vibe. An irresistible one, by the way. Don't ever change a thing." },
  { from: "Since March",      emoji: "🌸", gradient: "from-rose-50 to-fuchsia-50",  accent: "#f9a8d4",
    text: "A few months ago we were strangers. Now I can't imagine my day without you in it. You snuck up on me, Sienna — quietly, softly, completely. You became my favourite person without even trying. That's the best kind of magic." },
];

/* ── Sub-components ──────────────────────────────────────── */

function AnimatedTitle() {
  const line1 = "Happy Birthday,".split("");
  const line2 = "Sienna!".split("");
  return (
    <h1 className="font-serif font-bold leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
      <span className="block shimmer-text text-4xl sm:text-6xl">
        {line1.map((ch, i) => (
          <span key={i} style={{ display: "inline-block", animation: `letter-pop 0.5s cubic-bezier(.34,1.56,.64,1) ${i * 0.06}s both` }}>
            {ch === " " ? "\u00a0" : ch}
          </span>
        ))}
      </span>
      <span className="block shimmer-text text-5xl sm:text-8xl mt-1">
        {line2.map((ch, i) => (
          <span key={i} style={{ display: "inline-block", animation: `letter-pop 0.6s cubic-bezier(.34,1.56,.64,1) ${0.7 + i * 0.08}s both`, opacity: 0 }}>
            {ch}
          </span>
        ))}
      </span>
    </h1>
  );
}

function FavCard({ fav, index }: { fav: typeof FAVORITES[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative rounded-3xl overflow-hidden"
      style={{
        animation: `scale-in 0.5s cubic-bezier(.34,1.56,.64,1) ${0.1 + index * 0.1}s both`,
        boxShadow: hovered ? `0 20px 60px ${fav.accent}40, 0 0 0 1px ${fav.accent}30` : "0 4px 20px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
        transform: hovered ? "translateY(-6px) scale(1.03)" : "translateY(0) scale(1)",
        cursor: "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`relative bg-gradient-to-br ${fav.gradient} h-36 flex items-center justify-center overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center opacity-10 text-3xl tracking-widest select-none">{Array(6).fill(fav.pattern).join("  ")}</div>
        <div className="absolute top-3 right-3 text-xs font-semibold tracking-widest opacity-40 uppercase" style={{ color: fav.accent }}>✦ fave</div>
        <div className="absolute bottom-2 left-3 text-[10px] font-medium opacity-30 tracking-wider" style={{ color: fav.accent }}>[ photo goes here ]</div>
        <span className="relative z-10 text-5xl select-none" style={{
          filter: `drop-shadow(0 4px 12px ${fav.accent}60)`,
          transform: hovered ? "scale(1.2) rotate(-8deg)" : "scale(1) rotate(0deg)",
          transition: "transform 0.4s cubic-bezier(.34,1.56,.64,1)",
        }}>{fav.icon}</span>
      </div>
      <div className="glass-card px-4 py-3 border-t border-white/60">
        <p className="font-semibold text-sm text-gray-800 leading-snug">{fav.label}</p>
        <p className="text-xs mt-0.5 font-medium" style={{ color: fav.accent }}>{fav.sublabel}</p>
      </div>
    </div>
  );
}

function MessageCard({ msg }: { msg: typeof MESSAGES[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${msg.gradient} border border-white/80`}
      style={{
        boxShadow: hovered ? `0 20px 50px ${msg.accent}25` : "0 4px 20px rgba(0,0,0,0.05)",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        cursor: "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${msg.accent}60, ${msg.accent}, ${msg.accent}60)` }} />
      <div className="px-6 py-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">{msg.emoji}</span>
          <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: msg.accent }}>{msg.from}</span>
        </div>
        <div className="flex gap-3">
          <span className="text-2xl leading-none mt-1 opacity-30" style={{ color: msg.accent, fontFamily: "Georgia, serif" }}>"</span>
          <p className="text-gray-700 text-sm leading-relaxed flex-1 italic">{msg.text}</p>
          <span className="text-2xl leading-none self-end opacity-30" style={{ color: msg.accent, fontFamily: "Georgia, serif" }}>"</span>
        </div>
      </div>
    </div>
  );
}

/* ── Main ───────────────────────────────────────────────── */

export default function BirthdayReveal() {
  const [showModal, setShowModal] = useState(false);
  const [confetti, setConfetti]   = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setConfetti(false), 5500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="aurora-bg min-h-screen relative overflow-x-hidden">
      <StarField />
      <GlowOrbs />
      <FloatingPetals count={30} />
      {confetti && <ConfettiBlast />}

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-16 flex flex-col gap-14">

        {/* Scene 01 — Hero (left) */}
        <FilmFrame frameNumber={1} label="HAPPY BIRTHDAY" direction="left" delay={0}>
          <section className="text-center">
            <div className="mb-5 text-7xl" style={{
              animation: "scale-in 0.5s cubic-bezier(.34,1.56,.64,1) 0.1s both, heartbeat 1.6s ease-in-out 0.6s infinite",
              filter: "drop-shadow(0 0 20px #ec4899)",
            }}>♥</div>
            <AnimatedTitle />
            <p className="text-pink-500 text-lg font-medium tracking-wide mt-5"
              style={{ animation: "fade-in-up 0.6s ease 1.4s both" }}>
              Today is your day — made just for you
            </p>
            <div className="flex items-center justify-center gap-3 mt-4"
              style={{ animation: "fade-in 0.5s ease 1.6s both" }}>
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-pink-300 to-pink-400" />
              <span className="text-2xl" style={{ filter: "drop-shadow(0 0 6px #e879f9)" }}>🌸</span>
              <div className="h-px w-24 bg-gradient-to-l from-transparent via-pink-300 to-pink-400" />
            </div>
          </section>
        </FilmFrame>

        {/* Scene 02 — Favourites (right) */}
        <FilmFrame frameNumber={2} label="SIENNA'S WORLD" direction="right" delay={0}>
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-pink-200" />
              <h2 className="font-serif text-xl font-bold text-pink-600 whitespace-nowrap"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                Sienna's Favourite Things ✨
              </h2>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-pink-200" />
            </div>
            <div className="grid grid-cols-3 gap-3 mb-3">
              {FAVORITES.slice(0, 3).map((fav, i) => <FavCard key={i} fav={fav} index={i} />)}
            </div>
            <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto w-full">
              {FAVORITES.slice(3).map((fav, i) => <FavCard key={i + 3} fav={fav} index={i + 3} />)}
            </div>
          </section>
        </FilmFrame>

        {/* Scene 03 — Messages pt.1 (left) */}
        <FilmFrame frameNumber={3} label="FOR YOU" direction="left" delay={0}>
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-pink-200" />
              <h2 className="font-serif text-xl font-bold text-pink-600 whitespace-nowrap"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                For You, Sienna 💌
              </h2>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-pink-200" />
            </div>
            <div className="flex flex-col gap-4">
              {MESSAGES.slice(0, 2).map((msg, i) => <MessageCard key={i} msg={msg} />)}
            </div>
          </section>
        </FilmFrame>

        {/* Scene 04 — Messages pt.2 (right) */}
        <FilmFrame frameNumber={4} label="WITH LOVE" direction="right" delay={0}>
          <section>
            <div className="flex flex-col gap-4">
              {MESSAGES.slice(2).map((msg, i) => <MessageCard key={i + 2} msg={msg} />)}
            </div>
          </section>
        </FilmFrame>

        {/* Scene 05 — CTA (left) */}
        <FilmFrame frameNumber={5} label="SECRET NOTE" direction="left" delay={0}>
          <section className="text-center">
            <p className="text-pink-400 text-sm mb-5 italic">
              One more thing — just for your eyes...
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold text-base shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 active:scale-95 overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #db2777, #a855f7, #ec4899)",
                backgroundSize: "200% 200%",
                animation: "aurora 4s ease infinite, pulse-glow 2.4s ease-in-out infinite",
                boxShadow: "0 10px 40px rgba(219,39,119,0.4)",
                cursor: "none",
              }}
            >
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s linear infinite" }} />
              <span className="text-xl relative z-10 animate-heartbeat">♥</span>
              <span className="relative z-10">A Special Note For You, Sienna</span>
              <span className="text-xl relative z-10">✉️</span>
            </button>
          </section>
        </FilmFrame>

        {/* Scene 06 — Footer (right) */}
        <FilmFrame frameNumber={6} label="THE END ♥" direction="right" delay={0}>
          <section className="text-center pb-4">
            <div className="flex items-center justify-center gap-2 text-pink-400 text-sm font-medium">
              <span>Made with</span>
              <span className="text-red-400 text-base animate-heartbeat inline-block"
                style={{ filter: "drop-shadow(0 0 6px #fb7185)" }}>♥</span>
              <span>for Sienna</span>
            </div>
            <div className="mt-3 flex justify-center gap-3">
              {["🌸", "✨", "💜", "✨", "🌸"].map((e, i) => (
                <span key={i} style={{
                  display: "inline-block",
                  animation: "wave-text 1.5s ease-in-out infinite",
                  animationDelay: `${i * 0.18}s`,
                  fontSize: "1.3rem",
                  filter: "drop-shadow(0 0 4px rgba(236,72,153,0.5))",
                }}>{e}</span>
              ))}
            </div>
          </section>
        </FilmFrame>

      </div>

      {showModal && <LoveNoteModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
