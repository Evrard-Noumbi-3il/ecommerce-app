<template>
  <div class="categories">
    <div
      v-for="categorie in categories"
      :key="categorie._id"
      class="card"
      @click="goToSearch(categorie.nom)"
    >
      <img :src="categorie.image" alt="categorie" />
      <p>{{ categorie.nom }}</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

defineProps({
  categories: {
    type: Array,
    required: true,
  },
});

const router = useRouter();
const LS_KEY = "searchContext";

const goToSearch = (itemName) => {
  // Enregistre le contexte dans localStorage
  const ctx = {
    group: "Catégories",
    item: itemName,
    ts: Date.now(),
  };
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(ctx));
  } catch (e) {
    console.warn("localStorage non disponible", e);
  }

  // Redirection avec paramètre de recherche
  router.push({
    name: "search",
    query: { category: itemName },
  });
};
</script>

<style scoped>
.categories {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding: 10px;
  max-width: 1200px;
  margin: auto;
}

.card {
  min-width: 150px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  background: #fff;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card img {
  max-width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
}

.card p {
  margin-top: 8px;
  font-weight: 500;
  color: #333;
}
</style>
