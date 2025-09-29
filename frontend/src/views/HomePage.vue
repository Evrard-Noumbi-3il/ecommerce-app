<template>
  <div class="home">
    <!-- publicité -->
    <section class="hero-section">
      <h1 class="hero-title">
          Découvrez notre
          <span class="gradient-text">collection exclusive</span>
        </h1>
      <PubliciteBar :publicites="publicites" />
      <div class="hero-content">
        <button class="cta-button">
          <span>Explorer maintenant</span>
          <svg class="cta-icon" viewBox="0 0 24 24" width="20" height="20">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </section>

    <!-- Loading States -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Chargement en cours...</p>
    </div>

    <div v-else class="main-content">
      <!-- Tendances -->
      <section class="content-section" v-if="tendances.length">

          <div class="section-header">
            <div class="section-title-group">
              <h2 class="section-title">
                <span class="title-icon">🔥</span>
                Tendances
              </h2>
            </div>
            <button class="see-all-btn" @click="goToPage">
              Voir tout
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" fill="currentColor"/>
              </svg>
            </button>
          </div>
          <div class="section-content">
            <TendancesThematique :thematiques="tendances" />
          </div>

      </section>

      <!-- Catégories -->
      <section class="content-section" v-if="categories.length">

          <div class="section-header">
            <div class="section-title-group">
              <h2 class="section-title">
                Catégories
              </h2>
            </div>
            <button class="see-all-btn" @click="goToPage">
              Toutes les catégories
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" fill="currentColor"/>
              </svg>
            </button>
          </div>
          <div class="section-content">
            <CategoriesList :categories="categories" />
          </div>

      </section>

      <!-- Nouveautés -->
      <section class="content-section" v-if="nouveautes.length">

          <div class="section-header">
            <div class="section-title-group">
              <h2 class="section-title">
                <span class="title-icon">✨</span>
                Nouveautés
              </h2>
            </div>
            <button class="see-all-btn" @click="goToPage">
              Découvrir plus
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" fill="currentColor"/>
              </svg>
            </button>
          </div>
          <div class="section-content">
            <NouveautesProduits :produits="nouveautes" />
          </div>

      </section>

      <!-- Découvrir -->
      <section class="content-section" v-if="thematiques.length">

          <div class="section-header">
            <div class="section-title-group">
              <h2 class="section-title">
                Découvrir
              </h2>
            </div>
            <button class="see-all-btn" @click="goToPage">
              Découvrir plus
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" fill="currentColor"/>
              </svg>
            </button>
          </div>
          <div class="section-content">
            <DecouvrirSection :thematiques="thematiques" />
          </div>

      </section>
    </div>

    <!-- Error State -->
    <div v-if="hasError" class="error-container">
      <div class="error-card">
        <h3>Oups ! Une erreur s'est produite</h3>
        <p>Nous n'arrivons pas à charger le contenu. Veuillez réessayer.</p>
        <button @click="retry" class="retry-btn">Réessayer</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
const router = useRouter();

import PubliciteBar from "../components/PubliciteBar.vue";
import TendancesThematique from "../components/TendancesThematique.vue";
import CategoriesList from "../components/CategoriesList.vue";
import NouveautesProduits from "../components/NouveautesproduitsBar.vue";
import DecouvrirSection from "../components/DecouvrirSection.vue";

const goToPage = () => {
  router.push({ name: 'search' });
};
const publicites = ref([]);
const tendances = ref([]);
const categories = ref([]);
const nouveautes = ref([]);
const thematiques = ref([]);

const isLoading = ref(true);
const hasError = ref(false);

const loadData = async () => {
  try {
    isLoading.value = true;
    hasError.value = false;

    const [resPub, resTend, resCat, resNew, resThem] = await Promise.all([
      axios.get("http://localhost:3000/api/home/publicites"),
      axios.get("http://localhost:3000/api/home/tendances"),
      axios.get("http://localhost:3000/api/home/categories"),
      axios.get("http://localhost:3000/api/home/nouveautes"),
      axios.get("http://localhost:3000/api/home/thematiques"),
    ]);

    publicites.value = resPub.data;
    tendances.value = resTend.data;
    categories.value = resCat.data;
    nouveautes.value = resNew.data;
    thematiques.value = resThem.data;
  } catch (err) {
    console.error("Erreur chargement Home:", err);
    hasError.value = true;
  } finally {
    isLoading.value = false;
  }
};

const retry = () => {
  loadData();
};

onMounted(() => {
  loadData();
});
</script>

<style scoped>

.home {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  padding: 50px 20px 150px 0px;
  text-align: center;
  max-height: 500px;
}

.hero-content {
  color: white;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.2;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.gradient-text {
  background: linear-gradient(135deg, #fbbf24, #f59e0b, #d97706);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: none;
}


.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: #1f2937;
  border: none;
  padding: 16px 32px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 25px rgba(251, 191, 36, 0.3);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 35px rgba(251, 191, 36, 0.4);
}

.cta-icon {
  transition: transform 0.3s ease;
}

.cta-button:hover .cta-icon {
  transform: translateX(4px);
}

.main-content {
  background: #ffffff;
  padding-top: 50px;

}

.content-section {
  background: #eff1f4;
  border-radius: 12px;
  margin-bottom: 50px;
  margin-left: 100px;
  width: 1200px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding-right: 20px;
}

.section-title-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1f2937;
  display: flex;
  align-items: center;
  margin-left: 20px;
  gap: 8px;
}

.title-icon {
  font-size: 1.5rem;
}

.see-all-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  background: #1b3f5f;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.see-all-btn:hover {
  background: #2563eb;
  transform: translateY(-2px);
}

.section-content {
  display: flex;
  overflow-x: auto;
  margin-right: 10px;
  margin-left: 10px;
  gap: 15px;

}

.loading-container,
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
  background: white;
  margin: 20px;
  border-radius: 20px;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-card {
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  max-width: 400px;
}

.error-card h3 {
  color: #dc2626;
  margin-bottom: 16px;
  font-size: 1.5rem;
}

.error-card p {
  color: #64748b;
  margin-bottom: 24px;
}

.retry-btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease;
}

.retry-btn:hover {
  background: #5a67d8;
}

@media (max-width: 768px) {
  .hero-section {
    padding: 40px 20px 80px;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .section-title {
    font-size: 2rem;
  }

  .newsletter-card {
    padding: 40px 20px;
    margin: 0 20px;
  }

  .newsletter-title {
    font-size: 2rem;
  }

  .input-group {
    flex-direction: column;
    gap: 12px;
  }

  .subscribe-btn {
    border-radius: 25px;
  }
}

@media (max-width: 480px) {

  .section-title {
    font-size: 1.8rem;
    gap: 12px;
  }

  .title-icon {
    font-size: 1.5rem;
  }
}
</style>