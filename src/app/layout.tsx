import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/context/ModalContext";
import { RegistrationModal } from "@/components/RegistrationModal";
import { WEBINAR_CONFIG } from "@/config/webinar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1B1640",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(WEBINAR_CONFIG.mainWebsiteLink),
  title: "Can You Own a Holiday Home in Parts? — Fracspace live webinar",
  description:
    "A 55-minute live webinar on fractional holiday-home ownership in India with Fracspace founder Srinivasa Unnath Reddy.",
  keywords: [
    "Fracspace",
    "fractional ownership",
    "holiday home investment",
    "real estate India",
    "co-ownership",
    "Srinivasa Unnath Reddy",
  ],
  authors: [{ name: "Fracspace", url: "https://www.fracspace.com" }],
  openGraph: {
    title: "Can You Own a Holiday Home in Parts? — Fracspace live webinar",
    description:
      "A 55-minute live webinar on fractional holiday-home ownership in India with Fracspace founder Srinivasa Unnath Reddy.",
    url: "https://www.fracspace.com",
    siteName: "Fracspace",
    images: [
      {
        url: "/assets/62cdfe9e8f717aef28a45ce4811add14.jpg",
        width: 1200,
        height: 630,
        alt: "Fracspace Holiday Home Webinar",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BroadcastEvent",
    name: "Can You Own a Holiday Home in Parts? — Fracspace live webinar",
    description:
      "A 55-minute live webinar on fractional holiday-home ownership in India with Fracspace founder Srinivasa Unnath Reddy.",
    startDate: WEBINAR_CONFIG.startsAt,
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    performer: {
      "@type": "Person",
      name: "Srinivasa Unnath Reddy",
      jobTitle: "Founder & MD",
      worksFor: {
        "@type": "Organization",
        name: "Fracspace",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Fracspace",
      url: WEBINAR_CONFIG.mainWebsiteLink,
    },
    offers: {
      "@type": "Offer",
      price: "99",
      priceCurrency: "INR",
      url: WEBINAR_CONFIG.paymentLink,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${outfit.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen bg-white text-[#2D2A3E]">
        <ModalProvider>
          {children}
          <RegistrationModal />
        </ModalProvider>
      </body>
    </html>
  );
}
