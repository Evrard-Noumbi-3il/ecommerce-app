<template>
  <div class="containerChatInput">
    <EmojiModal
      class="emojiModal"
      v-model:selectedEmoji="selectedEmoji"
      v-if="showEmojiModal"
      @addEmoji="message += selectedEmoji; showEmojiModal = false"
    />
    <button class="emojiButton" @click="showEmojiModal = !showEmojiModal">😊</button>
    <input
      type="text"
      v-model="message"
      placeholder="Type your message..."
    />
    <button @click="handleClick">➤</button>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import EmojiModal from './EmojiModal.vue';

const message = ref('');
const subject = ref('');
const showEmojiModal = ref(false);

const props = defineProps({
  selectedReceiver: {
    type: Object,
    required: false
  },
});

const emit = defineEmits(['updateReceiver']);

function handleClick (){
  sendMessage();
  emit('updateReceiver');
  message.value = '';
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
      content: message.value
    });
    console.log("Message envoyé avec succès :", response.data);
  } catch (error) {
    console.error("Erreur lors de l'envoi du message :", error);
  }
}
</script>

<style scoped>
  .containerChatInput{
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid #ccc;
    height: 30px;
  }
  input{
    flex: 1;
    height: 40px;
    border:none;
    margin-left: 100px;
    margin-right: 100px;
    align-self: center;
  }
  button{
    align-self: center;
    position: relative;
    right: 130px;
    cursor: pointer;
    background-color: white;
    border: none;
  }
  .emojiButton{
    position: relative;
    left: 20px;
  }
  .emojiModal{
    background-color: white;
    max-height: 200px;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>