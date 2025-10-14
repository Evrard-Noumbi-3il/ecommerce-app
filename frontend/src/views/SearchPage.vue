<template>
  <div class="search-page">
    <!-- Barre de recherche principale -->
    <div class="top-search-bar">

        <div class="search-section">
          <h1 class="page-title">Rechercher des annonces</h1>
          <div class="main-search-bar">
            <div class="search-input-group">
              <svg class="search-icon" viewBox="0 0 24 24" width="20" height="20">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor"/>
              </svg>
              <input
                placeholder="Que recherchez-vous ? (voiture, appartement, téléphone...)"
                class="main-search-input"
                v-model="searchTerm"
              />
              <button class="main-search-btn" @click="applyFilters">
                Rechercher
              </button>
            </div>
          </div>
        </div>

    </div>

    <div class="main-container">
      <!-- Sidebar Filtres -->
      <aside class="filters-sidebar">
        <div class="filters-header">
          <h2 class="filters-title">Filtres</h2>
          <button class="clear-filters-btn" @click="clearFilters">
            Effacer tout
          </button>
        </div>

        <div class="filters-content">
          <!-- Catégorie -->
          <div class="filter-group">
            <label class="filter-label">Catégorie</label>
            <select
              :value="filters.category"
              @change="onCategoryChange($event)"
              class="filter-select"
            >
              <option value="">Toutes les catégories</option>
              <option v-for="cat in categories" :key="cat" :value="cat._id">{{ cat.nom }}</option>
            </select>
          </div>

          <!-- Thématique -->
          <div class="filter-group">
            <label class="filter-label">Thématique</label>
            <select
            :value="filters.theme"
            @change="onThemeChange($event)"
            class="filter-select"
            >
              <option value="">Toutes les thématiques</option>
              <option v-for="theme in themes" :key="theme" :value="theme._id">{{ theme.nom }}</option>
            </select>
          </div>

          <!-- Prix -->
          <div class="filter-group">
            <label class="filter-label">Prix (€)</label>
            <div class="price-inputs">
              <input
                type="number"
                v-model="filters.priceMin"
                placeholder="Min"
                class="price-input"
              />
              <span class="price-separator">à</span>
              <input
                type="number"
                v-model="filters.priceMax"
                placeholder="Max"
                class="price-input"
              />
            </div>
          </div>

          <!-- Localisation -->
          <div class="filter-group">
            <label class="filter-label">Localisation</label>
            <div class="location-input">
              <input
                type="text"
                v-model="filters.location"
                placeholder="Ville, code postal..."
                class="filter-input"
              />
              <div class="radius-input">
                <label class="radius-label">Rayon</label>
                <select v-model="filters.radius" class="radius-select">
                  <option value="">Toute la France</option>
                  <option value="5">5 km</option>
                  <option value="10">10 km</option>
                  <option value="25">25 km</option>
                  <option value="50">50 km</option>
                  <option value="100">100 km</option>
                </select>
              </div>
            </div>
          </div>

          <!-- État -->
          <div class="filter-group">
            <label class="filter-label">État</label>
            <div class="radio-group">
              <label class="radio-option">
                <input type="radio" v-model="filters.state" value="" />
                <span class="radio-text">Tous</span>
              </label>
              <label class="radio-option">
                <input type="radio" v-model="filters.state" value="neuf" />
                <span class="radio-text">Neuf</span>
              </label>
              <label class="radio-option">
                <input type="radio" v-model="filters.state" value="occasion" />
                <span class="radio-text">Occasion</span>
              </label>
            </div>
          </div>

          <!-- Date -->
          <div class="filter-group">
            <label class="filter-label">Date de mise en ligne</label>
            <select v-model="filters.postedWithin" class="filter-select">
              <option value="">Toutes les dates</option>
              <option value="1">Dernières 24h</option>
              <option value="7">Cette semaine</option>
              <option value="30">Ce mois-ci</option>
            </select>
          </div>

          <!-- Type de vendeur -->
          <div class="filter-group">
            <label class="filter-label">Type de vendeur</label>
            <div class="radio-group">
              <label class="radio-option">
                <input type="radio" v-model="filters.sellerType" value="" />
                <span class="radio-text">Tous</span>
              </label>
              <label class="radio-option">
                <input type="radio" v-model="filters.sellerType" value="particulier" />
                <span class="radio-text">Particulier</span>
              </label>
              <label class="radio-option">
                <input type="radio" v-model="filters.sellerType" value="professionnel" />
                <span class="radio-text">Professionnel</span>
              </label>
            </div>
          </div>

          <button @click="applyFilters" class="apply-filters-btn">
            Voir les résultats ({{ resultsCount }})
          </button>
        </div>
      </aside>

      <!-- Contenu principal -->
      <main class="main-content">
        <!-- Header résultats -->
        <div class="results-header">
          <div class="results-info">
            <h1 class="results-title">Résultats de recherche</h1>
            <p class="results-count">{{ resultsCount }} annonces trouvées</p>
          </div>

          <div class="sort-options">
            <label class="sort-label">Trier par :</label>
            <select v-model="filters.sortBy" class="sort-select" @change="applyFilters">
              <option value="recent">Plus récents</option>
              <option value="priceAsc">Prix croissant</option>
              <option value="priceDesc">Prix décroissant</option>
              <option value="popular">Les plus populaires</option>
            </select>
          </div>
        </div>

        <!-- Filtres actifs -->
        <div class="active-filters" v-if="hasActiveFilters">
          <span class="active-filters-label">Filtres actifs :</span>
          <div class="filter-tags">
            <span v-if="filters.category" class="filter-tag">
              {{ filters.categoryName }}
              <button @click="filters.category = ''" class="remove-tag">×</button>
            </span>
            <span v-if="filters.theme" class="filter-tag">
              {{ filters.themeName }}
              <button @click="filters.theme = ''" class="remove-tag">×</button>
            </span>
            <span v-if="filters.priceMin || filters.priceMax" class="filter-tag">
              Prix: {{ filters.priceMin || '0' }}€ - {{ filters.priceMax || '∞' }}€
              <button @click="filters.priceMin = ''; filters.priceMax = ''" class="remove-tag">×</button>
            </span>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="loading-state">
          <div class="loading-spinner"></div>
          <p>Recherche en cours...</p>
        </div>

        <!-- Résultats -->
        <div v-else-if="filteredResults.length > 0" class="results-grid">
          <div
            v-for="item in filteredResults"
            :key="item._id"
            class="result-card"
            @click="goToProduct(item._id)"
          >
            <div class="card-image-container">
              <img :src="item.images[0] || '/placeholder.jpg'" :alt="item.titre" class="card-image" />
              <div class="card-badges">
                <span v-if="item.state === 'neuf'" class="badge badge-new">Neuf</span>
                <span v-if="item.urgent" class="badge badge-urgent">Urgent</span>
              </div>
              <button class="favorite-btn" router-link :to="{ name: 'Favoris' }" @click.stop ="toggleFavorite(item._id)">

                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
                </svg>
              </button>
            </div>

            <div class="card-content">
              <h3 class="card-title">{{ item.titre }}</h3>
              <p class="card-price">{{ formatPrice(item.prix) }}</p>
              <p class="card-location">{{ item.location }}</p>

              <div class="card-meta">
                <span class="card-date">{{ formatDate(item.date) }}</span>
                <span class="seller-type" :class="item.sellerType">
                  {{ item.sellerType === 'professionnel' ? 'Pro' : 'Part.' }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3>Aucun résultat trouvé</h3>
          <p>Essayez de modifier vos critères de recherche</p>
          <button @click="clearFilters" class="clear-btn">Effacer les filtres</button>
        </div>

        <!-- Pagination -->
        <div v-if="filteredResults.length > 0" class="pagination">
  <button
    class="page-btn"
    :disabled="currentPage === 1"
    @click="currentPage--"
  >
    « Précédent
  </button>

  <button
    v-for="page in totalPages"
    :key="page"
    :class="['page-btn', { active: currentPage === page }]"
    @click="currentPage = page"
  >
    {{ page }}
  </button>

  <button
    class="page-btn"
    :disabled="currentPage === totalPages"
    @click="currentPage++"
  >
    Suivant »
  </button>
</div>

      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import {useFavoritesStore} from "@/stores/favoris"

const favorisStore = useFavoritesStore(); 
const route = useRoute();
const router = useRouter();

const categories = ref([]);
const themes = ref([]);

const results = ref([]);
const isLoading = ref(false);
const searchTerm = ref("");

// Pagination
const currentPage = ref(1);
const totalPages = ref(1);

// Filtres
const filters = ref({
  category: "",
  categoryName: "",
  theme: "",
  priceMin: "",
  priceMax: "",
  location: "",
  radius: "",
  state: "",
  postedWithin: "",
  sellerType: "",
  sortBy: "recent",
});

// --------- UTILITAIRES ---------

const fetchCategories = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/products/categories')
    categories.value = response.data
  } catch (error) {

    console.error('Erreur lors du chargement des catégories :', error)
  }
};

