<template>
  <div class="tendances">
    <div
      v-for="tendance in thematiques"
      :key="tendance._id"
      class="card"
    >
      <img :src="tendance.image" alt="tendance" />
      <p>{{ tendance.nom }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  thematiques: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.tendances {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding: 10px;
}
.card {
  min-width: 150px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  text-align: center;
  padding: 10px;
  flex-shrink: 0;
}
.card img {
  max-width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
}
</style>
