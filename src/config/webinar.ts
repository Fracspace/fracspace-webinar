import { WebinarConfig, TopicItem, FaqItem, PressLogo } from "@/types/webinar";

export const WEBINAR_CONFIG: WebinarConfig = {
  price: "₹99",
  eventDate: "Sunday, Dec 13",
  eventTime: "11:00 AM IST",
  startsAt: "2026-12-13T11:00:00+05:30",
  seats: "100",
  paymentLink: "#register",
  whatsappLink: "https://wa.me/919880626111",
  whatsappCommunityLink:
    process.env.NEXT_PUBLIC_WHATSAPP_COMMUNITY_LINK ||
    "https://chat.whatsapp.com/F1plK69ahDzGdGWuaJhnnG",
  mainWebsiteLink: "https://www.fracspace.com/",
  propertiesWebsiteLink: "https://investments.fracspace.com/",
  contactEmail: "support@fracspace.com",
  contactPhone: "+91 98806 26111",
  officeAddress: "4th Floor, Dreamscape Hotel, Road No. 12, Banjara Hills, Hyderabad 500034",
  hostName: "Unnath Reddy",
  hostTitle: "Founder & Managing Director, Fracspace",
  hostBio:
    "Unnath founded Fracspace to make holiday-home ownership possible for families who would never buy a whole second home. Fracspace offers fractions of holiday properties starting at ₹10 lakh and manages them end to end, from guest bookings and housekeeping to owner reporting. In this session he shares how Fracspace thinks about structuring, running and exiting a fractional property, and answers your questions live.",
  hostBadges: [
    "8+ years in real estate",
    "100+ properties / owners",
    "Forbes India DGEMS 2024 · Top 200",
  ],
  extraInclude: "Recording of the session & due-diligence checklist",
  feeAdjust: "Fully adjusted against your first Fracspace purchase",
};

export const NINE_TOPICS: TopicItem[] = [
  {
    id: 1,
    question: "What is fractional ownership?",
    description:
      "Start with one villa and ten families. If each family buys a 10% share, what does that mean on paper and in real life? We explain how a property is divided, what a share entitles you to, and how fractional ownership differs from a timeshare or a holiday club.",
    takeaway: "The basic model in plain words, with one worked example.",
  },
  {
    id: 2,
    question: "Why choose fractional ownership over full ownership?",
    description:
      "A holiday home you use three weeks a year still costs you all twelve months. We compare full and fractional ownership side by side: the upfront price, yearly running costs, how often you can stay, and how much say you have in decisions.",
    takeaway: "Which option fits the way your family actually travels.",
  },
  {
    id: 3,
    question: "Why consider Fracspace, and what are the benefits?",
    description:
      "Unnath explains how Fracspace selects, sets up and manages holiday properties. See how family stays, guest bookings and owner support fit together, and which benefits are common to every property versus those that depend on the one you choose.",
    takeaway: "What Fracspace does for owners, and what you should still check yourself.",
  },
  {
    id: 4,
    question: "What exactly do you own?",
    description:
      "Whose name is on the property papers? There are three common structures: owning a share of the property directly, holding a stake in a company (usually an SPV) that owns it, and buying holiday usage rights only. Each gives you very different rights.",
    takeaway: "How to tell which one you are being offered, and why it matters.",
  },
  {
    id: 5,
    question: "Is fractional ownership legal in India?",
    description:
      "Yes, when it is structured correctly, but the details matter. We cover why the ownership structure decides your protections, and which documents, registrations and approvals to check for any particular property.",
    takeaway: "A due-diligence checklist you can take to your lawyer.",
  },
  {
    id: 6,
    question: "How do my holidays work?",
    description:
      "How many nights do you get each year? How are school holidays, long weekends and peak dates shared fairly? Can you send friends or relatives in your place, and what are the extra charges?",
    takeaway: "How booking rules work, and how that Christmas clash gets resolved.",
  },
  {
    id: 7,
    question: "Who runs and maintains the property?",
    description:
      "Follow a single guest booking from check-in to checkout. See who handles housekeeping, repairs, utilities and staff, how costs are split, and how owners track income and expenses.",
    takeaway: "What a well-run property looks like behind the scenes.",
  },
  {
    id: 8,
    question: "What can go wrong, and what is the safety net?",
    description:
      "Bookings fall. The roof needs repairs. The operator stops performing. We walk through each scenario and show how to read the reserve fund, insurance cover and owners' agreement.",
    takeaway: "What is covered, and what you may have to pay from your own pocket.",
  },
  {
    id: 9,
    question: "How do I exit and get paid?",
    description:
      "Walk through every step from requesting an exit to money in your account. We cover the lock-in period, who finds the buyer, how the price is set, and what happens if a sale takes longer than expected.",
    takeaway: "A realistic picture of liquidity, not a best-case promise.",
  },
];

