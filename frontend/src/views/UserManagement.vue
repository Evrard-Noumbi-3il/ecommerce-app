<template>
  <div>
    <h1>👥 Admins et Modérateurs</h1>
    <input type="text" v-model="search" placeholder="Rechercher..." />

    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Rôle</th>
          <th>Banni</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredAdmins" :key="user._id">
          <td>{{ user.name }}</td>
          <td>{{ user.role }}</td>
          <td>{{ user.isBan ? 'Oui' : 'Non' }}</td>
          <td>
            <button v-if="!user.isBan" @click="toggleBan(user._id,user.isBan)">{{ user.isBan ? 'Restituer' : '🚫 Bannir' }}</button>
            <button @click="togglePromote(user._id,user.role)">{{ user.role =='admin'?'Destituer': 'Promouvoir'}} </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div>
    <h1>👥 Utilisateurs</h1>
    <input type="text" v-model="search" placeholder="Rechercher..." />

    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Rôle</th>
          <th>Banni</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers" :key="user._id">
          <td>{{ user.name }}</td>
          <td>{{ user.role }}</td>
          <td>{{ user.isBan ? 'Oui' : 'Non' }}</td>
          <td>
            <button @click="toggleBan(user._id,user.isBan)">{{ user.isBan ? 'Restituer' : '🚫 Bannir' }}</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from "@/auth/axios.js"; // adapte le chemin si nécessaire

const search = ref("");
const users = ref([]);
const admins = ref([]);

const fetchAdmins = async () => {
  try {
    const response = await api.get("/admin/users");
    admins.value = response.data?.data || response.data || [];
  } catch (error) {
    console.error("Erreur lors du chargement des utilisateurs :", error);
  }
};

const fetchUsers = async () => {
  try {
    const response = await api.get("/admin/users/users");
    users.value = response.data?.data || response.data || [];
  } catch (error) {
    console.error("Erreur lors du chargement des utilisateurs :", error);
  }
};

const filteredUsers = computed(() => {
  return users.value.filter(u =>
    u.name?.toLowerCase().includes(search.value.toLowerCase())
  );
});

const filteredAdmins = computed(() => {
  return admins.value.filter(u =>
    u.name?.toLowerCase().includes(search.value.toLowerCase())
  );
});

const toggleBan = async (id ,isBan) => {
  const confirmBan = !isBan? window.confirm("Confirmer le bannissement de cet utilisateur ?") : window.confirm("Confirmer le retour de cet utilisateur ?") ;
  if (!confirmBan) return;

  try {
    await api.post(`/admin/users/${id}`);
    await fetchAdmins(); 
    await fetchUsers(); 
  } catch (error) {
    console.error("Erreur lors du bannissement :", error);
  }
};

const togglePromote = async (id, role) => {
  const confirmPromote = role != 'admin' ? window.confirm("Promouvoir cet utilisateur en admin ?"): window.confirm("Destituer cet utilisateur en Moderateur ?");
  if (!confirmPromote) return;

  try {
    await api.put(`/admin/users/${id}`);
    await fetchAdmins(); 
    window.location.reload();
  } catch (error) {
    console.error("Erreur lors de la promotion :", error);
  }
};

onMounted(() => {
  fetchUsers();
  fetchAdmins();
});
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  border-radius: 8px;
  overflow: hidden;
  margin-top: 16px;
}

th, td {
  padding: 12px 16px;
  border-bottom: 1px solid #e2e8f0;
  text-align: left;
}

tr:hover {
  background-color: #f9fafb;
}

button {
  margin-right: 6px;
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: #2563eb;
  color: white;
  transition: background 0.3s;
}

button:hover {
  background: #1d4ed8;
}

input[type="text"] {
  padding: 8px 12px;
  margin-bottom: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  width: 100%;
  max-width: 300px;
}
</style>