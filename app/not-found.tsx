import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/sections/Footer";

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#0B0D10] text-[#F5F5F0] pt-[120px] pb-24 flex items-center justify-center">
        <div className="container-x text-center max-w-xl mx-auto px-4">
          <span className="label inline-block mb-4 text-[#6C8CFF]">404 ERROR</span>
          <h1 className="h-section mb-4 text-3xl sm:text-4xl font-semibold">
            Page Not Found
          </h1>
          <p className="text-[#A1A6B0] mb-8 text-base sm:text-lg">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex justify-center">
            <Link
              href="/"
              className="btn btn-primary inline-flex items-center gap-2"
            >
              <ArrowLeft size={16} aria-hidden />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
