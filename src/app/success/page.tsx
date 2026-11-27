"use client";

import React, { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Calendar,
  Clock,
  Video,
  User,
  MessageCircle,
  Mail,
  ArrowLeft,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { WEBINAR_CONFIG } from "@/config/webinar";

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  const [isLoading, setIsLoading] = useState(true);
  const [isPaid, setIsPaid] = useState<boolean | null>(null);
  const [communityLink, setCommunityLink] = useState<string>(
    WEBINAR_CONFIG.whatsappCommunityLink || "https://chat.whatsapp.com/F1plK69ahDzGdGWuaJhnnG"
  );
  const [statusMessage, setStatusMessage] = useState<string>("");

  useEffect(() => {
    if (!orderId) {
      setIsLoading(false);
      setIsPaid(false);
      setStatusMessage("No registration order ID found.");
      return;
    }

    // Verify payment with server
    fetch("/api/verify-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.paid) {
          setIsPaid(true);
          if (data.communityLink) {
            setCommunityLink(data.communityLink);
          }
        } else {
          setIsPaid(false);
          setStatusMessage(
            "Payment verification is in progress. If your account was debited, your details are safe and your community link will arrive via WhatsApp & email shortly."
          );
        }
      })
      .catch((err) => {
        console.error("Verification error:", err);
        setIsPaid(false);
        setStatusMessage(
          "Payment verification is taking longer than usual. Please check your WhatsApp and email for confirmation."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [orderId]);

  return (
    <div className="min-h-screen bg-[#F6F4FA] text-[#2D2A3E] flex flex-col justify-between">
      {/* Top Header */}
      <header className="bg-fracspace-navy text-white py-4 px-6 border-b border-white/10 shadow-md">
        <div className="max-w-[1000px] mx-auto flex items-center justify-between">
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/images/fracspace-logo-white.png"
              alt="Fracspace"
              width={160}
              height={32}
              className="h-8 w-auto block"
              priority
            />
          </Link>
          <Link
            href="/"
            className="text-xs sm:text-sm text-fracspace-subtle hover:text-white transition-colors inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[760px] w-full mx-auto p-4 sm:p-6 my-8">
        {isLoading ? (
          <div className="bg-white rounded-3xl p-10 sm:p-14 shadow-[0_20px_60px_rgba(27,22,64,0.08)] flex flex-col items-center text-center gap-4">
            <Loader2 className="w-12 h-12 text-fracspace-gold animate-spin" />
            <h2 className="font-outfit font-bold text-2xl text-fracspace-navy">
              Confirming your payment...
            </h2>
            <p className="text-sm text-fracspace-muted max-w-md">
              Please wait while we verify your transaction with Cashfree and generate your webinar invite.
            </p>
          </div>
        ) : isPaid ? (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(27,22,64,0.08)] border border-emerald-100 flex flex-col gap-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Success Header */}
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 grid place-items-center shadow-sm">
                <CheckCircle2 className="w-12 h-12 stroke-[2.2]" />
              </div>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                Payment Successful · Seat Reserved
              </span>
              <h1 className="font-outfit font-extrabold text-3xl sm:text-4xl text-fracspace-navy m-0">
                You’re All Set for the Webinar!
              </h1>
              <p className="text-sm sm:text-base text-fracspace-muted max-w-lg m-0">
                Your registration is confirmed. Join the official attendee community below to get session reminders and direct Zoom access.
              </p>
            </div>

            {/* Prominent WhatsApp Community CTA Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-emerald-50 to-[#E8F8EE] border-2 border-emerald-300 flex flex-col items-center text-center gap-4 shadow-sm">
              <div className="flex flex-col gap-1 items-center">
                <span className="text-xs font-extrabold text-emerald-900 tracking-wider uppercase">
                  Step 1 of 1: Join Attendee Group
                </span>
                <h3 className="font-outfit font-bold text-xl sm:text-2xl text-emerald-950 m-0">
                  Exclusive WhatsApp Community
                </h3>
                <p className="text-xs sm:text-sm text-emerald-800 max-w-md m-0">
                  Click the button below to join the private WhatsApp community. The live Zoom link, speaker notes, and Q&amp;A prompts will be posted here.
                </p>
              </div>

              <a
                href={communityLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 min-h-[56px] rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-outfit font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-6 h-6 fill-white text-white" />
                Join WhatsApp Community
              </a>
            </div>

            {/* Webinar Overview Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF8EF] border border-[#F1E4D3] flex flex-col gap-4">
              <h4 className="font-outfit font-bold text-base text-fracspace-navy uppercase tracking-wider m-0">
                Webinar Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2.5 text-[#2D2A3E]">
                  <Calendar className="w-4 h-4 text-fracspace-darkAmber flex-shrink-0" />
                  <span>
                    <strong>Date:</strong> {WEBINAR_CONFIG.eventDate}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-[#2D2A3E]">
                  <Clock className="w-4 h-4 text-fracspace-darkAmber flex-shrink-0" />
                  <span>
                    <strong>Time:</strong> {WEBINAR_CONFIG.eventTime}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-[#2D2A3E]">
                  <Video className="w-4 h-4 text-fracspace-darkAmber flex-shrink-0" />
                  <span>
                    <strong>Platform:</strong> Live on Zoom (55 mins)
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-[#2D2A3E]">
                  <User className="w-4 h-4 text-fracspace-darkAmber flex-shrink-0" />
                  <span>
                    <strong>Host:</strong> Srinivasa Unnath Reddy
                  </span>
                </div>
              </div>
            </div>

            {/* Multi-Channel Notice */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs sm:text-sm">
              <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Email &amp; WhatsApp Receipt Sent:</strong> We’ve dispatched an email receipt along with a WhatsApp confirmation message containing your community link and registration ID (<code>{orderId}</code>).
              </span>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap justify-between items-center gap-4 pt-2 border-t border-gray-100">
              <Link
                href="/"
                className="text-sm font-semibold text-fracspace-navy hover:text-fracspace-darkAmber transition-colors inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                Return to landing page
              </Link>
              <Link
                href={WEBINAR_CONFIG.propertiesWebsiteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-fracspace-darkAmber hover:underline"
              >
                Browse Fracspace Properties →
              </Link>
            </div>
          </div>
        ) : (
          /* Payment Not Verified / Failed State */
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-[0_20px_60px_rgba(27,22,64,0.08)] border border-amber-200 flex flex-col items-center text-center gap-5">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 grid place-items-center">
              <AlertCircle className="w-10 h-10" />
            </div>
            <h2 className="font-outfit font-bold text-2xl text-fracspace-navy m-0">
              Payment Status Pending
            </h2>
            <p className="text-sm text-fracspace-muted max-w-md m-0">
              {statusMessage ||
                "We could not immediately verify this payment. If your money was deducted, our automated webhook will confirm it shortly and send your WhatsApp & email invites."}
            </p>
            <div className="flex gap-3 mt-2">
              <Link
                href="/"
                className="px-6 py-3 rounded-xl bg-fracspace-gold text-fracspace-navy font-outfit font-bold text-sm hover:bg-fracspace-goldHover transition-colors shadow-sm"
              >
                Try Registering Again
              </Link>
              <a
                href={WEBINAR_CONFIG.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-outfit font-bold text-sm hover:bg-gray-50 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-fracspace-muted border-t border-gray-200 bg-white">
        © 2026 Fracspace. All rights reserved. · Questions? Email{" "}
        <a href={`mailto:${WEBINAR_CONFIG.contactEmail}`} className="underline">
          {WEBINAR_CONFIG.contactEmail}
        </a>
      </footer>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F6F4FA] flex items-center justify-center p-6">
          <Loader2 className="w-10 h-10 text-fracspace-gold animate-spin" />
        </div>
      }
    >
      <SuccessPageContent />
    </Suspense>
  );
}
