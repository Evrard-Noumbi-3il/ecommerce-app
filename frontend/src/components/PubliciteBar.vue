<template>
  <div class="carousel">
    <div class="carousel-inner" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <div
        v-for="pub in publicites"
        :key="pub._id"
        class="pub-card"
      >
        <div class="image-container">
          <img :src="pub.image" alt="publicité" />
          <div class="image-overlay"></div>
        </div>
        <div class="info">
          <h3>{{ pub.titre }}</h3>
          <p>{{ pub.information }}</p>
          <div class="card-accent"></div>
        </div>
      </div>
    </div>

    <!-- Boutons de navigation -->
    <button class="btn prev" @click="prevSlide" aria-label="Précédent">
      <svg viewBox="0 0 24 24" width="24" height="24">
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor"/>
      </svg>
    </button>
    <button class="btn next" @click="nextSlide" aria-label="Suivant">
      <svg viewBox="0 0 24 24" width="24" height="24">
        <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" fill="currentColor"/>
      </svg>
    </button>

    <!-- Indicateurs de pagination -->
    <div class="indicators" v-if="publicites.length > 1">
      <button
        v-for="(_, index) in publicites"
        :key="index"
        :class="['indicator', { active: index === currentIndex }]"
        @click="goToSlide(index)"
        :aria-label="`Aller à la slide ${index + 1}`"
      ></button>
    </div>
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

const goToSlide = (index) => {
  currentIndex.value = index;
};

const startAutoplay = () => {
  if (props.publicites.length > 1) {
    interval = setInterval(nextSlide, 5000);
  }
};

const stopAutoplay = () => {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
};

onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  stopAutoplay();
});
</script>

<style scoped>
.carousel {
  position: relative;
  width: 100%;
  max-width: 1000px;
  height: 400px;
  margin: 20px auto;
  overflow: hidden;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.carousel-inner {
  display: flex;
  transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  width: 100%;
  height: 100%;
}

.pub-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-shrink: 0;
  overflow: hidden;
  background: linear-gradient(135deg, #0d1b2a 0%, #0d1b2a 100%);
}

.image-container {
  position: relative;
  width: 65%;
  height: 100%;
  overflow: hidden;
  min-width: 180px;
}

.pub-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
  display: block;
}

.carousel:hover .pub-card img {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
}

.info {
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.95));
  min-width: 140px;
}

.card-accent {
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.info h3 {
  margin: 0 0 12px;
  font-size: 1.4rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.3;
  background: linear-gradient(135deg, #667eea, #764ba2);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.info p {
  margin: 0;
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.6;
  font-weight: 400;
}

/* Boutons navigation */
.btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: none;
  color: #475569;
  width: 48px;
  height: 48px;
  cursor: pointer;
  border-radius: 50%;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  opacity: 0.8;
}

.btn.prev { left: 16px; }
.btn.next { right: 16px; }

.btn:hover {
  background: rgba(255, 255, 255, 1);
  color: #667eea;
  opacity: 1;
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.1);
}

/* Indicateurs */
.indicators {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
}

.indicator:hover {
  background: rgba(255, 255, 255, 0.7);
  transform: scale(1.1);
}

.indicator.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  width: 24px;
  border-radius: 6px;
}

/* Responsive */
@media (max-width: 900px) {
  .carousel {
    height: 280px;
    border-radius: 12px;
    margin: 10px;
  }
  .pub-card {
    height: 280px;
  }
  .image-container {
    width: 55%;
    min-width: 120px;
  }
  .info {
    padding: 14px;
    min-width: 100px;
  }
  .btn {
    width: 38px;
    height: 38px;
  }
  .btn.prev { left: 8px; }
  .btn.next { right: 8px; }
}

@media (max-width: 600px) {
  .carousel {
    height: 180px;
    border-radius: 8px;
    margin: 6px;
  }
  .carousel-inner {
    min-height: 180px;
  }
  .pub-card {
    height: 180px;
    flex-direction: column;
  }
  .image-container {
    width: 100%;
    height: 60%;
    min-width: 0;
    min-height: 80px;
    max-height: 110px;
  }
  .pub-card img {
    height: 100%;
    min-height: 80px;
    max-height: 110px;
  }
  .info {
    padding: 8px;
    min-width: 0;
    height: 40%;
    font-size: 0.9rem;
  }
  .info h3 {
    font-size: 1rem;
    margin-bottom: 6px;
  }
  .info p {
    font-size: 0.8rem;
    line-height: 1.3;
  }
  .btn {
    width: 28px;
    height: 28px;
  }
  .btn.prev { left: 2px; }
  .btn.next { right: 2px; }
  .indicators {
    bottom: 8px;
    gap: 4px;
  }
  .indicator {
    width: 8px;
    height: 8px;
  }
  .indicator.active {
    width: 16px;
    border-radius: 4px;
  }
}

@media (max-width: 400px) {
  .carousel {
    height: 120px;
  }
  .pub-card {
    height: 120px;
  }
  .image-container {
    max-height: 60px;
  }
  .pub-card img {
    max-height: 60px;
  }
  .info {
    padding: 4px;
    font-size: 0.8rem;
  }
  .info h3 {
    font-size: 0.85rem;
  }
  .info p {
    font-size: 0.7rem;
  }
}

/* Animation pour les cartes */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.pub-card {
  animation: slideIn 0.6s ease-out;
}
</style>