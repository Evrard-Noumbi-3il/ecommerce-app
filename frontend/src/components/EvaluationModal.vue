<template>
    <div class="container" @click.self="$emit('close-evaluation')">
        <div class="modal-content">
            <h2>Évaluer le vendeur</h2>
            <div>
                <form class="evaluation-form" @submit.prevent="submitEvaluation(userSeller._id)">
                    <div
                        class="star-rating"
                        @mouseleave="hovered = 0"
                    >
                        <span
                            v-for="star in 5"
                            :key="star"
                            class="star"
                            :class="{ filled: star <= note, hovered: star <= hovered }"
                            @click="note = star"
                            @mouseover="hovered = star"
                            required
                        >
                            ★ 
                        </span>
                    </div>


                    <label>Commentaire :</label>
                    
                    <textarea class="comments" v-model="comments" 
                    required :maxlength="500"></textarea>
                    <p class="character-live">{{ comments.length }}/500</p>
                    <button class="send-button" type="submit">Envoyer</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios';
const hovered = ref(0);
const note = ref(0);
const comments = ref('');

defineProps({
  userSeller: {
    type: Object,
    required: true,
  }
});


const submitEvaluation = async (idReceive) =>{
    try {
        const token = localStorage.getItem('token');
        const userSendId = JSON.parse(atob(token.split('.')[1])).id;

        const response = await axios.post(`${process.env.VUE_APP_API_URL}/avis/create`, {
            userSend: userSendId,
            userReceive:  idReceive,
            note: note.value,
            comments: comments.value
        },{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('Évaluation envoyée avec succès', response.data);
        alert('Merci pour votre évaluation !');
        comments.value = '';
        note.value = 0;
        hovered.value = 0;
        window.location.reload();


    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'évaluation', error);
        alert('Une erreur est survenue lors de l\'envoi de votre évaluation.');
        
    }
}

</script>



<style scoped>
 *{
    margin : 0;
    box-sizing: border-box;
 }


.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}
.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
}

.evaluation-form{
    display: grid;
    grid-template-columns: auto;
    gap: 15px;

    label{
        text-align: start;
    }

    .star-rating {
        width: 71%;
    }
    .character-live{
        text-align: right;
        font-size: 12px;
        color: grey;
    }
}

.star-rating {
  font-size: 2rem;
  cursor: pointer;
  margin: 0.5rem 0;
  justify-self: center;
}

.star {
  color: #ccc;
  transition: color 0.2s;
  font-size: 3rem;
}

.star.hovered {
  color: #ffcc00; 
}

.star.filled {
  color: gold;
}

.send-button{
    border: none;

    color : white;
    background-color: #0D1B2A;

    border-radius: 45px;
    padding: 10px;
    width: 70%;
    justify-self: center;

    cursor: pointer;
}


.comments{
    resize: none;
    height: 200px;
    border-radius: 10px;
    border: 1px solid #ccc;
    padding: 10px;
    font-size: 1rem;
    font-family: Arial, sans-serif;
    
}

</style>