<template>
  <div class="decouvrir">
    <div
      v-for="thematique in thematiques"
      :key="thematique._id"
      class="card"
    >
      <img :src="thematique.image" alt="thematique" />
      <p>{{ thematique.nom }}</p>
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
.decouvrir {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding: 10px;
}
.card {
  min-width: 150px;
  background: #fff;
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