const fetchThemes = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/products/thematiques')
    themes.value = response.data
  } catch (error) {
    console.error('Erreur lors du chargement des thématiques :', error)
  }
};

// Nettoyer les filtres avant push
const buildQueryParams = () => {
  const query = {};

  if (searchTerm.value) query.q = searchTerm.value;
  if (currentPage.value > 1) query.page = currentPage.value;

  for (const [key, value] of Object.entries(filters.value)) {
    if (value !== "" && value !== null && value !== undefined) {
      query[key] = value;
    }
  }

  return query;
};

// Charger les filtres depuis l'URL
const initFiltersFromQuery = (query) => {
  filters.value = {
    category: query.category || "",
    categoryName: query.categoryName || "",
    theme: query.theme || "",
    themeName: query.themeName || "",
    priceMin: query.priceMin ? Number(query.priceMin) : "",
    priceMax: query.priceMax ? Number(query.priceMax) : "",
    location: query.location || "",
    radius: query.radius ? Number(query.radius) : "",
    state: query.state || "",
    postedWithin: query.postedWithin ? Number(query.postedWithin) : "",
    sellerType: query.sellerType || "",
    sortBy: query.sortBy || "recent",
  };

  searchTerm.value = query.q || "";
  currentPage.value = query.page ? Number(query.page) : 1;
};

