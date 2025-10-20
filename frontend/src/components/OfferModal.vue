<template>

  <div class= "container" @click.self="$emit('close-offer')">
    <div class="cardContainer">
      <h2>Faire une offre</h2>

      <div style="display: flex;">
        <input
          type="number"
          v-model="prix"
          placeholder="0.00"
          class="input-offer"
          required
        />
        <span
          style="border: 1px solid rgba(0,0,0,0.1); padding: 10px; border-radius: 0 16px 16px 0; display: flex; align-items: center;"
        >
          €
        </span>
      </div>

      <button class="buton-offer"
        @click="sendMessage(); $emit('close-offer')">
        Envoyer
      </button>
    </div>
  </div>


</template>
<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';


const subject = ref('Offre d\'achat');
const prix = ref('');

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
      content: "je suis intéressé par votre produit, je vous fait une offre de :",
      prix: prix.value,
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


  .buton-offer{
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

  .input-offer {
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 16px 0 0 16px;
    border-right: none;
    padding: 20px;
    width: 100%;
    font-size: 14px;
    transition: border 0.3s ease, box-shadow 0.3s ease;

  }

</style>