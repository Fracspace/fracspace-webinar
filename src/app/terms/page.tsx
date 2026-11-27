import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | Fracspace Webinar",
  description: "Terms and Conditions for the Fracspace live webinar.",
};

export default function TermsPage() {
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
              Terms &amp; Conditions
            </h1>
            <p className="m-0 text-sm text-[#5B5670]">
              Conducted by Fracspace · Last updated November 2026
            </p>
          </div>

          <div className="flex flex-col gap-5 text-[15px] sm:text-base leading-relaxed text-[#2D2A3E]">
            <section className="flex flex-col gap-2">
              <h2 className="m-0 font-outfit font-semibold text-lg text-[#1B1640]">
                1. About the Webinar
              </h2>
              <p className="m-0">
                This live online webinar is conducted by <strong>Fracspace</strong> to explain how
                fractional holiday-home ownership works. By registering on this website, you agree to
                these Terms &amp; Conditions.
              </p>
            </section>

            <section className="flex flex-col gap-2">
              <h2 className="m-0 font-outfit font-semibold text-lg text-[#1B1640]">
                2. Registration &amp; Payment
              </h2>
              <p className="m-0">
                Your seat is confirmed once the registration payment is successfully completed via
                Cashfree. Payments are co-powered by{" "}
                <strong>Dreamscape Hotels &amp; Resorts</strong>, which appears as the billing and
                checkout partner name.
              </p>
            </section>

            <section className="flex flex-col gap-2">
              <h2 className="m-0 font-outfit font-semibold text-lg text-[#1B1640]">
                3. Live Session Format
              </h2>
              <p className="m-0">
                The webinar is a live-only online session. No session recording will be provided
                afterward, so registered attendees are encouraged to join on time using the link
                shared in the WhatsApp community and confirmation email.
              </p>
            </section>

            <section className="flex flex-col gap-2">
              <h2 className="m-0 font-outfit font-semibold text-lg text-[#1B1640]">
                4. Communication Consent
              </h2>
              <p className="m-0">
                By submitting your details in the registration form, you authorize{" "}
                <strong>Fracspace</strong> to contact you via WhatsApp, phone, or email with
                webinar access details, reminders, and follow-up information related to this
                session.
              </p>
            </section>

            <section className="flex flex-col gap-2">
              <h2 className="m-0 font-outfit font-semibold text-lg text-[#1B1640]">
                5. Contact
              </h2>
              <p className="m-0">
                For any questions regarding your registration, please reach out to{" "}
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
