<template>
  <div class="nouveautes">
    <div
      v-for="produit in produits"
      :key="produit._id"
      class="card"
    >
      <img :src="produit.images[0]" alt="produit" />
      <p>{{ produit.nom }}</p>
      <small>{{ produit.prix }} €</small>
    </div>
  </div>
</template>

<script setup>
defineProps({
  produits: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.nouveautes {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding: 10px;
  max-width: 1200px;
  margin:auto;
}
.card {
  min-width: 150px;
  background: #fafafa;
  border: 1px solid #ddd;
  border-radius: 10px;
  text-align: center;
  flex-shrink: 0;
}
.card img {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
}
</style>
