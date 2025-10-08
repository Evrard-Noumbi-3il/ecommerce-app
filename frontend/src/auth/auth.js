
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
  return !!user && user.exp > Date.now() / 1000;
}

export function isAdmin() {
  const user = getUserFromToken();
  return user?.role === "admin";
}