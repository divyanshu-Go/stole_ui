import React from "react";
import { getElementByIdFromDB } from "@/lib/server/element";
import { getApprovedElementsFromDB } from "@/lib/server/element";
import ClientElementViewer from "./ClientElementViewer";

export const revalidate = 300;

export async function generateStaticParams() {
  const elements = await getApprovedElementsFromDB();
  return elements.map((element) => ({
    id: element._id,
  }));
}

export default async function ElementPage({ params }) {
  const resolvedParams = await params;
  const elementId = resolvedParams.id;

  let element;

  try {
    element = await getElementByIdFromDB(elementId);
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

  return <ClientElementViewer element={element} user={null} />;
}
