"use client";

import React from "react";
import { Check, ArrowRight } from "lucide-react";
import { WHO_SHOULD_ATTEND, WEBINAR_CONFIG } from "@/config/webinar";
import { useRegistrationModal } from "@/context/ModalContext";

export const WhoShouldAttendSection: React.FC = () => {
  const { openModal } = useRegistrationModal();

  return (
    <section className="py-24 sm:py-28 px-6 bg-[#FFF8EF]">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-9">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3.5">
          <span className="inline-flex px-4 py-2 rounded-full bg-[#FFF1DD] text-xs font-semibold tracking-wider uppercase text-[#B45309]">
            Who should attend
          </span>

          <h2 className="m-0 font-outfit font-semibold text-[32px] sm:text-[44px] lg:text-[48px] leading-[1.08] tracking-[-0.03em] text-[#1B1640]">
            Is this webinar for you?
          </h2>
        </div>

        {/* Checklist Card */}
        <div className="w-full max-w-[900px] mx-auto bg-white rounded-[24px] border border-[#EFE6D8] p-6 sm:p-9 flex flex-col gap-5 shadow-[0_16px_40px_rgba(27,22,64,0.06)]">
          <strong className="font-outfit font-semibold text-xl sm:text-[22px] text-[#1B1640]">
            This session is for you if you:
          </strong>

          <ul className="m-0 p-0 list-none flex flex-col gap-4">
            {WHO_SHOULD_ATTEND.map((item, idx) => (
              <li key={idx} className="flex gap-3.5 items-start">
                <span
                  aria-hidden="true"
                  className="flex-none w-7 h-7 rounded-full bg-[#DCFCE7] grid place-items-center mt-0.5"
                >
                  <Check className="w-4 h-4 stroke-[3] text-[#15803D]" />
                </span>
                <span className="text-[15px] sm:text-base leading-[1.6] text-[#1B1640]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Centered CTA */}
        <div className="flex flex-col items-center gap-2.5 pt-2">
          <button
            type="button"
            onClick={openModal}
            className="lp-cta inline-flex items-center gap-2.5 min-h-[58px] px-8 rounded-2xl bg-[#F59E0B] text-[#1B1640] font-outfit font-semibold text-lg shadow-[0_14px_34px_rgba(245,158,11,0.3)] cursor-pointer border-none"
          >
            Yes, this is for me — Register
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
