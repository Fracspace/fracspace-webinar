# Fracspace Webinar Landing Page (Next.js 15)

A high-performance, modern Next.js 15 App Router conversion of the **Fracspace Live Webinar** landing page: *"Can you own a holiday home in parts?"* featuring founder & MD **Srinivasa Unnath Reddy**.

---

## ✨ Features

- **Next.js 15 App Router & React 19**: Built with modern best practices, Server Components for high SEO score, and targeted Client Components for interactive states.
- **Hydration-Safe Live Countdown Timer**: Countdown timers for days, hours, minutes, and seconds that sync with the webinar schedule without SSR hydration mismatches.
- **Interactive Registration Modal**:
  - Live field validation (Full name, valid email address, and 10-digit Indian WhatsApp mobile number).
  - Dynamic button states and intuitive helper messages.
  - Keyboard accessible (ESC to close, backdrop click dismiss, focus management).
- **Interactive Review / Testimonial Carousel**:
  - Auto-rotates every 7 seconds.
  - Manual Next / Previous navigation.
  - Clickable dot indicators.
  - Auto-pauses on user interaction.
- **Accordion FAQ**: Clean expand/collapse accordion with smooth animated rotation indicators.
- **Modern Responsive Design**: Matching mobile, tablet, and desktop viewports with floating badges, hover zoom effects, and lift shadows.
- **Centralized Typed Configuration (`src/config/webinar.ts`)**: Easily update pricing, dates, links, properties, FAQs, and testimonials from a single file.
- **Rich SEO & Structured Data**: Built-in JSON-LD `BroadcastEvent` schema, OpenGraph tags, and semantic HTML.

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have Node.js 18.17+ or 20+ installed.

### 2. Development Server
Run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to view the page.

### 3. Production Build
Build and run the production application:
```bash
npm run build
npm start
```

---

## 🛠️ Project Structure

```
FsWebinar/
├── public/
│   └── images/              # All original webp/jpg/png assets
├── src/
│   ├── app/
│   │   ├── globals.css      # Tailwind directives, animations & utility classes
│   │   ├── layout.tsx       # Root layout, Google Fonts (Outfit & Inter), JSON-LD
│   │   └── page.tsx         # Assembled landing page sections
│   ├── components/
│   │   ├── CountdownTimer.tsx       # Reusable, hydration-safe countdown component
│   │   ├── FaqSection.tsx           # Accordion FAQ & WhatsApp contact card
│   │   ├── FinalCtaSection.tsx      # Bottom conversion section with banner countdown
│   │   ├── Footer.tsx               # Brand info, contact, and statutory disclaimers
│   │   ├── GallerySection.tsx       # 3-image lifestyle mosaic
│   │   ├── Hero.tsx                 # Hero section, video simulation & floating badges
│   │   ├── Navbar.tsx               # Logo, navigation links, and Register CTA
│   │   ├── PhotoBanner.tsx          # Full-width photo quote banner
│   │   ├── PressSection.tsx         # Forbes DGEMS & 7 featured media logos
│   │   ├── PropertiesSection.tsx    # Co-ownership property cards
│   │   ├── RegistrationModal.tsx    # Popup registration form with live validation
│   │   ├── StatsSection.tsx         # 4 elevated stats cards
│   │   ├── StorySection.tsx         # Hook, countdown, and founder video preview
│   │   ├── TestimonialsSection.tsx  # Dynamic rotating review carousel
│   │   ├── TopicsSection.tsx        # 3 curriculum pillars and sticky ticket card
│   │   └── UrgencyBar.tsx           # Top gold urgency announcement banner
│   ├── config/
│   │   └── webinar.ts       # Central typed configuration (price, dates, URLs, data)
│   ├── context/
│   │   └── ModalContext.tsx # Context provider for registration modal state
│   └── types/
│       └── webinar.ts       # TypeScript definitions
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
└── package.json
```

---

## ⚙️ Customization