// --------- API FETCH ---------
const fetchResults = async () => {
  try {
    isLoading.value = true;
    const res = await axios.get("http://localhost:3000/api/products", {
      params: { ...filters.value, q: searchTerm.value, page: currentPage.value, limit: 20 },
    });
    results.value = res.data.results;
    totalPages.value = res.data.totalPages;
  } catch (err) {
    console.error(err);
    results.value = [];
    totalPages.value = 1;
  } finally {
    isLoading.value = false;
  }
};

// --------- ACTIONS ---------

const applyFilters = () => {
  currentPage.value = 1; // reset page
  const query = buildQueryParams();

  if (JSON.stringify(route.query) !== JSON.stringify(query)) {
    router.push({ name: "search", query });
  } else {
    fetchResults();
  }
};

const clearFilters = () => {
  Object.keys(filters.value).forEach((key) => {
    if (key !== "sortBy") filters.value[key] = "";
  });
  searchTerm.value = "";
  currentPage.value = 1;
  applyFilters();
};

// --------- COMPUTED ---------

const filteredResults = computed(() => {
  let items = [...results.value];

  // Tri
  if (filters.value.sortBy === "priceAsc") {
    items.sort((a, b) => a.prix - b.prix);
  } else if (filters.value.sortBy === "priceDesc") {
    items.sort((a, b) => b.prix - a.prix);
  } else if (filters.value.sortBy === "recent") {
    items.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (filters.value.sortBy === "popular") {
    items.sort((a, b) => (b.vues || 0) - (a.vues || 0));
  }

  return items;
});

const resultsCount = computed(() => filteredResults.value.length);

const hasActiveFilters = computed(() => {
  return (
    Object.entries(filters.value).some(([key, value]) => key !== "sortBy" && value !== "") ||
    searchTerm.value !== ""
  );
});


// Format prix
const formatPrice = (price) => {
  if (!price) return "Prix non spécifié";
  return new Intl.NumberFormat("fr-FR").format(price) + " €";
};

// Format date
const formatDate = (date) => {
  if (!date) return "";
  const now = new Date();
  const itemDate = new Date(date);
  const diffTime = Math.abs(now - itemDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "Hier";
  if (diffDays <= 7) return `Il y a ${diffDays} jours`;
  return itemDate.toLocaleDateString("fr-FR");
};

// Navigation produit
const goToProduct = (id) => {
  router.push(`/product/${id}`);
};

// Favoris
const toggleFavorite = async (idProduit) => {
  try { 
    const token = localStorage.getItem("token");
    const id = JSON.parse(atob(token.split('.')[1])).id;
    const response = await axios.post(
      `${process.env.VUE_APP_API_URL}/favoris/addFavori`, 
      { idProduit: idProduit, id: id }
    );
    console.log("Favori ajouté avec succès :", response.data);
  } catch (err) {
    console.error("Erreur lors de l’ajout du favori :", err);
  }
};
 

const onCategoryChange = (event) => {
  const selectedId = event.target.value;
  filters.value.category = selectedId;
  const selectedCategory = categories.value.find(cat => cat._id === selectedId);
  filters.value.categoryName = selectedCategory ? selectedCategory.nom : "";
};

const onThemeChange = (event) => {
  const selectedId = event.target.value;
  filters.value.theme = selectedId;
  const selectedTheme = themes.value.find(theme => theme._id === selectedId);
  filters.value.themeName = selectedTheme ? selectedTheme.nom : "";
};
// --------- LIFECYCLE ---------
onMounted(() => {
  fetchCategories();
  fetchThemes();
  initFiltersFromQuery(route.query);
  fetchResults();
});

watch(
  () => route.query,
  (newQuery) => {
    initFiltersFromQuery(newQuery);
    fetchResults();
  }
);
watch(currentPage, () => {
  fetchResults();
});

watch(() => filters.value, () => {
  currentPage.value = 1;
  fetchResults();
}, { deep: true });


</script>


<style scoped>
.search-page {
  margin-top: 50px;
  min-height: 100vh;
  background: #f8f9fa;
}

/* Barre de recherche principale */
.top-search-bar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 100px 0 60px;
  color: white;

}

.search-section {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 32px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.main-search-bar {
  max-width: 600px;
  margin: 0 auto;
}

.search-input-group {
  position: relative;
  display: flex;
  background: white;
  border-radius: 50px;
  padding: 4px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.search-icon {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #6c757d;
}

.main-search-input {
  flex: 1;
  border: none;
  padding: 16px 20px 16px 50px;
  font-size: 16px;
  border-radius: 50px 0 0 50px;
  outline: none;
  background: transparent;
}

.main-search-input::placeholder {
  color: #6c757d;
}

.main-search-btn {
  background: #ff6b35;
  border: none;
  padding: 16px 32px;
  border-radius: 50px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;
}

.main-search-btn:hover {
  background: #ff4500;
  transform: translateY(-1px);
}

/* Main Container */
.main-container {
  display: flex;
  gap: 24px;
  padding: 24px 20px;
}

/* Sidebar */
.filters-sidebar {
  width: 280px;
  background: white;
  border-radius: 12px;
  padding: 24px;
  height: fit-content;
  position: sticky;
  top: 50px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e9ecef;
}

.filters-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #212529;
  margin: 0;
}

.clear-filters-btn {
  background: none;
  border: none;
  color: #ff6b35;
  font-size: 0.875rem;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
}

.clear-filters-btn:hover {
  background: rgba(255, 107, 53, 0.1);
}

.filter-group {
  margin-bottom: 24px;
}

.filter-label {
  display: block;
  font-weight: 600;
  color: #495057;
  margin-bottom: 8px;
  font-size: 0.875rem;
}

.filter-select,
.filter-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 0.875rem;
  background: white;
  outline: none;
}

.filter-select:focus,
.filter-input:focus {
  border-color: #ff6b35;
  box-shadow: 0 0 0 2px rgba(255, 107, 53, 0.1);
}

.price-inputs {
  display: flex;
  align-items: center;
  gap: 8px;
}

.price-input {
  flex: 1;
  padding: 8px 12px;
  max-width: 100px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 0.875rem;
  outline: none;
}

.price-separator {
  color: #6c757d;
  font-size: 0.875rem;
}

.location-input {
  space-y: 12px;
  max-width: 250px;
}

.radius-input {
  margin-top: 12px;
}

.radius-label {
  display: block;
  font-size: 0.75rem;
  color: #6c757d;
  margin-bottom: 4px;
}

.radius-select {
  width: 100%;
  padding: 6px 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 0.75rem;
  background: white;
}

.radio-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 0;
}

