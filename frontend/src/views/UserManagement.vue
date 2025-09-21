<template>
  <div>
    <h1>👥 Gestion des utilisateurs</h1>

    <table class="table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Email</th>
          <th>Rôle</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="u in users" :key="u._id">
          <td>{{ u.nom }} {{ u.prenom }}</td>
          <td>{{ u.email }}</td>
          <td>
            <select v-model="u.role" @change="updateRole(u._id, u.role)">
              <option value="user">Utilisateur</option>
              <option value="moderator">Modérateur</option>
              <option value="admin">Admin</option>
            </select>
          </td>
          <td>
            <button class="btn delete" @click="deleteUser(u._id)">❌ Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const users = ref([]);

const fetchUsers = async () => {
  const { data } = await axios.get("http://localhost:3000/api/admin/users");
  users.value = data;
};

const updateRole = async (id, role) => {
  await axios.put(`http://localhost:3000/api/admin/users/${id}`, { role });
};

const deleteUser = async (id) => {
  await axios.delete(`http://localhost:3000/api/admin/users/${id}`);
  fetchUsers();
};

onMounted(fetchUsers);
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
.table th, .table td {
  border: 1px solid #ccc;
  padding: 10px;
}
.delete {
  background: #dc2626;
  color: white;
  padding: 6px 12px;
  border: none;
  cursor: pointer;
}
</style>
