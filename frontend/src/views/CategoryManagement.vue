<template>
  <div class="categories-container">
    <!-- En-tête -->
    <div class="header">
      <div class="title-section">
        <h1 class="page-title">
          <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
          </svg>
          Gestion des Catégories
        </h1>
      </div>
      <div class="stats">
        <div class="stat-card">
          <span class="stat-number">{{ categories.length }}</span>
          <span class="stat-label">Catégories</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">{{ thematiques.length }}</span>
          <span class="stat-label">Thématiques</span>
        </div>
      </div>
    </div>

    <!-- Messages -->
    <div v-if="message.text" :class="['message', message.type]" @click="clearMessage">
      <svg v-if="message.type === 'success'" class="message-icon" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
      </svg>
      <svg v-else class="message-icon" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"/>
      </svg>
      {{ message.text }}
    </div>

    <!-- Formulaire d'ajout/modification -->
    <div class="form-section">
      <div class="form-header">
        <h2>{{ editingCategory ? 'Modifier la catégorie' : 'Ajouter une nouvelle catégorie' }}</h2>
        <button v-if="editingCategory" @click="cancelEdit" class="btn-secondary">
          <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
          Annuler
        </button>
      </div>
      
      <form @submit.prevent="editingCategory ? updateCategory() : addCategory()" class="category-form">
        <div class="form-grid">
          <div class="form-group">
            <label for="nom" class="form-label">Nom de la catégorie *</label>
            <input
              id="nom"
              v-model="formData.nom"
              type="text"
              class="form-input"
              placeholder="Ex: Électronique"
              required
              :disabled="loading"
            />
            <span v-if="errors.nom" class="error-text">{{ errors.nom }}</span>
          </div>

          <div class="form-group">
            <label for="thematique" class="form-label">Thématique *</label>
            <select
              id="thematique"
              v-model="formData.id_thematique"
              class="form-select"
              required
              :disabled="loading"
            >
              <option value="">Sélectionner une thématique</option>
              <option v-for="theme in thematiques" :key="theme._id" :value="theme._id">
                {{ theme.nom }}
              </option>
            </select>
            <span v-if="errors.id_thematique" class="error-text">{{ errors.id_thematique }}</span>
          </div>

          <div v-if="!editingCategory" class="form-group full-width">
            <label for="image" class="form-label">URL de l'image</label>
            <input
              id="image"
              type="file"
              @change="handleFileUpload"
              class="form-input"
              :disabled="loading"
            />
            <span v-if="errors.image" class="error-text">{{ errors.image }}</span>
          </div>

          <!-- Prévisualisation de l'image -->
          <div v-if="formData.image || formData.imagePreview" class="form-group">
            <label class="form-label">Prévisualisation</label>
            <div class="image-preview">
              <img :src="formData.imagePreview || formData.image" alt="Prévisualisation" @error="handleImageError" />
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-primary" :disabled="loading">
            <svg v-if="loading" class="icon-sm animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            <svg v-else class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            {{ editingCategory ? 'Mettre à jour' : 'Ajouter' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Filtres et recherche -->
    <div class="filters-section">
      <div class="search-box">
        <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Rechercher une catégorie..."
          class="search-input"
        />
      </div>
      
      <select v-model="filterThematique" class="filter-select">
        <option value="">Toutes les thématiques</option>
        <option v-for="theme in thematiques" :key="theme._id" :value="theme._id">
          {{ theme.nom }}
        </option>
      </select>

      <button @click="exportData" class="btn-secondary">
        <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        </svg>
        Exporter
      </button>
    </div>

    <!-- Liste des catégories -->
    <div class="table-section">
      <div v-if="loading && categories.length === 0" class="loading-state">
        <div class="spinner"></div>
        <p>Chargement des catégories...</p>
      </div>

      <div v-else-if="filteredCategories.length === 0" class="empty-state">
        <svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
        </svg>
        <h3>Aucune catégorie trouvée</h3>
        <p>{{ searchTerm || filterThematique ? 'Essayez de modifier vos filtres' : 'Commencez par ajouter votre première catégorie' }}</p>
      </div>

      <div v-else class="table-container">
        <table class="categories-table">
          <thead>
            <tr>
              <th @click="sortBy('nom')" class="sortable">
                Nom
                <svg class="sort-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
                </svg>
              </th>
              <th>Image</th>
              <th @click="sortBy('thematique.nom')" class="sortable">
                Thématique
                <svg class="sort-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
                </svg>
              </th>
              <th>Date création</th>
              <th class="actions-column">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="category in paginatedCategories" :key="category._id" class="category-row">
              <td class="category-name">
                <strong>{{ category.nom }}</strong>
              </td>
              <td class="category-image">
                <div class="image-container">
                  <img
                    v-if="category.image"
                    :src="category.image"
                    :alt="category.nom"
                    class="category-thumbnail"
                    @error="handleImageError"
                  />
                  <div v-else class="no-image">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                  </div>
                </div>
              </td>
              <td class="category-theme">
                <span class="theme-badge">{{ category.thematique?.nom || 'Non définie' }}</span>
              </td>
              <td class="category-date">
                {{ formatDate(category.createdAt) }}
              </td>
              <td class="category-actions">
                <div class="action-buttons">
                  <button @click="editCategory(category)" class="btn-edit" title="Modifier">
                    <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </button>
                  <button @click="confirmDelete(category)" class="btn-delete" title="Supprimer">
                    <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="pagination">
        <button
          @click="currentPage = 1"
          :disabled="currentPage === 1"
          class="pagination-btn"
        >
          Première
        </button>
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="pagination-btn"
        >
          Précédent
        </button>
        <span class="pagination-info">
          Page {{ currentPage }} sur {{ totalPages }}
        </span>
        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="pagination-btn"
        >
          Suivant
        </button>
        <button
          @click="currentPage = totalPages"
          :disabled="currentPage === totalPages"
          class="pagination-btn"
        >
          Dernière
        </button>
      </div>
    </div>

    <!-- Modal de confirmation -->
    <div v-if="showDeleteModal" class="modal-overlay" @click="showDeleteModal = false">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>Confirmer la suppression</h3>
        </div>
        <div class="modal-body">
          <p>Êtes-vous sûr de vouloir supprimer la catégorie <strong>{{ categoryToDelete?.nom }}</strong> ?</p>
          <p class="warning-text">Cette action est irréversible.</p>
        </div>
        <div class="modal-actions">
          <button @click="showDeleteModal = false" class="btn-secondary">Annuler</button>
          <button @click="deleteCategory" class="btn-danger">Supprimer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import api from '../auth/axios.js'

