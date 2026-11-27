"use client";

import React from "react";
import { WEBINAR_CONFIG } from "@/config/webinar";
import { useRegistrationModal } from "@/context/ModalContext";

export const MobileStickyBar: React.FC = () => {
  const { openModal } = useRegistrationModal();

  return (
    <div className="md:hidden fixed left-0 right-0 bottom-0 z-40 flex items-center justify-between gap-3 px-4 py-3 bg-[#1B1640] text-white shadow-[0_-10px_30px_rgba(0,0,0,0.3)] border-t border-white/10">
      <div className="flex flex-col text-xs leading-snug">
        <strong className="font-semibold text-white">
          {WEBINAR_CONFIG.eventDate} · {WEBINAR_CONFIG.eventTime}
        </strong>
        <span className="text-[#FCD34D] font-bold text-sm">{WEBINAR_CONFIG.price}</span>
      </div>

      <button
        type="button"
        onClick={openModal}
        className="lp-cta inline-flex items-center justify-center min-h-[44px] px-6 rounded-xl bg-[#F59E0B] text-[#1B1640] font-outfit font-bold text-sm shadow-md cursor-pointer border-none"
      >
        Register
      </button>
    </div>
  );
};
