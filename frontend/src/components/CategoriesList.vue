<template>
  <div class="categories">
    <div
      v-for="categorie in categories"
      :key="categorie._id"
      class="card"
      @click="goToSearch(categorie)"
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

const goToSearch = (categorie) => {
  // Enregistre aussi le nom pour l’affichage
  const ctx = {
    group: "Catégories",
    item: categorie.nom,
    ts: Date.now(),
  };
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(ctx));
  } catch (e) {
    console.warn("localStorage non disponible", e);
  }

  // Redirection avec l'ID en query (backend-friendly)
  router.push({
    name: "search",
    query: { category: categorie._id, categoryName: categorie.nom },
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
  min-width: 220px;
  height: 200px;
  border: 1px solid #ddd;
  border-radius: 10px;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  background: #fff;
  margin-right: 10px;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card img {
  width: 100%;
  height: 75%;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
}

.card p {
  margin-top: 8px;
  font-weight: 500;
  color: #333;
}
</style>
