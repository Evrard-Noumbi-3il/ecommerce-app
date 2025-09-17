<template>
  <div class="search-page">
    <h1>Résultats de recherche</h1>

    <!-- Filtres -->
    <section class="filters">
      <h2>Filtres</h2>

      <!-- Catégorie -->
      <div>
        <label>Catégorie</label>
        <select v-model="filters.category">
          <option value="">Toutes</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>

      <!-- Thématique -->
      <div>
        <label>Thématique</label>
        <select v-model="filters.theme">
          <option value="">Toutes</option>
          <option v-for="theme in themes" :key="theme" :value="theme">{{ theme }}</option>
        </select>
      </div>

      <!-- Prix -->
      <div>
        <label>Prix</label>
        <input type="number" v-model="filters.priceMin" placeholder="Min" />
        <input type="number" v-model="filters.priceMax" placeholder="Max" />
      </div>

      <!-- Localisation -->
      <div>
        <label>Localisation</label>
        <input type="text" v-model="filters.location" placeholder="Ex: Paris" />
        <label>Rayon (km)</label>
        <input type="number" v-model="filters.radius" placeholder="10" />
      </div>

      <!-- État -->
      <div>
        <label>État</label>
        <select v-model="filters.state">
          <option value="">Tous</option>
          <option value="neuf">Neuf</option>
          <option value="occasion">Occasion</option>
        </select>
      </div>

      <!-- Date de mise en ligne -->
      <div>
        <label>Date de mise en ligne</label>
        <select v-model="filters.postedWithin">
          <option value="">Toutes</option>
          <option value="1">Dernières 24h</option>
          <option value="7">Moins de 7 jours</option>
          <option value="30">Moins de 30 jours</option>
        </select>
      </div>

      <!-- Type de vendeur -->
      <div>
        <label>Vendeur</label>
        <select v-model="filters.sellerType">
          <option value="">Tous</option>
          <option value="particulier">Particulier</option>
          <option value="professionnel">Professionnel</option>
        </select>
      </div>

      <!-- Tri -->
      <div>
        <label>Trier par</label>
        <select v-model="filters.sortBy">
          <option value="recent">Plus récents</option>
          <option value="priceAsc">Prix croissant</option>
          <option value="priceDesc">Prix décroissant</option>
          <option value="popular">Populaires</option>
        </select>
      </div>

      <button @click="applyFilters">Appliquer</button>
    </section>

    <!-- Résultats -->
    <section class="results">
      <div
        v-for="item in filteredResults"
        :key="item._id"
        class="result-card"
      >
        <img :src="item.image" alt="item" />
        <h3>{{ item.titre }}</h3>
        <p>{{ item.prix }} €</p>
        <p>{{ item.location }}</p>
        <small>{{ item.state }} - {{ item.sellerType }}</small>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const categories = ["Immobilier", "Véhicules", "Électronique", "Mode", "Maison"];
const themes = ["Loisirs", "Sport", "Culture", "Décoration"];

const results = ref([]);

const filters = ref({
  category: "",
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

const fetchResults = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/products", {
      params: filters.value,
    });
    results.value = res.data;
  } catch (err) {
    console.error(err);
  }
};

const applyFilters = () => {
  router.push({ name: "search", query: { ...filters.value } });
  fetchResults();
};

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
    items.sort((a, b) => b.vues - a.vues);
  }

  return items;
});

onMounted(fetchResults);

watch(
  () => route.query,
  (newQuery) => {
    Object.assign(filters.value, newQuery);
    fetchResults();
  }
);
</script>

<style scoped>
.search-page {
  display: flex;
  gap: 20px;
  padding: 20px;
}
.filters {
  width: 280px;
  border-right: 1px solid #ddd;
  padding-right: 15px;
}
.filters select,
.filters input {
  width: 100%;
  margin: 5px 0 15px 0;
  padding: 5px;
}
.results {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
}
.result-card {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  background: white;
}
.result-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}
</style>
