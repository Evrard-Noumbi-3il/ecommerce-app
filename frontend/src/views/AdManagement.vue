<template>
  <div class="ads">
    <h1>📢 Publicités</h1>

    <button class="btn add-btn" @click="showAddForm = true">➕ Ajouter une publicité</button>

    <AdForm v-if="showAddForm" @close="showAddForm = false" @refresh="fetchAds" />

    <div v-if="ads.length === 0" class="empty">Aucune publicité actuellement.</div>

    <table class="admin-table" v-else>
      <thead>
        <tr>
          <th>Titre</th>
          <th>Image</th>
          <th>Période</th>
          <th>Statut</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ad in ads" :key="ad._id">
          <td>{{ ad.title }}</td>
          <td><img :src="ad.imageUrl" alt="pub" class="thumb" /></td>
          <td>{{ formatPeriod(ad.startDate, ad.endDate) }}</td>
          <td><span :class="['status', getStatus(ad)]">{{ getStatus(ad) }}</span></td>
          <td>
            <button class="btn edit" @click="editAd(ad)">✏️</button>
            <button class="btn delete" @click="deleteAd(ad._id)">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import AdForm from "@/components/AdForm.vue";

const ads = ref([]);
const showAddForm = ref(false);
const fetchAds = async () => {
  const { data } = await axios.get("http://localhost:3000/api/admin/ads");
  ads.value = data;
};

const formatPeriod = (start, end) => {
  return `${new Date(start).toLocaleDateString()} → ${new Date(end).toLocaleDateString()}`;
};

const getStatus = (ad) => {
  const now = new Date();
  const start = new Date(ad.startDate);
  const end = new Date(ad.endDate);
  if (now < start) return "programmée";
  if (now > end) return "expirée";
  return "active";
};

const editAd = (ad) => {
  alert("TODO: ouvrir l'éditeur de pub pour " + ad.title);
};

const deleteAd = async (id) => {
  await axios.delete(`http://localhost:3000/api/admin/ads/${id}`);
  fetchAds();
};

onMounted(fetchAds);
</script>

<style scoped>
.ads {
  padding: 20px;
}
h1 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #1e293b;
}
.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}
.add-btn {
  background: #10b981;
  color: white;
  margin-bottom: 15px;
}
.edit {
  background: #3b82f6;
  color: white;
}
.delete {
  background: #ef4444;
  color: white;
  margin-left: 5px;
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
}
.status.active {
  background: #4ade80;
  color: #064e3b;
}
.status.programmée {
  background: #facc15;
  color: #78350f;
}
.status.expirée {
  background: #f87171;
  color: #7f1d1d;
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
.empty {
  background: #fef3c7;
  padding: 15px;
  border-radius: 6px;
  text-align: center;
  color: #92400e;
}
</style>
