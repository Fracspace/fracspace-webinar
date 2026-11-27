import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#1B1640] text-white flex flex-col items-center justify-center p-6 text-center">
      <h2 className="font-outfit text-5xl font-extrabold mb-4 text-[#F59E0B]">404</h2>
      <p className="text-xl text-[#DCD3EE] mb-8">Page not found</p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-[#F59E0B] text-[#1B1640] font-bold font-outfit hover:bg-[#FBBF24] transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
