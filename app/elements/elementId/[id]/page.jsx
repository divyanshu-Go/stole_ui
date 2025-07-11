import React from "react";
import { getElementById, getUserProfile } from "@/lib/api";
import ClientElementViewer from "./ClientElementViewer";

export default async function ElementPage({ params }) {
  const elementId = params.id;

  let element;
  let user;

  try {
    element = await getElementById(elementId);
    user = await getUserProfile();
  } catch (error) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        <div className="text-red-400">Failed to load element or user: {error.message}</div>
      </div>
    );
  }

  if (!element) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        <div className="text-red-400">Element not found.</div>
      </div>
    );
  }

  return <ClientElementViewer element={element} user={user} />;
}
