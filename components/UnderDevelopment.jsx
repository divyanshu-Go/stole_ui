// components/UnderDevelopment.jsx
import { Construction } from "lucide-react";
import Link from "next/link";

const UnderDevelopment = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)] px-4 text-center">
      <Construction className="w-12 h-12 mb-4 text-yellow-500" />
      <h1 className="text-2xl font-semibold mb-2">Page Under Development</h1>
      <p className="text-zinc-400 max-w-md mb-6">
        This page is currently being crafted with care. We’re working hard to bring this feature to life. Stay tuned!
      </p>

      <Link href="/">
        <span className="inline-block px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded text-sm text-white transition">
          Back to Home
        </span>
      </Link>
    </div>
  );
};

export default UnderDevelopment;
