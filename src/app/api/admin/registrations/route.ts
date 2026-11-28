import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminAuth";
import { getAllRegistrations } from "@/lib/registrations";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const registrations = await getAllRegistrations();

    const paidRows = registrations.filter((r) => r.status === "paid");
    const pendingRows = registrations.filter((r) => r.status !== "paid");
    const totalRevenueInr = paidRows.reduce((sum, r) => {
      const amt = typeof r.amount_inr === "number" ? r.amount_inr : parseFloat(String(r.amount_inr));
      return sum + (Number.isFinite(amt) ? amt : 0);
    }, 0);

    return NextResponse.json({
      authenticated: true,
      adminEmail: session.email,
      stats: {
        total: registrations.length,
        paid: paidRows.length,
        pending: pendingRows.length,
        totalRevenueInr,
      },
      registrations,
    });
  } catch (err) {
    console.error("Admin registrations fetch error:", err);
    return NextResponse.json({ error: "Failed to load registrations." }, { status: 500 });
  }
}
