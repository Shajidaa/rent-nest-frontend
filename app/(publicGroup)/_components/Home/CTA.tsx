import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0B4F4A] via-[#0d6158] to-[#083d39] py-18 text-white shadow-2xl">
      {/* Decorative Background Elements */}
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 text-center md:px-8">
        {/* Optional Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide uppercase text-emerald-200 backdrop-blur-md mb-6">
          <Sparkles className="h-3.5 w-3.5" />
          Get Started Today
        </div>

        <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
          Ready to Find Your Next Home?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/80 md:text-lg">
          Join thousands of tenants and landlords already using NestRent to simplify their real estate journey.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="group h-13 rounded-2xl bg-white px-8 text-[#0B4F4A] font-semibold shadow-lg transition-all duration-300 hover:bg-emerald-50 hover:scale-[1.02]"
          >
            <Link href="/properties" className="flex items-center gap-2">
              Start Browsing
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-13 rounded-2xl border-white/20 bg-transparent px-8 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/40"
          >
            <Link href="/register">Create Free Account</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}