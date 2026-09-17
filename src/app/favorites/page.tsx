"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CarCard } from "@/components/CarCard";

export default function FavoritesPage() {
  const [cars, setCars] = useState<any[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("auto-market-favorites") || "[]");
    if (!stored.length) return;

    fetch("/api/cars")
      .then((res) => res.json())
      .then((allCars) => setCars(allCars.filter((car: any) => stored.includes(car.id))));
  }, []);

  if (!cars.length) {
    return (
      <main className="min-h-screen bg-slate-950 text-white px-4 py-12">
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
          <h1 className="text-3xl font-bold">No favorites yet</h1>
          <p className="mt-3 text-slate-400">Save some cars you like and they will show up here.</p>
          <Link href="/cars" className="mt-6 inline-block rounded-xl bg-blue-500 px-4 py-2 text-white">Browse cars</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Saved</p>
            <h1 className="mt-2 text-3xl font-bold">Favorites</h1>
          </div>
          <Link href="/cars" className="text-sm text-slate-300 hover:text-white">← Back to cars</Link>
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