// État réactif
const categories = ref([])
const thematiques = ref([])
const loading = ref(false)
const searchTerm = ref('')
const filterThematique = ref('')
const currentPage = ref(1)
const itemsPerPage = 10
const sortField = ref('nom')
const sortDirection = ref('asc')

// Formulaire
const formData = ref({
  nom: '',
  image: null,
  id_thematique: ''
})
const editingCategory = ref(null)
const errors = ref({})

// Messages et modales
const message = ref({ text: '', type: '' })
const showDeleteModal = ref(false)
const categoryToDelete = ref(null)

// API Configuration
const API_BASE = 'http://localhost:3000/api/admin'

// Computed properties
const filteredCategories = computed(() => {
  // Vérifier que categories.value est un tableau
  if (!Array.isArray(categories.value)) {
    return []
  }

  let filtered = [...categories.value] // Créer une copie pour éviter de muter l'original

  // Filtre par recherche
  if (searchTerm.value) {
    const search = searchTerm.value.toLowerCase()
    filtered = filtered.filter(cat =>
      cat.nom?.toLowerCase().includes(search) ||
      cat.thematique?.nom?.toLowerCase().includes(search)
    )
  }

  // Filtre par thématique
  if (filterThematique.value) {
    filtered = filtered.filter(cat => cat.id_thematique === filterThematique.value)
  }

  // Tri
  filtered = filtered.sort((a, b) => {
    let aValue, bValue
    
    if (sortField.value.includes('.')) {
      const [field, subfield] = sortField.value.split('.')
      aValue = a[field]?.[subfield] || ''
      bValue = b[field]?.[subfield] || ''
    } else {
      aValue = a[sortField.value] || ''
      bValue = b[sortField.value] || ''
    }

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }

    if (sortDirection.value === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  return filtered
})

const paginatedCategories = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredCategories.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredCategories.value.length / itemsPerPage)
})

// Méthodes API
const fetchData = async () => {
  try {
    loading.value = true
    const [categoriesResponse, thematiquesResponse] = await Promise.all([
      api.get('/admin/categories'),
      api.get('/admin/thematiques')

    ])
    
    const categoriesData = categoriesResponse.data?.data || categoriesResponse.data || []
    const thematiquesData = thematiquesResponse.data?.data || thematiquesResponse.data || []
    
    categories.value = Array.isArray(categoriesData) ? categoriesData : []
    thematiques.value = Array.isArray(thematiquesData) ? thematiquesData : []
    
  } catch (error) {
    showMessage('Erreur lors du chargement des données', 'error')
    console.error('Fetch error:', error)

    categories.value = []
    thematiques.value = []
  } finally {
    loading.value = false
  }
}

