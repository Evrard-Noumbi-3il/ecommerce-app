<template>
  <div class="themes">
    <h1>🎨 Thématiques</h1>

    <ThemeForm @refresh="fetchThemes" />

    <div v-if="themes.length === 0" class="empty">
      Aucune thématique pour le moment.
    </div>

    <table class="admin-table" v-else>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Description</th>
          <th>Image</th>
          <th>Statut</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="theme in themes" :key="theme._id">
          <td>{{ theme.name }}</td>
          <td>{{ theme.description }}</td>
          <td><img :src="theme.imageUrl" class="thumb" /></td>
          <td>
            <span :class="['status', theme.active ? 'active' : 'inactive']">
              {{ theme.active ? 'Active' : 'Inactive' }}
            </span>
          </td>
          <td>
            <button class="btn toggle" @click="toggleStatus(theme)">🔄</button>
            <button class="btn delete" @click="deleteTheme(theme._id)">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import ThemeForm from "@/components/ThemeForm.vue";

const themes = ref([]);

const fetchThemes = async () => {
  const { data } = await axios.get("http://localhost:3000/api/admin/themes");
  themes.value = data;
};

const toggleStatus = async (theme) => {
  await axios.put(`http://localhost:3000/api/admin/themes/${theme._id}/status`, {
    active: !theme.active,
  });
  fetchThemes();
};

const deleteTheme = async (id) => {
  await axios.delete(`http://localhost:3000/api/admin/themes/${id}`);
  fetchThemes();
};

onMounted(fetchThemes);
</script>

<style scoped>
.themes {
  padding: 20px;
}
h1 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #1e293b;
}
.empty {
  background: #fef3c7;
  padding: 15px;
  border-radius: 6px;
  text-align: center;
  color: #92400e;
}
.admin-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.admin-table th,
.admin-table td {
  padding: 14px;
  border-bottom: 1px solid #e2e8f0;
  text-align: left;
}
.admin-table th {
  background: #f1f5f9;
  font-weight: 600;
  color: #334155;
}
.thumb {
  width: 60px;
  height: auto;
  border-radius: 4px;
}
.status {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.85rem;
  text-transform: capitalize;
  color: white;
}
.status.active {
  background: #10b981;
}
.status.inactive {
  background: #9ca3af;
}
.btn {
  padding: 6px 10px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  border: none;
}
.btn.toggle {
  background: #3b82f6;
  color: white;
}
.btn.delete {
  background: #ef4444;
  color: white;
  margin-left: 5px;
}
</style>
