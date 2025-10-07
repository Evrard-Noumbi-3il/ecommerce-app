<template>


  <p>Insérez des images!</p>

  <div class="form-content">

    <div class="btn-upload-container">

      <span
      v-for="(btn, i) in btnsLocal"
      :key="i"
      class="btn-upload"
      @click="choosePath(i)"
      >
        <span v-if="!imagePreviewLocal[i] && i == 0" style="display: flex; justify-content: center; align-items: center; text-align: center; font-size: 12px; color:black">photo de couverture</span>
        <span v-if="!imagePreviewLocal[i] && i != 0">+</span>
        <img v-if="imagePreviewLocal[i]" :src="imagePreviewLocal[i]" alt="Aperçu de l'image" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;"/>
      </span>

    </div>

    <input type="file" ref="fileInputRef" style="display: none;" @change="handleChange"  accept="image/*"/>





  </div>
</template>

<script setup>
  import { ref, defineProps, defineEmits } from "vue";

  const props = defineProps({
    fileInput: {
      type: Array,
      required: true
    },
    imagePreview: {
      type: Array,
      required: true,
    },
    btns: {
      type: Array,
      required: false,
      default: () => ([{},{}])
    }
  })
  const emit = defineEmits(['update:fileInput', 'update:imagePreview', 'update:btns']);
  const fileInputRef = ref(null);
  const localFileInput = ref([...props.fileInput]);
  const imagePreviewLocal = ref([...props.imagePreview]);
  const btnsLocal = ref([...props.btns]);

  const choosePath = (index) => {
    fileInputRef.value.click();
    console.log("Bouton + cliqué");
  };


  const handleChange = () => {
    onFileChange();
    if (localFileInput.value.length >= 2) {
      addBtnUpload();
    }
  };

  const onFileChange = () => {
    const files = fileInputRef.value.files;
    console.log("Fichiers sélectionnés :", files);

    if (files.length > 0) {
      localFileInput.value.push(files[0]);

      emit('update:fileInput', localFileInput.value);
    }
    const preview = URL.createObjectURL(files[0]);
    imagePreviewLocal.value.push(preview);
    emit('update:imagePreview', imagePreviewLocal.value);
    fileInputRef.value.value = null; // Réinitialiser l'input pour permettre la sélection du même fichier à nouveau
    console.log("Aperçu de l'image :", preview);
    console.log("Input de fichier local :", localFileInput.value);
    console.log("Aperçu local de l'image :", imagePreviewLocal.value);
  };

  const addBtnUpload = () => {
    btnsLocal.value.push({});
    emit('update:btns', btnsLocal.value);
    console.log("Bouton + ajouté");
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
