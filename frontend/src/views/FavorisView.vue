<template>
  <div class="favoris">
    <h1>Mes Favoris ❤️</h1>

     <!-- Si aucun favori -->
    <div v-if="!produits.length && !favorisThematiques.length && !favorisCategories.length" class="empty">
      <img src="public/images/thematique/loisir.jpg" alt="Aucun favori" class="empty-img" />
      <p>
        Vous n'avez pas encore ajouté de favoris.<br />
        <span class="hint">Explorez les catégories et ajoutez ceux que vous aimez ❤️</span>
      </p>
    </div>


    <!-- Favoris Produits -->
    <section v-if="produits.length" class="favoris-section">
      <h2>🛍️ Produits favoris</h2>
      <div class="favoris-grid">
        <div v-for="item in produits" :key="item._id" class="favori-card">
          <div class="image-container">
            <img :src="item.images[0] || '/placeholder.jpg'" :alt="item.titre" class = "card-image" />
            <button class="remove-btn" @click="deleteFavoris">❌</button>
          </div>
          <div class="favori-info">
            <h3>{{ item.titre }} </h3>
            <p class="price">{{ item.prix }} Euros</p>
          </div>
        </div>
      </div>
    </section>
 

    <!-- Message si aucun favori -->
    <div v-if="!produits.length && !favorisThematiques.length && !favorisCategories.length">
      <p>Vous n'avez pas encore ajouté de favoris.
      
      Veuillez rentrer dans les Catégories et choisir </p>
    </div>


    <div v-else>
  </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import {useFavoritesStore} from "@/stores/favoris"; 




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

//  Méthode de suppression 

const deleteFavoris = async (produit_Id) => {

  try {
  const token = localStorage.getItem("token");
  const user_Id = JSON.parse(atob(token.split(".")[1])).id; 

   await axios.delete(`${process.env.VUE_APP_API_URL}/favoris/deleteFavoris/${user_Id}/${produit_Id}`
  
  );

    produits.value = produits.value.filter((p) => p._id !== produit_Id);

    alert("Favori supprimé avec succès ✅");
    
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    alert("Erreur lors de la suppression du favori ❌");
  }
};

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
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 30px;
  color: #5b21b6;
}
h2 {
  margin: 20px 0 10px;
  color: #222;
}

.card-image {
  width: 75%;
  height: 75%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.favoris-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
.favori-card {
  background: white;
  color: black;
  border-radius: 16px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}
.remove-btn {
  margin-top: 10px;
  background: #ff4d4d;
  border: none;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}
.empty-img {
  width: 200px;
  margin: 20px auto;
  display: block;
}

</style>
