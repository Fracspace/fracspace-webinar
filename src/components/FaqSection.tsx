"use client";

import React from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { FAQS, WEBINAR_CONFIG } from "@/config/webinar";
import { useRegistrationModal } from "@/context/ModalContext";

export const FaqSection: React.FC = () => {
  const { openModal } = useRegistrationModal();

  return (
    <section id="faq" className="py-24 sm:py-28 px-6 bg-[#F6F3FB]">
      <div className="max-w-[860px] mx-auto flex flex-col gap-7">
        {/* Section Header */}
        <span className="self-start inline-flex px-4 py-2 rounded-full bg-[#FFF1DD] text-xs font-semibold tracking-wider uppercase text-[#B45309]">
          FAQs
        </span>

        <h2 className="m-0 font-outfit font-semibold text-[32px] sm:text-[44px] lg:text-[48px] leading-[1.08] tracking-[-0.03em] text-[#1B1640]">
          Before you register
        </h2>

        {/* Accordions */}
        <div className="flex flex-col border-t border-[#E6E1EF]">
          {FAQS.map((faq, idx) => (
            <details key={idx} className="lp-acc border-b border-[#E6E1EF] group">
              <summary className="flex justify-between items-center gap-4 min-h-[68px] cursor-pointer list-none py-4 font-outfit text-lg sm:text-[19px] font-semibold text-[#1B1640] select-none">
                <span>{faq.question}</span>
                <span
                  aria-hidden="true"
                  className="lp-chev flex-none w-9 h-9 rounded-full bg-[#FFF1DD] grid place-items-center transition-transform duration-200"
                >
                  <ChevronDown className="w-4 h-4 stroke-[2.5] text-[#B45309]" />
                </span>
              </summary>

              <p className="m-0 pb-6 text-sm sm:text-base leading-[1.65] text-[#5B5670] max-w-[720px] font-normal">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-start gap-2.5 pt-2">
          <button
            type="button"
            onClick={openModal}
            className="lp-cta inline-flex items-center gap-2.5 min-h-[58px] px-8 rounded-2xl bg-[#F59E0B] text-[#1B1640] font-outfit font-semibold text-lg shadow-[0_14px_34px_rgba(245,158,11,0.3)] cursor-pointer border-none"
          >
            Still curious? Register now
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
