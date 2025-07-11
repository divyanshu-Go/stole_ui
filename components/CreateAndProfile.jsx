// components/NavActions.jsx
"use client";

import Link from "next/link";
import { Plus, User2 } from "lucide-react";
import Tooltip from "./Tooltip";

export default function CreateAndProfile({ user }) {
  return (
    <div className="gap-4 flex">
      {/* ➕ Plus icon */}
      <div className="flex items-center gradient-glow-button">
        <Tooltip text={!user ? "Login to contribute" : "Contribute"}>
          <Link href="/add-component" className="">
            <Plus className="h-4 w-4 stroke-[3] text-black " />
          </Link>
        </Tooltip>
      </div>

      {/* 👤 User2 icon */}
      <div className="flex items-center nav-btn">
        <Tooltip text={user ? "Profile" : "Login"}>
          <Link
            href={
              user
                ? user.role === "admin"
                  ? "/admin-profile"
                  : "/profile"
                : "/login"
            }
          >
            <User2 className="h-4" />
          </Link>
        </Tooltip>
      </div>
    </div>
  );
}
