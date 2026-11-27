"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { WEBINAR_CONFIG } from "@/config/webinar";
import { useRegistrationModal } from "@/context/ModalContext";

export const Navbar: React.FC = () => {
  const { openModal } = useRegistrationModal();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#140E30]/95 backdrop-blur-md shadow-lg border-b border-white/10 py-3.5"
          : "bg-[#140E30]/40 backdrop-blur-sm border-b border-white/5 py-4 sm:py-5"
      }`}
    >
      <div className="flex items-center justify-between gap-4 max-w-[1200px] mx-auto px-6">
        <Link href="https://www.fracspace.com/" className="inline-flex items-center min-h-[44px]">
          <Image
            src="/assets/110158d0b3323f0d3dbaf3a8a7998a97.png"
            alt="Fracspace"
            width={130}
            height={32}
            className="h-8 w-auto block object-contain"
            priority
          />
        </Link>

        <nav
          aria-label="Page navigation"
          className="hidden md:flex gap-7 text-[15px] font-semibold tracking-normal"
        >
          <a
            href="#topics"
            className="text-white/85 hover:text-white transition-colors min-h-[44px] inline-flex items-center"
          >
            Topics
          </a>
          <a
            href="#host"
            className="text-white/85 hover:text-white transition-colors min-h-[44px] inline-flex items-center"
          >
            Host
          </a>
          <a
            href="#faq"
            className="text-white/85 hover:text-white transition-colors min-h-[44px] inline-flex items-center"
          >
            FAQ
          </a>
        </nav>

        <button
          type="button"
          onClick={openModal}
          className="lp-cta inline-flex items-center min-h-[44px] px-5 rounded-full bg-[#F59E0B] text-[#1B1640] font-bold text-[15px] shadow-sm hover:shadow-md transition-all cursor-pointer border-none"
        >
          Register · {WEBINAR_CONFIG.price}
        </button>
      </div>
    </header>
  );
};
