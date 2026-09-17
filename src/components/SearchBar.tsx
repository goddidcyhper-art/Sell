import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <form className="flex w-full max-w-xl items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900/80 p-3 shadow-lg shadow-slate-950/50">
      <div className="flex flex-1 items-center gap-2 rounded-xl bg-slate-800 px-3 py-2">
        <Search className="h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search by make, model, or keyword"
          className="w-full bg-transparent text-sm text-white placeholder:text-slate-400 focus:outline-none"
        />
      </div>
      <button type="submit" className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-400">
        Search
      </button>
    </form>
  );
}
