"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Icons from "lucide-react";
import CreateAndProfile from "./CreateAndProfile";
import { Button } from "./ui/button";
import axios from "axios";

export default function Sidebar({ user, categories, open, setOpen, toggleRef }) {
  const pathname = usePathname();
  const sidebarRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, setOpen, toggleRef]);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };


  const isActive = (href) => pathname === `/${href}`;

  return (

    <aside ref={sidebarRef} className={`flex flex-col justify-between h-[calc(100%-4rem)] blurred-bg fixed top-[3.3rem] left-0  w-64 rounded
         bg-gray-900 shadow-md z-40 transform transition-transform duration-150 ease-in-out border-r border-zinc-800
    ${open ? "translate-x-1" : "-translate-x-full"}`}
    >
      {/* Top - Navigation */}
      <div className="p-4 flex-grow overflow-y-auto ">
        <h2 className="text-xl font-semibold mb-4 text-gray-100">Elements</h2>
        <nav>
          <ul className="space-y-1">
            {categories.map((category) => {
              const Icon = Icons[category.icon] || Icons.Square;
              return (
                <li key={category.name}>
                  <Link
                    href={`/${category.href}`}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${isActive(category.href)
                      ? "bg-violet-600 text-white shadow-sm"
                      : "text-gray-300 hover:bg-gray-800 hover:text-violet-400"
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    {category.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Bottom - Actions & Logout */}
      <div className="p-4 flex items-center gap-4 border-t border-zinc-800">
        <Button
          className="flex-grow bg-red-600 hover:bg-red-700 text-white"
          variant="destructive"
          onClick={handleLogout}
        >
          <Icons.LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
        <CreateAndProfile user={user} />
      </div>
    </aside>
  );

}
