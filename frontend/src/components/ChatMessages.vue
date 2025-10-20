<template>
  <div class="containerChatMessages">
    <div v-if="selectedReceiver">
      <div class="headerChatMessages" style="margin-bottom: 20px;">
        <h2 v-if="selectedReceiver.product">Chat relatif au produit {{ selectedReceiver.product.titre }}</h2>
      </div>
      <div v-for="message in selectedReceiver.chat.messages" :key="message.id" class="messages">
        <div class="message" style="margin: 0; display: flex; justify-self: flex-start; background-color: #667eea; color: white;" v-if="message.sender === userId">
          <div class="messageHeader" v-if="message.subject">
            {{ message.subject }}
          </div>
          <div>
              {{ message.content }}
          </div>
          <div class="messageBottom" v-if="message.prix">
            <div class="prix">
              {{ message.prix }} €
            </div>
          </div>
        </div>
        <div class="message" style="margin: 0; display: flex; justify-self: flex-end;background-color: #764ba2; color: white;" v-else>
          <div class="messageHeader" v-if="message.subject">
            {{ message.subject }}
          </div>
          <div>
              {{ message.content }}
          </div>
          <div class="messageBottom" v-if="message.prix">
            <div class="prix">
              {{ message.prix }} €
            </div>
            <div class="buttonsOffer" v-if="message.subject === 'Offre d\'achat'">
              <button class="buttonRefuse" >
                Refuser l'offre
              </button>
              <button class="buttonAccept" @click="handleAcceptOffer(message.prix)">
                Accepter l'offre
              </button>
            </div>
            <div class="buttonsOffer" v-else>
              <button class="buttonAccept" @click="$emit('open-payment', message.prix)">
                payer
              </button>
            </div>


          </div>
        </div>

      </div>
    </div>
    <div v-else>
      <p style="align-self: center;">Veuillez sélectionner un chat</p>
    </div>

  </div>
</template>

<script setup>

import axios from 'axios';
import { ref } from 'vue';

const props = defineProps({
  selectedReceiver: {
    type: Object,
    required: false
  },
  showEmojiModal: {
    type: Boolean,
    required: false
  },
  selectedEmoji: {
    type: String,
    required: false
  },
  product: {
    type: Object,
    required: false
  }
});

const subject = ref('');
const message = ref('');
const prix = ref('');
const token = localStorage.getItem('token');
const userId = JSON.parse(atob(token.split('.')[1])).id;
const emit = defineEmits(['updateReceiver']);

const handleAcceptOffer = async (prixOffre) => {
  try {
    prix.value = prixOffre;
    subject.value = 'Acceptation de l\'offre';
    message.value = 'Votre offre a été acceptée.';
    sendMessage();
    emit('updateReceiver');
  } catch (error) {
    console.error("Erreur lors de l'acceptation de l'offre :", error);
  }
}
const sendMessage = async () => {
  try {
    const token = localStorage.getItem('token');
    const id = JSON.parse(atob(token.split('.')[1])).id;
    console.log("l'id du vendeur est", props.userSellerId);
    const response = await axios.post(`${process.env.VUE_APP_API_URL}/chat/send`, {
      senderId: id,
      receiverId: props.selectedReceiver._id,
      subject: subject.value,
      content: message.value,
      product: props.productId,
      prix: prix.value
    });
    console.log("Message envoyé avec succès :", response.data);
  } catch (error) {
    console.error("Erreur lors de l'envoi du message :", error);
  }
}

</script>

<style scoped>
  .containerChatMessages{
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 50px 70px 20px 50px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid #ccc;
    background-color: whitesmoke;

    max-height: 630px;
    overflow-y: auto;
    overflow-x: hidden;

  }
  .messages{
    padding: 10px 140px 10px 70px;
    border-radius: 8px;
    text-wrap: wrap;
  }
  .message{
    background-color: #f1f0f0;
    padding: 10px;
    border-radius: 8px;
    color: white;
    margin: 0;
    display: flex;
    flex-direction: column;
  }
  p{
    text-align: center;
  }
  .headerChatMessages{
    padding: 20px 20px 20px 20px;
    border-bottom: 1px solid #ccc;
    width: 85%;
    justify-content: center;
    display: flex;
  }
  .messageHeader{
    font-weight: bold;
    margin-bottom: 5px;
    text-align: center;
    font-size: 20px;
  }
  .messageBottom{
    margin-top: 10px;
    font-weight: bold;
    text-align: center;
    font-size: 20px;
  }
  .buttonAccept{
    transition: background-color 0.3s ease;
    padding: 5px 10px;
    border-radius: 5px;
    background-color: #0d1b2a;
    color: white;
    border: none;
    cursor: pointer;
  }
  .buttonAccept:hover{
    background-color: #667eea;
  }
  .buttonRefuse{
    transition: background-color 0.3s ease;
    padding: 5px 10px;
    border-radius: 5px;
    background-color: #f44336;
    color: white;
    border: none;
    cursor: pointer;
    margin-right: 10px;
  }
  .buttonRefuse:hover{
    background-color: #e57373;
  }
  .buttonsOffer{
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
  }
</style>