.radio-option input[type="radio"] {
  margin: 0;
}

.radio-text {
  font-size: 0.875rem;
  color: #495057;
}

.apply-filters-btn {
  width: 100%;
  background: #ff6b35;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.apply-filters-btn:hover {
  background: #ff4500;
}

/* Main Content */
.main-content {
  flex: 1;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 20px;
  padding: 20px 0;
}

.results-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #212529;
  margin: 0 0 4px;
}

.results-count {
  color: #6c757d;
  margin: 0;
  font-size: 0.875rem;
}

.sort-options {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sort-label {
  font-size: 0.875rem;
  color: #495057;
  font-weight: 500;
}

.sort-select {
  padding: 6px 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 0.875rem;
  background: white;
  outline: none;
}

/* Active Filters */
.active-filters {
  background: white;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.active-filters-label {
  font-weight: 600;
  color: #495057;
  font-size: 0.875rem;
  margin-right: 12px;
}

.filter-tags {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-tag {
  background: #e3f2fd;
  color: #1976d2;
  padding: 4px 8px;
  border-radius: 16px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 4px;
}

.remove-tag {
  background: none;
  border: none;
  color: #1976d2;
  cursor: pointer;
  font-weight: bold;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.remove-tag:hover {
  background: rgba(25, 118, 210, 0.1);
}

/* Results Grid */
.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.result-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.result-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.card-image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.result-card:hover .card-image {
  transform: scale(1.05);
}

.card-badges {
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  gap: 6px;
}

.badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.badge-new {
  background: #28a745;
  color: white;
}

.badge-urgent {
  background: #dc3545;
  color: white;
}

.favorite-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #6c757d;
}

.favorite-btn:hover {
  background: white;
  color: #ff6b35;
  transform: scale(1.1);
}

.card-content {
  padding: 16px;
}

.card-title {
  font-weight: 600;
  font-size: 1rem;
  margin: 0 0 8px;
  color: #212529;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-price {
  font-weight: 700;
  font-size: 1.125rem;
  color: #ff6b35;
  margin: 0 0 8px;
}

.card-location {
  color: #6c757d;
  font-size: 0.875rem;
  margin: 0 0 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-date {
  color: #6c757d;
  font-size: 0.75rem;
}

.seller-type {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.seller-type.particulier {
  background: #e7f3ff;
  color: #0066cc;
}

.seller-type.professionnel {
  background: #fff3e0;
  color: #f57500;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e9ecef;
  border-top: 3px solid #ff6b35;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state h3 {
  font-size: 1.25rem;
  color: #495057;
  margin: 0 0 8px;
}

.empty-state p {
  color: #6c757d;
  margin: 0 0 24px;
}

.clear-btn {
  background: #ff6b35;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 40px;
}

.page-btn {
  padding: 8px 12px;
  border: 1px solid #ced4da;
  background: white;
  color: #495057;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-btn:hover,
.page-btn.active {
  background: #ff6b35;
  color: white;
  border-color: #ff6b35;
}

/* Responsive */
@media (max-width: 768px) {
  .top-search-bar {
    padding: 30px 0 40px;
  }

  .page-title {
    font-size: 2rem;
    margin-bottom: 24px;
  }

  .main-search-input {
    font-size: 14px;
    padding: 14px 18px 14px 45px;
  }

  .main-search-btn {
    padding: 14px 24px;
    font-size: 14px;
  }

  .main-container {
    flex-direction: column;
    padding: 16px;
  }

  .filters-sidebar {
    width: 100%;
    position: static;
  }

  .results-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .results-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.8rem;
  }

  .search-input-group {
    flex-direction: column;
    padding: 8px;
    border-radius: 12px;
  }

  .main-search-input {
    border-radius: 8px;
    margin-bottom: 8px;
  }

  .main-search-btn {
    border-radius: 8px;
  }

  .search-icon {
    display: none;
  }

  .main-search-input {
    padding-left: 20px;
  }

  .results-grid {
    grid-template-columns: 1fr;
  }

  .main-container {
    padding: 12px;
  }
}
</style>