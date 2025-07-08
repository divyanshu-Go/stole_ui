import React from "react";
import EditElementClient from "./EditElementClient";
import { getElementById } from "@/lib/api";


// ✅ Server component
export default async function EditElementPage({ params }) {
  const elementId = params.id;

  let element;
  try {
    element = await getElementById(elementId);
  } catch (error) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        <div className="text-red-400">Error: {error.message}</div>
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

  return <EditElementClient initialElement={element} elementId={elementId} />;
}
