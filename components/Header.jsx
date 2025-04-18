"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from 'next/link';
import { LoaderCircle, Menu, Plus, User, X } from "lucide-react";
import { formatUserName } from "@/lib/Utils/formatName";

const Header = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] =useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  useEffect(() => {
    const fetchProfile = async () => {
  
      try {
        const res = await axios.get("/api/user/profile");
        setUser(res.data.user);
      } catch (err) {
        if (err.response?.status !== 401) {
          console.error("Unexpected error fetching user:", err);
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchProfile();
  }, []);


  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className=" flex flex-col fixed top-1 left-1/2 -translate-x-1/2 z-50 w-full px-1 ">
      <div className=" flex h-14 items-center justify-between px-8 blurred-bg bg-[var(--secondary-bg)] text-[var(--secondary-fg)] rounded-lg">
        {/* Logo and Navigation */}
        <div className="flex items-center w-full gap-20 text-nowrap mr-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="flex items-center gap-3 text-[var(--foreground)] font-bold text-lg tracking-wider">
              <img src="Stole-Ui.png" alt="logo" width={26} />
              Stole UI
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/elements" className="nav-menu-text">
              Elements
            </Link>
            <Link href="/challenges" className="nav-menu-text">
              Challenges
            </Link>
            <Link href="/about" className="nav-menu-text">
              About Us
            </Link>
          </nav>
        </div>

        {/* Actions */}
        <div className="gap-2 hidden md:flex">
          <div className="flex items-center space-x-1">
            <Link href="/add-component" className="btn">
              <Plus className="mr-2 h-4 w-4" />
              <span className="">Create</span>
            </Link>
          </div>

          {/* Conditional rendering for auth state */}
          <div className="flex items-center space-x-1">
            {loading ? (
              // Show a subtle loading state
              <div className="btn opacity-75">
                <span className="animate-spin">
                  <LoaderCircle className="mx-2 h-4 w-4" />
                </span>
              </div>
            ) : user ? (
              // Show user profile when logged in
              <Link
                href={user?.role=='admin' ? "/admin-profile" : "/profile"}
                className="btn hover:bg-opacity-90 transition-colors"
              >
                <User className="mr-2 h-4 w-4" />
                <span>{formatUserName(user?.name)}</span>
              </Link>
            ) : (
              // Show signup button when not logged in
              <Link href="/signup" className="btn">
                <User className="mr-2 h-4 w-4" />
                Signup
              </Link>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center justify-center"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-[var(--foreground)]" />
          ) : (
            <Menu className="h-6 w-6 text-[var(--foreground)]" />
          )}
        </button>
      </div>

      {/* Dropdown menu in mobile view */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full mt-1 py-3 px-4 rounded-lg blurred-bg bg-[var(--secondary-bg)] text-[var(--secondary-fg)] flex flex-col gap-4 shadow-md">
          <nav className=" flex flex-col space-y-3">
            <Link href="/elements" className="nav-menu-text h-10" onClick={() => setMobileMenuOpen(false)}>
              Elements
            </Link>
            <Link href="/challenges" className="nav-menu-text h-10" onClick={() => setMobileMenuOpen(false)}>
              Challenges
            </Link>
            <Link href="/about" className="nav-menu-text h-10" onClick={() => setMobileMenuOpen(false)}>
              About us
            </Link>
          </nav>
          
          <div className="h-px w-full bg-gray-700/30"></div>
          
          <div className="flex flex-col space-y-3">
            <Link href="/add-component" className="btn flex items-center justify-center" onClick={() => setMobileMenuOpen(false)}>
              <Plus className="mr-2 h-4 w-4" />
              <span>Create</span>
            </Link>
            
            {loading ? (
              <div className="btn opacity-75 flex items-center justify-center">
                <span className="animate-spin">
                  <LoaderCircle className="mx-2 h-4 w-4" />
                </span>
              </div>
            ) : user ? (
              <Link
                href="/profile"
                className="btn hover:bg-opacity-90 transition-colors flex items-center justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="mr-2 h-4 w-4" />
                <span>{user?.name}</span>
              </Link>
            ) : (
              <Link href="/signup" className="btn flex items-center justify-center" onClick={() => setMobileMenuOpen(false)}>
                <User className="mr-2 h-4 w-4" />
                Signup
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;