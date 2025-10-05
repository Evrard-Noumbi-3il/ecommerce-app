<template>

  <p>Fixez votre prix!</p>
    <div class="form-content">
      <label>Votre prix de vente* :</label>
      <div style="display: flex;">
        <input
          type="number"
          @input="emit('update:prix', $event.target.value)"
          :value="prix"
          placeholder="0.00"
          class="input-postad-number"
          required
        />
        <span
          style="border: 1px solid rgba(0,0,0,0.1); padding: 12px; border-radius: 0 16px 16px 0;"
        >
          €
        </span>
      </div>
    </div>



</template>
<script setup>

  import { ref } from "vue";

  const props = defineProps({
    prix: String
  })
  const emit = defineEmits(['update:prix'])
</script>

<style scoped>

  .form-content{
    position: relative;
    top: -9%;
  }
  p{
    position: relative;
    top: -20%;
    left: -8px;
    font-size: 30px;
    background-color:  #0d1c2b;
    color: white;
    border-radius: 5px;
    padding: 0 0 0 110px;
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

  .input-postad-number {
    flex: 1;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 16px 0 0 16px;
    border-right: none;
    padding: 12px;
    width: 100%;
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