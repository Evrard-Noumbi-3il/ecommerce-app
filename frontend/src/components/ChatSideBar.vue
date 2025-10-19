<template>
  <div class="containerChatBar">
    <div class="headerChatBar">
      <h2>Discussions</h2>
    </div>
    <input class="searchChat" type="text" placeholder="Search..." />

    <div class="chatList">
      <div v-if="receivers.length === 0" style="text-align: center; color: #777; margin-top: 20px;">
        Aucune discussion disponible.
      </div>
      <div class="chatListElement" v-for="receiver in receivers" :key="receiver.id" @click="emit('update:selectedReceiver', receiver); markAsRead(receiver._id, receiver.chat._id)" :style="{ backgroundColor: selectedReceiver && selectedReceiver.id === receiver.id ? '#e6f7ff' : 'white' }">
        <div class="nameReceiver">
          <strong>{{ receiver.name }}</strong>
        </div>
        <div class="lastMessage">
          <div class="message">
            {{ receiver.chat.messages[receiver.chat.messages.length - 1].content }}
          </div>
          <div class="wasRead" :class="{ inactive: isInactive}" v-if="!receiver.chat.messages[receiver.chat.messages.length - 1].read">
            <p>.</p>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>
<script setup>
import axios from 'axios';
import { ref,onMounted } from 'vue';


const props = defineProps({
  receivers: {
    type: Array,
    required: true
  },
  selectedReceiver: {
    type: Object,
    required: false
  }
});


const isInactive = ref(false);


const emit = defineEmits(['update: selectedReceiver']);

const markAsRead = async (receiverId, chatId) => {
  try {
    await axios.post(`${process.env.VUE_APP_API_URL}/chat/markAsRead`, {
      receiverId: receiverId,
      chatId: chatId
    });
    isInactive.value = true;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut de lecture :", error);
  }
};
</script>
<style scoped>
  .containerChatBar{
    height: 800px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .headerChatBar{
    padding: 31px 20px 31px 20px;
    border-bottom: 1px solid #ccc;
    width: 85%;
    /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
    border-right: none;
  }

  h2{
    margin: 0;
    font-size: 24px;
    color: #333;
    text-align: center;
  }

  .chatList{
    flex: 1;
    overflow-y: auto;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .chatListElement{
    padding: 15px 20px;
    border: 1px solid #eee;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
  }

  .nameReceiver{
    font-size: 20px;
    color: #333;
    margin-bottom: 5px;
  }

  .lastMessage{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-wrap: wrap;
  }
  .message{
    font-size: 16px;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 300px;
  }
  .wasRead p{
    font-size: 30px;
    color: #007bff;
    margin: 0;
    font-weight: bold;
  }

  .wasRead.inactive p{
    display: none;
  }

  .searchChat{
    margin: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
</style>