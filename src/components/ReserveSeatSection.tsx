"use client";

import React from "react";
import Image from "next/image";
import { Check, ShieldCheck, ArrowRight } from "lucide-react";
import { CountdownTimer } from "@/components/CountdownTimer";
import { WEBINAR_CONFIG } from "@/config/webinar";
import { useRegistrationModal } from "@/context/ModalContext";

export const ReserveSeatSection: React.FC = () => {
  const { openModal } = useRegistrationModal();

  return (
    <section id="register" className="relative overflow-hidden py-24 sm:py-28 px-6 bg-[#1B1640]">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/03d429ee81bc7c27e63ff8ece5d9d7f7.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-[#140E30]/80" />
      </div>

      <div className="relative z-10 max-w-[1100px] mx-auto flex flex-wrap gap-10 sm:gap-12 items-start">
        {/* Left Column: Details & Guarantee */}
        <div className="flex-1 basis-[340px] min-w-0 flex flex-col gap-5 text-white">
          <span className="self-start inline-flex px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-semibold tracking-wider uppercase text-[#FCD34D]">
            Reserve your seat
          </span>

          <h2 className="m-0 font-outfit font-semibold text-[32px] sm:text-[44px] lg:text-[48px] leading-[1.08] tracking-[-0.03em] text-white">
            Reserve your seat
          </h2>

          <p className="m-0 text-base sm:text-[17px] leading-[1.6] text-[#EDE7F6]">
            Registration fee {WEBINAR_CONFIG.price}. Your seat is confirmed as soon as payment goes
            through.
          </p>

          <div className="p-5 rounded-2xl bg-white/10 border border-white/20 flex flex-col gap-1.5 backdrop-blur-sm">
            <strong className="text-sm sm:text-[15px] font-semibold text-[#FCD34D]">
              Why a fee?
            </strong>
            <span className="text-sm sm:text-[15px] leading-relaxed text-[#EDE7F6]">
              It keeps the session focused on families who are seriously exploring a holiday home,
              so there's more time for real questions.
            </span>
          </div>

          <div className="flex flex-col gap-3 pt-1">
            <strong className="text-sm sm:text-base font-semibold text-white">
              What your registration includes:
            </strong>
            <ul className="m-0 p-0 list-none flex flex-col gap-2.5">
              {[
                "A live seat in the 55-minute session with Unnath",
                "Access to the private WhatsApp community for registrants",
                "A chance to send your question in advance",
                WEBINAR_CONFIG.extraInclude,
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 items-start text-sm sm:text-[15px] text-[#EDE7F6]">
                  <Check className="w-5 h-5 text-[#FCD34D] stroke-[2.5] flex-none mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <span className="text-sm font-medium text-[#FCD34D] pt-1">
            {WEBINAR_CONFIG.feeAdjust}
          </span>
        </div>

        {/* Right Column: Floating Reservation Card */}
        <div className="flex-1 basis-[400px] max-w-[480px] min-w-0 bg-white rounded-[26px] p-7 sm:p-9 shadow-[0_40px_90px_rgba(0,0,0,0.35)] flex flex-col gap-5 text-[#1B1640]">
          <div className="flex justify-between items-start gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold tracking-wider uppercase text-[#B45309]">
                Live webinar seat
              </span>
              <strong className="font-outfit font-semibold text-xl sm:text-[22px] leading-snug">
                Can You Own a Holiday Home in Parts?
              </strong>
            </div>
            <span className="font-outfit font-bold text-3xl sm:text-4xl leading-none text-[#1B1640]">
              {WEBINAR_CONFIG.price}
            </span>
          </div>

          {/* Quick Schedule Grid */}
          <div className="grid grid-cols-3 border border-[#EFE6D8] rounded-xl overflow-hidden text-xs sm:text-sm">
            <div className="p-3 sm:p-3.5 border-r border-[#EFE6D8]">
              <div className="text-[#5B5670] text-xs">Date</div>
              <strong className="font-semibold">{WEBINAR_CONFIG.eventDate}</strong>
            </div>
            <div className="p-3 sm:p-3.5 border-r border-[#EFE6D8]">
              <div className="text-[#5B5670] text-xs">Time</div>
              <strong className="font-semibold">{WEBINAR_CONFIG.eventTime}</strong>
            </div>
            <div className="p-3 sm:p-3.5">
              <div className="text-[#5B5670] text-xs">Length</div>
              <strong className="font-semibold">55 min</strong>
            </div>
          </div>

          {/* Registration Closes Banner */}
          <div className="flex justify-between items-center gap-2.5 flex-wrap p-3.5 sm:p-4 rounded-xl bg-[#FFF8EF]">
            <span className="text-xs sm:text-[13px] font-bold text-[#B45309]">
              Registration closes in
            </span>
            <div className="font-outfit font-bold text-lg sm:text-xl text-[#1B1640]">
              <CountdownTimer variant="inline-text" />
            </div>
          </div>

          {/* Instant Register Button */}
          <button
            type="button"
            onClick={openModal}
            className="lp-cta min-h-[62px] rounded-2xl bg-[#F59E0B] text-[#1B1640] font-outfit font-semibold text-lg sm:text-[19px] shadow-[0_14px_34px_rgba(245,158,11,0.3)] cursor-pointer border-none flex items-center justify-center gap-2"
          >
            Register now — {WEBINAR_CONFIG.price}
            <ArrowRight className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
          </button>

          <span className="flex items-center justify-center gap-2 text-xs text-[#5B5670]">
            <ShieldCheck className="w-4 h-4 text-[#5B5670] stroke-[2]" />
            Secure payment via Cashfree · Takes under a minute
          </span>
        </div>
      </div>
    </section>
  );
};