const addCategory = async () => {
  loading.value = true; 
  errors.value = {};
  const form = new FormData();
  form.append('nom', formData.value.nom); 
  form.append('id_thematique', formData.value.id_thematique); 
  if (formData.value.image) {
    form.append('image', formData.value.image); 
  }
  try {
    await api.post('/admin/categories', form, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }); 
    resetForm();
    showMessage('Catégorie ajoutée avec succès', 'success');
    fetchData(); // <-- Rafraîchir les données sans reload
  } catch (err) {
    if (err.response && err.response.data && err.response.data.errors) {
      errors.value = err.response.data.errors;
    }
    showMessage("Erreur lors de l'ajout de la catégorie", 'error');
    console.error('Add error:', err);
  } finally {
    loading.value = false; 
  }
};

const deleteCategory = async () => {
  try {
    loading.value = true
    await api.delete(`/admin/categories/${categoryToDelete.value._id}`);
    
    categories.value = categories.value.filter(cat => cat._id !== categoryToDelete.value._id)
    showDeleteModal.value = false
    categoryToDelete.value = null
    showMessage('Catégorie supprimée avec succès', 'success')
  } catch (error) {
    showMessage('Erreur lors de la suppression', 'error')
    console.error('Delete error:', error)
  } finally {
    loading.value = false
  }
}

// Méthodes utilitaires
const resetForm = () => {
  formData.value = { 
    nom: '', 
    image: null, 
    imagePreview: null,
    id_thematique: '' 
  }
  editingCategory.value = null
  errors.value = {}
  setTimeout(() => {
    const firstInput = document.querySelector('#nom')
    if (firstInput) firstInput.focus()
  }, 100)
}

const editCategory = (category) => {
  if (!category || !category._id) {
    showMessage('Catégorie invalide pour l\'édition', 'error')
    return
  }
  editingCategory.value = category
  formData.value = {
    nom: category.nom || '',
    image: null,
    imagePreview: category.image || null,
    id_thematique: category.id_thematique || category.thematique?._id || ''
  }
  errors.value = {}
  const formElement = document.querySelector('.form-section')
  if (formElement) {
    formElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const confirmDelete = (category) => {
  categoryToDelete.value = category;
  showDeleteModal.value = true;
}

function handleFileUpload(event) {
  const file = event.target.files[0]
  if (file) {
    formData.value.image = file
    formData.value.imagePreview = URL.createObjectURL(file) 
  } else {
    formData.value.image = null
    formData.value.imagePreview = null
  }
}

const sortBy = (field) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
}

const showMessage = (text, type) => {
  message.value = { text, type }
  setTimeout(() => {
    message.value = { text: '', type: '' }
  }, 5000)
}

const clearMessage = () => {
  message.value = { text: '', type: '' }
}

const formatDate = (date) => {
  if (!date) return 'N/A'
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date(date))
}

const handleImageError = (event) => {
  event.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23f3f4f6"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%23374151"%3EImage%3C/text%3E%3C/svg%3E'
}

const exportData = () => {
  const csv = [
    ['Nom', 'Image', 'Thématique', 'Date création'],
    ...categories.value.map(cat => [
      cat.nom,
      cat.image || '',
      cat.thematique?.nom || '',
      formatDate(cat.createdAt)
    ])
  ].map(row => row.join(',')).join('\n')
  
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'categories.csv'
  a.click()
  window.URL.revokeObjectURL(url)
}

// Watchers
watch(searchTerm, () => {
  currentPage.value = 1
})

watch(filterThematique, () => {
  currentPage.value = 1
})

// Lifecycle
onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.categories-container {
  max-width: 1200px;
  padding: 2rem;
  background: #f8fafc;
  min-height: 100vh;
}

/* En-tête */
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.title-section h1 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.subtitle {
  color: #6b7280;
  margin: 0;
}

.icon {
  width: 2rem;
  height: 2rem;
  color: #3b82f6;
}

.stats {
  display: flex;
  gap: 1rem;
}

.stat-card {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  min-width: 80px;
}

.stat-number {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
}

.stat-label {
  font-size: 0.875rem;
  opacity: 0.9;
}

/* Messages */
.message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.message.success {
  background: #dcfce7;
  color: #166534;
  border: 1px solid #bbf7d0;
}

