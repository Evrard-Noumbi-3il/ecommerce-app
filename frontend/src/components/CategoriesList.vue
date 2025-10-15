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
  padding: 30px;
  max-width: 98%;
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

/* Responsive */
@media (max-width: 900px) {
  .categories{
    gap: 10px;
    padding: 6px;
    max-width: 100vw;
  }
  .card {
    min-width: 140px;
    width: 150px;
    height: 140px;
  }
  .card img {
    height: 80px;
  }
  .card p {
    font-size: 0.95rem;
  }
}

@media (max-width: 600px) {
  .categories {
    gap: 7px;
    padding: 4px;
  }
  .card {
    min-width: 110px;
    width: 120px;
    height: 110px;
    border-radius: 7px;
  }
  .card img {
    height: 55px;
    border-radius: 7px 7px 0 0;
  }
  .card p {
    font-size: 0.85rem;
    margin-top: 6px;
  }
}

</style>
