import Link from "next/link";

export default function UnauthorizedPage() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white px-4">
        <div className="max-w-md text-center">
          <h1 className="text-5xl font-bold text-red-500 mb-4">403</h1>
          <h2 className="text-2xl font-semibold mb-2">Unauthorized Access</h2>
          <p className="text-zinc-400 mb-6">
            You do not have permission to view this page.
          </p>
          <Link
            href="/"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-xl transition"
          >
            Go back to Home
          </Link>
        </div>
      </div>
    );
  }
  