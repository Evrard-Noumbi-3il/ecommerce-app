<template>
  <div class="form-container">
    <h2>➕ Nouvelle publicité</h2>
    <form @submit.prevent="submitAd">
      <label>Titre :</label>
      <input v-model="ad.title" required />

      <label>Image (URL) :</label>
      <input v-model="ad.imageUrl" required />

      <label>Date de début :</label>
      <input type="date" v-model="ad.startDate" required />

      <label>Date de fin :</label>
      <input type="date" v-model="ad.endDate" required />

      <div class="actions">
        <button type="submit" class="btn submit">Créer</button>
        <button type="button" class="btn cancel" @click="$emit('close')">Annuler</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const emit = defineEmits(["close", "refresh"]);

const ad = ref({
  title: "",
  imageUrl: "",
  startDate: "",
  endDate: "",
});

const submitAd = async () => {
  await axios.post("http://localhost:3000/api/admin/ads", ad.value);
  emit("refresh");
  emit("close");
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
  gap: 10px;
}
input {
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
}
.actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}
.btn {
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  border: none;
}
.submit {
  background: #10b981;
  color: white;
}
.cancel {
  background: #9ca3af;
  color: white;
}
</style>
