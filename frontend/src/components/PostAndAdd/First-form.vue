<template>

    <p class="p-first">Commençons par l’essentiel !</p>

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

      <div class="label-input">
        <label>Choisissez une thématique* :</label>
        <input
          list="thematiques"
          :value="theme"
          @input="emit('update:theme', $event.target.value)"
          placeholder="Commencez à taper..."
          class="input-postad-text"
        />
        <datalist id="thematiques">
          <option v-for="them in thematiques" :key="them._id" :value="them.nom"></option>
        </datalist>
      </div>

      <div class="label-input">
        <label>Choisissez une catégories* :</label>
        <input
          list="categories"
          :value="id_categorie"
          @input="emit('update:id_categorie', Number($event.target.value))"
          placeholder="Commencez à taper..."
          class="input-postad-text">
        <datalist id="categories">
          <option v-for="cat in categories" :key="cat._id" :value="cat._id"></option>
        </datalist>
      </div>

    </div>



</template>

<script setup>

  import { ref, onMounted} from "vue";
  import axios from "axios";
  const props = defineProps({
    titre: String,
    theme: String,
    id_categorie: Number
  })

  const emit = defineEmits(['update:titre', 'update:theme', 'update:id_categorie'])


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
    left: -5px;
    font-size: 30px;
    background-color:  rgba(0,0,0,0.1);
    color: #0d1b2a;
    border-radius: 5px;
    padding: 0 0 0 31px;
  }

  .form-content{
    position: relative;
    top: -9%;
  }

  .label-input{
    display: grid;
    grid-template-rows: 38px 30px;
    margin-bottom: 30px;
  }

  .input-postad-text{
    border-radius: 6px;
    width: 100%;
    padding: 20px ;
    border: 1px solid rgba(0,0,0,0.1);
    box-sizing: border-box;
  }



  label{
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    unicode-bidi: isolate;
  }



</style>