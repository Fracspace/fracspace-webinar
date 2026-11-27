"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { WEBINAR_CONFIG } from "@/config/webinar";
import { useRegistrationModal } from "@/context/ModalContext";

export const HostSection: React.FC = () => {
  const { openModal } = useRegistrationModal();

  return (
    <section id="host" className="py-24 sm:py-28 px-6 bg-[#FFF8EF]">
      <div className="max-w-[1100px] mx-auto flex flex-wrap gap-12 sm:gap-14 items-center">
        {/* Left Column: Speaker Image with offset backdrop */}
        <div className="flex-1 basis-[340px] max-w-[420px] min-w-0 relative">
          <div
            aria-hidden="true"
            className="absolute inset-y-6 -inset-x-6 sm:inset-y-6 sm:-inset-x-6 rounded-[28px] bg-[#FDE7C4] pointer-events-none"
          />
          <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden shadow-[0_30px_60px_rgba(27,22,64,0.18)]">
            <Image
              src="/assets/unnath-host.jpg"
              alt="Unnath Reddy speaking at an event"
              fill
              unoptimized
              sizes="(max-width: 640px) 100vw, 420px"
              className="object-cover object-[center_15%]"
            />
          </div>
        </div>

        {/* Right Column: Bio & Badges */}
        <div className="flex-1 basis-[460px] min-w-0 flex flex-col gap-4 sm:gap-5">
          <span className="self-start inline-flex px-4 py-2 rounded-full bg-[#FFF1DD] text-xs font-semibold tracking-wider uppercase text-[#B45309]">
            Meet your host
          </span>

          <h2 className="m-0 font-outfit font-semibold text-[32px] sm:text-[44px] lg:text-[50px] leading-[1.08] tracking-[-0.03em] text-[#1B1640]">
            {WEBINAR_CONFIG.hostName}
          </h2>

          <span className="text-[17px] font-medium text-[#B45309]">
            {WEBINAR_CONFIG.hostTitle}
          </span>

          <p className="m-0 text-[16px] sm:text-[17px] leading-[1.7] text-[#2D2A3E] font-normal">
            {WEBINAR_CONFIG.hostBio}
          </p>

          <div className="flex flex-wrap gap-2.5 pt-2">
            {WEBINAR_CONFIG.hostBadges.map((badge, idx) => (
              <span
                key={idx}
                className="px-3.5 py-2.5 rounded-xl bg-white border border-[#EFE6D8] text-sm font-semibold text-[#1B1640] shadow-sm"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="flex flex-col items-start gap-2.5 pt-3">
            <button
              type="button"
              onClick={openModal}
              className="lp-cta inline-flex items-center gap-2.5 min-h-[58px] px-8 rounded-2xl bg-[#F59E0B] text-[#1B1640] font-outfit font-semibold text-lg shadow-[0_14px_34px_rgba(245,158,11,0.3)] cursor-pointer border-none"
            >
              Learn from Unnath live
              <ArrowRight className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
            </button>
            <span className="text-xs sm:text-sm text-[#5B5670]">
              {WEBINAR_CONFIG.eventDate} · {WEBINAR_CONFIG.eventTime} · {WEBINAR_CONFIG.price} · Live
              online
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
