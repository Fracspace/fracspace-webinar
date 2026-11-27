import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Fracspace Webinar",
  description: "Privacy Policy for the Fracspace live webinar.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FFF8EF] text-[#1B1640] flex flex-col">
      {/* Header */}
      <header className="bg-[#1B1640] text-white py-4 px-6">
        <div className="max-w-[900px] mx-auto flex items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/assets/110158d0b3323f0d3dbaf3a8a7998a97.png"
              alt="Fracspace"
              width={118}
              height={28}
              className="h-7 w-auto object-contain"
            />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#EDE7F6] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[900px] w-full mx-auto px-6 py-12 sm:py-16 flex-1">
        <div className="bg-white rounded-[24px] border border-[#EFE6D8] p-7 sm:p-11 shadow-[0_16px_40px_rgba(27,22,64,0.06)] flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="self-start inline-flex px-3.5 py-1.5 rounded-full bg-[#FFF1DD] text-xs font-semibold tracking-wider uppercase text-[#B45309]">
              Legal
            </span>
            <h1 className="m-0 font-outfit font-semibold text-3xl sm:text-4xl text-[#1B1640]">
              Privacy Policy
            </h1>
            <p className="m-0 text-sm text-[#5B5670]">
              Conducted by Fracspace · Last updated November 2026
            </p>
          </div>

          <div className="flex flex-col gap-5 text-[15px] sm:text-base leading-relaxed text-[#2D2A3E]">
            <section className="flex flex-col gap-2">
              <h2 className="m-0 font-outfit font-semibold text-lg text-[#1B1640]">
                1. Overview
              </h2>
              <p className="m-0">
                This webinar registration page is operated and conducted by{" "}
                <strong>Fracspace</strong> (with payments co-powered by{" "}
                <strong>Dreamscape Hotels &amp; Resorts</strong>). We respect your privacy and are
                committed to protecting the personal details you share when registering for our
                webinar.
              </p>
            </section>

            <section className="flex flex-col gap-2">
              <h2 className="m-0 font-outfit font-semibold text-lg text-[#1B1640]">
                2. Information We Collect
              </h2>
              <p className="m-0">
                When you register for the webinar, we collect the details you submit in the
                registration form:
              </p>
              <ul className="m-0 pl-5 flex flex-col gap-1">
                <li>Full Name</li>
                <li>Email Address</li>
                <li>WhatsApp / Mobile Number</li>
                <li>Payment reference &amp; transaction status (processed securely via Cashfree)</li>
              </ul>
            </section>

            <section className="flex flex-col gap-2">
              <h2 className="m-0 font-outfit font-semibold text-lg text-[#1B1640]">
                3. How We Use Your Details
              </h2>
              <p className="m-0">
                We use the information you provide to confirm your webinar seat, share the WhatsApp
                community link and joining details, send session reminders, and contact you via
                WhatsApp, phone, or email regarding the webinar and related Fracspace updates.
              </p>
            </section>

            <section className="flex flex-col gap-2">
              <h2 className="m-0 font-outfit font-semibold text-lg text-[#1B1640]">
                4. Data Protection
              </h2>
              <p className="m-0">
                We do not sell or rent your personal information to third-party marketers. Payment
                card, UPI, and banking details are handled directly by Cashfree&apos;s encrypted
                payment gateway and are never stored on our servers.
              </p>
            </section>

            <section className="flex flex-col gap-2">
              <h2 className="m-0 font-outfit font-semibold text-lg text-[#1B1640]">
                5. Contact
              </h2>
              <p className="m-0">
                If you have any questions about this Privacy Policy or wish to update or remove your
                details, please write to{" "}
                <a
                  href="mailto:support@fracspace.com"
                  className="text-[#B45309] font-semibold hover:underline"
                >
                  support@fracspace.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
