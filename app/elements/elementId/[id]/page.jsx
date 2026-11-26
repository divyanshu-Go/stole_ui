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

export async function generateMetadata({ params }) {
  const { id } = await params;
  const element = await getElementByIdFromDB(id);

  if (!element) {
    return {
      title: "UI Component Not Found",
      robots: { index: false, follow: false },
    };
  }

  const title = element.title || "Free CSS UI Component";
  const description =
    element.description ||
    `Preview and get the code for this free ${element.category || "CSS"} UI component on Stole UI.`;
  const canonical = `/elements/elementId/${id}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
    },
  };
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
