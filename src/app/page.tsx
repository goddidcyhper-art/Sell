import Link from "next/link";
import { ArrowRight, CarFront, MapPin, ShieldCheck, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { CarCard } from "@/components/CarCard";
import { SearchBar } from "@/components/SearchBar";
import { Navbar } from "@/components/Navbar";

export default async function HomePage() {
  const cars = await prisma.car.findMany({
    where: { status: "approved" },
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.25),transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.2),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <Navbar />

          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] mt-12">
            <div>
              <div className="mb-4 inline-flex items-center rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-200">
                Trusted by 35k+ buyers
              </div>

              <h1 className="max-w-xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Find your next drive with confidence.
              </h1>

              <p className="mt-5 max-w-xl text-lg text-slate-300">
                Explore verified listings, compare prices, and connect with trusted sellers in your area.
              </p>

              <div className="mt-8">
                <SearchBar />
              </div>

              <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  Verified listings
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-sky-400" />
                  Local dealers
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-400" />
                  Rated by buyers
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-4 shadow-2xl shadow-blue-950/40">
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80"
                    alt="Luxury car"
                    className="h-[420px] w-full object-cover"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Featured Deal</p>
                    <p className="text-xl font-semibold">2023 BMW M340i</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-400">Starting at</p>
                    <p className="text-2xl font-bold text-blue-400">$48,500</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Trending</p>
            <h2 className="mt-2 text-3xl font-bold text-white">Popular choices</h2>
          </div>
          <Link href="/cars" className="inline-flex items-center gap-2 text-sm font-medium text-blue-300 hover:text-blue-200">
            View all cars <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>
    </main>
  );
}
