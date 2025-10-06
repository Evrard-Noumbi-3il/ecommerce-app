<template>


  <p>Insérez des images!</p>

  <div class="form-content">

    <div class="btn-upload-container">

      <span
      v-for="(btn, i) in btns"
      :key="i"
      class="btn-upload"
      @click="choosePath(i)"
      >
        <span v-if="!imagePreview[i] && i == 0" style="display: flex; justify-content: center; align-items: center; text-align: center; font-size: 12px; color:black">photo de couverture</span>
        <span v-if="!imagePreview[i] && i != 0">+</span>
        <img v-if="imagePreview[i]" :src="imagePreview[i]" alt="Aperçu de l'image" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;"/>
      </span>

    </div>

    <input type="file" ref="fileInputRef" style="display: none;" @change="handleChange"  accept="image/*"/>





  </div>
</template>

<script setup>
  import { ref } from "vue";

  const props = defineProps({
    image: String,
  })
  const emit = defineEmits(['update:image']);
  const i = ref(0);
  const fileInputRef = ref(null);
  const fileInput = ref([]);

  const btns = ref([{},{}]);
  const imagePreview = ref([]);

  const choosePath = (index) => {
    fileInputRef.value.click();
    console.log("Bouton + cliqué");
  };


  const handleChange = () => {
    onFileChange();
    if(fileInput.value.length >= 2){
      addBtnUpload();
    }

  };

  const onFileChange = () => {
    const files = fileInputRef.value.files;
    console.log("Fichiers sélectionnés :", files);

    if (files.length > 0) {
      fileInput.value.push(files[0]);
      console.log("fileInput maintenant :", fileInput.value);

      emit('update:image', fileInput.value);
    }
    imagePreview.value.push(URL.createObjectURL(files[0]));
  };

  const addBtnUpload = () => {
    btns.value.push({});
  };


</script>

<style scoped>

  .form-content {
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
    align-items: center;
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
    display: grid;
    grid-template-rows: 38px 30px;
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
    text-align: center;
  }

  .btn-upload-container{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 15px;

  }

  .btn-upload{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 90px;
    border: 1px solid rgba(34, 52, 74, 0.2);
    color:whitesmoke;
    width: 112px;
    height: 112px;
    border-radius: 8%;
    cursor: pointer;
    overflow: hidden;
  }

</style>
