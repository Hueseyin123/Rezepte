
// context/AuthProvider.jsx
import React, { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import { message } from "antd";
import { API, BEARER } from "../constant";
import { getToken, removeToken } from "../helpers";

const AuthProvider = ({ children }) => {
  // null = sicher abgemeldet
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLoggedInUser = useCallback(async (token) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/users/me`, {
        headers: { Authorization: `${BEARER} ${token}` },
      });

      if (!response.ok) {
        // z. B. 401 → abmelden
        setUserData(null);
        removeToken?.();
        return;
      }

      const data = await response.json();

      // Optional: minimale Validierung, damit kein „truthy“ Müll durchrutscht
      if (data && typeof data === "object" && data.username) {
        setUserData(data);
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.error(error);
      message.error("Fehler beim Laden des Benutzers.");
      setUserData(null);
      removeToken?.();
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Public setter (z. B. nach erfolgreichem Login)
  const handleUser = useCallback((user) => {
    // Nur valides User-Objekt setzen, sonst null
    if (user && typeof user === "object" && user.username) {
      setUserData(user);
    } else {
      setUserData(null);
    }
  }, []);

  // Logout in den Context integrieren
  const logout = useCallback(() => {
    removeToken?.();
    setUserData(null);
  }, []);

  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchLoggedInUser(token);
    } else {
      setUserData(null);
      setIsLoading(false);
    }
  }, [fetchLoggedInUser]);

  return (
    <AuthContext.Provider value={{ user: userData, setUser: handleUser, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
