import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TheRealQuestions } from "@/components/TheRealQuestions";
import { HostSection } from "@/components/HostSection";
import { TopicsSection } from "@/components/TopicsSection";
import { TheStorySection } from "@/components/TheStorySection";
import { PhotoBanner } from "@/components/PhotoBanner";
import { WhoShouldAttendSection } from "@/components/WhoShouldAttendSection";
import { PressSection } from "@/components/PressSection";
import { LiveQaSection } from "@/components/LiveQaSection";
import { ReserveSeatSection } from "@/components/ReserveSeatSection";
import { FaqSection } from "@/components/FaqSection";
import { FinalCtaSection } from "@/components/FinalCtaSection";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-white font-sans text-[#1B1640]">
      {/* Fixed Navigation Header */}
      <Navbar />

      {/* 1. Hero with Speaker Glass Card */}
      <Hero />

      {/* 2. The Real Questions with Standalone Countdown */}
      <TheRealQuestions />

      {/* 3. Meet Your Host (Unnath Reddy) */}
      <HostSection />

      {/* 4. What We'll Cover (Nine Accordion Questions) */}
      <TopicsSection />

      {/* 5. The Story (Ten Families. One Villa. Four Want Christmas.) */}
      <TheStorySection />

      {/* 6. Photo Banner (Own it together. Enjoy it like it's all yours.) */}
      <PhotoBanner />

      {/* 7. Who Should Attend (Checklist) */}
      <WhoShouldAttendSection />

      {/* 8. Leading Business Press Logos */}
      <PressSection />

      {/* 9. Live Q&A with Chat Bubbles */}
      <LiveQaSection />

      {/* 10. Reserve Your Seat (Reservation Card & Cashfree Gateway) */}
      <ReserveSeatSection />

      {/* 11. FAQs (Before You Register) */}
      <FaqSection />

      {/* 12. Final CTA Banner */}
      <FinalCtaSection />

      {/* 13. Footer */}
      <Footer />

      {/* 14. Mobile Sticky Bottom Bar */}
      <MobileStickyBar />
    </main>
  );
}
