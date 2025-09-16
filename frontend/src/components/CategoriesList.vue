<template>
  <div class="categories">
    <div
      v-for="categorie in categories"
      :key="categorie._id"
      class="card"
    >
      <img :src="categorie.image" alt="categorie" />
      <p>{{ categorie.nom }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  categories: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.categories {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding: 10px;
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
