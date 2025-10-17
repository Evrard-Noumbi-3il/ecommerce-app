<template>

    <p>Commençons par l’essentiel !</p>

    <div class="form-content">

      <div class="label-input">
        <label>Quel est le titre de l'annonce?*</label>
        <input
          type="text"
          :value="titre"
          @input="emit('update:titre', $event.target.value)"
          placeholder="Ex: Babyfoot "
          class="input-postad-text"
          required
          />
      </div>

      <div class="label-select">
        <label>Choisissez une thématique* :</label>
        <select
          :value="theme"
          @change="emit('update:theme', $event.target.value); selectedCategory($event)"

          class="input-postad-select"
        >
          <option value="" disabled selected>Choisissez une thématique</option>
          <option v-for="them in thematiques" :key="them._id" :value="them.nom">
            {{ them.nom }}
          </option>
        </select>
        <!-- <datalist id="thematiques">
          <option v-for="them in thematiques" :key="them._id" :value="them.nom"></option>
        </datalist> -->
      </div>

      <div class="label-select">
        <label>Choisissez une catégories* :</label>
        <select
          :value="nom_categorie"
          @input="emit('update:nom_categorie', $event.target.value), updateCategorie($event)"
          placeholder="Commencez à taper..."
          class="input-postad-select"
        >
          <option value="" disabled selected>Choisissez une catégorie</option>
          <option v-for="cat in categoriefiltred" :key="cat._id" :value="cat.nom">
            {{ cat.nom }}
          </option>
        </select>
        <!-- <datalist id="categories">
          <option v-for="cat in categoriefiltred" :key="cat._id" :value="cat.nom"></option>
        </datalist> -->
      </div>

    </div>



</template>

<script setup>

  import { ref, onMounted} from "vue";
  import axios from "axios";
  defineProps({
    titre: String,
    theme: String,
    id_categorie: String,
    nom_categorie: String
  })
  const categories = ref([]);
  const categoriefiltred = ref([]);
  const thematiques = ref([]);

  const emit = defineEmits(['update:titre', 'update:theme', 'update:id_categorie', 'update:nom_categorie']);


  const updateCategorie = (event) => {
    const selectedCategory = categories.value.find(cat => cat.nom === event.target.value);
    if (selectedCategory) {
      emit('update:id_categorie', selectedCategory._id);
    } else {
      emit('update:id_categorie', '');
    }
  };

  const selectedCategory = (event) => {
    const selectedTheme = thematiques.value.find(them => them.nom === event.target.value);
    categoriefiltred.value = [];
    if (selectedTheme)  {
      for (const cat of categories.value) {
        if (cat.id_thematique === selectedTheme._id) {
          categoriefiltred.value.push(cat);
        }
      }
    }
  };

  onMounted(() => {

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
  });


</script>

<style scoped>

  p{
    position: relative;
    top: -9%;
    font-size: 30px;
    background-color:  #0d1c2b;
    color: white;
    border-radius: 5px;
    text-align: center;
  }

  .form-content{
    display: flex;
    flex-direction: column;
    text-wrap: wrap;
    gap: 50px;
    margin-bottom: 50px;
  }


  .label-input{
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .label-select{
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .input-postad-select{
    border-radius: 6px;
    width: 100%;
    padding: 15px 10px 15px 10px;
    border: 1px solid rgba(0,0,0,0.1);
    box-sizing: border-box;
  }

  .input-postad-text{
    border-radius: 6px;
    width: 100%;
    padding: 15px;
    border: 1px solid rgba(0,0,0,0.1);
    box-sizing: border-box;
  }





</style>