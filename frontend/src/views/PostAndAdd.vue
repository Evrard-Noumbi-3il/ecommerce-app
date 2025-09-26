<template>

  <div class="containerPostAndAdd">
    <div class="form-container">

      <form @submit.prevent="addproduct" class="form">
        <div v-if="showfirst">
          <p  style="position: relative; top: -10%; left: -5px; font-size: 30px; background-color:  rgba(0,0,0,0.1); color: #0d1b2a; border-radius: 5px; padding: 0 0 0 31px;">Commençons par l’essentiel !</p>
          <div style="position: relative; top: -9%;">
            <div style="position: relative;display: grid; grid-template-rows: 38px 30px; margin-bottom: 30px;">
              <label>Quel est le titre de l'annonce?*</label>
              <input
                type="text"
                v-model="titre"
                placeholder="Ex: Babyfoot "
                class="input-postad-text"
                required
              />

            </div>
            <div style="display: grid; grid-template-rows: 38px 30px; margin-bottom: 30px;">
              <label>Choisissez une thématique* :</label>
              <input list="thematiques" v-model="theme" placeholder="Commencez à taper..." class="input-postad-text">
              <datalist id="thematiques">
                <option v-for="them in thematiques" :key="them._id" :value="them.nom"></option>
              </datalist>
            </div>
            <div style="display: grid; grid-template-rows: 38px 30px; margin-bottom: 50px;">
              <label>Choisissez une catégories* :</label>
              <input list="categories" v-model="id_categorie" placeholder="Commencez à taper..." class="input-postad-text">
              <datalist id="categories">
                <option v-for="cat in categories" :key="cat._id" :value="cat._id"></option>
              </datalist>
            </div>

          </div>
          <button type="button" @click='showfirst=false; showsecond=true' class="btn-first">suivant</button>
        </div>

        <div v-if="showsecond">
          <p style="position: relative; top: -8%; left: -8px; font-size: 30px; background-color:  rgba(0,0,0,0.1); color: #0d1b2a; border-radius: 5px; padding: 0 0 0 70px;">Décrivez votre produit!</p>
          <div style="position: relative; top: -9%;">
            <div style="position: relative;display: grid; grid-template-rows: 38px 30px; margin-bottom: 30px;">
              <label>le titre de l'annonce?*</label>
              <input
                type="text"
                v-model="titre"
                placeholder="Ex: Babyfoot "
                class="input-postad-text"
                required
              />

            </div>
            <div style="display: grid; ;margin-bottom: 30px; grid-template-rows: 38px; ">
              <label>Description de l'annonce*</label>
              <textarea v-model="description">

              </textarea>
            </div>

            <div style="display: grid; grid-template-columns: 30% 35% 35%;">
              <label class="filter-label">État* :</label>

              <label>
                <input type="radio" v-model="state" value="neuf" name="etat"/>
                <span>Neuf</span>
              </label>
              <label>
                <input type="radio" v-model="state" value="occasion" name="etat"/>
                <span>Occasion</span>
              </label>


            </div>
            <!-- <div style="display: grid; grid-template-rows: 35px 30px">
              <label for="imageUpload">Ajouter une photo :</label>
              <input type="file"/>
            </div> -->
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr;">
            <button type="button" @click='showfirst=true; showsecond=false' class="btn-back">retour</button>
            <button type="button" @click='showsecond=false; showthird=true' class="btn-next">suivant</button>
          </div>

        </div>

        <div v-if="showthird">
          <p style="position: relative; top: -18%; left: -8px; font-size: 30px; background-color:  rgba(0,0,0,0.1); color: #0d1b2a; border-radius: 5px; padding: 0 0 0 110px;">Fixez votre prix!</p>
          <div style="position: relative;top: -9%;display: grid; grid-template-rows:38px; margin-bottom: 30px;">
            <label>Votre prix de vente* :</label>
            <div style="display: flex;">
              <input
                type="number"
                v-model="prix"
                style="flex: 1; border: 1px solid rgba(0,0,0,0.1); border-radius: 16px 0 0 16px; border-right: none; padding: 12px; width: 100%;"
                required
              />
              <span
                style="border: 1px solid rgba(0,0,0,0.1); padding: 12px; border-radius: 0 16px 16px 0;"
              >
                €
              </span>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr;">
            <button type="button" @click='showsecond=true; showthird=false' class="btn-back">retour</button>
            <button type="button" @click='showthird=false; showfinal=true' class="btn-next">suivant</button>
          </div>

        </div>

        <div v-if="showfinal">

          <p style="position: relative; top: -14%; left: -8px; font-size: 30px; background-color:  rgba(0,0,0,0.1); color: #0d1b2a; border-radius: 5px; padding: 0 0 0 90px;">Vous y êtes presque!</p>
          <div style="position: relative;top: -9%;display: grid; grid-template-rows:38px 30px; margin-bottom: 30px;">
            <label>Type de vente* :</label>
            <input v-model="sellerType" list="seller-list" placeholder="Choisissez un type" class="input-postad-text">
            <datalist id="seller-list" >
              <option value="particulier">Particulier</option>
              <option value="professionnel">Professionnel</option>
            </datalist>

          </div>
          <div style="position: relative;top: -9%;display: grid; grid-template-rows:38px 30px; margin-bottom: 30px;">
            <label>Localisation* :</label>

            <input list="communes-list" v-model="location" placeholder="Commencez à taper..." class="input-postad-text">
            <datalist id="communes-list">
              <option v-for="localisation in communes" :key="localisation" :value="localisation"></option>
            </datalist>

          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr;">
            <button type="button" @click='showthird=true; showfinal=false' class="btn-back">retour</button>
            <button type="submit" class="btn-next" @click="$emit('showdisplay')">terminer</button>
          </div>


        </div>










      </form>
    </div>
    <div>

    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PostAndAdd",
  data() {
    return {
      titre: "",
      theme: "",
      id_categorie: "",
      description: "",
      state: "",
      prix: "",
      sellerType: "",
      location: "",

      categories: [],
      thematiques: [],
      communes: [],
      showfirst: true,
      showsecond: false,
      showthird: false,
      showfourth: false,
      showfinal: false
    };
  },
  mounted() {
    // Charger les catégories et thématiques depuis ton API
    axios.get("http://localhost:3000/api/products/categories")
      .then(res => {
        this.categories = res.data;
      })
      .catch(err => console.error(err));

    axios.get("http://localhost:3000/api/products/thematiques")
      .then(res => {
        this.thematiques = res.data;
      })
      .catch(err => console.error(err));

    // Charger les communes depuis l'API française
    this.fetchCommunes();
  },
  methods: {
    async fetchCommunes() {
      try {
        const response = await fetch('https://geo.api.gouv.fr/communes?fields=nom&format=json&geometry=centre');
        const data = await response.json();
        this.communes = data.map(commune => commune.nom);
      } catch (error) {
        console.error('Erreur lors de la récupération des communes:', error);
      }
    },

    async addproduct(){
      try{
        const res = await axios.post(
          `${process.env.VUE_APP_API_URL}/products/addProduct`,
          { titre: this.titre, description: this.description, prix: this.prix, id_categorie: this.id_categorie, theme: this.theme, location: this.location, state: this.state, sellerType: this.sellerType }
        );
        alert("Connexion réussie ");
        this.$router.push("/");
        setTimeout(() => window.location.reload(), 500)
      } catch (err) {
        alert(err.response?.data?.message || "Erreur lors de l'ajout ❌");
      }
    }
  }
};
</script>



<style>

  .containerPostAndAdd{
    height: 680px;
    display: grid;
    grid-template-columns: 60% 40% ;
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
    /* background: #0d1b2a; */
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

  .form{
    padding: 0% 5% 5% 5%;
    width: 60%;
    display: grid;
    box-shadow: 5px 10px 10px rgba(0,0,0,0.1);
    border-radius: 16px;
    border-top: none;


  }

  .input-postad-text, select{
    border-radius: 6px;
    width: 100%;
    padding: 20px ;
    border: 1px solid rgba(0,0,0,0.1);
    box-sizing: border-box;
  }

  textarea{
    border-radius: 6px;
    width: 100%;
    border: 1px solid rgba(0,0,0,0.1);
    height: 200px;


  }
  .input-postad-number {
    width: 80%;
    border: none;
    border-bottom: 1px solid gray;
  }

  .containerPostAndAdd::after {
  content: "";
  position: absolute;
  top: 300px;
  bottom: 100px;
  left: 55%; /* pile au milieu de la grille */
  width: 1px;
  background-color: gray;
}

 label{

    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    unicode-bidi: isolate;

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