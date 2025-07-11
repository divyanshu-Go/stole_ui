"use client";
import { useState } from "react";
import LikeButton from "./SocialButtons/LikeButton";
import SaveButton from "./SocialButtons/SaveButton";
import { toast } from "sonner";
import { Bookmark, Heart, Link as LinkIcon, Check, Share2, MessageSquare } from "lucide-react";

export default function LikeSaveActions({ element, user }) {
  const [copied, setCopied] = useState(false);

  if (!element) return null;

  const { _id, likes = [], saves = [], comments = [] } = element;
  const userId = user?._id;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.href}`);
      setCopied(true);
      toast.success("Link copied to clipboard!");

      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="bg-zinc-900 rounded-lg border border-zinc-800 shadow-lg p-3 flex items-center justify-between ">
      {/* Left side - Share section */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center gap-2 py-2 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-md transition-all duration-200 text-sm group"
          aria-label="Copy link to clipboard"
        >
          {copied ? (
            <>
              <Check size={16} className="text-green-400" />
              <span className="text-green-400">Copied</span>
            </>
          ) : (
            <>
              <Share2 size={16} className="group-hover:text-violet-400" />
              <span className="group-hover:text-violet-400 ">Share</span>
            </>
          )}
        </button>
      </div>

      {/* Right side - Engagement metrics */}
      <div className="flex items-center gap-5 px-2">
        {/* Like button */}
        <div className="relative">
          {user ? (
            <LikeButton
              elementId={_id}
              initialLiked={likes.includes(userId)}
              initialCount={likes.length}
              size={20}
            />
          ) : (
            <button
              onClick={() => toast.info("Log in to like this component.")}
              className="flex items-center gap-2 py-1.5 px-3 rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-red-400 transition-all duration-200"
              aria-label="Like this component"
            >
              <Heart size={20} />
              <span className="text-xs font-medium">{likes.length}</span>
            </button>
          )}
        </div>

        {/* Save button */}
        <div className="relative">
          {user ? (
            <SaveButton
              elementId={_id}
              initialSaved={saves.includes(userId)}
              initialCount={saves.length}
              size={20}
            />
          ) : (
            <button
              onClick={() => toast.info("Log in to save this component.")}
              className="flex items-center gap-2 py-1.5 px-3 rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-blue-400 transition-all duration-200"
              aria-label="Save this component"
            >
              <Bookmark size={20} />
              <span className="text-xs font-medium">{saves.length}</span>
            </button>
          )}
        </div>

          {/* Save button */}
        <div className="relative">
        <button className="flex items-center gap-2 py-1.5 px-3 rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 transition-all duration-200 hover:text-green-400 ">
          <MessageSquare size={20}  />
          <span className="text-xs font-semibold">{comments.length}</span>
        </button>
        </div>
      </div>
    </div>
  );
}
