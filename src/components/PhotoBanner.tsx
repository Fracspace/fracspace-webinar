"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { WEBINAR_CONFIG } from "@/config/webinar";
import { useRegistrationModal } from "@/context/ModalContext";

export const PhotoBanner: React.FC = () => {
  const { openModal } = useRegistrationModal();

  return (
    <section className="relative overflow-hidden min-h-[440px] flex items-center py-20 px-6 text-white bg-[#1B1640]">
      {/* Background Image & Gradient */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/aefd426aa794680b33a54e7c19fc0bb1.jpg"
          alt="Luxury villa pool"
          fill
          sizes="100vw"
          className="object-cover object-[center_60%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#140E30]/90 via-[#140E30]/45 to-[#140E30]/20"
        />
      </div>

      <div className="relative z-10 max-w-[1200px] w-full mx-auto flex flex-col gap-5">
        <span className="text-xs font-semibold tracking-widest uppercase text-[#FCD34D]">
          The co-ownership way
        </span>

        <h2 className="m-0 font-outfit font-semibold text-[34px] sm:text-[48px] lg:text-[58px] leading-[1.05] tracking-[-0.03em] max-w-[680px] text-white">
          Own it together. <span className="text-[#FCD34D]">Enjoy it like it's all yours.</span>
        </h2>

        <div className="flex flex-col items-start gap-2.5 pt-2">
          <button
            type="button"
            onClick={openModal}
            className="lp-cta inline-flex items-center gap-2.5 min-h-[58px] px-8 rounded-2xl bg-[#F59E0B] text-[#1B1640] font-outfit font-semibold text-lg shadow-[0_14px_34px_rgba(245,158,11,0.3)] cursor-pointer border-none"
          >
            Find out how — Register
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
