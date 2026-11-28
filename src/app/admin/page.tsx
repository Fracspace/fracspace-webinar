import React from "react";
import type { Metadata } from "next";
import { AdminDashboardClient } from "@/components/AdminDashboardClient";

export const metadata: Metadata = {
  title: "Admin Dashboard | Fracspace Webinar",
  description: "Private admin dashboard.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function AdminPage() {
  return <AdminDashboardClient />;
}
