import { useState, useEffect } from "react";
import FloatingPetals from "@/components/FloatingPetals";
import ConfettiBlast from "@/components/ConfettiBlast";
import LoveNoteModal from "@/components/LoveNoteModal";

const FAVORITES = [
  { icon: "📖", label: "Twisted Hate Series" },
  { icon: "💜", label: "BTS" },
  { icon: "😊", label: "Horimiya" },
  { icon: "🐾", label: "Adorable Cats" },
  { icon: "✈️", label: "Traveling & Exploring" },
];

const MESSAGES = [
  {
    text: "Happy Birthday, Sienna! Hope you have a fantastic day filled with joy and laughter!",
    from: "From a dear friend",
  },
  {
    text: "To the sweetest girl, happy birthday! May your year be as amazing as you are.",
    from: "With love",
  },
  {
    text: "Wishing you all the happiness in the world on your special day, Sienna!",
    from: "Thinking of you",
  },
];

export default function BirthdayReveal() {
  const [showModal, setShowModal] = useState(false);
  const [visibleSections, setVisibleSections] = useState<number[]>([]);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Stagger sections appearing
    const delays = [0, 400, 800, 1200, 1600];
    delays.forEach((delay, i) => {
      setTimeout(() => {
        setVisibleSections(prev => [...prev, i]);
      }, delay);
    });

    // Stop confetti after 5 seconds
    const t = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(t);
  }, []);

  const visible = (idx: number) => visibleSections.includes(idx);

  return (
    <div className="gradient-bg min-h-screen relative overflow-x-hidden">
      <FloatingPetals />
      {showConfetti && <ConfettiBlast />}

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-16 flex flex-col gap-10">

        {/* Hero */}
        <section
          className={`text-center transition-all duration-700 ${visible(0) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="mb-4">
            <span className="text-6xl animate-heartbeat inline-block">♥</span>
          </div>
          <h1
            className="shimmer-text font-serif text-5xl sm:text-7xl font-bold leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Happy Birthday,
            <br />
            Sienna!
          </h1>
          <p className="text-pink-400 text-lg font-medium tracking-wide">
            Today is your day — made just for you
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-pink-300" />
            <span className="text-2xl">🌸</span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-pink-300" />
          </div>
        </section>

        {/* Favorites */}
        <section
          className={`transition-all duration-700 delay-100 ${visible(1) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="glass-card rounded-3xl p-7 shadow-lg">
            <h2
              className="font-serif text-2xl font-bold text-pink-600 mb-5 text-center"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Sienna's Favorite Things
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FAVORITES.map((fav, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white/60 rounded-2xl px-4 py-3 border border-pink-100 hover:border-pink-300 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <span className="text-2xl">{fav.icon}</span>
                  <span className="text-pink-700 font-medium text-sm">{fav.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Messages */}
        <section
          className={`transition-all duration-700 delay-200 ${visible(2) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2
            className="font-serif text-2xl font-bold text-pink-600 mb-4 text-center"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Messages for Sienna
          </h2>
          <div className="flex flex-col gap-4">
            {MESSAGES.map((msg, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl px-6 py-5 shadow-sm border border-pink-100"
              >
                <p className="text-pink-800 text-sm leading-relaxed italic mb-2">
                  "{msg.text}"
                </p>
                <span className="text-pink-400 text-xs font-medium tracking-wide">— {msg.from}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Love note reveal button */}
        <section
          className={`text-center transition-all duration-700 delay-300 ${visible(3) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <button
            onClick={() => setShowModal(true)}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:from-pink-600 hover:to-purple-600 animate-pulse-glow"
          >
            <span className="text-xl animate-heartbeat">♥</span>
            A Special Note For You, Sienna
            <span className="text-xl">✉️</span>
          </button>
        </section>

        {/* Footer */}
        <section
          className={`text-center transition-all duration-700 delay-400 ${visible(4) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex items-center justify-center gap-2 text-pink-400 text-sm">
            <span>Made with</span>
            <span className="text-red-400 animate-heartbeat inline-block text-base">♥</span>
            <span>for Sienna</span>
          </div>
          <div className="mt-3 flex justify-center gap-2">
            {["🌸", "✨", "💜", "✨", "🌸"].map((e, i) => (
              <span
                key={i}
                className="text-lg"
                style={{
                  animation: `wave-text 1.5s ease-in-out infinite`,
                  animationDelay: `${i * 0.15}s`,
                  display: "inline-block",
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
