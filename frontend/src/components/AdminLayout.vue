<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <h2 class="sidebar-title">🛠️ Admin Panel</h2>
      <nav class="nav-links">
        <router-link to="/dashboard">📊 Dashboard</router-link>
        <router-link to="/reported-products">🚩 Produits signalés</router-link>
        <router-link to="/products">🛒 Produits</router-link>
        <router-link to="/orders">📦 Commandes</router-link>
        <router-link to="/ads">📢 Publicités</router-link>
        <router-link to="/notifications">🔔 Notifications</router-link>
        <router-link to="/themes">🎨 Thématiques</router-link>
        <router-link to="/categories">📂 Catégories</router-link>
        <router-link to="/users" v-if="isAdmin">👥 Utilisateurs</router-link>
        <router-link to="/">⬅ Retour au site</router-link>
      </nav>

      <div class="admin-actions">
        <h3>⚙️ Actions rapides</h3>
        <ul>
          <li><button @click="approveAllFlagged">✅ Approuver tous les produits signalés</button></li>
          <li><button @click="removeInactiveUsers">🧹 Supprimer les utilisateurs inactifs</button></li>
          <li><button @click="generateReport">📄 Générer un rapport</button></li>
        </ul>
      </div>
    </aside>

    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const isAdmin = ref(false);
// Simulations d'actions admin (à connecter à tes API plus tard)
const approveAllFlagged = () => {
  console.log("✅ Tous les produits signalés approuvés.");
};

const removeInactiveUsers = () => {
  console.log("🧹 Utilisateurs inactifs supprimés.");
};

const generateReport = () => {
  console.log("📄 Rapport généré.");
};

onMounted(() => {
    const token = localStorage.getItem("token");
  isAdmin.value = token && (JSON.parse(atob(token.split('.')[1])).role === 'admin');
});
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  margin-top: 50px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f8fafc;
}

.sidebar {
  width: 260px;
  background: #0f172a;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar-title {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: bold;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-links a {
  color: white;
  text-decoration: none;
  padding: 10px;
  border-radius: 6px;
  transition: background 0.2s ease-in-out;
}

.nav-links a.router-link-exact-active,
.nav-links a:hover {
  background: #1e40af;
  font-weight: bold;
}

.admin-actions {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.admin-actions h3 {
  font-size: 1rem;
  margin-bottom: 10px;
}

.admin-actions ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.admin-actions li {
  margin-bottom: 10px;
}

.admin-actions button {
  background: #2563eb;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s ease;
}

.admin-actions button:hover {
  background: #1d4ed8;
}

.content {
  flex: 1;
  padding: 30px;
  background: #f1f5f9;
  overflow-y: auto;
}
</style>
