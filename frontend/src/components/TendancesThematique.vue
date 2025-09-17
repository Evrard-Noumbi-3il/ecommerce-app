<template>
  <div class="tendances">
    <div
      v-for="tendance in thematiques"
      :key="tendance._id"
      class="card"
      @click="goToSearch(tendance.nom)"
    >
      <img :src="tendance.image" alt="tendance" />
      <p>{{ tendance.nom }}</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

defineProps({
  thematiques: {
    type: Array,
    required: true,
  },
});

const router = useRouter();
const LS_KEY = "searchContext";

const goToSearch = (itemName) => {
  // Sauvegarde du contexte
  const ctx = {
    group: "Tendances",
    item: itemName,
    ts: Date.now(),
  };
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(ctx));
  } catch (e) {
    console.warn("localStorage non disponible", e);
  }

  // Redirection vers la page recherche
  router.push({
    name: "search",
    query: { tendance: itemName },
  });
};
</script>

<style scoped>
.tendances {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding: 10px;
  max-width: 1200px;
  margin: auto;
}

.card {
  min-width: 150px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  text-align: center;
  padding: 10px;
  flex-shrink: 0;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card img {
  max-width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
}
</style>
