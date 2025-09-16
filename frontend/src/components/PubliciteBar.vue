<template>
  <div class="carousel">
    <div
      v-for="pub in publicites"
      :key="pub._id"
      class="pub-card"
    >
      <img :src="pub.image" alt="publicité" />
      <div class="info">
        <h3>{{ pub.titre }}</h3>
        <p>{{ pub.information }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  publicites: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.carousel {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 15px;
}
.pub-card {
  min-width: 300px;
  height: 150px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #ddd;
  display: flex;
  background: white;
  flex-shrink: 0;
}
.pub-card img {
  width: 50%;
  object-fit: cover;
}
.pub-card .info {
  padding: 10px;
  font-size: 14px;
}
</style>
