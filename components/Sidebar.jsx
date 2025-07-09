"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Icons from "lucide-react";

export default function Sidebar({ categories, open, setOpen, toggleRef }) {
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

  const isActive = (href) => pathname === `/${href}`;

  return (
    <aside
      ref={sidebarRef}
      className={`blurred-bg fixed top-14 left-0 h-[calc(100%-4rem)] w-64 rounded bg-gray-900 shadow-md z-40 transform transition-transform duration-300 ease-in-out border-r border-gray-800
      ${open ? "translate-x-1" : "-translate-x-full"}`}
    >
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-100">Elements</h2>
        <nav>
          <ul className="space-y-1">
            {categories.map((category) => {
              const Icon = Icons[category.icon] || Icons.Square;
              return (
                <li key={category.name}>
                  <Link
                    href={`/${category.href}`}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isActive(category.href)
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
    </aside>
  );
}
