"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PRESS_LOGOS, WEBINAR_CONFIG } from "@/config/webinar";
import { useRegistrationModal } from "@/context/ModalContext";

export const PressSection: React.FC = () => {
  const { openModal } = useRegistrationModal();

  return (
    <section className="relative overflow-hidden py-24 sm:py-28 px-6 bg-[#1B1640] text-white">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/62cdfe9e8f717aef28a45ce4811add14.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-[#140E30]/90" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto flex flex-col gap-8 items-center text-center">
        <span className="inline-flex px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-semibold tracking-wider uppercase text-[#FCD34D]">
          Who's behind this session
        </span>

        <h2 className="m-0 font-outfit font-semibold text-[30px] sm:text-[40px] lg:text-[46px] leading-[1.1] tracking-[-0.03em] max-w-[820px] text-white">
          Hosted by a team featured in India's leading business press
        </h2>

        {/* 7 Press Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 w-full pt-2">
          {PRESS_LOGOS.map((press, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl h-[84px] flex items-center justify-center p-3.5 shadow-sm transition-transform hover:-translate-y-1"
            >
              <Image
                src={press.image}
                alt={press.name}
                width={120}
                height={press.maxHeight}
                className="max-h-[46px] max-w-full w-auto object-contain block"
              />
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex flex-col items-center gap-2.5 pt-2">
          <button
            type="button"
            onClick={openModal}
            className="lp-cta inline-flex items-center gap-2.5 min-h-[58px] px-8 rounded-2xl bg-[#F59E0B] text-[#1B1640] font-outfit font-semibold text-lg shadow-[0_14px_34px_rgba(245,158,11,0.3)] cursor-pointer border-none"
          >
            Join the session — Register
            <ArrowRight className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
          </button>
          <span className="text-xs sm:text-sm text-[#DCD3EE]">
            {WEBINAR_CONFIG.eventDate} · {WEBINAR_CONFIG.eventTime} · {WEBINAR_CONFIG.price} · Live
            online
          </span>
        </div>
      </div>
    </section>
  );
};
