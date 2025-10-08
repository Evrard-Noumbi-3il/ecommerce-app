<template>
  <div class="thematique-management">
    <h1>Gestion des Thématiques</h1>

    <!-- Formulaire -->
    <form @submit.prevent="editing ? updateThematique() : addThematique()" class="form">

      <div class="form-header">
        <h2>{{ editing ? "Modifier" : "Ajouter" }} une thématique</h2>
        <div class="cancel">
        <button class="cancel-button" type="button" v-if="editing" @click="resetForm">✖ Annuler</button>
        </div>
      </div>
      <div class="form-group">
        <label for="nom">Nom :</label>
      <input
        v-model="formData.nom"
        type="text"
        placeholder="Nom de la thématique"
        required
      />

      <label for="image">Image :</label>
      <input type="file" @change="handleFileUpload" />

      <div v-if="formData.preview" class="preview">
        <img :src="formData.preview" alt="Prévisualisation" />
      </div>

      <button type="submit">
        {{ editing ? "Mettre à jour" : "Ajouter" }}
      </button>
      </div>
    </form>

    <!-- Liste -->
    <div class="list">
      <h2>Liste des thématiques</h2>
      <div v-for="theme in thematiques" :key="theme._id" class="card">
        <img v-if="theme.image" :src="theme.image" alt="img" />
        <p>{{ theme.nom }}</p>
        <button @click="editThematique(theme)">✏ Modifier</button>
        <button @click="openDeleteModal(theme)">🗑 Supprimer</button>
      </div>
    </div>

    <!-- Modale de confirmation -->
    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Confirmer la suppression</h3>
        </div>
        <div class="modal-body">
          <p>Voulez-vous vraiment supprimer la thématique <strong>{{ themeToDelete?.nom }}</strong>?</p>
        </div>
        <div class="modal-actions">
          <button class="btn-danger" @click="confirmDelete">Supprimer</button>
          <button class="btn-secondary" @click="closeDeleteModal">Annuler</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import api from '../auth/axios.js'

const API_BASE = "/admin/thematiques";

const thematiques = ref([]);
const formData = ref({ nom: "", image: null, preview: null });
const editing = ref(null);

// Suppression avec confirmation
const showDeleteModal = ref(false);
const themeToDelete = ref(null);

const openDeleteModal = (theme) => {
  themeToDelete.value = theme;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  themeToDelete.value = null;
  showDeleteModal.value = false;
};

const confirmDelete = async () => {
  if (!themeToDelete.value) return;
  await api.delete(`/admin/thematiques/${themeToDelete.value._id}`);
  closeDeleteModal();
  fetchThematiques();
};

// Charger toutes les thématiques
const fetchThematiques = async () => {
  const { data } = await api.get(API_BASE);
  thematiques.value = data.map((t) => ({
    ...t,
    image: t.image ? `${window.location.origin}${t.image}` : null,
  }));
};

// Ajouter
const addThematique = async () => {
  const form = new FormData();
  form.append("nom", formData.value.nom);
  if (formData.value.image) form.append("image", formData.value.image);

  await api.post(`${API_BASE}`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  resetForm();
  fetchThematiques();
};

// Modifier
const updateThematique = async () => {
  const form = new FormData();
  form.append("nom", formData.value.nom);
  if (formData.value.image) form.append("image", formData.value.image);

  await api.put(`${API_BASE}/${editing.value._id}`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  resetForm();
  fetchThematiques();
};

// Préparer la modif
const editThematique = (theme) => {
  editing.value = theme;
  formData.value.nom = theme.nom;
  formData.value.preview = theme.image;
  formData.value.image = null;
};

// Upload fichier
const handleFileUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    formData.value.image = file;
    formData.value.preview = URL.createObjectURL(file);
  }
};

// Reset
const resetForm = () => {
  formData.value = { nom: "", image: null, preview: null };
  editing.value = null;
};

onMounted(fetchThematiques);
</script>

<style scoped>
.thematique-management {
  max-width: 900px;
  margin: 40px auto;
  padding: 24px;
  background: #f9fafb;
  border-radius: 14px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.07);
}

.form-group label {
  font-weight: 600;
  color: #334155;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
}

.cancel{
  position: relative;
  top: -10px;
  right: -10px;
}

.cancel-button {
  background: transparent;
  right: 0;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #ef4444;
  transition: color 0.2s;
}

h1 {
  text-align: center;
  font-size: 2rem;
  color: #1e293b;
  letter-spacing: 1px;
}

.form {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-end;
  background: #fff;
  padding: 18px 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  margin-bottom: 32px;
}

.form label {
  flex: 0 0 100%;
  font-weight: 600;
  color: #334155;
  margin-right: 10px;
}

.form input[type="text"] {
  flex: 1 1 220px;
  padding: 10px 14px;
  margin: 0 12px 10px 10px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.form input[type="text"]:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px #3b82f622;
}

.form input[type="file"] {
  flex: 1 1 180px;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #f3f4f6;
  font-size: 0.98rem;
}

.form button[type="submit"] {
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
.form button[type="submit"]:hover {
  background: #2563eb;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
}

.preview {
  flex: 1 1 100%;
  margin-top: 8px;
  text-align: left;
}
.preview img {
  width: 90px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  background: #f3f4f6;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
}

.list {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
}

.list h2 {
  grid-column: 1/-1;
  font-size: 1.2rem;
  color: #334155;
  margin-bottom: 18px;
  font-weight: 600;
}

.card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  padding: 18px 14px 16px 14px;
  text-align: center;
  position: relative;
  transition: box-shadow 0.2s, transform 0.2s;
  border: 1px solid #e5e7eb;
}
.card:hover {
  box-shadow: 0 6px 24px rgba(59, 130, 246, 0.1);
  transform: translateY(-2px) scale(1.02);
  border-color: #3b82f6;
}

.card img {
  width: 100%;
  max-width: 120px;
  height: 70px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 10px;
  border: 1px solid #e5e7eb;
  background: #f3f4f6;
}

.card p {
  font-size: 1.08rem;
  color: #1e293b;
  margin-bottom: 12px;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.card button {
  margin: 0 4px;
  padding: 7px 14px;
  border-radius: 6px;
  border: none;
  font-weight: 500;
  font-size: 0.98rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.card button:first-of-type {
  background: #fbbf24;
  color: #fff;
}
.card button:first-of-type:hover {
  background: #f59e0b;
}

.card button:last-of-type {
  background: #ef4444;
  color: #fff;
}
.card button:last-of-type:hover {
  background: #dc2626;
}

.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(30,41,59,0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  padding: 28px 24px 18px 24px;
  min-width: 320px;
  max-width: 90vw;
  animation: scaleIn 0.2s;
}
@keyframes scaleIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
.modal-header h3 {
  margin: 0 0 12px 0;
  font-size: 1.2rem;
  color: #1e293b;
}
.modal-body p {
  font-size: 1rem;
  color: #334155;
  margin-bottom: 18px;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
.btn-danger {
  background: #ef4444;
  color: #fff;
  border: none;
  padding: 8px 18px;
  border-radius: 7px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-danger:hover {
  background: #dc2626;
}
.btn-secondary {
  background: #e5e7eb;
  color: #374151;
  border: none;
  padding: 8px 18px;
  border-radius: 7px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-secondary:hover {
  background: #d1d5db;
}

@media (max-width: 700px) {
  .thematique-management {
    padding: 8px;
  }
  .form {
    flex-direction: column;
    gap: 10px;
    padding: 12px 8px;
  }
  .list {
    gap: 12px;
  }
  .card {
    padding: 12px 7px;
  }
}
</style>
