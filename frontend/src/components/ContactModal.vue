<template>

  <div class= "container" @click.self="$emit('close-Contact')">
    <div class="cardContainer">
      <h2>Contact</h2>

      <select
        class="input-contact"
        v-model="subject"
      >
        placeholder="Sujet de votre message"
      >
        <option value="" disabled selected>Sujet de votre message</option>
        <option value="Demande d'information">Demande d'information</option>
        <option value="Intéressé mais souhaite négocier">Intéressé mais souhaite négocier</option>
        <option value="feedback">Retour d'expérience</option>
        <option value="Autre">Autre</option>
      </select>

      <textarea
        v-model="message"
        class="textarea-contact input-contact"
        placeholder="Votre message ici..."
        rows="10"
      ></textarea>

      <button class="buton-contact"
        @click="sendMessage(); $emit('close-Contact')">
        Envoyer
      </button>
    </div>
  </div>


</template>
<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';


const subject = ref('');
const message = ref('');

const props = defineProps({
  userSellerId: {
    type: String,
    required: true
  },
  productId: {
    type: String,
    required: true
  }
});

const sendMessage = async () => {
  try {
    const token = localStorage.getItem('token');
    const id = JSON.parse(atob(token.split('.')[1])).id;
    console.log("l'id du vendeur est", props.userSellerId);
    const response = await axios.post(`${process.env.VUE_APP_API_URL}/chat/send`, {
      senderId: id,
      receiverId: props.userSellerId,
      subject: subject.value,
      content: message.value,
      product: props.productId
    });
    console.log("Message envoyé avec succès :", response.data);
  } catch (error) {
    console.error("Erreur lors de l'envoi du message :", error);
  }
}


</script>

<style scoped>

  .container{
    padding-bottom: 50px;
    position: fixed;
    top: 0px;
    left: 0;
    justify-self: center;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-family: Arial;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .cardContainer{
    border-radius: 15px;
    padding: 20px 30px 50px 30px;
    background-color: white;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    width: 25%;
    /* height: 600px; */
  }
  .input-contact{
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    width: 100%;
    font-size: 14px;
    transition: border 0.3s ease, box-shadow 0.3s ease;
    justify-self: center;
    margin-top: 20px;
  }
  .textarea-contact{
    resize: none;
    width: 92%;
  }

  .buton-contact{
    justify-self: center;
    justify-content: center;
    padding: 8px 20px;
    border-radius: 10px;
    background: #0d1b2a;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 16px;
    border: none;
    margin-top: 20px;
  }

</style>