// hooks/useProfile.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/user/profile');
        setProfile(response.data.user);
      } catch (err) {
        // If we get a 401 error, it means the user is not authenticated
        if (err.response?.status === 401) {
          setProfile(null);
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading, error };
}