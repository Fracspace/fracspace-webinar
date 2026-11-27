"use client";

import React from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { NINE_TOPICS } from "@/config/webinar";
import { useRegistrationModal } from "@/context/ModalContext";

export const TopicsSection: React.FC = () => {
  const { openModal } = useRegistrationModal();

  return (
    <section id="topics" className="py-24 sm:py-28 px-6 bg-white">
      <div className="max-w-[900px] mx-auto flex flex-col gap-8">
        {/* Section Header */}
        <div className="flex flex-col gap-3.5">
          <span className="self-start inline-flex px-4 py-2 rounded-full bg-[#FFF1DD] text-xs font-semibold tracking-wider uppercase text-[#B45309]">
            What we'll cover
          </span>

          <h2 className="m-0 font-outfit font-semibold text-[32px] sm:text-[44px] lg:text-[50px] leading-[1.08] tracking-[-0.03em] text-[#1B1640]">
            Nine questions every family should ask{" "}
            <span className="text-[#D97706]">before buying a share</span>
          </h2>

          <p className="m-0 text-base sm:text-[17px] leading-[1.6] text-[#5B5670]">
            Each topic builds on the last, using the same Goa villa so the ideas stay concrete.
          </p>
        </div>

        {/* 9 Interactive Accordion Items */}
        <div className="flex flex-col gap-3">
          {NINE_TOPICS.map((topic, idx) => (
            <details
              key={topic.id}
              open={idx === 0}
              className="lp-acc bg-white border border-[#EFE6D8] rounded-[18px] px-6 py-0 shadow-[0_8px_22px_rgba(27,22,64,0.05)] transition-shadow hover:shadow-[0_12px_28px_rgba(27,22,64,0.08)]"
            >
              <summary className="flex items-center gap-4 min-h-[76px] cursor-pointer list-none py-3 select-none">
                <span className="flex-none w-10 h-10 rounded-xl bg-[#1B1640] text-[#FCD34D] grid place-items-center font-outfit font-bold text-base">
                  {topic.id}
                </span>

                <strong className="flex-1 font-outfit text-lg sm:text-[19px] font-semibold text-[#1B1640] leading-snug">
                  {topic.question}
                </strong>

                <span
                  aria-hidden="true"
                  className="lp-chev flex-none w-9 h-9 rounded-full bg-[#FFF1DD] grid place-items-center transition-transform duration-200"
                >
                  <ChevronDown className="w-4 h-4 stroke-[2.5] text-[#B45309]" />
                </span>
              </summary>

              <div className="pb-6 pl-0 sm:pl-14 flex flex-col gap-3 pt-1">
                <p className="m-0 text-[15px] sm:text-base leading-[1.65] text-[#5B5670]">
                  {topic.description}
                </p>

                <div className="p-3.5 sm:p-4 rounded-xl bg-[#FFF8EF] text-sm sm:text-[15px] leading-relaxed text-[#1B1640]">
                  <strong className="text-[#B45309] font-semibold">You'll learn: </strong>
                  {topic.takeaway}
                </div>
              </div>
            </details>
          ))}
        </div>

        {/* Bottom CTA */}
        <button
          type="button"
          onClick={openModal}
          className="lp-cta self-start inline-flex items-center gap-2.5 min-h-[58px] px-8 rounded-2xl bg-[#F59E0B] text-[#1B1640] font-outfit font-semibold text-lg shadow-[0_14px_34px_rgba(245,158,11,0.3)] cursor-pointer border-none mt-2"
        >
          Register for the Live Webinar
          <ArrowRight className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};
