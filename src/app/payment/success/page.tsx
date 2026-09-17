import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
        <h1 className="text-3xl font-bold">Payment successful</h1>
        <p className="mt-3 text-slate-300">Your deposit has been received. The seller will be notified.</p>
        <Link href="/cars" className="mt-6 inline-block rounded-xl bg-blue-500 px-4 py-2 text-white">
          Continue browsing
        </Link>
      </div>
    </main>
  );
}
