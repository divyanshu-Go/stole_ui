// app/elements/page.jsx
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryRow from './components/CategoryRow';

const CATEGORIES = [
  "Button", "Card", "Loader", "Switch", "Form", "Pattern", "Other"
]
export default function ElementsPage() {
  const [elements, setElements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchElements = async () => {
      try {
        const response = await axios.get('/api/element');
        // Filter only approved elements
        const approvedElements = response.data.components.filter(
          el => el.status === 'pending'
        );
        setElements(approvedElements);
      } catch (err) {
        setError('Failed to load elements');
        console.error('Error fetching elements:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchElements();
  }, []);

  // Group elements by category
  const elementsByCategory = CATEGORIES.reduce((acc, category) => {
    acc[category] = elements.filter(el => el.category === category);
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
    <div className="min-h-screen bg-zinc-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">UI Elements</h1>
        
        {CATEGORIES.map(category => (
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