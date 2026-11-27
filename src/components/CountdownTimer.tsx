"use client";

import React, { useState, useEffect } from "react";
import { WEBINAR_CONFIG } from "@/config/webinar";

interface CountdownTimerProps {
  variant?: "hero-glass" | "standalone-creamy" | "inline-text";
  targetDate?: string;
  className?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  variant = "hero-glass",
  targetDate = WEBINAR_CONFIG.startsAt,
  className = "",
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const calculateTime = () => {
      const target = new Date(targetDate).getTime();
      const now = Date.now();
      let diff = Math.max(0, Math.floor((target - now) / 1000));

      const d = Math.floor(diff / 86400);
      diff -= d * 86400;
      const h = Math.floor(diff / 3600);
      diff -= h * 3600;
      const m = Math.floor(diff / 60);
      const s = diff - m * 60;

      setTimeLeft({
        days: String(d).padStart(2, "0"),
        hours: String(h).padStart(2, "0"),
        minutes: String(m).padStart(2, "0"),
        seconds: String(s).padStart(2, "0"),
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!mounted) {
    if (variant === "inline-text") {
      return <span>00d 00h 00m 00s</span>;
    }
    if (variant === "standalone-creamy") {
      return (
        <div className={`flex gap-2.5 flex-wrap justify-center ${className}`}>
          {["Days", "Hours", "Mins", "Secs"].map((label, idx) => (
            <div
              key={idx}
              className="w-24 py-4 rounded-[18px] bg-white border border-[#F1E4D3] shadow-[0_14px_30px_rgba(27,22,64,0.08)] text-center"
            >
              <div className="font-outfit text-[40px] font-bold leading-none text-[#1B1640]">
                00
              </div>
              <div className="mt-1.5 text-xs text-[#5B5670] uppercase tracking-wider">
                {label}
              </div>
            </div>
          ))}
        </div>
      );
    }
    return (
      <div className={`grid grid-cols-4 gap-2 text-center ${className}`}>
        {["Days", "Hrs", "Min", "Sec"].map((unit, idx) => (
          <div
            key={idx}
            className={`py-2.5 rounded-xl ${
              idx === 3 ? "bg-[#F59E0B] text-[#1B1640]" : "bg-[#140E30]/60 text-white"
            }`}
          >
            <div className="font-outfit font-bold text-2xl leading-tight">00</div>
            <div className="text-[10px] tracking-wider uppercase opacity-80">{unit}</div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "inline-text") {
    return (
      <span className={className}>
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </span>
    );
  }

  if (variant === "standalone-creamy") {
    return (
      <div className={`flex gap-2.5 flex-wrap justify-center ${className}`}>
        <div className="w-24 py-4 rounded-[18px] bg-white border border-[#F1E4D3] shadow-[0_14px_30px_rgba(27,22,64,0.08)] text-center">
          <div className="font-outfit text-[40px] font-bold leading-none text-[#1B1640]">
            {timeLeft.days}
          </div>
          <div className="mt-1.5 text-xs text-[#5B5670] uppercase tracking-wider">Days</div>
        </div>
        <div className="w-24 py-4 rounded-[18px] bg-white border border-[#F1E4D3] shadow-[0_14px_30px_rgba(27,22,64,0.08)] text-center">
          <div className="font-outfit text-[40px] font-bold leading-none text-[#1B1640]">
            {timeLeft.hours}
          </div>
          <div className="mt-1.5 text-xs text-[#5B5670] uppercase tracking-wider">Hours</div>
        </div>
        <div className="w-24 py-4 rounded-[18px] bg-white border border-[#F1E4D3] shadow-[0_14px_30px_rgba(27,22,64,0.08)] text-center">
          <div className="font-outfit text-[40px] font-bold leading-none text-[#1B1640]">
            {timeLeft.minutes}
          </div>
          <div className="mt-1.5 text-xs text-[#5B5670] uppercase tracking-wider">Mins</div>
        </div>
        <div className="lp-tick w-24 py-4 rounded-[18px] bg-[#F59E0B] border border-transparent shadow-[0_14px_30px_rgba(27,22,64,0.2)] text-center">
          <div className="font-outfit text-[40px] font-bold leading-none text-[#1B1640]">
            {timeLeft.seconds}
          </div>
          <div className="mt-1.5 text-xs text-[#1B1640] uppercase tracking-wider font-semibold">
            Secs
          </div>
        </div>
      </div>
    );
  }

  // Hero Glass Variant
  return (
    <div className={`grid grid-cols-4 gap-2 text-center ${className}`}>
      <div className="py-2.5 rounded-xl bg-[#140E30]/60 text-white">
        <div className="font-outfit font-bold text-2xl leading-tight">{timeLeft.days}</div>
        <div className="text-[10px] tracking-wider uppercase text-[#DCD3EE]">Days</div>
      </div>
      <div className="py-2.5 rounded-xl bg-[#140E30]/60 text-white">
        <div className="font-outfit font-bold text-2xl leading-tight">{timeLeft.hours}</div>
        <div className="text-[10px] tracking-wider uppercase text-[#DCD3EE]">Hrs</div>
      </div>
      <div className="py-2.5 rounded-xl bg-[#140E30]/60 text-white">
        <div className="font-outfit font-bold text-2xl leading-tight">{timeLeft.minutes}</div>
        <div className="text-[10px] tracking-wider uppercase text-[#DCD3EE]">Min</div>
      </div>
      <div className="py-2.5 rounded-xl bg-[#F59E0B] text-[#1B1640]">
        <div className="font-outfit font-bold text-2xl leading-tight">{timeLeft.seconds}</div>
        <div className="text-[10px] tracking-wider uppercase font-semibold">Sec</div>
      </div>
    </div>
  );
};
