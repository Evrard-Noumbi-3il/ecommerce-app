<template>
  <div class="notifications">
    <h1>🔔 Notifications</h1>

    <NotificationForm @refresh="fetchNotifications" />

    <div v-if="notifications.length === 0" class="empty">
      Aucune notification envoyée.
    </div>

    <table class="admin-table" v-else>
      <thead>
        <tr>
          <th>Type</th>
          <th>Message</th>
          <th>Envoyée à</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="notif in notifications" :key="notif._id">
          <td><span :class="['badge', notif.type]">{{ notif.type }}</span></td>
          <td>{{ notif.message }}</td>
          <td>{{ notif.target || 'Tous les utilisateurs' }}</td>
          <td>{{ formatDate(notif.createdAt) }}</td>
          <td>
            <button class="btn delete" @click="deleteNotification(notif._id)">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import NotificationForm from "@/components/NotificationForm.vue";

const notifications = ref([]);

const fetchNotifications = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    const data = await axios.get("http://localhost:3000/api/admin/notifications", {
      headers: { Authorization: `Bearer ${token}` },
    });
  const notificationData = data.data?.data || data.data || []

  notifications.value = Array.isArray(notificationData) ? notificationData : [notificationData];
  console.log("Notifications récupérées :", notifications.value);
  } catch (error) {
    console.error("Erreur lors de la récupération des notifications :", error);
  }

};

const deleteNotification = async (id) => {
  await axios.delete(`http://localhost:3000/api/admin/notifications/${id}`);
  fetchNotifications();
};

const formatDate = (iso) => {
  return new Date(iso).toLocaleString("fr-FR");
};

onMounted(fetchNotifications);
</script>

<style scoped>
.notifications {
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
.btn.delete {
  background: #ef4444;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.badge {
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: capitalize;
  color: white;
}
.badge.info {
  background: #3b82f6;
}
.badge.promo {
  background: #10b981;
}
.badge.alerte {
  background: #ef4444;
}
</style>
