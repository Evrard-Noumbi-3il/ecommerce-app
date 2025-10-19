<template>
  <div class="favoris">
    <h1>Mes Favoris ❤️</h1>


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
    <div v-if="!produits.length && !favorisThematiques.length && !favorisCategories.length">
      <p>Vous n'avez pas encore ajouté de favoris.
      
      Veuillez rentrer dans les Catégories et choisir </p>
    </div>


    <div v-else>
    <h2>Mes Favoris</h2>
    <ul>
      <li v-for="item in produits" :key="item._id">
        {{ item.titre }} — {{ item.prix }} FCFA
      </li>
    </ul>
  </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import {useFavoritesStore} from "@/stores/favoris"; 


import TendancesThematique from "../components/TendancesThematique.vue";
import CategoriesList from "../components/CategoriesList.vue";

const favorisStore = useFavoritesStore; 
const favorisProduits = ref([]);
const favorisThematiques = ref([]);
const favorisCategories = ref([]);
const produits = ref([]);




onMounted(async () => {
  try {
    const token = localStorage.getItem("token"); 

    if (!token) {
      console.warn("Aucun token trouvé, utilisateur non connecté.");
      return;
    }

    const id = JSON.parse(atob(token.split(".")[1])).id; 

    const responseProd = await
      axios.get(`${process.env.VUE_APP_API_URL}/favoris/getFavoris/${id}`)
    ; 

    produits.value = responseProd.data.produits || []; 
    
    console.log("Favoris chargés avec succès"); 
  } 
  catch (err) {
  console.log(err); 
    console.error("Erreur lors du chargement des favoris : ", err); 
  }
});

</script>

<style scoped>
h1{
  padding: 30px; 
}

@media (max-width: 768px) {
  .favoris {
    padding: 30px 0 40px;
  }
  }

  
.favoris {
  padding: 20px;
  text-align: center;
  max-width: 3000px;
  margin: 0 auto;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 30px 0 60px;
  color: white;
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
