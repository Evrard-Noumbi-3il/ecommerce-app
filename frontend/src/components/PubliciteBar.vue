<template>
  <div class="carousel">
    <div class="carousel-inner" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
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

    <!-- Boutons de navigation -->
    <button class="btn prev" @click="prevSlide">‹</button>
    <button class="btn next" @click="nextSlide">›</button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  publicites: {
    type: Array,
    required: true,
    default: () => [], 
  },
});

const currentIndex = ref(0);
let interval = null;

const nextSlide = () => {
  if (props.publicites.length > 0) {
    currentIndex.value = (currentIndex.value + 1) % props.publicites.length;
  }
};

const prevSlide = () => {
  if (props.publicites.length > 0) {
    currentIndex.value =
      (currentIndex.value - 1 + props.publicites.length) % props.publicites.length;
  }
};

onMounted(() => {
  if (props.publicites.length > 0) {
    interval = setInterval(nextSlide, 5000); // change toutes les 5s
  }
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});
</script>

<style scoped>
.carousel {
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin: 20px auto;
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid #ddd;
  background: #fff;
}

.carousel-inner {
  display: flex;
  transition: transform 0.6s ease-in-out;
  width: 100%;
}

.pub-card {
  min-width: 100%;
  height: 180px;
  display: flex;
  flex-shrink: 0;
  overflow: hidden;
}

.pub-card img {
  width: 50%;
  object-fit: cover;
}

.pub-card .info {
  padding: 15px;
  font-size: 14px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.pub-card h3 {
  margin: 0 0 8px;
  font-size: 1.2rem;
  color: #0d1b2a;
}

.pub-card p {
  margin: 0;
  color: #555;
}

/* Boutons navigation */
.btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 2rem;
  padding: 5px 12px;
  cursor: pointer;
  border-radius: 50%;
  z-index: 10;
}

.btn.prev {
  left: 10px;
}

.btn.next {
  right: 10px;
}

.btn:hover {
  background: rgba(0, 0, 0, 0.8);
}
</style>
