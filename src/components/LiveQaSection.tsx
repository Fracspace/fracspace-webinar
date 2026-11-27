"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { LIVE_QA_QUESTIONS } from "@/config/webinar";
import { useRegistrationModal } from "@/context/ModalContext";

export const LiveQaSection: React.FC = () => {
  const { openModal } = useRegistrationModal();

  return (
    <section className="py-24 sm:py-28 px-6 bg-[#FFF8EF]">
      <div className="max-w-[1200px] mx-auto flex flex-wrap gap-12 sm:gap-14 items-center">
        {/* Left Column: Heading & CTA */}
        <div className="flex-1 basis-[420px] min-w-0 flex flex-col gap-5">
          <span className="self-start inline-flex px-4 py-2 rounded-full bg-[#FFF1DD] text-xs font-semibold tracking-wider uppercase text-[#B45309]">
            Live Q&amp;A
          </span>

          <h2 className="m-0 font-outfit font-semibold text-[32px] sm:text-[44px] lg:text-[48px] leading-[1.08] tracking-[-0.03em] text-[#1B1640]">
            Your questions, <span className="text-[#D97706]">answered live</span>
          </h2>

          <p className="m-0 text-base sm:text-[17px] leading-[1.65] text-[#5B5670] font-normal">
            We close with an open Q&amp;A with Unnath. Bring the question that would matter most at
            your family's dining table.
          </p>

          <p className="m-0 text-sm sm:text-[15px] font-semibold text-[#1B1640]">
            You can send your question while registering, and we'll try to answer it during the session.
          </p>

          <button
            type="button"
            onClick={openModal}
            className="lp-cta self-start inline-flex items-center gap-2.5 min-h-[58px] px-8 rounded-2xl bg-[#F59E0B] text-[#1B1640] font-outfit font-semibold text-lg shadow-[0_14px_34px_rgba(245,158,11,0.3)] cursor-pointer border-none mt-2"
          >
            Register and Ask Your Question
            <ArrowRight className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
          </button>
        </div>

        {/* Right Column: 5 Interactive Speech Bubbles */}
        <div className="flex-1 basis-[460px] min-w-0 flex flex-col gap-3">
          {LIVE_QA_QUESTIONS.map((question, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <div
                key={idx}
                className={`max-w-[92%] p-4 sm:p-5 text-sm sm:text-base leading-[1.5] text-[#1B1640] border border-[#EFE6D8] shadow-[0_8px_20px_rgba(27,22,64,0.06)] transition-transform hover:-translate-y-0.5 ${
                  isEven
                    ? "self-end bg-[#FFF1DD] rounded-[20px] rounded-br-[6px]"
                    : "self-start bg-white rounded-[20px] rounded-bl-[6px]"
                }`}
              >
                {question}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