export const WHO_SHOULD_ATTEND: string[] = [
  "Dream of a holiday home in Goa, the hills or by the sea, but can't justify paying for a whole property you would use a few weeks a year",
  "Already take two or three family holidays a year and are tired of booking hotels every time",
  "Are an NRI or a working professional looking at real-estate options from ₹10 lakh upwards",
  "Have heard of fractional ownership and want a straight answer on how it really works",
  "Want to understand the risks and exit before anyone asks you to sign anything",
];

export const PRESS_LOGOS: PressLogo[] = [
  {
    name: "Deccan Chronicle",
    image: "/assets/a3ac4cfe9f68229921f133b5b99acd7e.png",
    maxHeight: 42,
  },
  {
    name: "The Enterprise World",
    image: "/assets/c0b3acb6c55694f44182b594e75cd696.png",
    maxHeight: 36,
  },
  {
    name: "ET Now",
    image: "/assets/01f553b259f79a8204c0523c1cd3a6ba.png",
    maxHeight: 52,
  },
  {
    name: "ET Edge Insights",
    image: "/assets/bdd55b4b7db80c90946b8556ea106923.png",
    maxHeight: 40,
  },
  {
    name: "Bizz Buzz",
    image: "/assets/cfa67e83da63411b3c31ed7bd16fcd20.png",
    maxHeight: 42,
  },
  {
    name: "Entrepreneurs Today",
    image: "/assets/3055bc4d20c05a4f00bb18d7af0439de.png",
    maxHeight: 52,
  },
  {
    name: "Around Telugu",
    image: "/assets/27d3292361c6b231ac5ae2e4ef8aa473.png",
    maxHeight: 52,
  },
];

export const LIVE_QA_QUESTIONS: string[] = [
  "“We only travel during school holidays. Will we actually get those dates?”",
  "“Could we be asked to pay for a major repair?”",
  "“If we needed our money back, how soon could we sell?”",
  "“What happens if the other owners want to sell the whole property?”",
  "“Can my parents use our nights when we can't?”",
];

export const FAQS: FaqItem[] = [
  {
    question: "Why is there a registration fee?",
    answer:
      "A small fee of ₹99 keeps the session focused on families who are seriously considering holiday-home ownership, which leaves more time for real questions in the Q&A.",
  },
  {
    question: "Where will it happen?",
    answer:
      "Online. The joining link is sent to your email and WhatsApp after you register, with a reminder before the session.",
  },
  {
    question: "Will there be a recording?",
    answer:
      "Yes, shared in the WhatsApp community. We recommend joining live so you can ask questions.",
  },
  {
    question: "Do I need to know anything about real estate?",
    answer:
      "No. The session is designed for families with no prior knowledge of fractional ownership.",
  },
  {
    question: "Will I be pressured to buy?",
    answer:
      "No. This is an educational session. You'll learn what questions to ask about any fractional property, not just ours.",
  },
  {
    question: "Can NRIs attend?",
    answer:
      "Yes. The session is online, and NRIs can ask questions about eligibility and paperwork during the Q&A.",
  },
  {
    question: "What is the minimum investment with Fracspace?",
    answer:
      "Fracspace fractions start at ₹10 lakh. Exact amounts depend on the property.",
  },
  {
    question: "Can I bring my spouse or family?",
    answer:
      "Absolutely. Watch together on one screen; there's no need to register separately.",
  },
];
