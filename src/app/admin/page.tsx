"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/cars")
      .then(async (res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setCars(data))
      .catch(() => setCars([]))
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id: number, status: string) => {
    await fetch(`/api/admin/cars/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    setCars((prev) => prev.map((car) => (car.id === id ? { ...car, status } : car)));
  };

  if (loading) return <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Loading admin dashboard...</main>;

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Admin</p>
            <h1 className="mt-2 text-3xl font-bold">Dashboard</h1>
          </div>
          <Link href="/" className="text-sm text-slate-300 hover:text-white">← Back home</Link>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-800 text-slate-300">
              <tr>
                <th className="px-4 py-3">Car</th>
                <th className="px-4 py-3">Seller</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car.id} className="border-t border-slate-800">
                  <td className="px-4 py-3">
                    <div className="font-medium">{car.title}</div>
                    <div className="text-slate-400">${car.price.toLocaleString()}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{car.sellerName}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs ${car.status === "approved" ? "bg-emerald-500/20 text-emerald-300" : car.status === "rejected" ? "bg-red-500/20 text-red-300" : "bg-yellow-500/20 text-yellow-300"}`}>
                      {car.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    <button onClick={() => updateStatus(car.id, "approved")} className="rounded-lg bg-emerald-500 px-3 py-1 text-white">Approve</button>
                    <button onClick={() => updateStatus(car.id, "rejected")} className="rounded-lg bg-red-500 px-3 py-1 text-white">Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
