<template>
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
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const emit = defineEmits(["refresh"]);

const notification = ref({
  type: "info",
  message: "",
  target: "",
});

const sendNotification = async () => {
  await axios.post("http://localhost:3000/api/admin/notifications", notification.value);
  notification.value = { type: "info", message: "", target: "" };
  emit("refresh");
};
</script>

<style scoped>
.form-container {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}
form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
input, select, textarea {
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
}
.actions {
  margin-top: 10px;
}
.btn.submit {
  background: #2563eb;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
}
</style>
