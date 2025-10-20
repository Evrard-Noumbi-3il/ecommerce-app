<template>
  <div class="emoji-grid">
    <span
      v-for="emoji in emojis"
      :key="emoji"
      class="emoji-item"
      @click="selectEmoji(emoji)"
    >
      {{ emoji }}
    </span>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue';
import { ref, onMounted } from 'vue';

defineProps({
  selectedEmoji: {
    type: String,
    required: false
  }
});
const emit = defineEmits(['update:selectedEmoji']);
const emojis = ref([
  '😀', '😂', '😍', '😎', '😭',
  '😡', '👍', '🙏', '🎉', '💔',
  '🔥', '🌟', '🍕', '🚀', '🐱'
]);

const selectEmoji = async (emoji) => {
  emit('update:selectedEmoji', emoji);
  emit('addEmoji');
}

const fetchEmojis = async () => {

};
</script>
<style scoped>

.emoji-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}
.emoji-item {
  font-size: 24px;
  cursor: pointer;
  text-align: center;
}

.emoji-item:hover {
  background-color: #f0f0f0;
  border-radius: 4px;
}


</style>