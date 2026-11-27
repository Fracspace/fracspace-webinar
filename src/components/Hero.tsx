"use client";

import React from "react";
import Image from "next/image";
import { Calendar, Video, Clock, ArrowRight } from "lucide-react";
import { CountdownTimer } from "@/components/CountdownTimer";
import { WEBINAR_CONFIG } from "@/config/webinar";
import { useRegistrationModal } from "@/context/ModalContext";

export const Hero: React.FC = () => {
  const { openModal } = useRegistrationModal();

  return (
    <section className="relative overflow-hidden text-white bg-[#1B1640]">
      {/* Background Image & Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/62cdfe9e8f717aef28a45ce4811add14.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#140E30]/95 via-[#140E30]/85 to-[#140E30]/45"
        />
      </div>

      <div className="relative z-10">
        <div className="max-w-[1200px] mx-auto px-6 pt-28 sm:pt-36 pb-16 sm:pb-24">
          <div className="flex flex-wrap gap-12 items-center">
            {/* Left Column */}
            <div className="flex-1 min-w-0 basis-[560px] flex flex-col gap-6">
              <span className="self-start inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-semibold tracking-wider uppercase backdrop-blur-sm">
                <span
                  aria-hidden="true"
                  className="w-2 h-2 rounded-full bg-[#F87171] animate-pulse"
                />
                Fracspace presents · Live webinar
              </span>

              <h1 className="m-0 font-outfit font-semibold text-[36px] sm:text-[52px] lg:text-[70px] leading-[1.04] tracking-[-0.03em]">
                Can You Own a Holiday Home{" "}
                <span className="text-[#FCD34D] font-bold">in Parts?</span>
              </h1>

              <p className="m-0 text-[17px] sm:text-[19px] leading-[1.6] text-[#EDE7F6] max-w-[640px] font-normal">
                A plain-language session on fractional holiday-home ownership in India: what you
                actually own, how your family holidays work, who runs the property, and how you get
                your money out when you want to.
              </p>

              <div className="flex flex-col gap-3.5 pt-1">
                <button
                  type="button"
                  onClick={openModal}
                  className="lp-cta self-start inline-flex items-center gap-2.5 min-h-[62px] px-8 rounded-2xl bg-[#F59E0B] text-[#1B1640] font-outfit font-semibold text-lg sm:text-[19px] shadow-[0_16px_40px_rgba(245,158,11,0.35)] cursor-pointer border-none"
                >
                  Register for the Live Webinar
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
                </button>

                <span className="text-[13px] sm:text-sm text-[#DCD3EE]">
                  Registration fee {WEBINAR_CONFIG.price} · Takes under a minute · Joining link and
                  WhatsApp community access after payment
                </span>

                <span className="text-[13px] sm:text-sm font-medium text-[#FCD34D]">
                  Live seats are limited to {WEBINAR_CONFIG.seats} so everyone gets a chance to ask a
                  question.
                </span>
              </div>
            </div>

            {/* Right Column: Speaker & Countdown Card */}
            <div className="flex-1 basis-[360px] max-w-[440px] min-w-0 rounded-[24px] bg-white/10 border border-white/20 backdrop-blur-md p-6 overflow-hidden flex flex-col gap-4 shadow-2xl">
              {/* Card Photo Header */}
              <div className="relative -m-6 mb-0 aspect-[5/4] overflow-hidden rounded-t-[24px]">
                <Image
                  src="/assets/unnath-host.jpg"
                  alt="Unnath Reddy speaking at an event"
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 640px) 100vw, 440px"
                  className="object-cover object-[center_18%]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#140E30]/95 via-[#140E30]/20 to-transparent"
                />

                <span className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#DC2626] text-white text-[11px] font-bold tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  LIVE
                </span>

                <div className="absolute left-5 right-5 bottom-4 flex flex-col text-white">
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#FCD34D]">
                    Hosted by
                  </span>
                  <strong className="font-outfit font-semibold text-xl leading-tight text-white">
                    {WEBINAR_CONFIG.hostName}
                  </strong>
                  <span className="text-xs text-[#DCD3EE] opacity-90">
                    {WEBINAR_CONFIG.hostTitle}
                  </span>
                </div>
              </div>

              {/* Event Details */}
              <ul className="m-0 p-0 list-none flex flex-col gap-2.5 text-sm sm:text-[15px] pt-3 text-white">
                <li className="flex gap-3 items-center">
                  <Calendar className="w-5 h-5 text-[#FCD34D] stroke-[2] flex-none" />
                  <strong className="font-semibold text-white">
                    {WEBINAR_CONFIG.eventDate} · {WEBINAR_CONFIG.eventTime}
                  </strong>
                </li>
                <li className="flex gap-3 items-center text-[#EDE7F6]">
                  <Video className="w-5 h-5 text-[#FCD34D] stroke-[2] flex-none" />
                  <span>Live online (link shared after registration)</span>
                </li>
                <li className="flex gap-3 items-center text-[#EDE7F6]">
                  <Clock className="w-5 h-5 text-[#FCD34D] stroke-[2] flex-none" />
                  <span>55 minutes, including audience Q&amp;A</span>
                </li>
              </ul>

              {/* Countdown Grid */}
              <CountdownTimer variant="hero-glass" />

              {/* Card Register Button */}
              <button
                type="button"
                onClick={openModal}
                className="lp-cta flex items-center justify-center gap-2 min-h-[52px] rounded-xl bg-[#F59E0B] text-[#1B1640] font-outfit font-semibold text-[17px] cursor-pointer border-none mt-1"
              >
                Register now — {WEBINAR_CONFIG.price}
                <ArrowRight className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
