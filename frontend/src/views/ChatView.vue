<template>


  <div class="containerChat">
    <ChatSideBar
      :receivers="receivers"
      v-model:selectedReceiver="selectedReceiver"
    />
    <div class="chatWindow">
      <ChatHeader
        :selectedReceiver="selectedReceiver"
      />
      <ChatMessages
        :selectedReceiver="selectedReceiver"
      />
      <ChatInput
        v-if="selectedReceiver"
        @updateReceiver="updateReceiver"
        :selectedReceiver="selectedReceiver"
      />
    </div>
  </div>
</template>

<script setup>

import ChatSideBar from '../components/ChatSideBar.vue';
import ChatHeader from '../components/ChatHeader.vue';
import ChatMessages from '../components/ChatMessages.vue';
import ChatInput from '../components/ChatInput.vue';

import axios from 'axios';
import { onMounted, ref } from 'vue';


const receivers = ref([]);
const selectedReceiver = ref(null);

onMounted(() => {
  getChatListReceiver();
});

const getChatListReceiver = async () => {
  try {
    const token = localStorage.getItem('token');
    const userId = JSON.parse(atob(token.split('.')[1])).id;
    const response = await axios.get(`${process.env.VUE_APP_API_URL}/chat/getChatListReceiver`,{
      params: { userId: userId }
    });
    receivers.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de la liste de discussion :", error.response);
  }
};

const updateReceiver = async () => {
  await getChatListReceiver();
  console.log("Avant mise à jour :", selectedReceiver.value);
  for(let i = 0; i < receivers.value.length; i++) {
    if(receivers.value[i]._id === selectedReceiver.value._id) {
      selectedReceiver.value = receivers.value[i];
      console.log("Receivers mis à jour :", receivers.value[i]);
      break;
    }
  }

  console.log("Après mise à jour :", selectedReceiver.value);
}
</script>

<style scoped>
.containerChat{
  display: grid;
  grid-template-columns: 20% 80%;
  margin-bottom: 20px;
}
.chatWindow{
  display: grid;
  width: 100%;
  max-width: 100%;
  grid-template-rows: 15% 77% 8%;
}

</style>