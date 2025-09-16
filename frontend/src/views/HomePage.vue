<template>
  <div class="home">
    <!-- Publicité défilante -->
    <PubliciteBar :publicites="publicites" />

    <!-- Tendances -->
    <section>
      <h2>Tendances</h2>
      <TendancesThematique :thematiques="tendances" />
    </section>

    <!-- Catégories -->
    <section>
      <h2>Catégories</h2>
      <CategoriesList :categories="categories" />
    </section>

    <!-- Nouveautés -->
    <section>
      <h2>Nouveautés</h2>
      <NouveautesProduits :produits="nouveautes" />
    </section>

    <!-- Découvrir -->
    <section>
      <h2>Découvrir</h2>
      <DecouvrirSection :thematiques="thematiques" />
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

import PubliciteBar from "../components/PubliciteBar.vue";
import TendancesThematique from "../components/TendancesThematique.vue";
import CategoriesList from "../components/CategoriesList.vue";
import NouveautesProduits from "../components/NouveautesproduitsBar.vue";
import DecouvrirSection from "../components/DecouvrirSection.vue";


const publicites = ref([]);
const tendances = ref([]);
const categories = ref([]);
const nouveautes = ref([]);
const thematiques = ref([]);

onMounted(async () => {
  try {
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
  }
});
</script>

<style scoped>
.home {
  padding: 20px;
}
h2 {
  margin: 20px 0 10px;
  color: #222;
}
</style>
