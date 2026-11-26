"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthUserContext = createContext({
  user: null,
  loading: true,
  refreshUser: () => {},
});

export function AuthUserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const response = await fetch("/api/user/profile", {
        cache: "no-store",
      });
      const data = await response.json();
      setUser(response.ok ? data.user || null : null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthUserContext.Provider value={{ user, loading, refreshUser }}>
      {children}
    </AuthUserContext.Provider>
  );
}

export function useAuthUser() {
  return useContext(AuthUserContext);
}
