import { Loader2 } from "lucide-react";

export default function Button({ text, loadingText, isLoading, ...props }) {
  return (
    <button
      {...props}
      disabled={isLoading}
      className="px-6 py-2 font-semibold text-lg tracking-wide w-full rounded-lg border-[3px] border-transparent
                 hover:border-indigo-400 bg-indigo-600 text-zinc-200 hover:bg-indigo-700 active:bg-violet-700
                 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <span className="flex justify-center items-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin" /> {loadingText || "Loading..."}
        </span>
      ) : (
        text
      )}
    </button>
  );
}
