import { useState, useEffect, useRef } from "react";
import FloatingPetals from "@/components/FloatingPetals";
import StarField from "@/components/StarField";
import GlowOrbs from "@/components/GlowOrbs";
import FilmFrame from "@/components/FilmFrame";

const BIRTHDAY_MONTH = 7;
const BIRTHDAY_DAY   = 3;

function getNextBirthday() {
  const now  = new Date();
  const year = now.getFullYear();
  let bd = new Date(year, BIRTHDAY_MONTH - 1, BIRTHDAY_DAY, 0, 0, 0, 0);
  if (now >= bd) bd = new Date(year + 1, BIRTHDAY_MONTH - 1, BIRTHDAY_DAY, 0, 0, 0, 0);
  return bd;
}

function getTimeLeft() {
  const diff = getNextBirthday().getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000)  % 60),
  };
}

function pad(n: number) { return String(n).padStart(2, "0"); }

interface Unit { curr: string; prev: string; flip: boolean }
type Units = Record<string, Unit>;
const KEYS = ["days", "hours", "minutes", "seconds"] as const;

function makeUnits(t: ReturnType<typeof getTimeLeft>): Units {
  return {
    days:    { curr: pad(t.days),    prev: pad(t.days),    flip: false },
    hours:   { curr: pad(t.hours),   prev: pad(t.hours),   flip: false },
    minutes: { curr: pad(t.minutes), prev: pad(t.minutes), flip: false },
    seconds: { curr: pad(t.seconds), prev: pad(t.seconds), flip: false },
  };
}

const LABELS = [
  { key: "days",    label: "Days" },
  { key: "hours",   label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

function AnimatedTitle() {
  const chars = "For Sienna".split("");
  return (
    <h1 className="font-serif text-5xl sm:text-7xl font-bold text-pink-600 leading-tight"
      style={{ fontFamily: "'Playfair Display', serif" }}>
      {chars.map((ch, i) => (
        <span key={i} style={{
          display: "inline-block",
          animation: `letter-pop 0.6s cubic-bezier(.34,1.56,.64,1) ${0.3 + i * 0.07}s forwards`,
          opacity: 0,
        }}>
          {ch === " " ? "\u00a0" : ch}
        </span>
      ))}
    </h1>
  );
}

export default function CountdownPage() {
  const [units, setUnits] = useState<Units>(() => makeUnits(getTimeLeft()));
  const prevRef = useRef(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => {
      const next = getTimeLeft();
      setUnits(prev => {
        const updated = { ...prev };
        KEYS.forEach(k => {
          const nv = pad((next as any)[k]);
          const ov = pad((prevRef.current as any)[k]);
          if (nv !== ov) updated[k] = { curr: nv, prev: ov, flip: true };
        });
        prevRef.current = next;
        return updated;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const flipping = KEYS.filter(k => units[k].flip);
    if (!flipping.length) return;
    const t = setTimeout(() => {
      setUnits(prev => {
        const u = { ...prev };
        flipping.forEach(k => { u[k] = { ...u[k], flip: false }; });
        return u;
      });
    }, 450);
    return () => clearTimeout(t);
  }, [units]);

  return (
    <div className="aurora-bg min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-4">
      <StarField />
      <GlowOrbs />
      <FloatingPetals count={26} />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto gap-8">

        {/* Frame 01 — Badge + Title */}
        <FilmFrame frameNumber={1} label="SCENE · FOR SIENNA" direction="center" delay={100}>
          <div className="flex flex-col items-center gap-5">
            <div className="glass-card rounded-full px-4 py-1.5 flex items-center gap-2 shadow"
              style={{ animation: "scale-in 0.5s cubic-bezier(.34,1.56,.64,1) 0.1s both" }}>
              <span className="text-pink-400 animate-heartbeat inline-block">♥</span>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-pink-400">
                Something special is coming
              </p>
              <span className="text-pink-400 animate-heartbeat inline-block" style={{ animationDelay: "0.4s" }}>♥</span>
            </div>
            <AnimatedTitle />
            <div className="flex items-center gap-3">
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-pink-300 to-pink-400" />
              <span className="text-pink-500 text-2xl animate-heartbeat inline-block"
                style={{ filter: "drop-shadow(0 0 8px #ec4899)" }}>♥</span>
              <div className="h-px w-20 bg-gradient-to-l from-transparent via-pink-300 to-pink-400" />
            </div>
          </div>
        </FilmFrame>

        {/* Frame 02 — Countdown */}
        <FilmFrame frameNumber={2} label="COUNTDOWN" direction="up" delay={300}>
          <div className="grid grid-cols-4 gap-3 sm:gap-5 w-full max-w-md">
            {LABELS.map(({ key, label }, i) => {
              const u = units[key];
              return (
                <div key={key} className="flex flex-col items-center"
                  style={{ animation: `scale-in 0.5s cubic-bezier(.34,1.56,.64,1) ${0.5 + i * 0.1}s both` }}>
                  <div className="glass-card rounded-2xl w-full aspect-square flex items-center justify-center relative overflow-hidden shadow-lg animate-pulse-glow"
                    style={{ animationDelay: `${i * 0.6}s` }}>
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300" />
                    {u.flip && (
                      <span className="absolute timer-digit font-serif text-3xl sm:text-5xl font-bold text-pink-300"
                        style={{ animation: "page-out 0.3s ease forwards", fontFamily: "'Playfair Display', serif" }}>
                        {u.prev}
                      </span>
                    )}
                    <span key={u.curr + key}
                      className="timer-digit font-serif text-3xl sm:text-5xl font-bold text-pink-600 relative z-10"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        animation: u.flip ? "digit-in 0.35s cubic-bezier(.34,1.56,.64,1) forwards" : undefined,
                        filter: "drop-shadow(0 0 6px rgba(236,72,153,0.4))",
                      }}>
                      {u.curr}
                    </span>
                  </div>
                  <span className="mt-2 text-xs font-semibold tracking-widest uppercase text-pink-400/80">{label}</span>
                </div>
              );
            })}
          </div>
        </FilmFrame>

        {/* Frame 03 — Sub-message */}
        <FilmFrame frameNumber={3} label="JULY 3RD" direction="up" delay={600}>
          <div className="glass-card rounded-2xl px-7 py-4 max-w-sm shadow-lg animate-card-float">
            <p className="text-pink-500 text-base leading-relaxed">
              Until July 3rd — a day made just for you{" "}
              <span className="animate-heartbeat inline-block" style={{ filter: "drop-shadow(0 0 6px #ec4899)" }}>♥</span>
            </p>
          </div>
        </FilmFrame>

        {/* Decorative dots */}
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="rounded-full bg-pink-400"
              style={{ width: 4 + i * 2, height: 4 + i * 2, opacity: 0.2 + i * 0.18,
                animation: `twinkle ${1.5 + i * 0.3}s ease-in-out infinite`, animationDelay: `${i * 0.25}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