Edit `src/config/webinar.ts` to update:
- `price`: e.g. `'₹99'`
- `eventDate`: e.g. `'Sunday, Dec 13'`
- `eventTime`: e.g. `'11:00 AM IST'`
- `startsAt`: ISO string (e.g. `'2026-12-13T11:00:00+05:30'`) for countdowns
- `whatsappLink`: WhatsApp chat number URL

---

## 💳 Paid Registration Backend (Cashfree & Supabase)

### 1. Database Setup (Supabase SQL Editor)
Run the script in [`db/schema.sql`](./db/schema.sql) in your Supabase SQL Editor:
- Creates `public.webinar_registrations` with Row-Level Security enabled.
- Creates the isolated `webinar_app` database user and grants access **only** to this table.
- Remember to replace `'CHANGE_ME'` with a strong password.

### 2. Environment Variables in Vercel
In your Vercel Project Settings > **Environment Variables**, add the variables listed in [`.env.example`](./.env.example):
- `DATABASE_URL`: Supabase transaction pooler connection string on port **6543** for user `webinar_app`.
- `SITE_URL`: Your production domain (e.g. `https://webinar.fracspace.com`).
- `CASHFREE_APP_ID`: Your Cashfree App ID.
- `CASHFREE_SECRET_KEY`: Your Cashfree Secret Key.
- `CASHFREE_API_VERSION`: `2025-01-01`.
- `CASHFREE_ENV`: `sandbox` (for testing) or `production`.
- `WHATSAPP_TOKEN`: Meta WhatsApp Cloud API access token.
- `WHATSAPP_PHONE_NUMBER_ID`: Meta Phone Number ID.
- `WHATSAPP_TEMPLATE_NAME`: Pre-approved template name with 4 body variables: `{{1}}` (Name), `{{2}}` (Title), `{{3}}` (Date), `{{4}}` (Community Link).
- `WHATSAPP_TEMPLATE_LANG`: Template language code (e.g. `en`).
- `GRAPH_API_VERSION`: `v21.0`.
- `WHATSAPP_COMMUNITY_LINK`: WhatsApp group/community invite link.
- `SMTP_HOST`: SMTP server host (e.g. `smtp.gmail.com` or `smtp.zoho.in`).
- `SMTP_PORT`: SMTP port (`465` for SSL or `587` for TLS).
- `SMTP_USER`: Email address/username (e.g. `support@fracspace.com`).
- `SMTP_PASS`: Email account app password or SMTP password.
- `SMTP_FROM`: Sender display name (e.g. `"Fracspace Webinar" <support@fracspace.com>`).
- `WEBINAR_SLUG`: e.g. `holiday-home-webinar`.
- `WEBINAR_TITLE`: `Can You Own a Holiday Home in Parts?`.
- `WEBINAR_DATE`: `Sunday, Dec 13 · 11:00 AM IST`.
- `WEBINAR_PRICE_INR`: `99`.

### 3. Testing in Cashfree Sandbox
1. Set `CASHFREE_ENV=sandbox` with your Cashfree test credentials.
2. Fill the registration form with test details and click **Pay ₹99 and register**.
3. Use Cashfree test UPI / card credentials in the checkout popup.
4. Verify that:
   - Payment popup completes and calls `/api/verify-payment`.
   - Registration status flips to `paid` in `public.webinar_registrations`.
   - Success screen renders with the **Join WhatsApp community** button.

### 4. Switching to Production
1. In Vercel, update `CASHFREE_ENV=production`.
2. Replace `CASHFREE_APP_ID` and `CASHFREE_SECRET_KEY` with your Cashfree Live API credentials.
3. In the **Cashfree Merchant Dashboard**:
   - Go to **Developers > Webhooks** and add endpoint: `https://your-domain.com/api/cashfree-webhook`.
   - Go to **Settings > Allowed Domains / Whitelist** and add your production domain (`https://your-domain.com`).
4. Trigger a real ₹99 test payment to confirm end-to-end receipt and WhatsApp delivery.

