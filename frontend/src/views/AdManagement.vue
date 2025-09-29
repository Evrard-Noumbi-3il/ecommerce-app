<template>
  <div class="ad-container">
    <h1>Gestion des publicités</h1>

    <form @submit.prevent="addPub">
      <input v-model="formData.titre" placeholder="Titre" required />
      <input type="text" v-model="formData.information" placeholder="Information" required />
      <input type="file" @change="handleFileUpload" />
      <button type="submit">Ajouter</button>
    </form>

    <hr />

    <ul>
      <li v-for="pub in publicites" :key="pub._id">
        <img v-if="pub.image" :src="pub.image" width="50" />
        <strong>{{ pub.titre }}</strong> - {{ pub.information }}
        <button @click="deletePub(pub._id)">🗑 Supprimer</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const API_BASE = "http://localhost:3000/api/admin";

const publicites = ref([]);
const formData = ref({ titre: "", information: "", image: null });

const fetchPubs = async () => {
  const { data } = await axios.get(`${API_BASE}/publicites`);
  publicites.value = data;
};

const addPub = async () => {
  const form = new FormData();
  form.append("titre", formData.value.titre);
  form.append("information", formData.value.information);
  if (formData.value.image) form.append("image", formData.value.image);

  const { data } = await axios.post(`${API_BASE}/publicites`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  publicites.value.push(data);
  formData.value = { titre: "", information: "", image: null };
};

const deletePub = async (id) => {
  await axios.delete(`${API_BASE}/publicites/${id}`);
  publicites.value = publicites.value.filter((p) => p._id !== id);
};

const handleFileUpload = (e) => {
  formData.value.image = e.target.files[0];
};

onMounted(fetchPubs);
</script>

<style scoped>
body {
  background: #f9fafb;
}

.ad-container {
  max-width: 700px;
  margin: 40px auto;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.07);
  padding: 32px 24px;
}

h1 {
  text-align: center;
  font-size: 2rem;
  color: #1e293b;
  margin-bottom: 32px;
  letter-spacing: 1px;
}

form {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-end;
  background: #f3f4f6;
  padding: 18px 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  margin-bottom: 32px;
}

form input[type="text"],
form input[type="file"] {
  flex: 1 1 180px;
  padding: 10px 14px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  background: #fff;
}

form input[type="text"]:focus,
form input[type="file"]:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px #3b82f622;
}

form button[type="submit"] {
  background: #3b82f6;
  color: #fff;
  border: none;
  padding: 10px 22px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 1px 4px rgba(59, 130, 246, 0.08);
}

form button[type="submit"]:hover {
  background: #2563eb;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
}

hr {
  margin: 32px 0 18px 0;
  border: none;
  border-top: 1px solid #e5e7eb;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  background: #f9fafb;
  border-radius: 10px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.04);
  padding: 16px 18px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 18px;
  transition: box-shadow 0.2s;
}

li:hover {
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.1);
}

li img {
  width: 60px;
  height: 40px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  background: #f3f4f6;
}

li strong {
  font-size: 1.08rem;
  color: #1e293b;
  font-weight: 600;
  margin-right: 8px;
}

li button {
  margin-left: auto;
  background: #ef4444;
  color: #fff;
  border: none;
  padding: 7px 14px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.98rem;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

li button:hover {
  background: #dc2626;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.15);
}

@media (max-width: 600px) {
  .ad-container {
    padding: 10px;
  }

  h1 {
    font-size: 1.2rem;
  }

  form {
    flex-direction: column;
    gap: 10px;
    padding: 12px 8px;
  }

  li {
    padding: 10px 8px;
    gap: 8px;
  }

  li img {
    width: 40px;
    height: 28px;
  }
}
</style>
