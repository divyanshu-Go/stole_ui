import { useState, useEffect } from 'react';
import axios from 'axios';

export function useElement(elementId) {
  const [element, setElement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!elementId) return;

    const fetchElement = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/element/${elementId}`);
        setElement(response.data.data);
        setError(null);
      } catch (err) {
        setError('Failed to load element data');
        console.error('Error fetching element:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchElement();
  }, [elementId]);

  // Return setElement along with element, loading, and error
  return { element, setElement, loading, error };
}
