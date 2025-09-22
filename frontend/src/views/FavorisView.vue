<template>
  <div class="favoris">
    <h1>Mes Favoris</h1>

    <!-- Favoris Produits -->
    <section v-if="favorisProduits.length">
      <h2>Produits favoris</h2>
      <NouveautesProduits :produits="favorisProduits" />
    </section>

    <!-- Favoris Thématiques -->
    <section v-if="favorisThematiques.length">
      <h2>Thématiques favorites</h2>
      <TendancesThematique :thematiques="favorisThematiques" />
    </section>

    <!-- Favoris Catégories -->
    <section v-if="favorisCategories.length">
      <h2>Catégories favorites</h2>
      <CategoriesList :categories="favorisCategories" />
    </section>

    <!-- Message si aucun favori -->
    <div v-if="!favorisProduits.length && !favorisThematiques.length && !favorisCategories.length">
      <p>Vous n'avez pas encore ajouté de favoris.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

import NouveautesProduits from "../components/NouveautesProduitsBar.vue";
import TendancesThematique from "../components/TendancesThematique.vue";
import CategoriesList from "../components/CategoriesList.vue";

const favorisProduits = ref([]);
const favorisThematiques = ref([]);
const favorisCategories = ref([]);

onMounted(async () => {
  try {
    const [resProd, resThem, resCat] = await Promise.all([
      axios.get("http://localhost:3000/api/favoris/produits"),
      axios.get("http://localhost:3000/api/favoris/thematiques"),
      axios.get("http://localhost:3000/api/favoris/categories"),
    ]);
    favorisProduits.value = resProd.data;
    favorisThematiques.value = resThem.data;
    favorisCategories.value = resCat.data;
  } catch (err) {
    console.error("Erreur lors du chargement Favoris:", err);
  }
});
</script>

<style scoped>
.favoris {
  padding: 20px;
}
h1 {
  margin-bottom: 20px;
  color: #1a1a1a;
}
h2 {
  margin: 20px 0 10px;
  color: #222;
}
</style>
