<template>
  <div class="containerChatMessages">
    <div v-if="selectedReceiver">
      <div v-for="message in selectedReceiver.chat.messages" :key="message.id" class="messages">
        <p style="margin: 0; display: flex; justify-self: flex-start; background-color: #667eea; color: white;" v-if="message.sender === userId">{{ message.content }}</p>
        <p style="margin: 0; display: flex; justify-self: flex-end;background-color: #764ba2; color: white;" v-else>{{ message.content }}</p>
      </div>
    </div>
    <div v-else>
      <p style="align-self: center;">Veuillez sélectionner un chat</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  selectedReceiver: {
    type: Object,
    required: false
  }
});

const token = localStorage.getItem('token');
const userId = JSON.parse(atob(token.split('.')[1])).id;
</script>

<style scoped>
  .containerChatMessages{
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 50px 70px 20px 50px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid #ccc;

    max-height: 550px;
    overflow-y: auto;
    overflow-x: hidden;

  }
  .messages{
    padding: 10px 140px 10px 70px;
    border-radius: 8px;
    text-wrap: wrap;
  }
  p{
    background-color: #f1f0f0;
    padding: 10px;
    border-radius: 8px;
  }
</style>