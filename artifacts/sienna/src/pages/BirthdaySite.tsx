import { useState, useEffect, useCallback } from "react";
import CountdownPage from "@/components/CountdownPage";
import BirthdayReveal from "@/components/BirthdayReveal";
import MagicTransition from "@/components/MagicTransition";
import SparkleTrail from "@/components/SparkleTrail";

const BIRTHDAY_MONTH = 7;
const BIRTHDAY_DAY   = 3;

function isBirthday(): boolean {
  const now = new Date();
  return now.getMonth() + 1 === BIRTHDAY_MONTH && now.getDate() === BIRTHDAY_DAY;
}

type Phase = "idle" | "transitioning" | "done";

export default function BirthdaySite() {
  const [showBirthday, setShowBirthday] = useState(false);
  const [checking, setChecking]         = useState(true);
  const [phase, setPhase]               = useState<Phase>("idle");
  const [pageClass, setPageClass]       = useState("");

  useEffect(() => {
    setShowBirthday(isBirthday());
    setChecking(false);
  }, []);

  const handleToggle = useCallback(() => {
    // Start exit animation on current page
    setPageClass("page-exiting");
    setTimeout(() => {
      setPhase("transitioning");
      setPageClass("");
    }, 350);
  }, []);

  const handleTransitionDone = useCallback(() => {
    setShowBirthday(v => !v);
    setPhase("done");
    setPageClass("page-entering");
    setTimeout(() => {
      setPhase("idle");
      setPageClass("");
    }, 600);
  }, []);

  if (checking) {
    return (
      <div className="aurora-bg min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-pink-400 border-t-transparent animate-spin" />
      </div>
    );
  }

  const previewBtn = (
    <button
      onClick={phase === "idle" ? handleToggle : undefined}
      disabled={phase !== "idle"}
      className="fixed bottom-4 right-4 z-[9998] flex items-center gap-2 bg-black/70 hover:bg-black/90 disabled:opacity-50 text-white text-xs font-mono px-4 py-2.5 rounded-full shadow-xl backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
      style={{ border: "1px solid rgba(255,255,255,0.15)" }}
    >
      {showBirthday
        ? <><span>🔒</span> Preview: Birthday ON</>
        : <><span>🎂</span> Preview: Birthday OFF</>
      }
    </button>
  );

  return (
    <>
      <SparkleTrail />

      <div className={pageClass} style={{ minHeight: "100vh" }}>
        {showBirthday ? <BirthdayReveal /> : <CountdownPage />}
      </div>

      {phase === "transitioning" && (
        <MagicTransition onDone={handleTransitionDone} />
      )}

      {previewBtn}
    </>
  );
}
