<template>
  <div class="containerChatBar">
    <div class="headerChatBar">
      <h2>Discussions</h2>
    </div>
    <svg class="search-icon" viewBox="0 0 24 24" width="20" height="20">
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor"/>
    </svg>

    <input
      class="searchChat"
      type="text"
      placeholder="Search..."
      v-model="keyWord"
    />

    <div class="chatList">
      <div v-if="receivers.length === 0" style="text-align: center; color: #777; margin-top: 20px;">
        Aucune discussion disponible.
      </div>
      <div class="chatListElement" v-for="receiver in filterReceivers(keyWord)" :key="receiver.id" @click="emit('update:selectedReceiver', receiver); markAsRead(receiver._id, receiver.chat._id), getProduct" :style="{ backgroundColor: selectedReceiver && selectedReceiver.id === receiver.id ? '#e6f7ff' : 'white' }">
        <div class="nameReceiver">
          <img :src="receiver.photo" class="profilImage">
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
import { ref,onMounted} from 'vue';


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

const keyWord = ref('');
const isInactive = ref(false);


onMounted(() => {

});

const filterReceivers = (keyWord) => {
  return props.receivers.filter(receiver => {
    const name = receiver.name || '';
    const keyword = keyWord || '';
    return name.toLowerCase().includes(keyword.toLowerCase());
  });
}

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
    height: 850px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: rgb(8, 1, 36);
    padding: 20px;
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
    color: white;
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
    padding-left: 30px;
  }

  .profilImage{
    width:30px;
    height:30px;
    border-radius:50%;
    margin-right:10px;
    vertical-align: middle;
  }

  .search-icon{
    position: relative;
    top: 50px;
    left: 30px;
    color: black;
  }
</style>