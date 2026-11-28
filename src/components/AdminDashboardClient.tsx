"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  Download,
  Loader2,
  LogOut,
  Mail,
  RefreshCw,
  Search,
  ShieldCheck,
  Users,
  IndianRupee,
  AlertCircle,
} from "lucide-react";

interface RegistrationRecord {
  id: string;
  webinar_slug: string;
  name: string;
  email: string;
  phone: string;
  amount_inr: string | number;
  status: "pending" | "paid";
  order_id: string | null;
  payment_id: string | null;
  paid_at: string | null;
  whatsapp_sent_at: string | null;
  whatsapp_error: string | null;
  email_sent_at: string | null;
  email_error: string | null;
  created_at: string;
}

interface AdminStats {
  total: number;
  paid: number;
  pending: number;
  totalRevenueInr: number;
}

function formatDateTime(value: string | null): string {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function csvEscape(val: unknown): string {
  const s = val === null || val === undefined ? "" : String(val);
  return `"${s.replace(/"/g, '""')}"`;
}

export const AdminDashboardClient: React.FC = () => {
  const [checkingSession, setCheckingSession] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");

  // Login state (empty by default so admin email is not exposed to visitors)
  const [emailInput, setEmailInput] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authMessage, setAuthMessage] = useState<string | null>(null);

  // Dashboard data state
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [stats, setStats] = useState<AdminStats>({
    total: 0,
    paid: 0,
    pending: 0,
    totalRevenueInr: 0,
  });
  const [loadingData, setLoadingData] = useState(false);
  const [dataError, setDataError] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "paid" | "pending">("all");

  const loadRegistrations = useCallback(async () => {
    setLoadingData(true);
    setDataError(null);
    try {
      const res = await fetch("/api/admin/registrations", { cache: "no-store" });
      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to load registrations.");
      }
      setAuthenticated(true);
      setAdminEmail(data.adminEmail || "");
      setStats(data.stats);
      setRegistrations(data.registrations || []);
    } catch (err) {
      setDataError(err instanceof Error ? err.message : "Failed to load registrations.");
    } finally {
      setCheckingSession(false);
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    loadRegistrations();
  }, [loadRegistrations]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthMessage(null);
    setAuthLoading(true);
    try {
      const res = await fetch("/api/admin/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send OTP.");
      }
      setOtpSent(true);
      setAuthMessage(data.message || `OTP sent to ${emailInput.trim()}`);
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Failed to send OTP.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);
    try {
      const res = await fetch("/api/admin/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput.trim(), otp: otpInput.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Invalid OTP.");
      }
      setAuthenticated(true);
      setOtpInput("");
      await loadRegistrations();
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Invalid OTP.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setAdminEmail("");
    setEmailInput("");
    setOtpSent(false);
    setOtpInput("");
    setRegistrations([]);
  };

  const filteredRegistrations = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return registrations.filter((row) => {
      if (statusFilter !== "all" && row.status !== statusFilter) return false;
      if (!q) return true;
      return (
        row.name.toLowerCase().includes(q) ||
        row.email.toLowerCase().includes(q) ||
        row.phone.toLowerCase().includes(q) ||
        row.id.toLowerCase().includes(q) ||
        (row.order_id && row.order_id.toLowerCase().includes(q)) ||
        (row.payment_id && row.payment_id.toLowerCase().includes(q))
      );
    });
  }, [registrations, searchQuery, statusFilter]);

  const handleExportCsv = () => {
    const headers = [
      "id",
      "webinar_slug",
      "name",
      "email",
      "phone",
      "amount_inr",
      "status",
      "order_id",
      "payment_id",
      "paid_at",
      "whatsapp_sent_at",
      "whatsapp_error",
      "email_sent_at",
      "email_error",
      "created_at",
    ];
    const lines = [
      headers.join(","),
      ...filteredRegistrations.map((r) =>
        headers.map((h) => csvEscape(r[h as keyof RegistrationRecord])).join(",")
      ),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fracspace-webinar-registrations-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-[#FFF8EF] flex items-center justify-center p-6">
        <div className="flex items-center gap-3 text-[#1B1640] font-outfit font-semibold text-lg">
          <Loader2 className="w-6 h-6 animate-spin text-[#F59E0B]" />
          Loading Admin Dashboard...
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#1B1640] flex flex-col">
        <header className="py-5 px-6 border-b border-white/10">
          <div className="max-w-[1100px] mx-auto flex items-center justify-between">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/assets/110158d0b3323f0d3dbaf3a8a7998a97.png"
                alt="Fracspace"
                width={118}
                height={28}
                className="h-7 w-auto object-contain"
              />
            </Link>
            <Link href="/" className="text-xs sm:text-sm text-[#DCD3EE] hover:text-white">
              Back to Webinar Page
            </Link>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-[440px] bg-white rounded-[24px] p-7 sm:p-9 shadow-[0_30px_80px_rgba(0,0,0,0.35)] text-[#1B1640] flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <span className="self-start inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF1DD] text-[11px] font-bold uppercase tracking-wider text-[#B45309]">
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin Access
              </span>
              <h1 className="m-0 font-outfit font-bold text-2xl sm:text-3xl text-[#1B1640]">
                Sign in to Dashboard
              </h1>
              <p className="m-0 text-sm text-[#5B5670]">
                Enter your authorized admin email to receive a 6-digit login OTP.
              </p>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 text-red-600 flex-none mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            {authMessage && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 text-xs text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-none mt-0.5" />
                <span>{authMessage}</span>
              </div>
            )}

            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="admin-email" className="text-xs font-semibold text-[#1B1640]">
                    Admin Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#6B6680] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="admin-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="Enter admin email"
                      className="w-full h-[48px] pl-10 pr-3.5 rounded-xl border border-[#D8D2E6] text-sm bg-white text-[#1B1640] focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="lp-cta min-h-[50px] rounded-xl bg-[#F59E0B] text-[#1B1640] font-outfit font-semibold text-base cursor-pointer border-none flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {authLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    "Send Login OTP"
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="admin-otp" className="text-xs font-semibold text-[#1B1640]">
                    6-Digit OTP sent to <span className="text-[#B45309]">{emailInput}</span>
                  </label>
                  <input
                    id="admin-otp"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    required
                    autoFocus
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter 6-digit OTP"
                    className="w-full h-[52px] px-4 rounded-xl border border-[#D8D2E6] text-center tracking-[0.35em] font-outfit font-bold text-xl bg-white text-[#1B1640] focus:outline-none focus:border-[#F59E0B]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={authLoading || otpInput.length !== 6}
                  className="lp-cta min-h-[50px] rounded-xl bg-[#F59E0B] text-[#1B1640] font-outfit font-semibold text-base cursor-pointer border-none flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {authLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify & Login"
                  )}
                </button>

                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(false);
                      setOtpInput("");
                      setAuthError(null);
                      setAuthMessage(null);
                    }}
                    className="text-[#5B5670] hover:text-[#1B1640] bg-transparent border-none cursor-pointer p-0 underline"
                  >
                    Change email
                  </button>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={authLoading}
                    className="text-[#B45309] font-semibold hover:underline bg-transparent border-none cursor-pointer p-0"
                  >
                    Resend OTP
                  </button>
                </div>
              </form>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8EF] text-[#1B1640] flex flex-col">
      {/* Top Navbar */}
      <header className="bg-[#1B1640] text-white py-4 px-6 sticky top-0 z-30 shadow-md">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/assets/110158d0b3323f0d3dbaf3a8a7998a97.png"
                alt="Fracspace"
                width={110}
                height={26}
                className="h-[26px] w-auto object-contain"
              />
            </Link>
            <span className="px-2.5 py-1 rounded-lg bg-white/10 text-xs font-semibold text-[#FCD34D]">
              Admin Dashboard
            </span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {adminEmail && (
              <span className="text-xs text-[#DCD3EE] hidden sm:inline">
                Signed in as <strong className="text-white">{adminEmail}</strong>
              </span>
            )}
            <button
              type="button"
              onClick={loadRegistrations}
              disabled={loadingData}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 cursor-pointer transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              type="button"
              onClick={handleExportCsv}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F59E0B] hover:bg-[#FBBF24] text-[#1B1640] text-xs font-bold border-none cursor-pointer transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Export CSV
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-100 text-xs font-semibold border border-red-400/30 cursor-pointer transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] w-full mx-auto p-4 sm:p-6 flex flex-col gap-6">
        {dataError && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-none" />
            <span>{dataError}</span>
          </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-[#EFE6D8] p-5 shadow-sm flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#EEF2FF] text-[#1B1640] grid place-items-center flex-none">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#5B5670]">Total Registrations</div>
              <div className="font-outfit font-bold text-2xl text-[#1B1640]">{stats.total}</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#EFE6D8] p-5 shadow-sm flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 grid place-items-center flex-none">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#5B5670]">Paid</div>
              <div className="font-outfit font-bold text-2xl text-emerald-700">{stats.paid}</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#EFE6D8] p-5 shadow-sm flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-800 grid place-items-center flex-none">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#5B5670]">Pending</div>
              <div className="font-outfit font-bold text-2xl text-amber-700">{stats.pending}</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#EFE6D8] p-5 shadow-sm flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#FFF1DD] text-[#B45309] grid place-items-center flex-none">
              <IndianRupee className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#5B5670]">Total Revenue</div>
              <div className="font-outfit font-bold text-2xl text-[#1B1640]">
                ₹{stats.totalRevenueInr.toLocaleString("en-IN")}
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl border border-[#EFE6D8] p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-[#6B6680] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, phone, order ID, or payment ID..."
              className="w-full h-[42px] pl-10 pr-4 rounded-xl border border-[#D8D2E6] text-sm bg-white text-[#1B1640] focus:outline-none focus:border-[#F59E0B]"
            />
          </div>

          <div className="flex items-center gap-2">
            {(["all", "paid", "pending"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setStatusFilter(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border transition-colors ${
                  statusFilter === tab
                    ? "bg-[#1B1640] text-white border-[#1B1640]"
                    : "bg-[#FFF8EF] text-[#1B1640] border-[#EFE6D8] hover:bg-[#FFF1DD]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Registrations Table (All DB Columns) */}
        <div className="bg-white rounded-2xl border border-[#EFE6D8] shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 border-b border-[#EFE6D8] flex items-center justify-between">
            <h2 className="m-0 font-outfit font-semibold text-base text-[#1B1640]">
              Registrations ({filteredRegistrations.length})
            </h2>
            <span className="text-xs text-[#5B5670]">Showing all database fields</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#FFF8EF] border-b border-[#EFE6D8] text-[#5B5670] uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4 font-bold whitespace-nowrap">#</th>
                  <th className="py-3 px-4 font-bold whitespace-nowrap">Name</th>
                  <th className="py-3 px-4 font-bold whitespace-nowrap">Email</th>
                  <th className="py-3 px-4 font-bold whitespace-nowrap">Phone</th>
                  <th className="py-3 px-4 font-bold whitespace-nowrap">Status</th>
                  <th className="py-3 px-4 font-bold whitespace-nowrap">Amount</th>
                  <th className="py-3 px-4 font-bold whitespace-nowrap">Order ID</th>
                  <th className="py-3 px-4 font-bold whitespace-nowrap">Payment ID</th>
                  <th className="py-3 px-4 font-bold whitespace-nowrap">Paid At</th>
                  <th className="py-3 px-4 font-bold whitespace-nowrap">Email Notification</th>
                  <th className="py-3 px-4 font-bold whitespace-nowrap">WhatsApp Notification</th>
                  <th className="py-3 px-4 font-bold whitespace-nowrap">Webinar Slug</th>
                  <th className="py-3 px-4 font-bold whitespace-nowrap">Registration ID</th>
                  <th className="py-3 px-4 font-bold whitespace-nowrap">Created At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE6D8]">
                {filteredRegistrations.length === 0 ? (
                  <tr>
                    <td colSpan={14} className="py-12 text-center text-sm text-[#5B5670]">
                      No registrations found.
                    </td>
                  </tr>
                ) : (
                  filteredRegistrations.map((row, idx) => (
                    <tr key={row.id} className="hover:bg-[#FFFBF5] transition-colors">
                      <td className="py-3 px-4 text-[#5B5670] font-medium whitespace-nowrap">
                        {idx + 1}
                      </td>
                      <td className="py-3 px-4 font-semibold text-[#1B1640] whitespace-nowrap">
                        {row.name}
                      </td>
                      <td className="py-3 px-4 text-[#2D2A3E] whitespace-nowrap">{row.email}</td>
                      <td className="py-3 px-4 font-mono text-[#2D2A3E] whitespace-nowrap">
                        {row.phone}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase ${
                            row.status === "paid"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-[#1B1640] whitespace-nowrap">
                        ₹{row.amount_inr}
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-[#5B5670] whitespace-nowrap">
                        {row.order_id || "—"}
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-[#5B5670] whitespace-nowrap">
                        {row.payment_id || "—"}
                      </td>
                      <td className="py-3 px-4 text-[#5B5670] whitespace-nowrap">
                        {formatDateTime(row.paid_at)}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        {row.email_sent_at ? (
                          <span className="text-emerald-700 font-medium">
                            Sent ({formatDateTime(row.email_sent_at)})
                          </span>
                        ) : row.email_error ? (
                          <span className="text-red-600" title={row.email_error}>
                            Error: {row.email_error.slice(0, 40)}
                          </span>
                        ) : (
                          <span className="text-[#9E9AA8]">—</span>
                        )}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        {row.whatsapp_sent_at ? (
                          <span className="text-emerald-700 font-medium">
                            Sent ({formatDateTime(row.whatsapp_sent_at)})
                          </span>
                        ) : row.whatsapp_error ? (
                          <span className="text-red-600" title={row.whatsapp_error}>
                            Error: {row.whatsapp_error.slice(0, 40)}
                          </span>
                        ) : (
                          <span className="text-[#9E9AA8]">—</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-[#5B5670] whitespace-nowrap">
                        {row.webinar_slug}
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-[#5B5670] whitespace-nowrap">
                        {row.id}
                      </td>
                      <td className="py-3 px-4 text-[#5B5670] whitespace-nowrap">
                        {formatDateTime(row.created_at)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};
