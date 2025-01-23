"use client";

import { Github, Plus } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="blurred-bg bg-[var(--secondary-bg)] text-[var(--secondary-fg)] rounded-lg sticky top-2 z-50 w-full ">
      <div className=" flex h-14 items-center justify-between px-8">
        {/* Logo and Navigation */}
        <div className=" flex items-end gap-20 text-nowrap">
          <Link href="/" className="flex items-center space-x-2">
            <span className="flex items-center gap-2 text-[var(--foreground)] font-bold text-lg tracking-wider">
              <img src="D_logo_dark_mode.png" alt="logo" width={24} />
              Stole UI
            </span>
          </Link>

          <nav className=" hidden md:flex items-center space-x-5">
            <Link href="/elements" className="nav-menu-text">
              Elements
            </Link>
            <Link href="/challenges" className="nav-menu-text">
              Challenges
            </Link>
            <Link href="/blog" className="nav-menu-text">
              Blog
            </Link>
          </nav>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <div className=" flex items-center space-x-1">
            <Link href="/create" className="btn">
              <Plus className="mr-2 h-4 w-4" />
              Create
            </Link>
          </div>

          <div className=" flex items-center space-x-1">
            <Link href="/signup" className="btn">
              <Github className="mr-2 h-4 w-4" />
              Signup
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
