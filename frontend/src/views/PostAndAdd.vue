<template>

  <div class="containerPostAndAdd">
    <div class="form-container">

      <form @submit.prevent="addproduct" class="form">
        <div v-if="displayForm == 1">
          <FirstForm
            v-model:titre="titre"
            v-model:theme="theme"
            v-model:id_categorie="id_categorie"
          />
          <button type="button" @click="displayForm = 2" class="btn-first">suivant</button>
        </div>

        <div v-if="displayForm == 2">
          <SecondForm
            v-model:titre="titre"
            v-model:description="description"
            v-model:state="state"
            v-model:image="image"
          />
          <div class="div-btn">
            <button type="button" @click="displayForm = 1" class="btn-back">retour</button>
            <button type="button" @click="displayForm = 3" class="btn-next">suivant</button>
          </div>
        </div>

        <div v-if="displayForm == 3">
          <ThirdForm
            v-model:prix="prix"
          />
          <div class="div-btn">
            <button type="button" @click="displayForm = 2" class="btn-back">retour</button>
            <button type="button" @click="displayForm = 4" class="btn-next">suivant</button>
          </div>
        </div>


        <div v-if="displayForm == 4">
          <FinalForm
            v-model:sellerType="sellerType"
            v-model:location="location"
          />
          <div class="div-btn">
            <button type="button" @click="displayForm = 3" class="btn-back">retour</button>
            <button type="submit" class="btn-next" @click="$emit('showdisplay')">terminer</button>
          </div>
        </div>


      </form>
    </div>
    <div>
      <ProductCard :product="product"/>
    </div>

  </div>
</template>

<script setup>

  import { ref, onMounted } from "vue";
  import axios from "axios";
  import FirstForm from "@/components/PostAndAdd/First-form.vue";
  import SecondForm from "@/components/PostAndAdd/Second-form.vue";
  import ThirdForm from "@/components/PostAndAdd/Third-form.vue";
  import FinalForm from "@/components/PostAndAdd/Final-form.vue";
  import ProductCard from "@/components/ProductCard.vue";

  const product = ref({
    titre: "",
    theme: "",
    id_categorie: null,
    description: "",
    image: "",
    state: "",
    prix: null,
    sellerType: "",
    location: ""
  })
  const titre = ref("");
  const theme = ref("");
  const id_categorie = ref("");
  const description = ref("");
  const image = ref("");
  const state = ref("");
  const prix = ref("");
  const sellerType = ref("");
  const location = ref("");
  const categories = ref([]);
  const thematiques = ref([]);
  const communes = ref([]);
  const displayForm = ref(1);

  const fetchCommunes = async () => {
    try {
      const response = await fetch('https://geo.api.gouv.fr/communes?fields=nom&format=json&geometry=centre');
      const data = await response.json();
      communes.value = data.map(commune => commune.nom);
    } catch (error) {
      console.error('Erreur lors de la récupération des communes:', error);
    }
  };

  onMounted(() => {
    // Charger les catégories et thématiques depuis ton API
    axios.get("http://localhost:3000/api/products/categories")
      .then(res => {
        categories.value = res.data;
      })
      .catch(err => console.error(err));

    axios.get("http://localhost:3000/api/products/thematiques")
      .then(res => {
        thematiques.value = res.data;
      })
      .catch(err => console.error(err));

    // Charger les communes depuis l'API française
    fetchCommunes();
  });

  const addproduct = async () => {
    try {
      const res = await axios.post(
        `${process.env.VUE_APP_API_URL}/products/addProduct`,
        { titre: titre.value, description: description.value, prix: prix.value, id_categorie: id_categorie.value, theme: theme.value, location: location.value, state: state.value, sellerType: sellerType.value }
      );
      alert("Connexion réussie ");
      this.$router.push("/");
      setTimeout(() => window.location.reload(), 500)
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors de l'ajout ❌");
    }
  };
</script>





<style>

  .containerPostAndAdd{
    height: 680px;
    display: grid;
    grid-template-columns: 60% 40% ;
  }

  .form{
    padding: 0% 5% 5% 5%;
    width: 60%;
    display: grid;
    box-shadow: 5px 10px 10px rgba(0,0,0,0.1);
    border-radius: 16px;
    border-top: none;
  }

  .containerPostAndAdd::after {
    content: "";
    position: absolute;
    top: 300px;
    bottom: 100px;
    left: 55%;
    width: 1px;
    background-color: gray;
  }

  .div-btn{
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .btn-first{
    justify-self: center;
    justify-content: center;
    padding: 8px 20px;
    border-radius: 10px;
    background: rgba(0,0,0,0.1);
    color: #0d1b2a;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 16px;
  }

  .btn-next{
    justify-self: right;
    justify-content: right;
    padding: 8px 20px;
    border: 1px solid #444;
    border-radius: 10px;
    background: rgba(0,0,0,0.1);
    color: #0d1b2a;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: right;
    font-size: 16px;
  }

  .btn-back{
    justify-self: left;
    justify-content: left;
    padding: 8px 20px;
    border: 1px solid #444;
    border-radius: 10px;
    background: rgba(0,0,0,0.1);
    color: #0d1b2a;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: left;
    font-size: 16px;
  }

  .form-container{

    padding: 3% 0 0 10%;
    width: 80%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }



</style>