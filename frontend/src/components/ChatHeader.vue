<template>
  <div class="containerChatHeader">

    <p v-if="selectedReceiver">
      <img :src="selectedReceiver.photo" class="profilImage">
      {{ selectedReceiver.name }}
    </p>

  </div>
</template>

<script setup>
  defineProps({
    selectedReceiver: {
      type: Object,
      required: false
    }
  });
</script>


<style>

  .containerChatHeader{
    width: 100%;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid #ccc;
  }

  .profilImage{
    width:30px;
    height:30px;
    border-radius:50%;
    margin-right:10px;
    vertical-align: middle;
  }
</style>