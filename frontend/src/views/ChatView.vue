<template>

  <div class="containerChatView">
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
        v-model:selectedReceiver="selectedReceiver"
        @open-payment="handlePaiement($event)"
        @updateReceiver="updateReceiver"
      />
      <ChatInput
        v-if="selectedReceiver"
        @updateReceiver="updateReceiver"
        @showEmojiModal="showEmojiModal = !showEmojiModal"
        :selectedReceiver="selectedReceiver"
      />
      <PaiementModal
        :product="product"
        v-if="showPaiementModal"
        @close-paiement="showPaiementModal = false"
      />

      </div>
    </div>
  </div>
</template>

<script setup>

import ChatSideBar from '../components/ChatSideBar.vue';
import ChatHeader from '../components/ChatHeader.vue';
import ChatMessages from '../components/ChatMessages.vue';
import ChatInput from '../components/ChatInput.vue';
import PaiementModal from '@/components/PaiementModal.vue';

import axios from 'axios';
import { onMounted, ref, onUnmounted } from 'vue';


const receivers = ref([]);
const selectedReceiver = ref(null);
const showEmojiModal = ref(false);
const showPaiementModal = ref(false);
const prix = ref(0);
const product = ref({
  titre: "",
  theme: "",
  id_categorie: "",
  description: "",
  image: "",
  state: "",
  prix: null,
  sellerType: "",
  location: ""
})

let intervalId = null;
const REFRESH_INTERVAL = 5000;

const handlePaiement = (prixOffer) => {
  product.value = selectedReceiver.value.product;
  product.value.prix = prixOffer;
  showPaiementModal.value = true;
}
onMounted(() => {
  getChatListReceiver();
  intervalId = setInterval(() => {
    updateReceiver();  // ta fonction
  }, REFRESH_INTERVAL);
});

onUnmounted(() => {
  clearInterval(intervalId);
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

}

</style>