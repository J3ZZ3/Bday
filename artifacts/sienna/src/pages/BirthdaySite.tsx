import { useState, useEffect } from "react";
import CountdownPage from "@/components/CountdownPage";
import BirthdayReveal from "@/components/BirthdayReveal";

const BIRTHDAY_MONTH = 7;
const BIRTHDAY_DAY = 3;

function isBirthday(): boolean {
  const now = new Date();
  return now.getMonth() + 1 === BIRTHDAY_MONTH && now.getDate() === BIRTHDAY_DAY;
}

export default function BirthdaySite() {
  const [showBirthday, setShowBirthday] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    setShowBirthday(isBirthday());
    setChecking(false);
  }, []);

  if (checking) {
    return (
      <div className="gradient-bg min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-pink-400 border-t-transparent animate-spin" />
      </div>
    );
  }

  const previewToggle = (
    <button
      onClick={() => setShowBirthday(v => !v)}
      className="fixed bottom-4 right-4 z-[999] bg-black/70 hover:bg-black/90 text-white text-xs font-mono px-3 py-2 rounded-full shadow-lg backdrop-blur-sm transition-all"
    >
      {showBirthday ? "🔒 Preview: Birthday ON" : "🎂 Preview: Birthday OFF"}
    </button>
  );

  return (
    <>
      {showBirthday ? <BirthdayReveal /> : <CountdownPage />}
      {previewToggle}
    </>
  );
}
