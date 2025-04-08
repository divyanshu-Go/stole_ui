"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import CategoryRow from "./components/CategoryRow";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CATEGORIES = [
  "Button",
  "Card",
  "Loader",
  "Switch",
  "Form",
  "Pattern",
  "Other",
];

export default function ElementsPage() {
  const [elements, setElements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchElements = async () => {
      try {
        const response = await axios.get("/api/element");
        const approvedElements = response.data.components.filter(
          (el) => el.status === "pending"
        );
        setElements(approvedElements);
      } catch (err) {
        setError("Failed to load elements");
        console.error("Error fetching elements:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchElements();
  }, []);

  const elementsByCategory = CATEGORIES.reduce((acc, category) => {
    acc[category] = elements.filter((el) => el.category === category);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        <div className="animate-pulse">Loading elements...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-white">
      <div className="container mx-auto space-y-16">
        <CardHeader>
          <CardTitle className="text-4xl m-0 text-slate-300 font-bold capitalize ">
            Explore UI Elements{" "}
          </CardTitle>
          <CardDescription className="card-text-xl m-0 text-slate-400 ">
            Discover open-source CSS UI components organized by categories.
            These elements are ready to use and fully customizable.
          </CardDescription>
        </CardHeader>

        {CATEGORIES.map((category) => (
          <CategoryRow
            key={category}
            category={category}
            elements={elementsByCategory[category] || []}
          />
        ))}
      </div>
    </div>
  );
}
