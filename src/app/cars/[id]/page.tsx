import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Gauge, CalendarRange, ShieldCheck, Heart } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function CarDetailPage({ params }: { params: { id: string } }) {
  const car = await prisma.car.findUnique({ where: { id: Number(params.id) } });

  if (!car) notFound();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href="/cars" className="mb-6 inline-block text-sm text-slate-300 hover:text-white">
          ← Back to listings
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="relative">
              <img src={car.image} alt={car.title} className="h-[420px] w-full rounded-3xl object-cover" />
              <button className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full border border-slate-700 bg-slate-950/80 backdrop-blur">
                <Heart className="h-5 w-5 text-slate-100" />
              </button>
            </div>

            <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h1 className="text-3xl font-bold">{car.title}</h1>
              <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-slate-300">
                <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-sky-400" /> {car.location}</span>
                <span className="flex items-center gap-2"><CalendarRange className="h-4 w-4 text-sky-400" /> {car.year}</span>
                <span className="flex items-center gap-2"><Gauge className="h-4 w-4 text-sky-400" /> {car.mileage.toLocaleString()} mi</span>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-semibold">Overview</h2>
                <p className="mt-3 text-slate-300">
                  This {car.year} {car.brand} {car.title} is in excellent condition and offers a refined drive with modern technology, strong reliability, and a comfortable cabin.
                </p>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-sm text-slate-400">Listed price</p>
              <p className="mt-2 text-4xl font-black text-white">${car.price.toLocaleString()}</p>
              <div className="mt-6 space-y-3 text-sm text-slate-300">
                <div className="flex items-center justify-between"><span>Condition</span><span className="font-medium text-emerald-400">Excellent</span></div>
                <div className="flex items-center justify-between"><span>Fuel</span><span>{car.fuel}</span></div>
                <div className="flex items-center justify-between"><span>Transmission</span><span>{car.transmission}</span></div>
              </div>

              <button className="mt-6 w-full rounded-xl bg-blue-500 px-4 py-3 font-medium text-white hover:bg-blue-400">
                Contact Seller
              </button>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/15 text-sm font-bold text-blue-300">
                  {car.sellerName[0]}
                </div>
                <div>
                  <p className="font-semibold text-white">{car.sellerName}</p>
                  <p className="text-sm text-slate-400">Verified seller</p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 text-sm text-emerald-400">
                <ShieldCheck className="h-4 w-4" /> Verified listing
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
