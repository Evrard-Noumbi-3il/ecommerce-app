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

const search = ref("");
const users = ref([]);


const fetchUsers = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/admin/users");
    if (!response.ok) throw new Error("Failed to fetch users");
    users.value = await response.json();
  } catch (error) {
    console.error(error);
  }
};
const filteredUsers = computed(() => {
  return users.value.filter(u =>
    u.name.toLowerCase().includes(search.value.toLowerCase())
  );
});

const banUser = async (id) => {
  const confirmBan = window.confirm('Confirmer le bannissement de cet utilisateur ?');
  if (!confirmBan) return;

  try {
    const response = await fetch(`http://localhost:3000/api/admin/users/${id}/ban`, {
      method: 'PATCH'
    });
    if (!response.ok) throw new Error('Erreur bannissement');

    users.value = users.value.filter(u => u.id !== id); // ou mettre un statut "banni"
  } catch (error) {
    console.error('Erreur lors du bannissement:', error);
  }
};

const promoteUser = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/admin/users/${id}/promote`, {
      method: 'PATCH'
    });
    if (!response.ok) throw new Error('Erreur promotion');

    const updatedUser = await response.json();
    const index = users.value.findIndex(u => u.id === id);
    if (index !== -1) users.value[index].role = updatedUser.role;
  } catch (error) {
    console.error('Erreur lors de la promotion:', error);
  }
};


onMounted(fetchUsers);
</script>
