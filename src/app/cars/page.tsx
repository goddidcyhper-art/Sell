import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CarCard } from "@/components/CarCard";

export default async function CarsPage() {
  const cars = await prisma.car.findMany({
    where: { status: "approved" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Inventory</p>
            <h1 className="mt-2 text-3xl font-bold">Browse all cars</h1>
          </div>
          <Link href="/" className="text-sm text-slate-300 hover:text-white">
            ← Back home
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </main>
  );
}