.message.error {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.message-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* Formulaire */
.form-section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  margin-bottom: 2rem;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.form-header h2 {
  margin: 0;
  color: #1f2937;
  font-size: 1.25rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-label {
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-input,
.form-select {
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  width: 95%;
  font-size: 0.875rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgb(59 130 246 / 0.1);
}

.form-input:disabled,
.form-select:disabled {
  background: #f9fafb;
  cursor: not-allowed;
}

.error-text {
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.image-preview {
  border: 2px dashed #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
}

.image-preview img {
  max-width: 100px;
  max-height: 100px;
  object-fit: cover;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

/* Boutons */
.btn-primary,
.btn-secondary,
.btn-edit,
.btn-delete,
.btn-danger {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #2563eb, #1e40af);
  transform: translateY(-1px);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
}

.btn-secondary:hover {
  background: #e5e7eb;
  transform: translateY(-1px);
}

.btn-edit {
  background: #fbbf24;
  color: white;
  padding: 0.5rem;
}

.btn-edit:hover {
  background: #f59e0b;
  transform: scale(1.05);
}

.btn-delete,
.btn-danger {
  background: #dc2626;
  color: white;
}

.btn-delete {
  padding: 0.5rem;
}

.btn-delete:hover,
.btn-danger:hover {
  background: #b91c1c;
  transform: scale(1.05);
}

.icon-sm {
  width: 1rem;
  height: 1rem;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Filtres */
.filters-section {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: center;
  flex-wrap: wrap;
}

.search-box {
  position: relative;
  flex: 1;
  min-width: 250px;
}

.search-input {
  width: 92%;
  padding: 0.75rem 0.75rem 0.75rem 2.5rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.875rem;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgb(59 130 246 / 0.1);
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1rem;
  height: 1rem;
  color: #9ca3af;
}

.filter-select {
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  min-width: 200px;
}

/* Table */
.table-section {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.loading-state,
.empty-state {
  padding: 4rem 2rem;
  text-align: center;
  color: #6b7280;
}

.spinner {
  width: 2rem;
  height: 2rem;
  border: 3px solid #e5e7eb;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  margin: 0 auto 1rem;
  animation: spin 1s linear infinite;
}

.empty-icon {
  width: 3rem;
  height: 3rem;
  color: #d1d5db;
  margin: 0 auto 1rem;
}

.table-container {
  overflow-x: auto;
}

.categories-table {
  width: 100%;
  border-collapse: collapse;
}

.categories-table th {
  background: #f8fafc;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 2px solid #e5e7eb;
  position: sticky;
  top: 0;
}

.categories-table th.sortable {
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s ease;
}

.categories-table th.sortable:hover {
  background: #f1f5f9;
}

.sort-icon {
  width: 1rem;
  height: 1rem;
  margin-left: 0.5rem;
  opacity: 0.5;
}

.categories-table td {
  padding: 1rem;
  border-bottom: 1px solid #f3f4f6;
  vertical-align: middle;
}

.category-row {
  transition: background-color 0.2s ease;
}

.category-row:hover {
  background: #f8fafc;
}

.category-name strong {
  color: #1f2937;
  font-weight: 600;
}

.image-container {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-image {
  width: 100%;
  height: 100%;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.no-image svg {
  width: 1.5rem;
  height: 1.5rem;
  color: #9ca3af;
}

.theme-badge {
  background: #e0f2fe;
  color: #0369a1;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.category-date {
  color: #6b7280;
  font-size: 0.875rem;
}

.actions-column {
  width: 120px;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  background: #f8fafc;
  border-top: 1px solid #e5e7eb;
}

.pagination-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  background: white;
  color: #374151;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-btn:hover:not(:disabled) {
  background: #f3f4f6;
  border-color: #9ca3af;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-info {
  color: #6b7280;
  font-weight: 500;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  animation: fadeIn 0.2s ease;
}

.modal {
  background: white;
  border-radius: 12px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  max-width: 400px;
  width: 90%;
  animation: scaleIn 0.2s ease;
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
  margin: 0;
  color: #1f2937;
  font-size: 1.125rem;
  font-weight: 600;
}

.modal-body {
  padding: 1.5rem;
}

.modal-body p {
  margin: 0 0 1rem 0;
  color: #374151;
}

.warning-text {
  color: #dc2626;
  font-size: 0.875rem;
  font-style: italic;
}

.modal-actions {
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .categories-container {
    padding: 1rem;
  }

  .header {
    flex-direction: column;
    gap: 1rem;
  }

  .stats {
    justify-content: center;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .filters-section {
    flex-direction: column;
    align-items: stretch;
  }

  .search-box {
    min-width: auto;
  }

  .categories-table {
    font-size: 0.875rem;
  }

  .categories-table th,
  .categories-table td {
    padding: 0.5rem;
  }

  .action-buttons {
    flex-direction: column;
    gap: 0.25rem;
  }

  .pagination {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .categories-table th:nth-child(4),
  .categories-table td:nth-child(4) {
    display: none;
  }
  
  .image-container {
    width: 40px;
    height: 40px;
  }
}
</style>