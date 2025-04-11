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
      className={`flex items-center gap-1 transition-colors ${
        saved ? "text-blue-400" : "text-zinc-400 hover:text-blue-500"
      }`}
    >
      <Bookmark size={size} fill={saved ? "#60a5fa" : "none"} />
      <span className="text-xs font-semibold">{count}</span>
    </button>
  );
}
