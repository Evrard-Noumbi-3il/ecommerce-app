<template>


  <p>Insérez des images!</p>

  <div class="form-content">

      <span @click="choosePath" class="btn-upload">+</span>

      <input type="file" ref="fileInputRef" style="display: none;">





  </div>
</template>

<script setup>
  import { ref } from "vue";

  const props = defineProps({
    image: String,
  })
  const emit = defineEmits(['update:image']);

  const fileInputRef = ref(null);
  const fileInput = ref([]);


  const choosePath = () => {
    fileInputRef.value.click();
    fileInput.value.push(fileInputRef.value.files[0]);
    emit('update:image', fileInput);
  };
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
    top: -40px;
    left: -8px;
    font-size: 30px;
    background-color:  #0d1c2b;
    color: white;
    border-radius: 5px;
    padding: 0 0 0 82px;
  }

  label{
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    unicode-bidi: isolate;
  }

  .btn-upload{
    font-size: 90px;
    border: 3px solid rgba(34, 52, 74, 0.2);
    color:whitesmoke;
    padding: 0px 20px 0px 20px;
    border-radius: 8%;
    cursor: pointer;
  }

</style>
