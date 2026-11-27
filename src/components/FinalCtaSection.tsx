"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { WEBINAR_CONFIG } from "@/config/webinar";
import { useRegistrationModal } from "@/context/ModalContext";

export const FinalCtaSection: React.FC = () => {
  const { openModal } = useRegistrationModal();

  return (
    <section className="relative overflow-hidden py-28 sm:py-32 px-6 bg-[#1B1640] text-white text-center">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/03d429ee81bc7c27e63ff8ece5d9d7f7.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_60%]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-[#140E30]/75" />
      </div>

      <div className="relative z-10 max-w-[860px] mx-auto flex flex-col items-center gap-6">
        <h2 className="m-0 font-outfit font-semibold text-[36px] sm:text-[50px] lg:text-[64px] leading-[1.05] tracking-[-0.03em] text-white">
          Who gets the keys at Christmas? <span className="text-[#FCD34D]">Find out live.</span>
        </h2>

        <p className="m-0 text-base sm:text-[18px] leading-[1.6] text-[#EDE7F6] max-w-[680px] font-normal">
          55 minutes. Nine honest answers. One live Q&amp;A with the founder. Join us on{" "}
          <strong className="text-white font-semibold">{WEBINAR_CONFIG.eventDate}</strong> at{" "}
          <strong className="text-white font-semibold">{WEBINAR_CONFIG.eventTime}</strong>.
        </p>

        <button
          type="button"
          onClick={openModal}
          className="lp-cta inline-flex items-center gap-2.5 min-h-[62px] px-9 rounded-2xl bg-[#F59E0B] text-[#1B1640] font-outfit font-semibold text-lg sm:text-[19px] shadow-[0_16px_40px_rgba(245,158,11,0.35)] cursor-pointer border-none mt-2"
        >
          Register for the Live Webinar
          <ArrowRight className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};
