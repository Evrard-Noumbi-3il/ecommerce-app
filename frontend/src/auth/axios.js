import axios from 'axios';
import router from '@/router';

// === Petit bus d’événement global === //
const subscribers = [];
export function onSessionExpired(callback) {
  subscribers.push(callback);
}
function notifySessionExpired() {
  subscribers.forEach(cb => cb());
}

// === Instance Axios === //
const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL || process.env.VUE_APP_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
});

// ✅ Intercepteur de requêtes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🚨 Intercepteur de réponses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error("⚠️ Erreur réseau ou serveur injoignable :", error);
      router.push({ name: "ServerError" });
      return Promise.reject(error);
    }

    const { status } = error.response;

    switch (status) {
      case 400:
        console.warn("❌ Requête invalide :", error.response.data);
        break;

      case 401:
        console.warn("🔒 Token expiré ou non valide !");
        localStorage.removeItem("token");

        // 🔔 Émet un événement global
        notifySessionExpired();

        // Redirige l'utilisateur vers login (ou accueil)
        router.push({ name: "Login" });
        break;

      case 403:
        console.warn("⛔ Accès refusé :", error.response.data);
        router.push({ name: "AccessDenied" });
        break;

      case 404:
        console.warn("🧭 Ressource introuvable :", error.response.data);
        router.push({ name: "NotFound" });
        break;

      case 500:
      default:
        console.error("💥 Erreur serveur :", error.response.data);
        router.push({ name: "ServerError" });
        break;
    }

    return Promise.reject(error);
  }
);

export default api;
