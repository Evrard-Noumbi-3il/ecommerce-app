<template>
  <div class="produits-grid">
    <div
      v-for="produit in produits"
      :key="produit._id"
      class="produit-card"
      @click="goToProduct(produit._id)"
    >
      <img :src="produit.images[0]" alt="produit" />
      <button class="favorite-btn" @click.stop="toggleFavorite(item._id)">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
                </svg>
        </button>
      <div class="info">
        <h3>{{ produit.nom }}</h3>
        <p class="prix">{{ produit.prix }} €</p>
        <p class="meta">{{ produit.ville }} • {{ formatDate(produit.date) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

defineProps({
  produits: {
    type: Array,
    required: true,
  },
});

const goToProduct = (id) => {
  router.push(`/product/${id}`);
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
</script>

<style scoped>
.produits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: auto;
}

.produit-card {
  position: relative;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  cursor: pointer;
  transition: box-shadow 0.2s ease;
}

.produit-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.produit-card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.favorite-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  padding: 6px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transition: background 0.2s ease;
}

.favorite-btn:hover {
  background: #fca311;
}

.info {
  padding: 10px;
}

.info h3 {
  font-size: 16px;
  margin: 0;
  color: #333;
  font-weight: 600;
}

.prix {
  font-weight: bold;
  color: #e69100;
  margin: 6px 0;
  font-size: 15px;
}

.meta {
  font-size: 13px;
  color: #777;
}
</style>