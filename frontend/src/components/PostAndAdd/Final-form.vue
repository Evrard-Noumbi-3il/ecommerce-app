<template>
  <p >Vous y êtes presque!</p>
  <div class="form-content">
    <div class="label-select">
      <label>Type de vente* :</label>
      <select
        @input="$emit('update:sellerType', $event.target.value)"
        :value="sellerType"
        list="seller-list"
        placeholder="Choisissez un type"
        class="input-postad-select"
      >
        <option value="particulier">Particulier</option>
        <option value="professionnel">Professionnel</option>
      </select>
      <!-- <datalist id="seller-list" >
        <option value="particulier">Particulier</option>
        <option value="professionnel">Professionnel</option>
      </datalist> -->
    </div>

    <div class="label-input">
      <label>Localisation* :</label>
      <input
        @input="$emit('update:location', $event.target.value)"
        :value="location"
        list="communes-list"
        placeholder="Commencez à taper..."
        class="input-postad-text">
      <datalist id="communes-list">
        <option v-for="localisation in communes" :key="localisation" :value="localisation"></option>
      </datalist>
    </div>
  </div>


</template>
<script setup>

import { ref } from "vue";
import { onMounted } from "vue";

  const props = defineProps({
    sellerType: String,
    location: String
  })
  const emit = defineEmits(['update:sellerType', 'update:location'])

  const communes = ref([]);

  onMounted(() => {
    fetchCommunes();
  });

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
    fetchCommunes();
  });



</script>

<style scoped>
  .form-content {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 50px;
    margin-bottom: 50px;
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

  .label-input{
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .input-postad-text{
    border-radius: 6px;
    width: 100%;
    padding: 15px;
    border: 1px solid rgba(0,0,0,0.1);
    box-sizing: border-box;
  }

  p{
    position: relative;
    top: -12%;
    left: -8px;
    font-size: 30px;
    background-color:  #0d1c2b;
    color: white;
    border-radius: 5px;
    text-align: center;
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
</style>