"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#120D2A] text-[#CFC8E3] py-8 px-6 text-sm leading-relaxed">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <Link href="https://www.fracspace.com/" className="inline-flex items-center">
            <Image
              src="/assets/110158d0b3323f0d3dbaf3a8a7998a97.png"
              alt="Fracspace"
              width={110}
              height={26}
              className="h-[26px] w-auto block object-contain"
            />
          </Link>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs sm:text-[13px] text-[#CFC8E3]">
            <span>© 2026 Fracspace</span>
            <span>·</span>
            <span>Co-powered by Dreamscape Hotels &amp; Resorts</span>
            <span>·</span>
            <Link
              href="https://www.fracspace.com/"
              className="hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              fracspace.com
            </Link>
            <span>·</span>
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              Privacy Policy
            </Link>
            <span>·</span>
            <Link
              href="/terms"
              className="hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
