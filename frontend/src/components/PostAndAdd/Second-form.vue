<template>

  <div>
    <p >Décrivez votre produit!</p>

      <div class="form-content">
        <div class="label-input">
          <label>le titre de l'annonce?*</label>
          <input
            type="text"
            :value="titre"
            @input="emit('update:titre', $event.target.value)"
            placeholder="Ex: Babyfoot "
            class="input-postad-text"
            required
          />
        </div>

        <div style="display: grid; ;margin-bottom: 30px; grid-template-rows: 38px; ">
          <label>Description de l'annonce*</label>
          <textarea
            @input="emit('update:description', $event.target.value)"
            :value="description"
            placeholder="Décrivez votre produit en détail..."
          > </textarea>
        </div>

        <div style="display: grid; grid-template-columns: 30% 35% 35%;">
          <label class="filter-label">État* :</label>
          <label>
            <input
              type="radio"
              :checked="state === 'neuf'"
              @input="emit('update:state', $event.target.value)"
              value="neuf"
              name="etat"
            />
            <span>Neuf</span>
          </label>
          <label>
            <input
              type="radio"
              :checked="state === 'occasion'"
              @input="emit('update:state', $event.target.value)"
              value="occasion"
              name="etat"/>
            <span>Occasion</span>
          </label>
        </div>
            <!-- <div style="display: grid; grid-template-rows: 35px 30px">
              <label for="imageUpload">Ajouter une photo :</label>
              <input type="file"/>
            </div> -->
      </div>


  </div>
</template>

<script setup>
  import { ref } from "vue";

  const props = defineProps({
    titre: String,
    description: String,
    state: String,
    image: String
  })
  const emit = defineEmits(['update:titre', 'update:description', 'update:state', 'update:image'])
</script>

<style scoped>

  .form-content{
    position: relative;
    top: -9%;
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
    display: grid;
    grid-template-rows: 38px 30px;
    margin-bottom: 30px;
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

  p{
    position: relative;
    top: -15%;
    left: -8px;
    font-size: 30px;
    background-color:  rgba(34, 52, 74, 0.366);
    color: #0d1b2a;
    border-radius: 5px;
    padding: 0 0 0 70px;
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
