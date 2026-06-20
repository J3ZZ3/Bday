import { useState, useEffect, useCallback, useRef } from "react";
import CountdownPage from "@/components/CountdownPage";
import BirthdayReveal from "@/components/BirthdayReveal";
import CuteCursor from "@/components/CuteCursor";

const BIRTHDAY_MONTH = 7;
const BIRTHDAY_DAY   = 3;

function isBirthday(): boolean {
  const now = new Date();
  return now.getMonth() + 1 === BIRTHDAY_MONTH && now.getDate() === BIRTHDAY_DAY;
}

export default function BirthdaySite() {
  const [showBirthday, setShowBirthday]   = useState(false);
  const [checking, setChecking]           = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const [outClass, setOutClass]           = useState("");
  const [inClass, setInClass]             = useState("");
  const [nextView, setNextView]           = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShowBirthday(isBirthday());
    setChecking(false);
  }, []);

  const handleToggle = useCallback(() => {
    if (transitioning) return;
    const goingToBirthday = !showBirthday;
    // Slide out current page to the left, new page comes from right
    // (reverse direction when going back)
    const slideOut = goingToBirthday ? "page-slide-out-left"  : "page-slide-out-right";
    const slideIn  = goingToBirthday ? "page-slide-in-right"  : "page-slide-in-left";

    setNextView(goingToBirthday);
    setTransitioning(true);
    setOutClass(slideOut);

    setTimeout(() => {
      setShowBirthday(goingToBirthday);
      setOutClass("");
      setInClass(slideIn);
      setTimeout(() => {
        setInClass("");
        setTransitioning(false);
      }, 500);
    }, 420);
  }, [transitioning, showBirthday]);

  if (checking) {
    return (
      <div className="aurora-bg min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-pink-400 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div style={{ overflow: "hidden", minHeight: "100vh" }}>
      <CuteCursor />

      <div
        ref={containerRef}
        className={outClass || inClass}
        style={{ minHeight: "100vh" }}
      >
        {showBirthday ? <BirthdayReveal /> : <CountdownPage />}
      </div>

      {/* <button
        onClick={handleToggle}
        disabled={transitioning}
        className="fixed bottom-4 right-4 z-[9998] flex items-center gap-2 bg-black/70 hover:bg-black/90 disabled:opacity-40 text-white text-xs font-mono px-4 py-2.5 rounded-full shadow-xl backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
        style={{ border: "1px solid rgba(255,255,255,0.15)", cursor: "none" }}
      >
        {showBirthday
          ? <><span>🔒</span> Preview: Birthday ON</>
          : <><span>🎂</span> Preview: Birthday OFF</>}
      </button> */}
    </div>
  );
}
