<template>
  <div class="form-container">
    <h2>➕ Nouvelle thématique</h2>
    <form @submit.prevent="submitTheme">
      <label>Nom :</label>
      <input v-model="theme.name" required />

      <label>Description :</label>
      <textarea v-model="theme.description" rows="3" required />

      <label>Image (URL) :</label>
      <input v-model="theme.imageUrl" required />

      <div class="actions">
        <button class="btn submit" type="submit">Créer</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const emit = defineEmits(["refresh"]);

const theme = ref({
  name: "",
  description: "",
  imageUrl: "",
  active: true,
});

const submitTheme = async () => {
  await axios.post("http://localhost:3000/api/admin/themes", theme.value);
  emit("refresh");
  theme.value = { name: "", description: "", imageUrl: "", active: true };
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
input, textarea {
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
}
.actions {
  margin-top: 10px;
}
.btn.submit {
  background: #10b981;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
}
</style>
