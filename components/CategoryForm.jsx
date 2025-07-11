"use client";

import { useState } from "react";
import Button from "./Button";

export default function CategoryForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "",
    href: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const res = await fetch("/api/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    if (res.ok) {
      setMessage("Category created successfully!");
      setFormData({ name: "", description: "", icon: "", href: "" });
    } else {
      setMessage(result.message || "Failed to create category.");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto my-16 max-w-[800px] w-full p-6 rounded-xl border border-border bg-white/5 backdrop-blur text-white space-y-4"
    >
      <h2 className="text-xl font-semibold text-indigo-400">Create New Category</h2>

      <div>
        <label htmlFor="name" className="block text-sm mb-1">
          Category Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="e.g. Button"
          className="w-full p-2 rounded-md bg-black border border-zinc-700 focus:outline-none focus:border-violet-500"
        />
        <p className="text-xs text-zinc-400 mt-1">Unique name of the category (e.g., Card, Button)</p>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={2}
          placeholder="Short description of what this category is about"
          className="w-full p-2 rounded-md bg-black border border-zinc-700 focus:outline-none focus:border-violet-500"
        />
        <p className="text-xs text-zinc-400 mt-1">Helps users understand what kind of components belong here.</p>
      </div>

      <div>
        <label htmlFor="icon" className="block text-sm mb-1">
          Lucide Icon Name
        </label>
        <input
          type="text"
          name="icon"
          value={formData.icon}
          onChange={handleChange}
          required
          placeholder="e.g. Square, MousePointer"
          className="w-full p-2 rounded-md bg-black border border-zinc-700 focus:outline-none focus:border-violet-500"
        />
        <p className="text-xs text-zinc-400 mt-1">Icon name from lucide-react (case-sensitive).</p>
      </div>

      <div>
        <label htmlFor="href" className="block text-sm mb-1">
          Href (URL)
        </label>
        <input
          type="text"
          name="href"
          value={formData.href}
          onChange={handleChange}
          required
          placeholder="e.g. https://style-ui.com/components/button"
          className="w-full p-2 rounded-md bg-black border border-zinc-700 focus:outline-none focus:border-violet-500"
        />
        <p className="text-xs text-zinc-400 mt-1">This is the link where the category points to.</p>
      </div>

      <Button
        type="submit"
        isLoading={loading}
        loadingText="Creating..."
        text="Create Category"
      />
      {message && (
        <p className="text-sm text-center mt-2 text-violet-300">{message}</p>
      )}
    </form>
  );
}
