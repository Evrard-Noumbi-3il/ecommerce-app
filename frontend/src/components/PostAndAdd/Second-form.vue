<template>

  <div>
    <p>Décrivez votre produit!</p>

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

        <div class="label-textarea">
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
  defineProps({
    titre: String,
    description: String,
    state: String,
    image: String
  })
  const emit = defineEmits(['update:titre', 'update:description', 'update:state', 'update:image'])
</script>

<style scoped>

  .form-content{
    display: flex;
    flex-direction: column;
    text-wrap: wrap;
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

  .label-textarea{
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

  textarea{
    border-radius: 6px;
    width: 100%;
    border: 1px solid rgba(0,0,0,0.1);
    height: 200px;
    padding: 15px;
    box-sizing: border-box;
    resize:none;
  }

  p{
    position: relative;
    top: -40px;
    left: -3px;
    font-size: 30px;
    background-color:  #0d1c2b;
    color: white;
    border-radius: 5px;
    text-align: center;
  }



</style>
