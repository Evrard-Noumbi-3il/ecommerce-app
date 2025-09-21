<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <h2>Admin Panel</h2>
      <nav>
        <router-link to="dashboard">📊 Dashboard</router-link>
        <router-link to="/reported-products">🚩 Produits signalés</router-link>
        <router-link  to="/users" v-if="!userStore.isAdmin">👥 Utilisateurs</router-link>
        <router-link  to="/categories">📂 Catégories</router-link>
        <router-link to="/">⬅ Retour au site</router-link>
      </nav>
    </aside>

    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
}
.sidebar {
  width: 240px;
  background: #1e293b;
  color: white;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  gap: 12px;
}
.sidebar a {
  color: white;
  text-decoration: none;
  margin: 5px 0;
  display: block;
}
.sidebar a.router-link-active {
  font-weight: bold;
}
.content {
  flex: 1;
  padding: 20px;
  background: #f1f5f9;
}
</style>
