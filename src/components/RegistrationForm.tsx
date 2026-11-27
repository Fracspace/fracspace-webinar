"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import Script from "next/script";
import { useSearchParams } from "next/navigation";
import { Check, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";
import { WEBINAR_CONFIG } from "@/config/webinar";

declare global {
  interface Window {
    Cashfree?: (config: { mode: "sandbox" | "production" }) => {
      checkout: (options: {
        paymentSessionId: string;
        redirectTarget?: "_modal" | "_self" | "_blank";
      }) => Promise<{
        error?: { message?: string };
        redirect?: boolean;
        paymentDetails?: unknown;
      }>;
    };
  }
}

interface RegistrationFormProps {
  onSuccess?: (communityLink: string) => void;
  priceDisplay?: string;
  onAutoOpenModal?: () => void;
}

function RegistrationFormInner({
  priceDisplay = WEBINAR_CONFIG.price,
  onAutoOpenModal,
}: RegistrationFormProps) {
  const searchParams = useSearchParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"form" | "success" | "failure">("form");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sdkReady, setSdkReady] = useState(false);
  const [whatsappCommunityLink, setWhatsappCommunityLink] = useState<string>(
    WEBINAR_CONFIG.whatsappCommunityLink || "https://chat.whatsapp.com/F1plK69ahDzGdGWuaJhnnG"
  );

  // Check URL query parameters for ?order_id from redirects and route to /success
  useEffect(() => {
    const orderIdParam = searchParams.get("order_id");
    if (orderIdParam) {
      window.location.href = `/success?order_id=${encodeURIComponent(orderIdParam)}`;
    }
  }, [searchParams]);

  const validateInputs = useCallback(() => {
    const isNameOk = name.trim().length >= 2 && name.trim().length <= 100;
    const isEmailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    const digitsOnly = phone.replace(/\D/g, "");
    const isPhoneOk = digitsOnly.length === 10 && /^[6-9]/.test(digitsOnly);
    return isNameOk && isEmailOk && isPhoneOk;
  }, [name, email, phone]);

  const isValid = validateInputs();

  const handlePayAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!isValid) {
      setErrorMessage("Please enter a valid full name, email, and 10-digit Indian WhatsApp number.");
      return;
    }

    setIsLoading(true);

    try {
      // 1. Create order on backend (saves details in database & pre-fills Cashfree)
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.paymentSessionId) {
        throw new Error(data.error || "Unable to initiate payment. Please try again.");
      }

      const { orderId, paymentSessionId, mode } = data;

      // 2. Ensure Cashfree SDK is initialized
      if (!window.Cashfree) {
        throw new Error("Payment gateway SDK is loading. Please click pay again in a moment.");
      }

      const cashfreeInstance = window.Cashfree({
        mode: mode === "production" ? "production" : "sandbox",
      });

      // 3. Open Cashfree JS SDK v3 Checkout Modal with prefilled customer details
      const checkoutResult = await cashfreeInstance.checkout({
        paymentSessionId: paymentSessionId,
        redirectTarget: "_modal",
      });

      if (checkoutResult?.error) {
        throw new Error(checkoutResult.error.message || "Payment checkout failed.");
      }

      // 4. Verify payment with backend, update DB status, and get community link
      const verifyRes = await fetch("/api/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      const verifyData = await verifyRes.json();

      if (verifyData.paid || verifyData.success || verifyData.status === "PAID") {
        if (verifyData.communityLink) {
          setWhatsappCommunityLink(verifyData.communityLink);
        }
        setStatus("success");
      } else {
        setStatus("failure");
      }
    } catch (err: unknown) {
      console.error("Payment error:", err);
      const msg = err instanceof Error ? err.message : "Payment failed. Please try again.";
      setErrorMessage(msg);
      setStatus("failure");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setStatus("form");
    setErrorMessage(null);
  };

  return (
    <div className="w-full">
      {/* Load Cashfree Production SDK v3 */}
      <Script
        src="https://sdk.cashfree.com/js/v3/cashfree.js"
        strategy="afterInteractive"
        onLoad={() => setSdkReady(true)}
      />

      {status === "form" && (
        <form onSubmit={handlePayAndRegister} className="flex flex-col gap-4 text-[#1B1640]">
          <div className="flex justify-between items-baseline gap-3 flex-wrap pr-10">
            <strong className="font-outfit font-semibold text-2xl text-[#1B1640]">
              Reserve your seat
            </strong>
            <span className="font-outfit font-bold text-2xl text-[#1B1640]">{priceDisplay}</span>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2.5 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 text-red-600 flex-none" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Full name */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="lp-name" className="text-xs sm:text-sm font-semibold text-[#1B1640]">
              Full name <span className="text-red-600">*</span>
            </label>
            <input
              id="lp-name"
              type="text"
              required
              autoComplete="name"
              placeholder="e.g. Priya Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="lp-field h-[50px] px-3.5 rounded-xl border border-[#D8D2E6] text-base font-inherit bg-white text-[#1B1640] placeholder:text-[#9E9AA8] transition-colors"
            />
          </div>

          {/* Email address */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="lp-email" className="text-xs sm:text-sm font-semibold text-[#1B1640]">
              Email address <span className="text-red-600">*</span>
            </label>
            <input
              id="lp-email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="lp-field h-[50px] px-3.5 rounded-xl border border-[#D8D2E6] text-base font-inherit bg-white text-[#1B1640] placeholder:text-[#9E9AA8] transition-colors"
            />
          </div>

          {/* WhatsApp number */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="lp-phone" className="text-xs sm:text-sm font-semibold text-[#1B1640]">
              WhatsApp number <span className="text-red-600">*</span>
            </label>
            <input
              id="lp-phone"
              type="tel"
              required
              autoComplete="tel"
              inputMode="tel"
              placeholder="+91 98xxx xxxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="lp-field h-[50px] px-3.5 rounded-xl border border-[#D8D2E6] text-base font-inherit bg-white text-[#1B1640] placeholder:text-[#9E9AA8] transition-colors"
            />
          </div>

          {/* Highlighted Payment Partner Notice */}
          <div className="p-3.5 rounded-xl bg-[#FEF3C7]/70 border-2 border-[#F59E0B] flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#B45309] stroke-[2.4] flex-none mt-0.5" />
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#92400E]">
                Co-powered by
              </span>
              <strong className="font-outfit font-bold text-base sm:text-[17px] leading-tight text-[#1B1640]">
                Dreamscape Hotels &amp; Resorts
              </strong>
              <span className="text-xs leading-snug text-[#4B465C] mt-0.5">
                Your checkout &amp; payment receipt will appear under this name.
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="lp-cta min-h-[56px] rounded-xl bg-[#F59E0B] text-[#1B1640] font-outfit font-semibold text-lg cursor-pointer border-none flex items-center justify-center gap-2 shadow-[0_10px_24px_rgba(245,158,11,0.25)] mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-[#1B1640]" />
                Processing payment...
              </>
            ) : (
              `Pay ${priceDisplay} & Register`
            )}
          </button>

          <span className="flex items-center justify-center gap-1.5 text-xs text-[#5B5670]">
            <ShieldCheck className="w-4 h-4 text-[#5B5670] stroke-[2] flex-none" />
            Secure payment via Cashfree · UPI, cards and net banking accepted
          </span>

          <span className="text-[11px] leading-relaxed text-[#6B6680] text-center">
            By registering, you agree to receive webinar updates on WhatsApp and email. We never
            share your details.
          </span>
        </form>
      )}

      {status === "success" && (
        <div className="flex flex-col items-center gap-4 text-center py-4">
          <div
            aria-hidden="true"
            className="w-16 h-16 rounded-full bg-[#16A34A] shadow-[0_0_0_10px_#DCFCE7] grid place-items-center"
          >
            <Check className="w-8 h-8 text-white stroke-[3]" />
          </div>

          <strong className="font-outfit font-semibold text-2xl sm:text-3xl text-[#1B1640]">
            You're registered!
          </strong>

          <p className="m-0 text-sm sm:text-base leading-relaxed text-[#5B5670] max-w-[380px]">
            Your seat for {WEBINAR_CONFIG.eventDate} at {WEBINAR_CONFIG.eventTime} is confirmed, and
            your receipt is on its way to your email. Join the WhatsApp community below; we'll share
            the joining link and reminders there.
          </p>

          <a
            href={whatsappCommunityLink || WEBINAR_CONFIG.whatsappCommunityLink}
            target="_blank"
            rel="noopener noreferrer"
            className="lp-cta flex items-center justify-center gap-2.5 w-full min-h-[54px] rounded-xl bg-[#25D366] text-[#0B2E1A] font-outfit font-bold text-base shadow-md cursor-pointer no-underline mt-2"
          >
            Join the WhatsApp Community
          </a>
        </div>
      )}

      {status === "failure" && (
        <div className="flex flex-col items-center gap-4 text-center py-4">
          <div
            aria-hidden="true"
            className="w-16 h-16 rounded-full bg-[#DC2626] shadow-[0_0_0_10px_#FEE2E2] grid place-items-center"
          >
            <AlertCircle className="w-8 h-8 text-white stroke-[2.5]" />
          </div>

          <strong className="font-outfit font-semibold text-2xl sm:text-[26px] text-[#1B1640]">
            Your payment didn't go through
          </strong>

          <p className="m-0 text-sm leading-relaxed text-[#5B5670] max-w-[360px]">
            {errorMessage ||
              "If any amount was deducted, it will be refunded automatically within 3–5 working days. Your details are saved, so you can try again in one tap."}
          </p>

          <button
            type="button"
            onClick={handleRetry}
            className="lp-cta w-full min-h-[52px] rounded-xl bg-[#F59E0B] text-[#1B1640] font-outfit font-semibold text-base border-none cursor-pointer mt-2"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

export const RegistrationForm: React.FC<RegistrationFormProps> = (props) => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center p-8">
          <Loader2 className="w-6 h-6 animate-spin text-[#1B1640]" />
        </div>
      }
    >
      <RegistrationFormInner {...props} />
    </Suspense>
  );
};
