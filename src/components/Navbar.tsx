"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2 text-xl font-bold">
        <span className="text-blue-400">AutoMarket</span>
      </Link>

      <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
        <Link href="/cars">Browse cars</Link>
        <Link href="/sell">Sell your car</Link>
        <Link href="/favorites">Favorites</Link>
        {session?.user?.role === "admin" && <Link href="/admin">Admin</Link>}
      </div>

      <div className="flex items-center gap-3">
        {!session ? (
          <>
            <Link href="/login" className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200">
              Login
            </Link>
            <Link href="/register" className="rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-400">
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="text-sm text-slate-300">{session.user?.name}</span>
            <button onClick={() => signOut()} className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
