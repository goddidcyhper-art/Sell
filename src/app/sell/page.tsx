"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

const defaultForm = {
  title: "",
  brand: "",
  year: "2024",
  price: "25000",
  mileage: "10000",
  fuel: "Gasoline",
  transmission: "Automatic",
  location: "",
  sellerName: "",
  image: "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1200&q=80",
};

export default function SellPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [form, setForm] = useState(defaultForm);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();

    if (data.url) {
      setForm((prev) => ({ ...prev, image: data.url }));
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const payload = {
      ...form,
      sellerName: form.sellerName || session?.user?.name || "Private Seller",
    };

    const res = await fetch("/api/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || "Failed to create listing");
      return;
    }

    router.push("/cars");
  };

  if (status === "loading") {
    return <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Loading...</main>;
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Sell</p>
            <h1 className="mt-2 text-3xl font-bold">List your vehicle</h1>
          </div>
          <Link href="/" className="text-sm text-slate-300 hover:text-white">← Back home</Link>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm text-slate-300">Car Title</label>
              <input value={form.title} onChange={(e) => updateField("title", e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-white" placeholder="2023 Toyota Camry" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm text-slate-300">Brand</label>
                <input value={form.brand} onChange={(e) => updateField("brand", e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-white" placeholder="Toyota" />
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300">Year</label>
                <input type="number" value={form.year} onChange={(e) => updateField("year", e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-white" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm text-slate-300">Price</label>
                <input type="number" value={form.price} onChange={(e) => updateField("price", e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-white" />
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300">Mileage</label>
                <input type="number" value={form.mileage} onChange={(e) => updateField("mileage", e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-white" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm text-slate-300">Fuel</label>
                <select value={form.fuel} onChange={(e) => updateField("fuel", e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-white">
                  <option>Gasoline</option>
                  <option>Diesel</option>
                  <option>Electric</option>
                  <option>Hybrid</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300">Transmission</label>
                <select value={form.transmission} onChange={(e) => updateField("transmission", e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-white">
                  <option>Automatic</option>
                  <option>Manual</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">Location</label>
              <input value={form.location} onChange={(e) => updateField("location", e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-white" placeholder="Austin, TX" />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">Seller Name</label>
              <input value={form.sellerName} onChange={(e) => updateField("sellerName", e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-white" placeholder="John Doe" />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">Vehicle Image</label>
              <input type="file" accept="image/*" onChange={handleUpload} className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-white" />
              {uploading && <p className="mt-2 text-sm text-blue-300">Uploading image...</p>}
              {form.image && (
                <img src={form.image} alt="Preview" className="mt-4 h-40 w-full rounded-xl object-cover" />
              )}
            </div>

            {message && <p className="text-sm text-red-400">{message}</p>}

            <button type="submit" className="w-full rounded-xl bg-blue-500 px-4 py-3 font-medium text-white hover:bg-blue-400">
              Publish Listing
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
