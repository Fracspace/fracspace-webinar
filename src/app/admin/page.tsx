import React from "react";
import { AdminDashboardClient } from "@/components/AdminDashboardClient";

export const metadata = {
  title: "Admin Dashboard | Fracspace Webinar",
  description: "Manage and view Fracspace Webinar registrations.",
};

export default function AdminPage() {
  return <AdminDashboardClient />;
}
