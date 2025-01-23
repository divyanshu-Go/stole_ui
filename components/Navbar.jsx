"use client";

import { doLogin } from "@/app/actions";
import Link from "next/link";

export default function Navbar() {


  return (
    <header className="px-5 py-3 bg-gray-400 shadow-sm">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <img />
        </Link>

        <div className="flex items-center gap-5">
          
            <form action={doLogin}>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded" type='submit' name="action" value="github">
              Login with GitHub
            </button>

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded" type='submit' name="action" value="google">
              Login with Google
            </button>
            </form>
          
        </div>
      </nav>
    </header>
  );
}
