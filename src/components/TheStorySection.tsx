"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRegistrationModal } from "@/context/ModalContext";

export const TheStorySection: React.FC = () => {
  const { openModal } = useRegistrationModal();

  return (
    <section className="py-24 sm:py-28 px-6 bg-[#FFF8EF]">
      <div className="max-w-[1200px] mx-auto flex flex-wrap gap-12 sm:gap-14 items-center">
        {/* Left Column: Image */}
        <div className="flex-1 basis-[440px] min-w-0 relative rounded-[28px] overflow-hidden min-h-[420px] sm:min-h-[520px] shadow-[0_30px_70px_rgba(27,22,64,0.18)]">
          <Image
            src="/assets/03d429ee81bc7c27e63ff8ece5d9d7f7.jpg"
            alt="Luxury holiday villa pool and patio"
            fill
            sizes="(max-width: 640px) 100vw, 540px"
            className="object-cover object-[center_60%]"
          />
        </div>

        {/* Right Column: Story Copy */}
        <div className="flex-1 basis-[480px] min-w-0 flex flex-col gap-5">
          <span className="self-start inline-flex px-4 py-2 rounded-full bg-[#FFF1DD] text-xs font-semibold tracking-wider uppercase text-[#B45309]">
            The story
          </span>

          <h2 className="m-0 font-outfit font-semibold text-[32px] sm:text-[42px] lg:text-[48px] leading-[1.08] tracking-[-0.03em] text-[#1B1640]">
            Ten families. One villa.{" "}
            <span className="text-[#D97706]">Four of them want Christmas.</span>
          </h2>

          <p className="m-0 text-base sm:text-[17px] leading-[1.65] text-[#2D2A3E] font-normal">
            Imagine ten families co-own a villa in Goa. Each has paid for a 10% share. It is December,
            and four families want to spend Christmas there.
          </p>

          <p className="m-0 text-base sm:text-[17px] leading-[1.65] text-[#2D2A3E] font-normal">
            <strong className="text-[#1B1640] font-semibold">Who gets the keys?</strong> Who cleans
            the villa and fixes the leaking tap after everyone goes home? Who pays when the monsoon
            damages the roof? And if one family needs its money back next year,{" "}
            <strong className="text-[#1B1640] font-semibold">
              who buys its share, and at what price?
            </strong>
          </p>

          <p className="m-0 text-[15px] sm:text-[16px] leading-[1.65] text-[#5B5670]">
            These are the questions most brochures skip. They are also the ones that decide whether
            co-owning a holiday home is a joy or a headache.
          </p>

          {/* Why this webinar box */}
          <div className="p-5 sm:p-6 rounded-[18px] bg-white border border-[#EFE6D8] flex flex-col gap-2 shadow-sm">
            <strong className="font-outfit font-semibold text-lg text-[#1B1640]">
              Why this webinar
            </strong>
            <span className="text-[15px] sm:text-base leading-[1.6] text-[#5B5670]">
              In 55 minutes, we follow one family from first thinking about a holiday home to
              understanding exactly what they would own, how they would use it, what it costs to run
              and how they would sell. No jargon and no hard sell. You leave knowing which questions
              to ask, whether you invest with Fracspace or anyone else.
            </span>
          </div>

          <button
            type="button"
            onClick={openModal}
            className="lp-cta self-start inline-flex items-center gap-2.5 min-h-[58px] px-8 rounded-2xl bg-[#F59E0B] text-[#1B1640] font-outfit font-semibold text-lg shadow-[0_14px_34px_rgba(245,158,11,0.3)] cursor-pointer border-none mt-2"
          >
            Save My Seat
            <ArrowRight className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
};
