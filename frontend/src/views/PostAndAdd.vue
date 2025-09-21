<template>

  <div class="containerPostAndAdd">
    <div class="form-container">
      <form class="form">
        <div style="display: grid; grid-template-rows: 22px 30px; margin-bottom: 50px;">
          <label>Quel est le titre de l'annonce?*</label>
          <input
            type="text"
            v-model="name"
            placeholder="Ex: Babyfoot "
            class="input-postad"
            required
          />
        </div>
        <div style="display: grid; grid-template-rows: 22px 30px; margin-bottom: 50px;">
          <label for="couleur">Choisissez une catégorie* :</label>
          <select id="couleur" name="couleur">
            <option v-for="cat in categories" :key="cat._id" :value="cat.name">
              {{ cat.name }}
            </option>
          </select>
        </div>



      </form>
    </div>
    <div>
      <p>test</p>
    </div>

  </div>
</template>

<script>
  import axios from "axios";
  export default {
  name: "PostAndAdd",
  data() {
    return {
      name: "",
      selectedCategory: "",
      categories: []
    };
  },
  mounted() {
    // Charger les catégories depuis l'API
    axios.get("http://localhost:5000/api/categories")
      .then(res => {
        this.categories = res.data;
      })
      .catch(err => console.error(err));
  }
};
</script>


<style>

  .containerPostAndAdd{
    margin: 80px 0px 0px 0px;
    display: grid;
    grid-template-columns: 60% 40% ;
  }


  .form{
    width: 80%;
    margin: 150px 0px 0px 70px;
    display: grid;
  }

  .input-postad, select{
    border-radius: 16px;
    width: 40%;
    padding: 20px ;
    border: 1px solid gray;
  }

  .containerPostAndAdd::after {
  content: "";
  position: absolute;
  top: 200px;
  bottom: 50px;
  left: 55%; /* pile au milieu de la grille */
  width: 1px;
  background-color: black;
}



</style>