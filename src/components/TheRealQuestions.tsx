"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { CountdownTimer } from "@/components/CountdownTimer";
import { WEBINAR_CONFIG } from "@/config/webinar";
import { useRegistrationModal } from "@/context/ModalContext";

export const TheRealQuestions: React.FC = () => {
  const { openModal } = useRegistrationModal();

  return (
    <section className="relative overflow-hidden py-24 sm:py-28 px-6 bg-white">
      {/* Decorative background blobs */}
      <div
        aria-hidden="true"
        className="absolute -left-44 top-14 w-[440px] h-[440px] rounded-full bg-[#FFF1DD]/70 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -right-48 -bottom-28 w-[480px] h-[480px] rounded-full bg-[#EFEAFB]/70 pointer-events-none"
      />

      <div className="relative max-w-[980px] mx-auto flex flex-col items-center gap-7 text-center">
        <span className="inline-flex px-4 py-2 rounded-full bg-[#FFF1DD] text-xs font-semibold tracking-wider uppercase text-[#B45309]">
          The real questions
        </span>

        <h2 className="m-0 font-outfit font-semibold text-[36px] sm:text-[52px] lg:text-[68px] leading-[1.06] tracking-[-0.03em] text-[#1B1640]">
          Co-ownership sounds great. <br />
          <span className="text-[#D97706]">But how does it actually work?</span>
        </h2>

        <p className="m-0 text-lg sm:text-[20px] leading-[1.65] text-[#2D2A3E] max-w-[740px] font-normal">
          Imagine ten families co-own a villa in Goa. Four want to spend Christmas there.{" "}
          <strong className="text-[#1B1640] font-semibold">Who gets the keys?</strong> Who looks
          after the villa when everyone goes home? And if one family wants to sell its share,{" "}
          <strong className="text-[#1B1640] font-semibold">who buys it?</strong>
        </p>

        {/* Countdown Module */}
        <div className="flex flex-col items-center gap-3 pt-2">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#5B5670]">
            Goes live in
          </span>
          <CountdownTimer variant="standalone-creamy" />
        </div>

        {/* Action Button */}
        <div className="flex flex-col items-center gap-2.5 pt-2">
          <button
            type="button"
            onClick={openModal}
            className="lp-cta inline-flex items-center gap-2.5 min-h-[58px] px-8 rounded-2xl bg-[#F59E0B] text-[#1B1640] font-outfit font-semibold text-lg shadow-[0_14px_34px_rgba(245,158,11,0.3)] cursor-pointer border-none"
          >
            Register for the Live Webinar — {WEBINAR_CONFIG.price}
            <ArrowRight className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
          </button>
          <span className="text-xs sm:text-sm text-[#5B5670]">
            {WEBINAR_CONFIG.eventDate} · {WEBINAR_CONFIG.eventTime} · {WEBINAR_CONFIG.price} · Live
            online
          </span>
        </div>
      </div>
    </section>
  );
};
