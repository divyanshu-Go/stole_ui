'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import ElementCard from '@/app/elements/components/ElementCard';

// This component displays all elements for a specific category
export default function CategoryPage() {
  // Get the category parameter from the URL using Next.js routing
  const params = useParams();
  const category = params.category;
  console.log(category);
  // State management for elements, loading state, and errors
  const [elements, setElements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch elements when the component mounts or category changes
  useEffect(() => {
    const fetchCategoryElements = async () => {
      try {
        setLoading(true);
        
        // Fetch all elements and filter by category
        const response = await axios.get('/api/element');
        const Category = category.charAt(0).toUpperCase() + category.slice(1);
        // Filter elements by category and approved status
        const categoryElements = response.data.components.filter(
          el => el.category === Category && el.status === 'pending'
        );
        
        setElements(categoryElements);
        setError(null);
      } catch (err) {
        setError('Failed to load elements for this category');
        console.error('Error fetching category elements:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryElements();
  }, [category]); // Re-fetch when category changes

  // Loading state display
  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        <div className="animate-pulse">Loading {category} elements...</div>
      </div>
    );
  }

  // Error state display
  if (error) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

  // Empty state display
  if (elements.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-white mb-8 capitalize">
            {category} Elements
          </h1>
          <p className="text-zinc-400">
            No elements found in this category. Check back later!
          </p>
        </div>
      </div>
    );
  }

  // Main content display
  return (
    <div className="min-h-screen bg-zinc-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8 capitalize">
          {category} Elements
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {elements.map(element => (
            <ElementCard key={element._id} element={element} />
          ))}
        </div>
      </div>
    </div>
  );
}