import { useState, useEffect, useRef } from "react";
import FloatingPetals from "@/components/FloatingPetals";

const BIRTHDAY_MONTH = 7;
const BIRTHDAY_DAY = 3;

function getNextBirthday() {
  const now = new Date();
  const year = now.getFullYear();
  let birthday = new Date(year, BIRTHDAY_MONTH - 1, BIRTHDAY_DAY, 0, 0, 0, 0);
  if (now >= birthday) {
    birthday = new Date(year + 1, BIRTHDAY_MONTH - 1, BIRTHDAY_DAY, 0, 0, 0, 0);
  }
  return birthday;
}

function getTimeLeft() {
  const now = new Date();
  const target = getNextBirthday();
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

interface FlipUnit {
  value: string;
  prev: string;
  flipping: boolean;
}

export default function CountdownPage() {
  const [time, setTime] = useState(getTimeLeft);
  const [units, setUnits] = useState<Record<string, FlipUnit>>({
    days: { value: pad(getTimeLeft().days), prev: pad(getTimeLeft().days), flipping: false },
    hours: { value: pad(getTimeLeft().hours), prev: pad(getTimeLeft().hours), flipping: false },
    minutes: { value: pad(getTimeLeft().minutes), prev: pad(getTimeLeft().minutes), flipping: false },
    seconds: { value: pad(getTimeLeft().seconds), prev: pad(getTimeLeft().seconds), flipping: false },
  });

  const prevTime = useRef(time);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = getTimeLeft();
      setUnits(prev => {
        const updated = { ...prev };
        const keys = ["days", "hours", "minutes", "seconds"] as const;
        const vals: Record<string, number> = {
          days: next.days, hours: next.hours, minutes: next.minutes, seconds: next.seconds
        };
        const oldVals: Record<string, number> = {
          days: prevTime.current.days, hours: prevTime.current.hours,
          minutes: prevTime.current.minutes, seconds: prevTime.current.seconds
        };
        keys.forEach(k => {
          if (vals[k] !== oldVals[k]) {
            updated[k] = { value: pad(vals[k]), prev: pad(oldVals[k]), flipping: true };
          }
        });
        return updated;
      });
      setTime(next);
      prevTime.current = next;
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const keys = Object.keys(units);
    const flippingKeys = keys.filter(k => units[k].flipping);
    if (flippingKeys.length === 0) return;
    const t = setTimeout(() => {
      setUnits(prev => {
        const updated = { ...prev };
        flippingKeys.forEach(k => {
          updated[k] = { ...updated[k], flipping: false };
        });
        return updated;
      });
    }, 400);
    return () => clearTimeout(t);
  }, [units]);

  const labels = [
    { key: "days", label: "Days" },
    { key: "hours", label: "Hours" },
    { key: "minutes", label: "Minutes" },
    { key: "seconds", label: "Seconds" },
  ];

  return (
    <div className="gradient-bg min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-4">
      <FloatingPetals />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto animate-fade-in-up">
        {/* Top label */}
        <p className="text-sm font-medium tracking-[0.3em] uppercase text-pink-400 mb-4 opacity-80">
          Something special is coming
        </p>

        {/* Main title */}
        <h1 className="font-serif text-5xl sm:text-7xl font-bold text-pink-600 mb-2 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
          For Sienna
        </h1>

        <div className="flex items-center gap-2 mb-10">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-pink-300" />
          <span className="text-pink-400 text-xl animate-heartbeat inline-block">♥</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-pink-300" />
        </div>

        {/* Countdown grid */}
        <div className="grid grid-cols-4 gap-3 sm:gap-6 w-full max-w-lg">
          {labels.map(({ key, label }, i) => {
            const unit = units[key];
            return (
              <div
                key={key}
                className="flex flex-col items-center"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="glass-card rounded-2xl w-full aspect-square flex flex-col items-center justify-center shadow-lg relative overflow-hidden animate-pulse-glow"
                  style={{ animationDelay: `${i * 0.5}s` }}>
                  {/* Decorative top bar */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300" />

                  {/* Flip animation overlay */}
                  {unit.flipping && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className="timer-digit font-serif text-4xl sm:text-5xl font-bold text-pink-200 opacity-50"
                        style={{ animation: "count-flip 0.4s ease" }}
                      >
                        {unit.prev}
                      </span>
                    </div>
                  )}

                  <span className={`timer-digit font-serif text-4xl sm:text-5xl font-bold text-pink-600 relative z-10 transition-all duration-300 ${unit.flipping ? "opacity-0 scale-75" : "opacity-100 scale-100"}`}
                    style={{ fontFamily: "'Playfair Display', serif" }}>
                    {unit.value}
                  </span>
                </div>
                <span className="mt-2 text-xs sm:text-sm font-medium tracking-widest uppercase text-pink-400 opacity-70">
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Sub-message */}
        <div className="mt-12 glass-card rounded-2xl px-6 py-4 max-w-sm">
          <p className="text-pink-500 text-base leading-relaxed">
            Until July 3rd — a day made just for you <span className="animate-heartbeat inline-block">♥</span>
          </p>
        </div>

        {/* Bottom dots decoration */}
        <div className="mt-10 flex gap-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-pink-300"
              style={{ opacity: 0.3 + i * 0.15, animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
