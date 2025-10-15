<template>
  <table>
    <thead>
      <tr>
        <th>Nom</th>
        <th>Rôle</th>
        <th>Bani</th>
        <th>Actions</th>
        
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.name }}</td>
        <td>{{ user.role }}</td>
        <td>{{ user.isBan }}</td>
        <td>
          <button @click="$emit('ban', user._id)">🚫 Bannir</button>
          <button @click="$emit('promote', user._id)" v-if="user.role !== 'admin'">⬆️ Promouvoir</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps(['users']);
defineEmits(['ban', 'promote']);
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  border-radius: 8px;
  overflow: hidden;
}

th, td {
  padding: 12px 16px;
  border-bottom: 1px solid #e2e8f0;
  text-align: left;
}

tr:hover {
  background-color: #f9fafb;
}

button {
  margin-right: 6px;
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: #2563eb;
  color: white;
  transition: background 0.3s;
}

button:hover {
  background: #1d4ed8;
}
</style>