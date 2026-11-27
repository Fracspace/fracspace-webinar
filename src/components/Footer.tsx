"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { WEBINAR_CONFIG } from "@/config/webinar";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#120D2A] text-[#CFC8E3] py-12 px-6 text-sm leading-relaxed">
      <div className="max-w-[1100px] mx-auto flex flex-col gap-6">
        <p className="m-0 text-xs text-[#A49CC0] leading-relaxed">
          This webinar is for educational purposes only and does not constitute investment, legal or
          tax advice. Real-estate investments carry risk, including the risk of loss and limited
          liquidity. Benefits, usage rights and exit terms vary by property. Please read all offer
          documents and consult your own advisers before investing.
        </p>

        <div className="flex flex-wrap justify-between items-center gap-4 pt-5 border-t border-[#2B2452]">
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
            <Link
              href="https://www.fracspace.com/"
              className="hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              fracspace.com
            </Link>
            <span>·</span>
            <Link
              href="https://www.fracspace.com/"
              className="hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              Privacy Policy
            </Link>
            <span>·</span>
            <Link
              href="https://www.fracspace.com/"
              className="hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              Terms
            </Link>
            <span>·</span>
            <a
              href={`mailto:${WEBINAR_CONFIG.contactEmail}`}
              className="hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
