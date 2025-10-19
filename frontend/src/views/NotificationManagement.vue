<template>
  <div class="notifications">
    <h1>🔔 Notifications</h1>

    <div class="form-container">
      <h2>➕ Nouvelle notification</h2>
      <form @submit.prevent="sendNotification">
        <label>Type :</label>
        <select v-model="notification.type" required>
          <option value="info">ℹ️ Info</option>
          <option value="promo">💰 Promo</option>
          <option value="alerte">⚠️ Alerte</option>
        </select>

        <label>Message :</label>
        <textarea v-model="notification.message" required rows="3" />

        <label>Envoyer à (email ou vide pour tous) :</label>
        <input v-model="notification.target" placeholder="ex: user@example.com" />

        <div class="actions">
          <button class="btn submit" type="submit">Envoyer</button>
        </div>
      </form>
    </div>

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
import api from "../auth/axios.js";

const notifications = ref([]);
const notification = ref({
  type: "info",
  message: "",
  target: "",
});

const sendNotification = async () => {
  await api.post("/admin/notifications", notification.value);
  notification.value = { type: "info", message: "", target: "" };
  window.location.reload();
};

const fetchNotifications = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    const data = await api.get("/admin/notifications", {
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
  await api.delete(`/admin/notifications/${id}`);
  fetchNotifications();
};

const formatDate = (iso) => {
  return new Date(iso).toLocaleString("fr-FR");
};

onMounted(fetchNotifications);
</script>

<style scoped>
.notifications {
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fdfdfd;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  font-family: 'Segoe UI', sans-serif;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.form-container {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f5f7fa;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.form-container h2 {
  margin-bottom: 1rem;
  font-size: 1.3rem;
  color: #444;
}

form label {
  display: block;
  margin-top: 1rem;
  font-weight: 600;
  color: #444;
}

form select,
form textarea,
form input {
  width: 100%;
  padding: 0.6rem;
  margin-top: 0.3rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  background: #fff;
}

.actions {
  margin-top: 1.5rem;
  text-align: right;
}

.btn {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn.submit {
  background-color: #007bff;
  color: white;
}

.btn.submit:hover {
  background-color: #0056b3;
}

.btn.delete {
  background-color: #dc3545;
  color: white;
}

.btn.delete:hover {
  background-color: #a71d2a;
}

.empty {
  text-align: center;
  color: #777;
  font-style: italic;
  margin-top: 2rem;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.admin-table th,
.admin-table td {
  padding: 0.8rem;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

.admin-table th {
  background-color: #f0f0f0;
  color: #333;
}

.badge {
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: capitalize;
  color: white;
}

.badge.info {
  background-color: #17a2b8;
}

.badge.promo {
  background-color: #28a745;
}

.badge.alerte {
  background-color: #ffc107;
  color: #333;
}
</style>
