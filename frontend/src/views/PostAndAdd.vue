<template>

  <div class="containerPostAndAdd">
    <div class="header">
      <h1>Ajouter une annonce</h1>
      <p>Publiez vos produits à vendre, louez ou échangez avec des acheteurs de confiance. Suivez les étapes simples pour créer une annonce complète et attractive.</p>
    </div>

    <div class="announce">
      <div class="preview-product">
        <ProductCard
          style="width: 100%; display: flex;"
          class="slide-in-left"
          :product="product"
          :imagePreview="imagePreview"
        ></ProductCard>
      </div>
      <div class="form-container slide-in-right">
        <form @submit.prevent="addproduct" class="form">
          <div v-if="displayForm == 1" class="form-element">
            <FirstForm
              v-model:titre="product.titre"
              v-model:theme="product.theme"
              v-model:id_categorie="product.id_categorie"
              v-model:nom_categorie="nom_categorie"
            />
            <button type="button" @click="displayForm = 2" class="btn-first">suivant</button>
          </div>

          <div v-if="displayForm == 2">
            <SecondForm
              v-model:titre="product.titre"
              v-model:description="product.description"
              v-model:state="product.state"
              v-model:image="product.image"
            />
            <div class="div-btn">
              <button type="button" @click="displayForm = 1" class="btn-back">retour</button>
              <button type="button" @click="displayForm = 3" class="btn-next">suivant</button>
            </div>
          </div>

          <div v-if="displayForm == 3">
            <ThirdFrom
              class="slide-in-top"
              v-model:fileInput="fileInput"
              v-model:imagePreview="imagePreview"
              v-model:btns="btns"
            />
            <div class="div-btn">
              <button type="button" @click="displayForm = 2" class="btn-back">retour</button>
              <button type="button" @click="displayForm = 4" class="btn-next">suivant</button>
            </div>
          </div>

          <div v-if="displayForm == 4">
            <FourthForm
              class="slide-in-top"
              v-model:prix="product.prix"
            />
            <div class="div-btn">
              <button type="button" @click="displayForm = 3" class="btn-back">retour</button>
              <button type="button" @click="displayForm = 5" class="btn-next">suivant</button>
            </div>
          </div>




          <div v-if="displayForm == 5">
            <FinalForm
              class="slide-in-top"
              v-model:sellerType="product.sellerType"
              v-model:location="product.location"
            />
            <div class="div-btn">
              <button type="button" @click="displayForm = 4" class="btn-back">retour</button>
              <button type="submit" class="btn-next">terminer</button>
            </div>
          </div>


        </form>
      </div>
    </div>







  </div>
</template>

<script setup>

  import { ref, onMounted } from "vue";
  import axios from "axios";
  import FirstForm from "@/components/PostAndAdd/First-form.vue";
  import SecondForm from "@/components/PostAndAdd/Second-form.vue";
  import ThirdFrom from "@/components/PostAndAdd/Third-from.vue";
  import FourthForm from "@/components/PostAndAdd/Fourth-form.vue";
  import FinalForm from "@/components/PostAndAdd/Final-form.vue";
  import ProductCard from "@/components/ProductCard.vue";
  import { useRouter } from "vue-router";

  const router = useRouter();
  const product = ref({
    titre: "",
    theme: "",
    id_categorie: "",
    description: "",
    image: "",
    state: "",
    prix: null,
    sellerType: "",
    location: ""
  })
  const fileInput = ref([]);
  const imagePreview = ref([]);
  const btns = ref([{}, {}]);
  const nom_categorie = ref("");
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
      const token = localStorage.getItem("token");
      const id = JSON.parse(atob(token.split('.')[1])).id;
      const response = await axios.post(`${process.env.VUE_APP_API_URL}/products/addProduct`, {
        userId: id,
        titre: product.value.titre,
        description: product.value.description,
        prix: product.value.prix,
        id_categorie: product.value.id_categorie,
        theme: product.value.theme,
        location: product.value.location,
        state: product.value.state,
        sellerType: product.value.sellerType
      });
      if (response.status === 201) {
        console.log("ID du produit ajouté :", product.value._id);
        product.value._id = response.data.produit._id;
        console.log("ID du produit ajouté :", product.value._id);
        router.push("/");
        window.location.reload();
      }
    } catch (err) {
      alert(err.response?.data?.message || "Une erreur est survenue lors de l'ajout du produit.");
      console.error(err);
    }
  };



</script>





<style>



  .containerPostAndAdd {
    margin-bottom: 200px;
    padding: 5% 0 0% 0;
    width: 100%;
    height: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .form{
    padding: 0% 5% 5% 5%;
    width: 60%;
    height: auto;
    max-width: 100%;
    display: grid;
    border: 1px solid rgba(34, 52, 74, 0.366);
    border-radius: 16px;
    border-top: none;
  }



  .header{
    padding: 1% 5% 1% 10%;
    width: 100%;
    max-width: 100%;
    border: 3px solid rgba(34, 52, 74, 0.366);
    border-radius: 16px;
    align-self: center;
    color: black;
    font-size: 20px;
    text-align: center;
  }

  .slide-in-left {
    animation: slideInFromLeft 1s ease-out;
  }

  .slide-in-right {
    animation: slideInFromRight 1s ease-out;
  }

  @keyframes slideInFromRight {
    0% {
      transform: translate3D(30%, 0, 0);
      opacity: 0;
    }
    100% {
      transform: translate3D(0, 0, 0);
      opacity: 1;
    }
  }

  @keyframes slideInFromLeft {
    0% {
      transform: translate3D(-30%, 0, 0);
      opacity: 0;
    }
    100% {
      transform: translate3D(0, 0, 0);
      opacity: 1;
    }
  }

  @keyframes slideInFromTop {
    0% {
      transform: translate3D(0, -10%, 0);
      opacity: 0;
    }
    100% {
      transform: translate3D(0, 0, 0);
      opacity: 1;
    }
  }

  .slide-in-top {
    animation: slideInFromTop 0.5s linear ;
  }

  .announce{
    display: flex;
    width: 100%;
    padding: 10% 0 5% 0;
    position: relative;
  }

  .containerPostAndAdd::after {
    content: "";
    position: absolute;
    top: 700px;
    bottom: 150px;
    left: 60%;
    width: 1px;
    background-color: rgba(0, 0, 0, 0.237);
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
    padding: 0 0 0 5%;
    width: 1980px;
    display: flex;
    justify-content: center;
    align-items: self-start;
  }

  .preview-product{
    padding: 0 5% 0 5%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: self-start;
  }







</style>