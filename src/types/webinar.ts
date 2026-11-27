export interface WebinarConfig {
  price: string;
  eventDate: string;
  eventTime: string;
  startsAt: string;
  seats: string;
  paymentLink: string;
  whatsappLink: string;
  whatsappCommunityLink: string;
  mainWebsiteLink: string;
  propertiesWebsiteLink: string;
  contactEmail: string;
  contactPhone: string;
  officeAddress: string;
  hostName: string;
  hostTitle: string;
  hostBio: string;
  hostBadges: string[];
}

export interface TopicItem {
  id: number;
  question: string;
  description: string;
  takeaway: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PressLogo {
  name: string;
  image: string;
  maxHeight: number;
  link: string;
}
