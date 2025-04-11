// components/SocialButtons/LikeButton.jsx

"use client";
import { useState } from "react";
import { toggleLike } from "@/lib/Utils/socialsFunction";
import { Heart } from "lucide-react";

export default function LikeButton({ elementId, initialLiked, initialCount, size = 16 }) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);

  const handleLike = async () => {
    try {
      const res = await toggleLike(elementId);
      setLiked(res.liked);
      setCount(res.likesCount);
    } catch (err) {
      console.error("Failed to toggle like", err);
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`flex items-center gap-1 transition-colors ${
        liked ? "text-red-400" : "text-zinc-400 hover:text-red-500"
      }`}
    >
      <Heart size={size} fill={liked ? "#fa5050" : "none"} />
      <span className="text-xs font-semibold">{count}</span>
    </button>
  );
}

