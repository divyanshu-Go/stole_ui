// components/SocialButtons/SaveButton.jsx
"use client";
import { useState } from "react";
import { Bookmark } from "lucide-react";
import { toggleSave } from "@/lib/Utils/socialsFunction";

export default function SaveButton({ elementId, initialSaved, initialCount, size = 16 }) {
  const [saved, setSaved] = useState(initialSaved);
  const [count, setCount] = useState(initialCount);

  const handleSave = async () => {
    try {
      const res = await toggleSave(elementId);
      setSaved(res.saved);
      setCount(res.savesCount);
    } catch (err) {
      console.error("Failed to toggle save", err);
    }
  };

  return (
    <button
      onClick={handleSave}
      className={`flex items-center gap-2 py-1.5 px-3 rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-blue-400 transition-all duration-200 `}
    >
      <Bookmark size={size} fill={saved ? "#60a5fa" : "none"} className={saved ? "text-blue-400" : "text-zinc-400 hover:text-blue-500"}/>
      <span className="text-xs font-semibold">{count}</span>
    </button>
  );
}
