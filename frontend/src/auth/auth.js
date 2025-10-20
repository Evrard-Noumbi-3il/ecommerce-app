
import {jwtDecode} from "jwt-decode";

export function getUserFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch (e) {
    console.error("Token invalide :", e);
    return null;
  }
}

export function isAuthenticated() {
  const user = getUserFromToken();
  if (!user) return false;
  // Vérifie la date d’expiration
  const isExpired = user.exp * 1000 < Date.now();
  return !isExpired;
}

export function isAdmin() {
  const user = getUserFromToken();
  return user?.role === "admin";
}

export function logout() {
  localStorage.removeItem("token");
}