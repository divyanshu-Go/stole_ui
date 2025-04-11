// components/CommentsSection.jsx
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Trash, Trash2 } from "lucide-react";
import LoadingScreen from "./LoadingScreen";
import { format } from "date-fns";

export default function CommentsSection({ elementId, user }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/element/${elementId}/comments`);
        // const data = await res.json();
        setComments(res.data.comments || []);
      } catch (err) {
        console.error("Error fetching comments", err);
        toast.error("Failed to load comments");
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [elementId]);

  

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!user) return toast.error("You need to login to comment");
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await axios.post(`/api/element/${elementId}/comments`, {
        text: newComment,
      });

      setComments((prev) => [...prev, res.data.comment]);
      setNewComment("");
      toast.success("Comment posted");
    } catch (err) {
      console.error("Failed to post comment", err);
      toast.error("Comment submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`/api/element/${elementId}/comments/${commentId}`);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
      toast.success("Comment deleted");
    } catch (err) {
      console.error("Failed to delete comment", err);
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="mt-8 flex flex-col gap-6 border-t border-zinc-800 pt-6">
      <h2 className="text-xl font-semibold text-zinc-300">Comments</h2>

      {user ? (
        <form onSubmit={handleSubmit} className="space-y-1">
          <textarea
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            rows={2}
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || !newComment.trim()}
              className="px-4 py-1 bg-indigo-600 hover:bg-indigo-700 rounded-md text-sm font-medium text-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-center">
          <p className="text-sm text-zinc-400">
            Please log in to join the conversation
          </p>
        </div>
      )}

      {loading ? (
        <LoadingScreen message="Loading Comments" />
      ) : comments.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 text-center">
          <p className="text-zinc-400">Be the first to comment</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {comments.map((comment) =>
              comment && (
                <li
                  key={comment._id}
                  className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 transition-all hover:border-zinc-700"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-1">
                        <span className="text-xs font-medium text-zinc-500">
                          by {comment.author?.name}
                        </span>
                        <span className="text-xs text-zinc-500">
                          on {format(new Date(comment.createdAt), "MMMM dd, yyyy")}
                        </span>
                      </div>
                      <p className="text-stone-300 text-sm font-medium break-words max-h-48 overflow-y-auto">{comment.text}</p>
                    </div>
                    {(user?._id === comment.author._id ||
                      user?.role === "admin") && (
                      <button
                        onClick={() => handleDelete(comment._id)}
                        className="text-zinc-500 hover:text-red-400 transition-colors"
                        aria-label="Delete comment"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </li>
              )
          )}
        </ul>
      )}
    </div>
  );
}
