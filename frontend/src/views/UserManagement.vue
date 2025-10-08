<template>
  <div>
    <h1>👥 Utilisateurs</h1>
    <input type="text" v-model="search" placeholder="Rechercher..." />
    <UserTable :users="filteredUsers" @ban="banUser" @promote="promoteUser" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import UserTable from "@/components/UserTable.vue";
import api from "@/auth/axios.js"; // ✅ Ton client Axios avec token

const search = ref("");
const users = ref([]);

// 🔄 Récupération des utilisateurs
const fetchUsers = async () => {
  try {
    const response = await api.get("/admin/users");
    users.value = response.data?.data || response.data || [];
  } catch (error) {
    console.error("Erreur lors du chargement des utilisateurs :", error);
  }
};

// 🔍 Filtrage par nom
const filteredUsers = computed(() => {
  return users.value.filter(u =>
    u.name?.toLowerCase().includes(search.value.toLowerCase())
  );
});

// 🚫 Bannir un utilisateur
const banUser = async (id) => {
  const confirmBan = window.confirm("Confirmer le bannissement de cet utilisateur ?");
  if (!confirmBan) return;

  try {
    await api.delete(`/admin/users/${id}`);
    //users.value = users.value.filter(u => u.id !== id); // ou mettre un flag "banni"
  } catch (error) {
    console.error("Erreur lors du bannissement :", error);
  }
};

// ⬆️ Promouvoir un utilisateur
const promoteUser = async (id) => {
  try {
    const response = await api.put(`/admin/users/${id}/role`);
    // const updatedUser = response.data;
    // const index = users.value.findIndex(u => u.id === id);
    // if (index !== -1) users.value[index].role = updatedUser.role;
  } catch (error) {
    console.error("Erreur lors de la promotion :", error);
  }
};

onMounted(fetchUsers);
</script>
