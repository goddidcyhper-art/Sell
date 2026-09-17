"use client";

import Link from "next/link";
import { MapPin, Gauge, Fuel, CalendarRange, Heart } from "lucide-react";

type CarCardProps = {
  car: {
    id: number;
    title: string;
    brand: string;
    year: number;
    price: number;
    mileage: number;
    fuel: string;
    transmission: string;
    location: string;
    image: string;
    featured?: boolean;
    status?: string;
  };
  isFavorite?: boolean;
  onToggleFavorite?: (id: number) => void;
};

export function CarCard({
  car,
  isFavorite = false,
  onToggleFavorite,
}: CarCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition hover:-translate-y-1 hover:border-blue-400/60">
      {onToggleFavorite && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite(car.id);
          }}
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-950/80 backdrop-blur"
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-slate-200"}`} />
        </button>
      )}

      <Link href={`/cars/${car.id}`} className="block">
        <div className="overflow-hidden">
          <img src={car.image} alt={car.title} className="h-56 w-full object-cover transition duration-300 group-hover:scale-105" />
        </div>

        <div className="p-4">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-slate-400">{car.brand}</p>
              <h3 className="mt-1 text-xl font-semibold text-white">{car.title}</h3>
            </div>
            <div className="rounded-full bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-300">
              {car.featured ? "Featured" : "New"}
            </div>
          </div>

          <div className="mb-4 flex items-center gap-2 text-sm text-slate-400">
            <MapPin className="h-4 w-4" />
            {car.location}
          </div>

          <div className="mb-4 grid grid-cols-2 gap-3 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-slate-400" />
              {car.mileage.toLocaleString()} mi
            </div>
            <div className="flex items-center gap-2">
              <CalendarRange className="h-4 w-4 text-slate-400" />
              {car.year}
            </div>
            <div className="flex items-center gap-2 col-span-2">
              <Fuel className="h-4 w-4 text-slate-400" />
              {car.fuel} • {car.transmission}
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm text-slate-400">Price</p>
              <p className="text-2xl font-bold text-white">${car.price.toLocaleString()}</p>
            </div>

            <div className="rounded-full border border-slate-700 px-3 py-2 text-sm text-slate-200">
              View details
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
